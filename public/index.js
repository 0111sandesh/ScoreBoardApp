
var app = angular.module('scoreboard', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	
	.when('/', {
	    templateUrl: 'home.html',
	    controller: 'HomeController'
  	})

  	.when('/signup', {
	    templateUrl: 'signup.html',
	    controller: 'SignupController'
  	})

  	.when('/judges', {
	    templateUrl: 'judges.html',
	    controller: 'JudgesController'
  	})

  	.when('/teams', {
	    templateUrl: 'teams.html',
	    controller: 'TeamsController'
  	})

  	.when('/scoreboard1', {
	    templateUrl: 'scoreboard1.html',
	    controller: 'Scoreboard1Controller'
  	})
});

app.run(function($rootScope, $cookies) {
	if($cookies.get('token') && $cookies.get('currentUser')){
		$rootScope.token = $cookies.get('token');
		$rootScope.currentUser = $cookies.get('currentUser');
	}
});

app.controller('HomeController', function($rootScope, $scope, $http, $cookies) {

	$scope.submitNewMeow = function(){
		$http.post('/meows', 
			{newMeow: $scope.newMeow},
			{headers: {
				'authorization': $rootScope.token
			}}).then(function(){
			getMeows();
			$scope.newMeow ='';
		});
	};

	$scope.removeMeow = function(meow){
		$http.put('/meows/remove', 
			{meow: meow},
			{headers: {
				'authorization': $rootScope.token
			}}).then(function(){
			getMeows();
		});
	};

	$scope.signin = function(){
		$http.put('/users/signin', {username: $scope.username, password: $scope.password})
			.then(function (res){
				//console.log(res.data.token);
				$cookies.put('token', res.data.token);
				$cookies.put('currentUser', $scope.username);

				$rootScope.token = res.data.token;
				$rootScope.currentUser = $scope.username;
				//alert('successfully signed in');
			}, function(err){
				alert('bad login credentials');
			});
	};

	$scope.logout = function(){
		$cookies.remove('token');
		$cookies.remove('currentUser');

		$rootScope.token = null;
		$rootScope.currentUser = null;
	};

	function getMeows(){
		$http.get('/meows').then(function(response){
			$scope.meows = response.data;
		});
	}

	getMeows();
	
});

app.controller('SignupController', function($scope, $http) {
	$scope.submitSignup = function(){
		var newUser = {
			username: $scope.username,
			password: $scope.password
		};

		$http.post('/users', newUser).then(function(){
			alert('success');
		});
	}
});

app.controller('JudgesController', function($rootScope, $scope, $http, $cookies) {
	$scope.addJudge = function(){
		var newJudge = {
			criteria: $scope.criteria,
			name: $scope.name,
			email: $scope.email
		};

		console.log(newJudge);

		$http.post('/judges/add', newJudge).then(function(){
			getJudges();
		});

		console.log("calling jira");
		var server = 'https://hackathon.atlassian.net/rest/api/2/issue/HAC-12';
	  var user = 'admin';
	  var pass = 'Osamawho';
		$http({
		  method: 'GET',
		  url: server,
		  headers:{
		  	Authorization: 'Basic ' + btoa(user + ":" + pass)
		  }
		}).then(function successCallback() {
			console.log(response);
		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback() {
		  	console.log(response);
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });

	};

	function getJudges(){
		$http.get('/judges/get').then(function(response){
			$scope.judges = response.data;
		});
	}

	getJudges();
});

app.controller('TeamsController', function($rootScope, $scope, $http, $cookies) {
	$scope.addMember = function(){
		var newMember = {
			team: $scope.teamName, member: {
					name: $scope.memberName,
					email: $scope.memberEmail
				}
		};

		console.log(newMember);

		$http.post('/teams/addMember', newMember).then(function(){
			getTeams();
		});
	};

	$scope.addTeam = function(){
		var newTeam = {
			team: $scope.team, members: []
		};

		// console.log(newTeam);

		$http.post('/teams/addTeam', newTeam).then(function(){
			getTeams();
		});
	};

	function getTeams(){
		$http.get('/teams/getTeams').then(function(response){
			$scope.teams = response.data;
		});
	}



	getTeams();

});

app.controller('Scoreboard1Controller', function($rootScope, $scope, $http, $cookies) {
		// local functions
	function updateScore(scoreObj){

		console.log(scoreObj);

		$http.post('/scoreboard1/update', scoreObj).then(function(){
			//getTeams(); may not be necessary
		});
	}

	$scope.changeVal = function(index, row, col, team, criteria) {
		console.log(index+' '+row+' '+col);
		var btnId = "scoreVal"+index+row+col;
		var scoreId = "score"+index+row+col;
		var commentId = "comment"+index+row+col;
		//console.log(btnId + ' ' + scoreId + ' ' + commentId);
	    document.getElementById(btnId).innerHTML = document.getElementById(scoreId).value;
	    document.getElementById(btnId).title = document.getElementById(commentId).value;

	    //calculate and update total score
	    var i = 0;
	    var sum = 0;
	    for (i = 1; i <= 4; i++) {
	    	var idx = "scoreVal"+index+row+i;
	    	//console.log(idx); 
	    	//console.log(document.getElementById(idx).innerHTML);
    		sum += parseInt(document.getElementById(idx).innerHTML);
		}
		document.getElementById("scoreVal"+index+row+5).innerHTML = sum;

		//update scores in the database
		console.log(team);
		console.log(criteria);
		var rx = document.getElementById(btnId).innerHTML;
		console.log(rx);

		var cx = document.getElementById(btnId).title;
		console.log(cx);
		// var scoreObj = {};
		// scoreObj['r'+col] = rx;
		// scoreObj['c'+col] = cx;
		//console.log(scoreObj);
		var newData = {
			team: team, criteria: criteria, r:rx, c:cx, idx:col
		}
		console.log(newData);

		updateScore(newData);
	};

	function getScore1(){
		$http.get('/scoreboard1/getScore').then(function(response){
			$scope.scoreBoard1 = response.data;
			console.log("printing scoreboard1 data");
			console.log(response.data);
		});
	}

	getScore1();
});




