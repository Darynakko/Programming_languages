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
    res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);                                                                              
});

// Export the router object so index.js can access it
module.exports = router;