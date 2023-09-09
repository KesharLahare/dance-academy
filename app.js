const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;

// Define mongoose shema
var contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));// for serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');// Set the template engine as pug
app.set('views', path.join(__dirname, 'views'));// Set the vies directory

// ENDPOINTS
app.get("/", (req, res) => {
    const para = { }
    res.status(200).render('home.pug', para);
})

app.get("/contact", (req, res) => {
    const para = { }
    res.status(200).render('contact.pug', para);
})

app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your info has been saved to the database")
    }).catch(()=>{
        res.status(404).send("Item was not saved to the database")
    })

    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})