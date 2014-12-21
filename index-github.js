var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    passport = require('./auth-middleware'),
    port = 8080;

//set views
//engine html
console.log(path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', ensureAuthenticated,function(req, res) {
  res.render('index.html', { user: req.user });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

app.get('/login', function(req, res) {
  res.render('login.html', { user: req.user });
});

app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.listen(port);
console.log('Server is up on poty %s!', port);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}