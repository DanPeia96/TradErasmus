var Publications = []
//Conexión a bbdd
const mng = require('mongoose') 

const user ='user1';
const password = '1234';
const dbName = 'TradErasmus';
const uri = `mongodb+srv://${user}:${password}@cluster0.3o8ts.mongodb.net/${dbName}?retryWrites=true&w=majority`;

//ATLAS: modifica los datos de la cadena de conexión con tu configuración en la nube 
// Creamos la conexión con la base de datos 
mng.connect(uri,
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))


//Funcion que carga todos las publicaciones de la base de datos
function publicationPromise () {
    const MongoClient = require("mongodb").MongoClient;
  

   return MongoClient.connect(uri)
        .then(mc => mc.db(dbName)                   
            .collection('Publication')     
            .find()
            .toArray()                     
            .then(as => (mc.close(), as)))

        .catch(e => console.log(e))              
  }

  // Al iniciar la aplicacion, para cada club obtenido de la base de datos, lo introducimos en el array Clubs
publicationPromise().then(as => as.forEach(function(item){
    Publications.push(item)})
);


//Función que devuelve un array con todas las publicaciones de una coiudad en específico
function PubByCityPromise (data) {
    const MongoClient = require("mongodb").MongoClient;
    var myquery = { "city" : data }
    return MongoClient.connect(uri)       // connect to mongo server
                      .then(mc => mc.db(dbName)                   // get mongoClient object and connect to artbot db
                                    .collection('Publication')         // connect to the artistdb collection
                                    .find(myquery)
                                    .toArray()                      // convert the results into an array
                                    .then(as => (mc.close(), as)))  // close db and return array from query result
                      .catch(e => console.log(e));                  // catch errors
  }

  //Obtener todas las publicaciones
  exports.getPublications = () => Object.keys(Publications).map(k => 
    ({title : Publications[k].title, descript : Publications[k].descript, 
        price : Publications[k].price, publicationDate: Publications[k].publicationDate}) )


//Obtener publicaciones de una ciudad en concreto por hacer

//Creación de un nuevo usuario en la base de datos
exports.registrar = data => {
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(uri, function(err, db) {
         if (err) throw err;
         var dbo = db.db(dbName);
         data["@context"]="http://schema.org";
         data["@type"]="User";
         var myobj = data;
         dbo.collection("users").insertOne(myobj, function(err, res) {
             if (err) throw err;
             db.close();
         });
     });

}

//Realiza el login de un usuario, comprobando que existe 
//por implementar
