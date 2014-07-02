'use strict';

app.controller('ProfileCtrl', 
	function ($scope, $routeParams, Topic, User) {
		$scope.user = User.findByUsername($routeParams.username);

		$scope.commentedTopics = {};

		$scope.user.$on('loaded', function () {
			populateTopics();
			populateComments();
		});

		function populateTopics () {
			$scope.topics = {};

			angular.forEach($scope.user.topics, function(topicId) {
				$scope.topics[topicId] = Topic.find(topicId);
			});
		}

		function populateComments() {
			$scope.comments = {};

			angular.forEach($scope.user.comments, function(comment) {
				var topic = Topic.find(comment.topicId);

				topic.$on('loaded', function() {
					$scope.comments[comment.id] = topic.$child('comments').$child(comment.id);
					$scope.commentedTopics[comment.topicId] = topic;
				});
			});
		}	
	});