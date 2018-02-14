
var http           = require('http');
var express        = require('express');
var MongoClient    = require('mongodb').MongoClient;
var bodyParser     = require('body-parser');
var app            = express();
var db             = require('./app/config/db.config');

var server = http.createServer(app);
var port = process.env.PORT || 8090;

app.use(bodyParser.json({ extended: true, limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

MongoClient.connect(db.url, function (err, database) {
  if (err) return console.log(err);
  require('./app/routes')(app, database);

  server.listen(port);
  console.log('Server Started on port ' + port);
});
