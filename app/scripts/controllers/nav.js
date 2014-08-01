/*jshint unused: false, undef:false*/
'use strict'; 

app.controller('NavCtrl', function($scope, $location, Topic, Auth) {

	$scope.logout = function() {
		Auth.logout();
	};

	$scope.currentPath = $location.path(); //store the URL so I can hide back link in nav.html when on home page
	console.log('$location.path(): ' + $location.path());
	console.log('$scope.currentPath: ' + $scope.currentPath);
	

	$scope.checkHome = function() {
		if(location.hash === '#/') {
			return true;
		} else {
			return false;
		}
	};

	var checkHome = false;

	console.log('before');
	console.log($scope.checkHome());
	console.log('after');

	$scope.topics = Topic.all;

	$scope.topic = {title: '', description: '', category: ''};

	$scope.submitTopic = function () {
		Topic.create($scope.topic).then(function (){
			window.alert('Thanks! Your topic has been created!');
  			$location.path('/#');
 			$scope.topic = {url: 'http://', title: ''};
		});
		
	};

}); 