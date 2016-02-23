angular.module('indexApp', [])
	.controller('blogListCtrl', function($scope, $http) {
		$http.get('data/blog.json')
			.success(function(data) {
		  		$scope.blogs = data;
		  	});
		$http.get('data/data.json')
			.success(function(data) {
		  		$scope.datas = data;
		  	});
    }).filter('trustHtml', function ($sce) {
        return function (input) {
        	input = input.replace('\n','<br />');
            return $sce.trustAsHtml(input);
        };
	});