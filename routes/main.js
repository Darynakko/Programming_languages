// Create a new router
const express = require("express");
const router = express.Router();

// Define our data
var appData = {appName: "Programming library"}

// Handle our routes
router.get('/',function(req,res){
    res.render('index.ejs', appData)
});

router.get('/about',function(req,res){
    res.render('about.ejs', appData);
});

router.get('/list',function(req,res){
    res.render('list.ejs', appData);
});

router.get('/javascript', function(req, res) {
    let sqlquery = "SELECT * FROM JavaScript"; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./'); 
        }
        let newData = Object.assign({}, appData, {availableBooks:result});
          console.log(newData);
          res.render("javascript.ejs", newData);
     });
});

router.get('/python', function(req, res) {
    let sqlquery = "SELECT * FROM python"; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./'); 
        }
        let newData = Object.assign({}, appData, {availableBooks:result});
          console.log(newData);
          res.render("python.ejs", newData);
     });
});

router.get('/cplusplus', function(req, res) {
    let sqlquery = "SELECT * FROM cplusplus "; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./'); 
        }
        let newData = Object.assign({}, appData, {availableBooks:result});
          console.log(newData);
          res.render("cplusplus.ejs", newData);
     });
});

router.get('/search',function(req,res){
    res.render("search.ejs", appData);
});

router.get('/search-result', function (req, res) {
    //searching in the database
    res.send("You searched for: " + req.query.keyword);
});

router.get('/register', function (req,res) {
    res.render('register.ejs', appData);                                                                     
});        

router.post('/registered', function (req,res) {
    // saving data in database
    let sqlquery = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
    // execute sql query
    let newrecord = [req.body.name, req.body.email, req.body.password];
    db.query(sqlquery, newrecord, (err, result) => {
    if (err) {
        return console.error(err.message);
        }
    else {
        res.send(' Hello '+ req.body.name + ' you are now registered!  We will send you an email at ' + req.body.email + ' <p><a href="/">Go back to the main page</a></p>');
        }
    });
});

router.get('/login', function (req, res) {
    res.render('login.ejs', appData);                                                                     
});      

router.post('/loggedin', function (req, res) {
    // saving data in database
    const email = req.body.email;
    const password = req.body.password;
    
    let sqlquery = "SELECT * FROM users WHERE email = ? AND password = ?";
    // execute sql query
    db.query(sqlquery, [email, password], (err, result) => {
    if (err) {
        return console.error(err.message);
        }
    else {
        res.send(' Hello '+ result[0].name + '!  Successful login ' + ' <p><a href="/">Go back to the main page</a></p>');
        }
    });
});

// Export the router object so index.js can access it
module.exports = router;