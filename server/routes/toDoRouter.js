var express = require('express');
var router = express.Router();

var poolModule = require('../modules/pool.js');
var pool = poolModule;

router.get('/', function (req, res) {
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'SELECT * FROM "to-dos";';
            db.query(queryText, function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
});

router.post('/', function (req, res) {
    var list = req.body; // This is the data sent
    console.log(list);

    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'INSERT INTO "to-dos" ("task", "date" , "completed", "description") VALUES ($1, $2, $3 , $4 );';
            db.query(queryText, [list.task, list.date, list.completed, list.notes], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    // Send back success!
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    }); // END POOL
});

router.put('/:id', function (req, res) {
    var listId = req.params.id; // id from dom
    var list = req.body; // This is the data sent
    console.log(list);
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'UPDATE "to-dos" SET "task"= $1, "date" = $2, "completed" = $3, "description" = $4, WHERE "id" =$5;';
            db.query(queryText, [list.task, list.date, list.gender, list.notes, listId], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
});

router.delete('/:id', function (req, res) {
    var listId = req.params.id;
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'DELETE FROM "to-dos" WHERE "id" = $1;';
            db.query(queryText, [listId], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
});

module.exports = router;