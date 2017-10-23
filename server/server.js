var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
//port number
var toDoRouter = require('./routes/toDoRouter.js');
//rquiring router
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));
//getting static html
app.use('/toDo', toDoRouter);
//using ToDo router
app.listen(port, function () {
    console.log('listening on port', port);
});//port 5000
