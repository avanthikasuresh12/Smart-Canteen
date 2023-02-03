var createError = require('http-errors');
var express = require('express');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/user');
 var superAdmin=require('./routes/superadmin');
var db =require('./config/connection')
 
 


var app = express();

 



 
db.connect((err)=>{
  if (err)
  console.log("Connection error"+err)
  else
 console.log("Database connected");
})

app.use('/', usersRouter);
app.use('/admin', adminRouter);
app.use("/superadmin",superAdmin);


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;