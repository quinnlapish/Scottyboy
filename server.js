var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [];
var waitlist = [];

app.get("/api/tables", function(req, res){
   return res.json(tables);
});

app.get("/api/waitlist", function(req, res){
    return res.json(waitlist);
 });

// after posting it returns ARRAY OF OBJECTS
// [0] index of array will be the status object
// if user is added to table, response[0].status == "table"
// else response[0].status == "wait"
// line 41
 app.post("/api/tables", function(req,res){
   var newCustomer = req.body;
   var tableOrwait;
   console.log(newCustomer);

   if(tables.length > 4){
      waitlist.push(newCustomer);
      tableOrwait = "wait";
   }
   else{
      tables.push(newCustomer);
      tableOrwait = "table";
   }

   res.json([{status: tableOrwait}, newCustomer]);
 });

 app.post("/api/clear", function(req,res){
   tables = [];
   waitlist = [];

   res.json([{status: success}]);
 });

 app.listen(PORT, function() {
   console.log("App listening on PORT " + PORT);
 });