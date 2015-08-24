// require the path module
var path = require("path");
// require express and create the express app
var express = require("express");
var app = express();
// require bodyParser since we need to handle post data for adding a user
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
	extended: true
}));
// require mongoose and create the mongoose variable
var mongoose = require('mongoose');
// connect to the mongodb database using mongoose -- "mongoose_dashboard"
mongoose.connect('mongodb://localhost/mongoose_dashboard');
// create a Schema called HuskySchema
var HuskySchema = new mongoose.Schema({
	no: Number,
	first_name: String,
	last_name: String,
	position: String,
	year: String,
	hometown: String
})
var Husky = mongoose.model('Husky', HuskySchema);

// validation
HuskySchema.path('no').required(true, 'No. cannot be blank');
HuskySchema.path('first_name').required(true, 'First Name cannot be blank');
HuskySchema.path('last_name').required(true, 'Last Name cannot be blank');
HuskySchema.path('position').required(true, 'Position cannot be blank');
HuskySchema.path('year').required(true, 'Year cannot be blank');
HuskySchema.path('hometown').required(true, 'Hometown cannot be blank');

// static content
app.use(express.static(path.join(__dirname, "./static")));
// set the views folder and set up ejs
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route
// Displays all of the huskies
app.get('/', function(req, res) {
 	Husky.find({}, function(err, huskies){
 		if(err){
 			console.log('something went wrong');
 		}else {
 			res.render('index', {huskies: huskies});
 		}
 	})
})
// displays a form for making a new husky
app.get('/huskies/new', function(req, res){
	res.render('new');
})
// shows a form to edit an existing husky
app.get('/huskies/:id/edit', function(req, res){
	Husky.findOne({_id: req.params.id}, function(err, husky){
		if(!husky){
			console.log('something went wrong');
		}else {
			res.render('edit', {husky: husky});
		}
	})
})
// displays information about one husky
app.get('/huskies/:id', function(req, res){
	Husky.findOne({_id: req.params.id}, function(err, husky){
		if(err){
			console.log('something went wrong');
		}else {
			res.render('info', {husky: husky});
		}
	})
})
// delete the husky from the database by ID.
app.get('/huskies/:id/destroy', function(req,res){
	Husky.remove({_id: req.params.id}, function (err, husky){
    	res.redirect('/');
	})
})
// action attribute for the form in the route (GET '/huskies/new')
app.post('/huskies', function(req, res) {
	console.log("POST DATA", req.body);
	var husky = new Husky({no: req.body.no, first_name: req.body.first_name, last_name: req.body.last_name, position: req.body.position, position: req.body.position, year: req.body.year, hometown: req.body.hometown});
	husky.save(function(err){
		if(err){
			res.render('new', {title: 'you have errors!', errors:husky.errors});
		}
		else {
			console.log('successfully added a info!');
			res.redirect('/');
		}
	})
})
// action attribute for the form in the route (get/huskies/:id/edit)
app.post('/huskies/:id', function(req, res){
    Husky.update({_id: req.params.id}, {no: req.body.no, first_name: req.body.first_name, last_name: req.body.last_name, position: req.body.position, position: req.body.position, year: req.body.year, hometown: req.body.hometown}, function (err, husky){
    		res.redirect('/');
    })
})
// listen on 8000
app.listen(8000, function() {
	console.log("listening on port 8000");
})













