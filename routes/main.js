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
    res.render("search.ejs", { appName: "Programming Search" });
});

router.get('/search-result', function (req, res) {
    //searching in the database
    const keyword = req.query.keyword;

    const sqlquery = `
     SELECT 'cplusplus' AS source, id, name, link FROM cplusplus WHERE name LIKE ?
     UNION
     SELECT 'python' AS source, id, name, link FROM python WHERE name LIKE ?
     UNION
     SELECT 'javascript' AS source, id, name, link FROM javascript WHERE name LIKE ?
     `;

    // let sqlquery = " SELECT * FROM [SearchTable]  WHERE [availableBooks] LIKE % key % ";
    db.query(sqlquery,[`%${keyword}%`, `%${keyword}%`,`%${keyword}%`] ,(err, result) => {
        if (err) {
            console.error("Database error:", err);
            res.redirect('./'); 
            return;
        }
        res.render("search_result.ejs", { results: result, keyword: keyword });
     });
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
        res.send(' Thank you, '+ req.body.name + ' you are now registered!  We will send you an email at ' + req.body.email + ' <p><a href="/">Go back to the main page</a></p>');
        }
    });
});

router.get('/login', function (req, res) {
    res.render('login.ejs', appData);                                                                     
});      

router.get('/loggedin', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    
    let sqlquery = "SELECT * FROM users WHERE email = ? AND password = ?";
    // execute sql query
    db.query(sqlquery, [email, password], (err, result) => {
    // if (err) {
    //     console.error(e rr.message);
    //     res.redirect('/login');
    //     return;
    //     }
    // if (result.length > 0) {
    //     // Store user info in session
    //     req.session.user = result[0];
    //     res.send(' Hello '+ result[0].name + '!  Successful login ' + ' <p><a href="/">Go back to the main page</a></p>' + ' <p><a href="/dashboard">See dashboard</a></p>');
    // } else {
    //    res.send("Invalid username or password");
    // }
    // });
    
        if (req.session.loggedin) {
         // Store user info in session
		    res.send('Welcome back, ' + req.session.name  + '! Successful login ' + ' <p><a href="/">Go back to the main page</a></p> ');
	    } else {
		// Not logged in
		    res.send('Please login to view this page!');
    	}
    	res.end();
});
});

router.post('/auth', function(req, res) {
	// Capture the input fields
	let name = req.body.name;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (name && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		db.query('SELECT * FROM users WHERE name = ? AND password = ?', [name, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.name = name;
				// Redirect to home page
				res.redirect('/loggedin');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});


// Export the router object so index.js can access it
module.exports = router;