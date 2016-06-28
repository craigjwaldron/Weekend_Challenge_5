console.log("hello from scripts.js");

// Creat module
var myApp = angular.module('myApp', ['ngRoute']);

// ---------------------------------------------------------------------------------
// Configure routes
myApp.config(function($routeProvider) {
  $routeProvider

    // Route for the home page
    .when('/', {
      templateUrl : 'pages/home.html',
      controller  : 'mainController'
    })

    // Route for the add page
    .when('/add', {
      templateUrl : 'pages/add.html',
      controller  : 'addController'
    })

    // Route for the list page
    .when('/list', {
      templateUrl : 'pages/list.html',
      controller  : 'listController'
    });
});
// ---------------------------------------------------------------------------------

myApp.controller('mainController', [ '$scope', '$http', function ($scope, $http) {
  $scope.message = 'Hello, welcome to the Meet the Pets application. Please go to Add page to add your pet to the family. If you wish to view all the pets, please visit the Pets page.';
}]);

myApp.controller('addController', [ '$scope', '$http', function ($scope, $http) {

    $scope.addPet = function (){
      event.preventDefault();

    var newPet = {
      name: $scope.nameIn,
      type: $scope.typeIn,
      age: $scope.ageIn,
      image: $scope.imageIn
      };

      console.log(newPet);

    $http({
    method: 'POST',
    url:'/add',
    data: newPet
      });
      $scope.nameIn ='';
      $scope.typeIn ='';
      $scope.ageIn ='';
      $scope.imageIn='';
    };
  }]); // End of add controller

// ---------------------------------------------------------------------------------

myApp.controller('listController', [ '$scope', '$http', function ($scope, $http) {
  $scope.allPets = [];

  $scope.showAllPets = function(){
    console.log( 'in get pets' );
  $http({
  method: 'GET',
  url:'/getPets'
}).then(function( response ){
  $scope.allPets = response.data;
  console.log($scope.response);
  });
// Push??????

  };
  $scope.showAllPets();
}]);
