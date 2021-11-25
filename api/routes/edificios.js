var express = require("express");
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')
db.get("PRAGMA foreign_keys = ON")

const createTables = () => {
    db.serialize(function () {
        db.run('CREATE TABLE edificio (id_edif INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, \
            direccion TEXT NOT NULL)');
        db.run('CREATE TABLE dependencia (id_dependencia INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, \
            direccion TEXT NOT NULL, id_edif_fk, \
            FOREIGN KEY (id_edif_fk) REFERENCES edificio(id_edif) ON UPDATE CASCADE ON DELETE RESTRICT\
            )');
    })
}
createTables();


router.get("/all", function (req, res) {
    sql = 'SELECT * FROM edificio';
    db.all(sql, [], (err, rows) => {
        if (err) {
            let objError={};
            objError.message="error";
            res.send(objError)
        }
        let objRows = {};
        objRows.message="exito";
        objRows.data=rows;
        res.send(objRows);
    });
});

router.get("/dependencias/all", function (req, res) {
    sql = 'SELECT * FROM dependencia';
    db.all(sql, [], (err, rows) => {
        if (err) {
            let objError={};
            objError.message="error";
            res.send(objError)
        }
        let objRows = {};
        objRows.message="exito";
        objRows.data=rows;
        res.send(objRows);
    });
});

router.get("/dependencias/:id_edif", function(req, res){
    sql='SELECT * FROM dependencia where id_edif_fk='+req.params.id_edif+'';
    
    db.all(sql, [], (err, rows)=>{
        if (err){
            let objError={};
            objError.message="error";
            res.send(objError)
        }
        let objRows ={};
        objRows.message="exito";
        objRows.data=rows;
        res.send(objRows);
    })

});

router.get("/:id_edif", function(req, res){
    console.log("param en get: ",req.params.id_edif)
    sql='SELECT * FROM edificio where id_edif='+req.params.id_edif+'';
    db.get(sql, (err, row)=>{
        if(err){
            let objError={};
            objError.message="error";
        }
        let objRow={};
        objRow.message="exito";
        objRow.data=row;
        res.send(objRow);
    })
});

router.post("/nuevo", function(req, res){
    console.log("En nuevo: ",req.body.nombre);
    console.log("En nuevo: ",req.body.direccion)
    sql= 'INSERT INTO edificio (nombre, direccion) VALUES (?, ?)';
    params =[req.body.nombre, req.body.direccion]
    db.run(sql, params)
    res.sendStatus(200);
})

router.post("/dependencias/nueva", function(req, res){
    console.log("En post dep: ",req.body)
    sql= 'INSERT INTO dependencia (nombre, direccion, id_edif_fk) VALUES (?, ?, ?)';
    params =[req.body.nombre, req.body.direccion, parseInt(req.body.edificio)]
    db.run(sql, params)
    res.sendStatus(200);
})

module.exports = router;