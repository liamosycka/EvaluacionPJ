var express = require("express");
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')
db.get("PRAGMA foreign_keys = ON")

const createTables = () => {
    db.serialize(function () {
        db.run('CREATE TABLE edificio (id_edif INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, \
            direccion TEXT NOT NULL)')
        db.run('CREATE TABLE dependencia (id_dependencia INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, \
            direccion TEXT NOT NULL, id_edif_fk, \
            FOREIGN KEY (id_edif_fk) REFERENCES edificio(id_edif) ON UPDATE CASCADE ON DELETE RESTRICT\
            )')
    })
}

const insertData = () => {
    db.serialize(function(){
        db.run('INSERT INTO edificio (nombre, direccion) VALUES (?, ?)', ['edif1', 'direc1'])
        db.run('INSERT INTO edificio (nombre, direccion) VALUES (?, ?)', ['edif2', 'direc2'])
        db.run('INSERT INTO dependencia (nombre, direccion, id_edif_fk) VALUES (?, ?, ?)',['depend1', 'dirDep1', 1])
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
    sql = 'SELECT * FROM edificio';
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

router.get("/dependencias/:id_edif", function(req, res){
    sql='SELECT * FROM dependencia where id_edif_fk='+req.params.id_edif+''
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