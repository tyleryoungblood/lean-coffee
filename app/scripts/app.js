/* global app:true */
'use strict';

/**
 * @ngdoc overview
 * @name leanCoffeeApp
 * @description
 * # leanCoffeeApp
 *
 * Main module of the application.
 * ASSIGN app VAR TO angular.module('leanCoffeeApp') SO WE CAN USE app.controller() SHORTHAND
 */
var app = angular.module('leanCoffeeApp', [ 
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch', 
    'firebase'
  ]);

app.constant('FIREBASE_URL', 'https://blazing-fire-8085.firebaseio.com/');

app.config(function ($routeProvider) {
    $routeProvider
    
      .when('/', {
        templateUrl: 'views/topics.html',
        controller: 'TopicsCtrl'
      })

      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })

      .when('/instructions', {
        templateUrl: 'views/instructions.html',
        controller: ''
      })

      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })

      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
      })

      .when('/topics/:topicId', {
        templateUrl: 'views/showtopic.html',
        controller: 'TopicViewCtrl'
      })

      .when('/users/:username', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  });
