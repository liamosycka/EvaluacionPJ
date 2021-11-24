var express = require("express");
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')
db.get("PRAGMA foreign_keys = ON")

const createTables = () => {
    db.serialize(function () {
        db.run('CREATE TABLE departamento (id_depto INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, \
            direccion TEXT NOT NULL)')
        db.run('CREATE TABLE dependencia (id_dependencia INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, \
            direccion TEXT NOT NULL, id_depto_fk, \
            FOREIGN KEY (id_depto_fk) REFERENCES departamento(id_depto) ON UPDATE CASCADE ON DELETE RESTRICT\
            )')
    })
}

const insertData = () => {
    db.serialize(function(){
        db.run('INSERT INTO departamento (nombre, direccion) VALUES (?, ?)', ['depto1', 'direc1'])
        db.run('INSERT INTO departamento (nombre, direccion) VALUES (?, ?)', ['depto2', 'direc2'])
        db.run('INSERT INTO dependencia (nombre, direccion, id_depto_fk) VALUES (?, ?, ?)',['depend1', 'dirDep1', 1])
    })

}


router.get("/", function (req, res) {
    createTables();
    res.send("Creando tablas de la BD");
});
router.get("/add", function (req, res) {
    insertData();
    res.send("Agregando Datos");
});
router.get("/all", function (req, res) {
    sql = 'SELECT * FROM departamento';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let objRows = {}
        objRows.message="exito"
        objRows.data=rows
        res.send(objRows)
    });
});

router.get("/dependencias/:id_depto", function(req, res){
    sql='SELECT * FROM dependencia where id_depto_fk='+req.params.id_depto+''
    db.all(sql, [], (err, rows)=>{
        if (err){
            throw err;
        }
        let objRows ={}
        objRows.message="exito"
        objRows.data=rows
        res.send(objRows)
    })

});

module.exports = router;