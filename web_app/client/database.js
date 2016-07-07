// Configuration file
var config = require('../config.js');

// Initialize the postgres database
var options = {};
var pgp = require('pg-promise')(options);
var db = pgp(config.postgres_url);

/* EXAMPLE DB QUERY
  req.db.any("select * from users")
    .then(function (data) {
        console.log(data);
    })
    .catch(function (error) {
       console.log(error);
    });
*/

initializeTables = function(){

	var query1 = "CREATE TABLE Users(" + 
		"uid serial PRIMARY KEY," +
		"username char(50) NOT NULL UNIQUE," +
		"type char(8) NOT NULL," +
		"age int NOT NULL CHECK (age > 0)," +
		"state char(2) NOT NULL" +
		");";

	var query2 = "CREATE TABLE Categories(" + 
		"cid serial PRIMARY KEY," +
	    "categoryname char(50) NOT NULL UNIQUE," +
	    "description char(50) NOT NULL," +
	    "username char(50) REFERENCES Users(username)" +
	    ");";

	var query3 = "CREATE TABLE Products(" + 
		"pid serial PRIMARY KEY," +
	    "productname char(50) NOT NULL UNIQUE," +
	    "categoryname char(50) REFERENCES Categories(categoryname)," +
	    "SKU int NOT NULL UNIQUE CHECK (SKU > 0)," +
	    "price int NOT NULL CHECK (price > 0)" +
	    ");";

	var query4 = "CREATE TABLE Orders(" +
		"oid serial PRIMARY KEY," +
		"date char(50) NOT NULL," +
		"username char(50) REFERENCES Users(username)," +
    "total int NOT NULL CHECK (total > 0)," + 
    "ccn char(16) NOT NULL" + 
		");";

	var query5 = "CREATE TABLE LineItems(" + 
    "lid serial PRIMARY KEY," +
		"productname char(50) REFERENCES Products(productname)," +
		"oid serial REFERENCES Orders(oid)," +
		"quantity int NOT NULL CHECK (quantity > 0)," +
		"price int NOT NULL CHECK (price > 0)" +
		");";

	db.any(query1)
	    .then(function (data) {
	        console.log(data);
	    })
	    .catch(function (error) {
	       console.log(error);
	    });

  	db.any(query2)
	    .then(function (data) {
	        console.log(data);
	    })
	    .catch(function (error) {
	       console.log(error);
	    });

  	db.any(query3)
	    .then(function (data) {
	        console.log(data);
	    })
	    .catch(function (error) {
	       console.log(error);
	    });

  	db.any(query4)
	    .then(function (data) {
	        console.log(data);
	    })
	    .catch(function (error) {
	       console.log(error);
	    });
  
  	db.any(query5)
	    .then(function (data) {
	        console.log(data);
	    })
	    .catch(function (error) {
	       console.log(error);
	    });
}


addUser = function(name, type, age, state, done){
	var query = "INSERT INTO Users" +
				 "(username, type, age, state) " + 
				 "VALUES ('"
				 	+ name + "', '"
				 	+ type + "', '" 
				 	+ age + "', '"
				 	+ state + "');";
	db.any(query)
    .then(function (data) {
    	console.log(data);
        done(true);
    })
    .catch(function (error) {
    	console.log(error);
    	done(false);
    });
}

getUser = function(name, done){
  var query = "SELECT * FROM Users " +
              "WHERE username = '"+ name +"';";

  db.any(query)
    .then(function (data) {
      console.log(data);
      if (data.length > 0)
        done(data[0], true);
      else
        done(null, false);
    })
    .catch(function (error) {
      console.log(error);
      done(null, false);
    });

}