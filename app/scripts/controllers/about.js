'use strict';

/**
 * @ngdoc function
 * @name leanCoffeeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the leanCoffeeApp
 */
angular.module('leanCoffeeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
