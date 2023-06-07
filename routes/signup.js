var express = require('express');
var router = express.Router();
var connection = require('../database');

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

// ...
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
  
    if (username && email && password) {
      connection.query(
        'INSERT INTO USERS (username, email, password) VALUES (?, ?, ?)',
        [username, email, password],
        (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
            return;
          }
  
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/login');
        }
      );
    } else {
      res.send('Please enter username, email, and password!');
    }
  });
  // ...
  
router.get('/login', (req, res) => {
  if (req.session.loggedin) {
    res.render('login', { username: req.session.username });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
