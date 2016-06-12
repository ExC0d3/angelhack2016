var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var wav = require('wav');

var say = require('say');

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

app.post('/callout',function(req,res){

  res.send('got it');
  var place = req.body.place;

  console.log(typeof(place));
  if(place==='san francisco'){
    say.speak('San francisco','', 1.0, function(err) {
      if (err) {
    console.error(err);
  }
    say.speak("Cost is eight hundred","",1.0,function(err){
      if(err)
        throw err;
    });
  });
  }
  else if(place==='moutain view'){
    say.speak('moutain view','', 1.0, function(err) {
      if (err) {
    console.error(err);
  }
    say.speak("Cost is ten hundred","",1.0,function(err){
      if(err)
        throw err;
    });
  });
  }
  else if(place==='paris'){
    say.speak('Paris','', 1.0, function(err) {
      if (err) {
    console.error(err);
  }
    say.speak("Cost is seven hundred","",1.0,function(err){
      if(err)
        throw err;
    });
  });
  }
  else {
    say.speak('New York','', 1.0, function(err) {
      if (err) {
    console.error(err);
  }
    say.speak("Cost is sixteen hundred","",1.0,function(err){
      if(err)
        throw err;
    });
  });

  }

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
