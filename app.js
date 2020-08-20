var express = require('express');
var app = express();
app.set("view engine", "ejs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// var campgrounds = 
app.use(express.static('public'));
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});

var campgrounds = [
    {name: "Kemah Pramuka", img: "https://img.okezone.com/content/2017/08/10/406/1753205/kocak-ulah-bule-bule-saat-kemah-bikin-geleng-geleng-kepala-8tpA68hSko.jpg"},
    {name: "Kemah Bandung", img: "https://img.okezone.com/content/2017/08/10/406/1753205/kocak-ulah-bule-bule-saat-kemah-bikin-geleng-geleng-kepala-8tpA68hSko.jpg"},
    {name: "Kemah Jepang", img: "https://img.okezone.com/content/2017/08/10/406/1753205/kocak-ulah-bule-bule-saat-kemah-bikin-geleng-geleng-kepala-8tpA68hSko.jpg"},
];


app.get("/", function(req,res){
    res.render("landing");
})
app.get("/campgrounds", function(req,res){
    res.render("campgrounds", {camps:campgrounds})
})
app.post("/campgrounds", function(req,res){
    var name= req.body.name;
    var img = req.body.img;
    var newCamps = { name: name, img:img}
    campgrounds.push(newCamps)
    res.redirect("/campgrounds")
})
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs")
})


app.listen(3000, function(){
    console.log("YelpCamp started on 3000")
})