'use strict';

app.factory('Topic',
	function($firebase, FIREBASE_URL, User) {
		var ref = new Firebase(FIREBASE_URL + 'topics');

		var topics = $firebase(ref);

		var Topic = {
			all: topics,
			
			create: function (topic) {
				if (User.signedIn()) {
					// associate the current topic with current user
					var user = User.getCurrent();

					topic.owner = user.username;
					topic.score = 0;

					return topics.$add(topic).then(function (ref) {
						var topicId = ref.name();

						user.$child('topics').$child(topicId).$set(topicId);


						return topicId;
					});
				}	
			}, 

			find: function (topicId) {
				return topics.$child(topicId);
			},

			delete: function (topicId) {
				if (User.signedIn()) {
					var topic = Topic.find(topicId);

					topic.$on('loaded', function() {
						var user = User.findByUsername(topic.owner);

						topics.$remove(topicId).then(function() {
							user.$child('topics').$remove(topicId);
						});
					});
				}
			}, 

			addComment: function (topicId, comment) {
			  if (User.signedIn()) {
			    var user = User.getCurrent();
			 
			    comment.username = user.username;
			    comment.topicId = topicId;
			 
			    topics.$child(topicId).$child('comments').$add(comment).then(function (ref) {
			      user.$child('comments').$child(ref.name()).$set({id: ref.name(), topicId: topicId});
			    });
			  }
			},

			deleteComment: function (topic, comment, commentId) {
				if (User.signedIn()) {
					var user = User.findByUsername(comment.username);

					topic.$child('comments').$remove(commentId).then(function() {
						user.$child('comments').$remove(commentId);
					});
				}
			},

			// process user votes
			upVote: function (topicId) {
			  if (User.signedIn()) {
			    var user = User.getCurrent();
			    var topic = topics.$child(topicId);
			 
			    topic.$child('upvotes').$child(user.username).$set(user.username).then(function () {
			        user.$child('upvotes').$child(topicId).$set(topicId);
			        topic.$child('downvotes').$remove(user.username);
			        user.$child('downvotes').$remove(topicId);
			 
			        topic.$child('score').$transaction(function (score) {
			          if (!score) {
			            return 1;
			          }
			 
			          return score + 1;
			        });
			      });
			  } else {
			  	window.alert('You Must Be Signed In To Vote');
			  }
			},
			downVote: function (topicId) {
			  if (User.signedIn()) {
			    var user = User.getCurrent();
			    var topic = topics.$child(topicId);
			 
			    topic.$child('downvotes').$child(user.username).$set(user.username).then(function () {
			        user.$child('downvotes').$child(topicId).$set(topicId);
			        topic.$child('upvotes').$remove(user.username);
			        user.$child('upvotes').$remove(topicId);
			 
			        topic.$child('score').$transaction(function (score) {
			          if (score === undefined || score === null) {
			            return -1;
			          }
			 
			          return score - 1;
			        });
			      });
			  }
			},
			clearVote: function (topicId, upVoted) {
			  if (User.signedIn()) {
			    var user = User.getCurrent();
			    var username = user.username;
			    var topic = topics.$child(topicId);
			 
			    topic.$child('upvotes').$remove(username);
			    topic.$child('downvotes').$remove(username);
			    user.$child('upvotes').$remove(topicId);
			    user.$child('downvotes').$remove(topicId);
			    topic.$child('score').$transaction(function (score) {
			      if (upVoted) {
			        return score - 1;
			      } else {
			        return score + 1;
			      }
			    });
			  }
			},
			upVoted: function (topic) {
			  if (User.signedIn() && topic.upvotes) {
			    return topic.upvotes.hasOwnProperty(User.getCurrent().username);
			  }
			},
			downVoted: function (topic) {
			  if (User.signedIn() && topic.downvotes) {
			    return topic.downvotes.hasOwnProperty(User.getCurrent().username);
			  }
			}

		};

			return Topic; 
	});
