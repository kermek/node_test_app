var express = require('express'),
    app = express(),
    path = require('path'),
    port = 8080;

//set views
//engine html
console.log(path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  res.render('index.html', { who: 'World' });
});

app.listen(port);
console.log('Server is up on poty %s!', port);
