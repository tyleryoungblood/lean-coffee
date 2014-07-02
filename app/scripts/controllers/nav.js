'use strict'; 

app.controller('NavCtrl', function($scope, $location, Topic, Auth) {

	$scope.logout = function() {
		Auth.logout();
	};

	$scope.topics = Topic.all;

	$scope.topic = {title: 'Topic Title', description: 'Description'};

	$scope.submitTopic = function () {
		Topic.create($scope.topic).then(function (topicId){
  			$location.path('/topics/' + topicId);
 			$scope.topic = {url: 'http://', title: ''};
		});
		
	};

}); 