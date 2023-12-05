const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

const app = express();

app.set('view engine', 'hbs');
app.use(express.urlencoded({
    extended: true // use basic forms not advanced forms
}))
// TODO: Add in the code to allow Express to access the form (see lab 6 step 1)

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')

app.get("/", function(req,res){
  res.render("index")
})

app.listen(3000,()=>console.log("Server started..."))