// mock data
let staff = [
    {
        "id": 1,
        "name": "Keong",
        "branch": "Katong",
        "gender": "M",
        "services": ["Foot Massage", "Head and Shoulders", "Back Massage"]
    },
    {
        "id": 2,
        "name": "Leon",
        "branch": "Siglap",
        "gender": "M",
        "services": ["Foot Massage", "Body Massage"]
    },
    {
        "id": 3,
        "name": "Xiaofang",
        "branch": "Upper Changi",
        "gender": "F",
        "services": ["Foot Massage", "Head and Shoulders", "Back Massage", "Body Massage"]
    },
    {
        "id": 4,
        "name": "Brandon",
        "branch": "East Coast",
        "gender": "M",
        "services": ["Foot Massage", "Back Massage"]
    }
]

const express = require('express'); // routing
const hbs = require('hbs'); // templating
const wax = require('wax-on'); // extending templates
const helpers = require('handlebars-helpers')({ handlebars: hbs.handlebars }); // interating through arrays in templates and other fancy stuff
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


// Set up GET routes
app.get("/", function (req, res) { res.render("index", { "staff": staff }) })
app.get("/newstaff", function (req, res) { res.render("newstaff") })

app.get("/editstaff/:id", function (req, res) {
    let staffIDToEdit = req.params.id;
    let staffObj
    staff.forEach((obj, index) => {
        if (obj.id == staffIDToEdit) {
            staffObj = staff[index]
        }

    });
    console.log(staffObj)
    res.render("editstaff", { staffObj });
})

app.get("/deletestaff/:id", function (req, res) {
    let staffIDToDelete = req.params.id;
    let name
    staff.forEach((obj, index) => {
        if (obj.id == staffIDToDelete) {
            name = obj.name
        }

    });
    res.render("deletestaff", { "name": name });
})

// Set up POST routes

// Receive form input for creating staff
app.post("/newstaff", function (req, res) {

    // Construct object from returned form
    services = req.body.services;

    // remove item0 if more than one checkbox ticked. set array to empty if only item0 present
    typeof services === 'string' ? services = [] : services.shift();

    // get next staff ID
    staffID = staff[staff.length - 1].id + 1;

    formInput = {
        id: staffID,
        name: req.body.name,
        gender: req.body.gender,
        branch: req.body.location,
        services: services
    }

    staff.push(formInput)
    res.redirect("/")
})

// Process delete request
app.post("/deletestaff/:id", function (req, res) {

    let staffToDelete = req.params.id;
    let name
    staff.forEach((obj, index) => {
        if (obj.id == staffToDelete) {
            staff.splice(index, 1)
        }

    });

    res.redirect("/")
})

// Update staff info
app.post("/editstaff/:id", function (req, res) {

    // Construct object from returned form
    services = req.body.services;

    // remove item0 if more than one checkbox ticked. set array to empty if only item0 present
    typeof services === 'string' ? services = [] : services.shift();

    // get next staff ID
    staffID = staff[staff.length - 1].id + 1;

    formInput = {
        id: parseInt(req.body.id),
        name: req.body.name,
        gender: req.body.gender,
        branch: req.body.location,
        services: services
    }

    let staffToEdit = req.params.id;

    staff.forEach((obj, index) => {
        if (obj.id == staffToEdit) {
            staff[index] = formInput
        }

    });

    formInput = {
        id: req.body.id,
        name: req.body.name,
        gender: req.body.gender,
        location: req.body.location,
        services: services
    }


    res.redirect("/")
})

// start server
app.listen(3000, () => console.log("Server started..."))