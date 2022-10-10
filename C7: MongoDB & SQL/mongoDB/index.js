const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/mydb";
const client = new MongoClient(uri);
async function run() {
    await client.connect();
    const database = client.db("mydb");
    const peliculas = database.collection("peliculas");
    // create a document to insert
    const doc = {
        titulo: "Taxi Driver",
        anio: 1976,
    }
    const result = await peliculas.insertOne(doc);
    //recordar que cualquier retorno de una funcion async siempre crear una Promise.
    return `Se ha creado documento con _id: ${result.insertedId}!`;
}

run() 
    .then((done) => console.log(done))
    .catch((err) => console.log(err) )
    .finally(() => client.close());