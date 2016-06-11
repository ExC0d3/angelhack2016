var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var wav = require('wav');

var port = 3700;
var outFile = 'demo.wav';
var app = express();

app.set('views', __dirname + '/tpl');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/', function(req, res){
  res.render('index');
});

app.post('/location',function(req,res){
  console.log(JSON.parse(JSON.stringify(req.body)));
  res.send('http://localhost:3700/plans');
});

app.get('/plans',function(req,res){
  console.log('data on get');
  res.render('second');
});

app.post('/plans',function(req,res){
  console.log('data on post');
  res.render('second');
});

app.listen(port);

console.log('server open on port ' + port);

binaryServer = BinaryServer({port: 9001});

binaryServer.on('connection', function(client) {
  console.log('new connection');

  var fileWriter = new wav.FileWriter(outFile, {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });

  client.on('stream', function(stream, meta) {
    console.log('new stream');
    stream.pipe(fileWriter);

    stream.on('end', function() {
      fileWriter.end();
      console.log('wrote to file ' + outFile);
    });
  });
});
