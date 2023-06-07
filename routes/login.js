// var express = require('express');
// var router = express.Router();
// var connection = require('../database');




// router.get('/', function(req, res, next) {
//     res.render('signup', { title: 'Express' });
// });

// router.post('/login', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
  
//     if (username && password) {
//       connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
//         if (error) {
//           console.error('Error executing query:', error);
//           return;
//         }
  
//         if (results.length > 0) {
//           req.session.loggedin = true;
//           req.session.username = username;
//           res.redirect('/sample_data');
//         } else {
//           res.send("<script>alert('Incorrect username or password!')</script>");
//         }
//       });
//     } else {
//       res.send('Please enter username and password!');
//     }
//   });

// router.get('/sample_data', (req, res) => {
//     if (req.session.loggedin) {
//         res.render('sample_data', { username: req.session.username });
//     } else {
//         res.redirect('/');
//     }
// });

// module.exports = router;

var express = require('express');
var router = express.Router();
var connection = require('../database');

router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return;
            }

            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/sample_data');
            } else {
                res.send("<script>alert('Incorrect username or password!')</script>");
            }
        });
    } else {
        res.send('Please enter username and password!');
    }
});

router.get('/sample_data', (req, res) => {
    if (req.session.loggedin) {
        res.render('sample_data', { username: req.session.username });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
