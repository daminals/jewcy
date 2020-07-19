const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const db = require('./config');
const nunjucks = require('nunjucks');
const http = require('http');



app.get('/', function(req, res) {
    res.render('index.html');
});
app.use(express.static(__dirname + '/public'));

nunjucks.configure('views', {
    express: app,
    autoescape: true
});
app.set('view engine', 'html');


app.get('/data', function (req, res) {
  res.render('data.html');

});







app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


  app.route('/profile');
  // GET endpoint
  app.get('/profile', db.getProfile);
  // POST endpoint
  app.post('/profile', db.addProfile);

  app.get('/profile/:id', db.getUserById);

  app.put('/profile/:id', db.updateUser);

  app.delete('/profile/:id', db.deleteUser);


app.post('/makeUser', function(req, res) {
    var username = req.body.username;
    var pfp = req.body.pfp;
    var body = req.body;


    console.log(body);
    db.addProfile(body);
    res.redirect('/');

});


app.get('*', function(req, res){
  res.render('404.html')
});

// Start server

app.listen(process.env.PORT || 3000, function(){
    console.log("owo, Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});