'use strict';
//require express
var express = require('express');
var app = express();

//require cors and use it
var cors = require('cors');
app.use(cors());

//require bodyparser and use it
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require and use "multer" middleware...
//Multer is a node.js middleware for handling multipart/form-data,
//which is primarily used for uploading files.
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

//get and use css
app.use('/public', express.static(process.cwd() + '/public'));

//get and use html
app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });


app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});


//upload the file and display its name, type and size
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  
  var name = req.file.originalname;
  var type = req.file.mimetype;
  var size = req.file.size;
  
  res.json(
    {
      "name" : name,
      "type" : type,
      "size" : size
    }
  )
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

