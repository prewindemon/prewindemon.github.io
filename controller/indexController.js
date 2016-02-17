angular.module('blogApp', [])
	.controller('blogListCtrl', function($scope, $http) {
		$http.get('data/blog.json')
			.success(function(data) {
		  		$scope.blogs = data;
		  	});
    }).filter('trustHtml', function ($sce) {
        return function (input) {
        	input = input.replace('\n','<br />');
            return $sce.trustAsHtml(input);
        };
});