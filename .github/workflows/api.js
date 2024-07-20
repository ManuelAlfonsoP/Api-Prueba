// DBConnectorMariaDB = require('./DBConnection_Query.js');
// var Nombre = "Roberto";
// DBConnectorMariaDB.query('SELECT Nombre FROM Usuarios WHERE Apellido = "Perez"');
// DBConnectorMariaDB.query('INSERT INTO `desastre`.Pruebas (`Nombre`,`Apellido`,`Usuario`,`Contraseña` Values("Manuel","Perez","ManuelPerez","66908914")')

BigInt.prototype.toJSON = function() {
    return Number(this);
};

const DBConnectorMariaDB = require('./DBConnection_Query.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const port = process.env.PORT || 8484;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);

router.route('/').get((req,res)=>{
    res.json("Nuestra API esta funcionando")
});
// Ruta que retorna todos los datos de la tabla "Usuarios"
router.route('/user').get(async(req,res)=>{
    result = await DBConnectorMariaDB.queryall("SELECT * FROM Usuarios")
    res.json(result);
})
// Ruta que retorna una fila de datos de la tabla "Usuarios", guiandose por el "ID_Usuario" enviado en el body del request
router.route('/user/:id').get(async(req,res)=>{
    result = await DBConnectorMariaDB.querywithParams("SELECT * FROM Usuarios WHERE ID_Usuario = ?", [req.params.id])
    res.json(result);
})
// Ruta que recibe datos (Nombre, Apellido, Usuario y Contraseña) y los añade a la taba "Usuarios" como datos nuevos, tomandolos del request body
router.route('/user/add').post(async(req,res)=>{
    result = await DBConnectorMariaDB.querywithParams(
        "INSERT INTO Usuarios(Nombre, Apellido, Usuario, Contraseña) VALUES(?,?,?,?)",
        [req.body.Nombre, req.body.Apellido, req.body.Usuario, req.body.Contraseña]
    )
    // res.send(JSON.stringify(result));
    res.json(result);
})
// Ruta que borra una fila de datos de la tabla "Usuarios", guiandose por el "ID_Usuario" enviado en el body del request
router.route('/user/delete/:id').get(async(req,res)=>{
    result = await DBConnectorMariaDB.querywithParams("DELETE FROM Usuarios WHERE ID_Usuario=?", [req.params.id])
    res.json(result);
})
// Ruta que actualiza los datos de una fila (Todos o datos particulares), guiandose por el "ID_Usuario" que llega en el body de request
//  (U otro dato, pero se prioriza la llave por ser unica)
// Luego, tomando los datos que vienen en el body del query, los cambia por los que hay en la base de datos
router.route('/user/update').post(async(req,res)=>{
    result = await DBConnectorMariaDB.querywithParams(
        "UPDATE Usuarios SET Nombre=?, Apellido=?, Usuario=?, Contraseña=? WHERE ID_Usuario=?",
        [req.body.Nombre, req.body.Apellido, req.body.Usuario, req.body.Contraseña, req.body.ID_Usuario]
    )
    res.json(result);
})

app.listen(port);

console.log("Inicio en el puerto "+ port);