'use strict'; 

app.controller('TopicsCtrl', function ($scope, $location, Topic) {
	if ($location.path() === '/') {
		$scope.topics = Topic.all;
	}

	$scope.topic = {title: 'Topic Title', description: 'Description', category: 'Cagetory"'};

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
	 
	$scope.upVoted = function (topic) {
	  return Topic.upVoted(topic);
	};

	$scope.moveToDiscussing = function (topicId) {
	  Topic.moveToDiscussing(topicId);
	};

});