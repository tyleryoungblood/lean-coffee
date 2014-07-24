'use strict'; 

app.controller('NavCtrl', function($scope, $location, Topic, Auth) {

	$scope.logout = function() {
		Auth.logout();
	};

	$scope.topics = Topic.all;

	$scope.topic = {title: '', description: ''};

	$scope.submitTopic = function () {
		Topic.create($scope.topic).then(function (topicId){
			alert('Thanks! Your topic has been created!');
  			$location.path('/#');
 			$scope.topic = {url: 'http://', title: ''};
		});
		
	};

}); 