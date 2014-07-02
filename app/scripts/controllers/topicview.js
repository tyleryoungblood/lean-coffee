'use strict';

app.controller('TopicViewCtrl', function ($scope, $routeParams, Topic) {

	$scope.topic = Topic.find($routeParams.topicId);

	$scope.addComment = function () {
		Topic.addComment($routeParams.topicId, $scope.comment);
		$scope.comment = '';
	};

	$scope.removeComment = function (comment, commentId) {
		Topic.deleteComment($scope.topic, comment, commentId);
	};

	$scope.upVoteTopic = function (upVoted) {
	  if (upVoted) {
	    Topic.clearVote($routeParams.topicId, true);
	  } else {
	    Topic.upVote($routeParams.topicId);
	  }
	};
	 
	$scope.downVoteTopic = function (downVoted) {
	  if (downVoted) {
	    Topic.clearVote($routeParams.topicId, false);
	  } else {
	    Topic.downVote($routeParams.topicId);
	  }
	};
	 
	$scope.upVoted = function () {
	  return Topic.upVoted($scope.topic);
	};
	 
	$scope.downVoted = function () {
	  return Topic.downVoted($scope.topic);
	};

});