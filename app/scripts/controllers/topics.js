'use strict'; 

app.controller('TopicsCtrl', function ($scope, $location, Topic) {
	if ($location.path() === '/') {
		$scope.topics = Topic.all;
	}

	$scope.topic = {title: 'Topic Title', description: 'Description'};

	$scope.deleteTopic = function (topicId) {
		Topic.delete(topicId);
	};

	$scope.upVoteTopic = function (topicId, upVoted) {
	  if (upVoted) {
	    Topic.clearVote(topicId, upVoted);
	  } else {
	    Topic.upVote(topicId);
	  }
	};
	 
	$scope.downVoteTopic = function (topicId, downVoted) {
	  if (downVoted) {
	    Topic.clearVote(topicId, !downVoted);
	  } else {
	    Topic.downVote(topicId);
	  }
	};
	 
	$scope.upVoted = function (topic) {
	  return Topic.upVoted(topic);
	};
	 
	$scope.downVoted = function (topic) {
	  return Topic.downVoted(topic);
	};

});