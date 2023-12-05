// mock data
let staff = [
    {
        "id": 1,
        "name": "Keong",
        "branch": "Katong",
        "gender": "M",
        "services": "Foot Massage, Head and Shoulders, Back Massage"
    },
    {
        "id": 2,
        "name": "Leon",
        "branch": "Siglap",
        "gender": "M",
        "services": "Foot Massage, Body Massage"
    },
    {
        "id": 3,
        "name": "Xiaofang",
        "branch": "Upper Changi",
        "gender": "F",
        "services": "Foot Massage, Head and Shoulders, Back Massage, Body Massage"
    },
    {
        "id": 4,
        "name": "Brandon",
        "branch": "East Coast",
        "gender": "M",
        "services": "Foot Massage, Back Massage"
    }
]

const express = require('express'); // routing
const hbs = require('hbs'); // templating
const wax = require('wax-on'); // extending templates
const helpers = require('handlebars-helpers')({ handlebars: hbs.handlebars}); // interating through arrays in templates and other fancy stuff
const app = express();

// set up default render engine
app.set('view engine', 'hbs');

// set up path for statics files like style.css
app.use(express.static('public'))

// set up wax-on for hbs extensions, so common elements can be reused
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");


//use extended = true for fancier form encoding
app.use(express.urlencoded({ "extended": true }))


// Set up routes
app.get("/", function (req, res) { res.render("index", {"staff": staff}) })
app.get("/newstaff", function (req, res) { res.render("newstaff") })
app.get("/editstaff", function (req, res) { res.render("editstaff") })
app.get("/deletestaff", function (req, res) { res.render("deletestaff") })

// start server
app.listen(3000, () => console.log("Server started..."))