var express = require('express');
var router = express.Router();

var poolModule = require('../modules/pool.js');
var pool = poolModule;

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            var queryText = 'SELECT * FROM "to-dos" ORDER BY "id";';
            db.query(queryText, function (errorMakingQuery, result) {
                done(); 
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); 
});

router.post('/', function (req, res) {
    var list = req.body; // This is the data sent
    console.log(list);

    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            var queryText = 'INSERT INTO "to-dos" ("task", "date" , "completed", "description") VALUES ($1, $2, $3 , $4 );';
            db.query(queryText, [list.task, list.date, list.completed, list.notes], function (errorMakingQuery, result) {
                done(); 
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    });
});

router.put('/toDocomplete/:id', function (req, res) {
    var listId = req.params.id; // id from dom
    var list = req.body; // This is the data sent
    console.log(list);
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            var queryText = 'UPDATE "to-dos" SET "completed" = $1  WHERE "id" =$2;';
            db.query(queryText, [list.completed, listId], function (errorMakingQuery, result) {
                done(); 
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    });
});

router.put('/:id' , function (req, res) {
    var listId = req.params.id; // id from dom
    var list = req.body; // This is the data sent
    console.log(list);
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            var queryText = 'UPDATE "to-dos" SET "task"= $1, "date" = $2, "completed" = $3, "description" = $4  WHERE "id" =$5;';
            db.query(queryText, [list.task, list.date, list.completed, list.notes, listId], function (errorMakingQuery, result) {
                done(); 
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); 
});

router.delete('/:id', function (req, res) {
    var listId = req.params.id;
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            var queryText = 'DELETE FROM "to-dos" WHERE "id" = $1;';
            db.query(queryText, [listId], function (errorMakingQuery, result) {
                done(); 
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); 
});

module.exports = router;