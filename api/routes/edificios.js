var express = require("express");
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')
//SQLite tiene las claves foráneas desactivadas por defecto
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
/*Antes de que se pueda ejecutar alguna ruta creo las tablas en memoria.
Como se sabe que una dependencia es de un solo edificio, decidí poner como clave foránea
en dependencia la clave primaria de edificio, no vi necesario derivar en una relación
ya que la participación de dependencia es total (lo que asumo), no hay dependencias que no tengan edificio.
Por último, decidí como políticas de integridad referencial coloar un CASCADE en los updates de la clave foránea y
un restrict en los delete, ya que si pongo CASCADE en el delete, borrar 1 edificio puede causar que se me borren muchas
dependencias.*/
createTables();


router.get("/all", function (req, res) {
    //Obtengo todos los edificios de la BD
    let sql = 'SELECT * FROM edificio';
    db.all(sql, [], (err, rows) => {
        if (err) {
            let objError={};
            objError.message="error";
            objError.status=404;
            res.send(objError)
        }
        let objRows = {};
        objRows.message="exito";
        objRows.data=rows;
        res.send(objRows);
    });
});

router.get("/dependencias/all", function (req, res) {
    //Obtengo todos las dependencias
    let sql = 'SELECT * FROM dependencia';
    db.all(sql, [], (err, rows) => {
        if (err) {
            let objError={};
            objError.message="error";
            objError.status=404;
            res.send(objError)
        }
        let objRows = {};
        objRows.message="exito";
        objRows.data=rows;
        res.send(objRows);
    });
});

router.get("/dependencias/edif/:id_edif", function(req, res){
    //obtengo todas las dependencias de un edificio en particular
    let sql='SELECT * FROM dependencia where id_edif_fk='+req.params.id_edif+'';
    
    db.all(sql, [], (err, rows)=>{
        if (err){
            let objError={};
            objError.message="error";
            objError.status=404;
            res.send(objError)
        }
        let objRows ={};
        objRows.message="exito";
        objRows.data=rows;
        res.send(objRows);
    })

});

router.get("/dependencias/:id_dependencia", function(req, res){
    //obtengo una dependencia en particular
    let sql='SELECT * FROM dependencia where id_dependencia='+req.params.id_dependencia+'';
    db.get(sql, (err, row)=>{
        if(err){
            let objError={};
            objError.message="error";
            objError.status=404;
        }
        let objRow={};
        objRow.message="exito";
        objRow.data=row;
        res.send(objRow);
    })
});

router.get("/:id_edif", function(req, res){
    //obtengo un edificio en particular
    let sql='SELECT * FROM edificio where id_edif='+req.params.id_edif+'';
    db.get(sql, (err, row)=>{
        if(err){
            let objError={};
            objError.message="error";
            objError.status=404;
        }
        let objRow={};
        objRow.message="exito";
        objRow.data=row;
        res.send(objRow);
    })
});

router.post("/nuevo", function(req, res){
    //alta de un nuevo edificio
    let sql= 'INSERT INTO edificio (nombre, direccion) VALUES (?, ?)';
    let params =[req.body.nombre, req.body.direccion]
    db.run(sql, params, (err)=>{
        if(err){
            let objError={};
            objError.message="error";
            objError.status=404;
        }
    });
    res.sendStatus(200);
})

router.post("/dependencias/nueva", function(req, res){
    //alta de una nueva dependencia
    let sql= 'INSERT INTO dependencia (nombre, direccion, id_edif_fk) VALUES (?, ?, ?)';
    let params =[req.body.nombre, req.body.direccion, parseInt(req.body.edificio)]
    db.run(sql, params, (err)=>{
        if(err){
            let objError={};
            objError.message="error";
            objError.status=404;
        }
    });
    res.sendStatus(200);
})

router.put("/modif", function(req, res){
    //modificación de un edificio particular
    let params=[req.body.nombre, req.body.direccion, req.body.id_edif]
    let sql='UPDATE edificio SET nombre=?, direccion=? WHERE id_edif=?';
    db.run(sql,params, (err)=>{
        if (err){
            let objError={};
            objError.message="error";
            objError.status=404;
            res.send(objError)
        }
    });
    res.sendStatus(200);
})

router.delete("/delete/:id_edif", function(req, res){
    //eliminación de un edificio en particular
    let sql='DELETE FROM edificio WHERE id_edif='+parseInt(req.params.id_edif)+'';
    db.run(sql, (err)=>{
        if(err){
            let objError={};
            objError.message="error";
            objError.status=404;
            res.send(objError)
        }
    });
    res.sendStatus(200);
})

router.put("/dependencias/modif", function(req, res){
    //modificación de una dependencia en particular
    let params=[req.body.nombre, req.body.direccion, parseInt(req.body.id_edif_fk), req.body.id_dependencia]
    let sql='UPDATE dependencia SET nombre=?, direccion=?, id_edif_fk=? WHERE id_dependencia=?';
    db.run(sql,params, (err)=>{
        if (err){
            let objError={};
            objError.message="error";
            objError.status=404;
            res.send(objError)
        }
    });
    res.sendStatus(200);
})

router.delete("/dependencias/delete/:id_dependencia", function(req, res){
    //eliminiación de una dependencia en particular
    let sql='DELETE FROM dependencia WHERE id_dependencia='+parseInt(req.params.id_dependencia)+'';
    db.run(sql, (err)=>{
        if(err){
            let objError={};
            objError.message="error";
            objError.status=404;
            res.send(objError)
        }
    });
    res.sendStatus(200);
})

module.exports = router;