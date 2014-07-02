'use strict';

app.factory('User', function ($firebase, FIREBASE_URL, $rootScope) {
	var ref = new Firebase(FIREBASE_URL + 'users');

	var users = $firebase(ref);

	var User = {
		create: function (authUser, username) {
			users[username] = {
				md5_hash: authUser.md5_hash,
				username: username,
				$priority: authUser.uid


			};

			users.$save(username).then(function () {
				setCurrentUser(username);
			});

		},

		findByUsername: function (username) {
			if(username) {
				return users.$child(username);
			}
		},

			// get the current user
		getCurrent: function () {
			return $rootScope.currentUser;
		},

		// check to see if user is signed in
		signedIn: function () {
			return $rootScope.currentUser !== undefined;
		}
	};



	// stand-alone function for setting currentUser in $rootScope
	function setCurrentUser (username) {
		$rootScope.currentUser = User.findByUsername(username);
	}

	$rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
		var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));

		query.$on('loaded', function() {
			setCurrentUser(query.$getIndex()[0]);
		});
	});

	$rootScope.$on('firebaseSimpleLogin:logout', function() {
		delete $rootScope.currentUser;
	});


	return User;
});