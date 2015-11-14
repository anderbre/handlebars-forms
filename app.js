var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);


app.get('/',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.data = qParams;
  res.render('get', context);
});

app.post('/', function(req,res){
  var bParams = [];
  var qParams = [];
  if (Object.keys(req.body)){
  for (var p in req.body){
    bParams.push({'name':p,'value':req.body[p]})
  }
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.data = bParams;
  context.query = qParams;
  res.render('post', context);}
  else {
    res.status(400);
    res.render('400');
  }
});



app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err);
  res.type('plain/text');
  if (err.status == 400){
    res.status(400);
    res.render(400);
  } else {}
  res.status(500);
  res.render('500');
}
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
