// https://www.npmjs.com/package/mysql2
const mysql = require("mysql2");

try {
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "arq_sw_mysql",
    port: 3307, // default is 3306
  });

  // simple query
  let sql = `CREATE TABLE IF NOT EXISTS usuarios (
        id int(11) unsigned NOT NULL AUTO_INCREMENT,
        nombre char(50) DEFAULT NULL,
        apellido char(50) DEFAULT NULL,
        email char(100) DEFAULT NULL,
        PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`;
  connection.query(sql, function (err, results, fields) {
    if (err) {
      throw err;
    }
    // prepared statements
    // https://dev.mysql.com/doc/apis-php/en/apis-php-mysqli.quickstart.prepared-statements.html#:~:text=The%20MySQL%20database%20supports%20prepared,and%20protect%20against%20SQL%20injections.&text=The%20prepared%20statement%20execution%20consists%20of%20two%20stages%3A%20prepare%20and%20execute.

    //creamos usuarios de ejemplo.
    sql = `INSERT INTO usuarios (nombre, apellido, email) VALUES ?;`;

    let binds = [
      ["Juan", "Perez", "juan@gmail.com"],
      ["Ana", "Castillo", "juan@gmail.com"],
    ];
    connection.query(sql, [binds], function (err, result) {
      if (err) {
        throw err;
      }
      sql = `SELECT * FROM usuarios WHERE id = ?;`;
      binds = [1];
      connection.query(sql, [binds], function (err, result) {
        if (err) {
          throw err;
        }
        console.log(result);
      });
    });
  });
} catch (e) {
  console.log("error");
}
