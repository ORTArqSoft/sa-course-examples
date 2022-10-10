// https://sequelize.org/docs/v6/getting-started/

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("arq_sw_mysql", "root", "root", {
  host: "localhost",
  /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  dialect: "mysql",
  port: 3307, // default is 3306
});

async function conectar() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const User = sequelize.define("user", {
      nombre: {
        // https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
        type: DataTypes.STRING(50),
        get() {
          const rawValue = this.getDataValue("nombre");
          return rawValue ? rawValue.toUpperCase() : null;
        },
        // validacion built-in.
        validate: {
          len: {
            args: 3,
            msg: "Nombre al menos 3 caracteres",
          },
          // validacion custom.
          fn: (val) => {
            if (val.indexOf("-") != -1)
              throw new Error("nombre no puede contenter caracter -");
          },
        },
        //constraint
        allowNull: false,
      },
      apellido: DataTypes.STRING(50),
      email: {
        type: DataTypes.STRING(100),
        set(value) {
          this.setDataValue("email", value.toLowerCase());
        },
        // validacion built-in.
        validate: {
          isEmail: true,
        },
        //constraint
        unique: true,
      },
    });

    const Log = sequelize.define("log", {
      log: {
        type: DataTypes.STRING(100),
      },
    });
    // https://sequelize.org/docs/v6/core-concepts/assocs/
    Log.belongsTo(User);

    (async () => {
      await sequelize.sync({ force: true });
      //crear instancia de modelo, guardar y actualizar valor
      try {
        const Usr = User.build({
          nombre: "Ana",
          apellido: "Castillo",
          email: "ana@gmail.com",
        });
        //create.
        await Usr.save();
        Usr.nombre = "Juan";
        //update.
        await Usr.save();

        const Usr2 = await User.create({
          nombre: "Pedro",
          apellido: "Perez",
          email: "pedro@gmail.com",
        });

        await Log.create({ log: "login 1", userId: Usr2.id });
        await Log.create({ log: "login 2", userId: Usr2.id });

        //consultas (queries)
        // https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
        // https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/
        const logs = await Log.findAll({ include: User });

        logs.forEach((log) => {
          console.log("logs =>", log.toJSON());
        });

        const log = await Log.findOne({ include: User });
        console.log("log =>", log.toJSON());
      } catch (e) {
        console.log("Error =>", e.message);
      }

      //obtener todos los usuarios
      let users = await User.findAll();
      users.forEach((user) => {
        console.log(user.toJSON());
      });

      // obtener un usuario por param
      users = await User.findAll({
        where: {
          nombre: "pedro",
        },
      });
      users.forEach((user) => {
        console.log(user.toJSON());
      });
    })();
  } catch (error) {
    console.error("Hubo un error", error);
  }
}

conectar();
