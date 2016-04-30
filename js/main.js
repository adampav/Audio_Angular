var app = angular.module('myApp', []);

var apiKey = 'YOUR_KEY',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('MyController', ['$scope', function ($scope) {
    $scope.person = { name: "Ari Lerner" };
    var updateClock = function() {
        $scope.clock = new Date();
    };
    var timer = setInterval(function() {
        $scope.$apply(updateClock);
    }, 1000);
    updateClock();
}]);

app.controller('DemoController', ['$scope', function($scope){
    $scope.counter = 0;
    $scope.add = function (amount) { $scope.counter += amount; };
    $scope.subtract = function (amount) { $scope.counter -= amount ;};
}]);

app.controller('PlayerController',['$scope', '$http', function($scope, $http) {
    $scope.playing = false;
    $scope.audio = document.createElement('audio');
    $scope.audio.src = 'media/npr.mp4';
    $scope.play = function () {
        $scope.audio.play();
        $scope.playing = true;
    };

    $scope.stop = function () {
        $scope.audio.pause();
        $scope.playing = false;
    };

    $scope.audio.addEventListener('ended', function () {
        $scope.$apply(function () {
            $scope.stop()
        })
    });

    $http({
        method: 'JSONP',
        url: nprUrl + '&apiKey=' + '&callback=JSON_CALLBACK'
    }).success(function (data, status) {
        $scope.programs = data.list.story;
    }).error(function (data, status) {

    });
}]);

app.controller('RelatedController',['$scope', function($scope){


}]);
