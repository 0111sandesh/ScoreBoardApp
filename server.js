var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');

var app = express();

var JWT_SECRET = 'lostmykey';
var db = null;
MongoClient.connect("mongodb://localhost:27017/scoreDB", function(err, dbconn) {
  if(!err) {
    console.log("We are connected");
    db = dbconn;
  }
});

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/meows', function(req, res, next){
	db.collection('meows', function(err, meowsCollection) {
		meowsCollection.find().toArray(function(err, meows){
			return res.json(meows);
		});
	});
});

app.post('/meows', function(req, res, next){

	var token = req.headers.authorization;
	var user = jwt.decode(token, JWT_SECRET);

	db.collection('meows', function(err, meowsCollection) {
		var newMeow = {
			text: req.body.newMeow,
			user: user._id,
			username: user.username
		};
		meowsCollection.insert(newMeow, {w:1}, function(err){
			return res.send();
		});
	});
});

app.put('/meows/remove', function(req, res, next){
	var token = req.headers.authorization;
	var user = jwt.decode(token, JWT_SECRET);

	db.collection('meows', function(err, meowsCollection) {
		var meowId = req.body.meow._id;
		meowsCollection.remove({_id: ObjectId(meowId), user: user._id}, {w:1}, function(err){
			return res.send();
		});
	});
});

app.post('/users', function(req, res, next){
	db.collection('users', function(err, usersCollection) {

		bcrypt.genSalt(10, function(err, salt) {
    		bcrypt.hash(req.body.password, salt, function(err, hash) {
        		var newUser = {
					username: req.body.username,
					password: hash
				};

				usersCollection.insert(newUser, {w:1}, function(err){
					return res.send();
    			});
			});
		});
	});
});

app.put('/users/signin', function(req, res, next){
	db.collection('users', function(err, usersCollection) {
		usersCollection.findOne({username: req.body.username}, function(err, user){

			bcrypt.compare(req.body.password, user.password, function(err, result){
				if(result){
					var token = jwt.encode(user, JWT_SECRET);
					return res.json({token: token});
				}else{
					return res.status(400).send();
				}
			});
		});

		bcrypt.genSalt(10, function(err, salt) {
    		bcrypt.hash(req.body.password, salt, function(err, hash) {
        		var newUser = {
					username: req.body.username,
					password: hash
				};

				usersCollection.insert(newUser, {w:1}, function(err){
					return res.send();
    			});
			});
		});
	});
});

app.post('/judges/add', function(req, res, next){
	var newJudge = req.body;
	var judgeName = "Judge: " + newJudge.name;
	var criteria = newJudge.criteria;
	//console.log(newJudge);
	console.log(judgeName);
	//console.log(criteria);

	db.collection('judges', function(err, judges) {
		judges.insert(newJudge, {w:1}, function(err){
			console.log("m here");
			return res.send();
			
		});
	});

	//console.log("m here 2");
	db.collection('scoreCol1', function(err, scoreCol1) {
		scoreCol1.update({"teamData.criteria": criteria}, 
			{$set:{"teamData.$.judge":judgeName}}, {w:1, multi:true}, function(err){
			console.log("m here 3");
	 		return res.send();
		});
	});
});

app.get('/judges/get', function(req, res, next){
	db.collection('judges', function(err, judges) {
		judges.find().toArray(function(err, judges){
			return res.json(judges);
		});
	});
});

app.post('/teams/addMember', function(req, res, next){
	console.log(req.body);
	db.collection('teams', function(err, teams) {
		var teamName = req.body.team;
		var newMember = req.body.member;
		console.log(newMember);
		teams.update({team:teamName}, {$push:{members:newMember}}, {w:1}, function(err){
			return res.send();
		});
	});
});

app.post('/teams/addTeam', function(req, res, next){
	console.log(req.body);
	var teamObj = req.body;
	var teamName = teamObj.team;
	db.collection('teams', function(err, teams) {
		console.log(teamName);
		teams.insert(teamObj, {w:1}, function(err){
			return res.send();
		});
	});

	// add a default scoreboard1 for the new team
	var blankScore = 	{
		"team":teamName, 
		"teamData":
			[
				{"criteria": "UI/UX", 				"judge": "Judge1", "r1": 0, "c1":"Edit", "r2": 0, "c2":"Edit", "r3": 0, "c3":"Edit", "r4": 0, "c4":"Edit"},
				{"criteria": "Functionality", 		"judge": "Judge2", "r1": 0, "c1":"Edit", "r2": 0, "c2":"Edit", "r3": 0, "c3":"Edit", "r4": 0, "c4":"Edit"},
				{"criteria": "Agile Methodology", 	"judge": "Judge3", "r1": 0, "c1":"Edit", "r2": 0, "c2":"Edit", "r3": 0, "c3":"Edit", "r4": 0, "c4":"Edit"},
				{"criteria": "DevOps", 				"judge": "Judge4", "r1": 0, "c1":"Edit", "r2": 0, "c2":"Edit", "r3": 0, "c3":"Edit", "r4": 0, "c4":"Edit"},
				{"criteria": "Testing", 			"judge": "Judge5", "r1": 0, "c1":"Edit", "r2": 0, "c2":"Edit", "r3": 0, "c3":"Edit", "r4": 0, "c4":"Edit"},
				{"criteria": "Business Value", 		"judge": "Judge6", "r1": 0, "c1":"Edit", "r2": 0, "c2":"Edit", "r3": 0, "c3":"Edit", "r4": 0, "c4":"Edit"}
			]
	};

	db.collection('scoreCol1', function(err, scoreCol1) {
		scoreCol1.insert(blankScore, {w:1}, function(err){
			return res.send();
		});
	});

});

app.get('/teams/getTeams', function(req, res, next){
	db.collection('teams', function(err, teamsCol) {
		teamsCol.find().toArray(function(err, teams){
			return res.json(teams);
		});
	});
});

app.get('/scoreboard1/getScore', function(req, res, next){
	db.collection('scoreCol1', function(err, scoreCol1) {
		scoreCol1.find().toArray(function(err, scores1){
			console.log(scores1)
			return res.json(scores1);
		});
	});
});

app.post('/scoreboard1/update', function(req, res, next){
	console.log(req.body);
	db.collection('scoreCol1', function(err, scoreCol1) {
		var team = req.body.team;
		var criteria = req.body.criteria;
		var r = req.body.r;
		var c = req.body.c;
		var idx = req.body.idx;

		var updateVar = { "$set": {} };
		updateVar["$set"]["teamData.$.r"+idx] = r;
		updateVar["$set"]["teamData.$.c"+idx] = c;

		scoreCol1.update({"team":team, "teamData.criteria": criteria}, 
			updateVar, {w:1}, function(err){
		 	return res.send();
		});

	});
});



app.listen(9000, function () {
	console.log('Example app listening on port 9000!');
});
