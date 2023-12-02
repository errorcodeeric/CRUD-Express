const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');
app.use(express.urlencoded({
    extended: true // use basic forms not advanced forms
}))
// TODO: Add in the code to allow Express to access the form (see lab 6 step 1)

app.get("/", function(req,res){
  res.send('Hello World')
})

app.listen(3000,()=>console.log("Hello Wolrd"))