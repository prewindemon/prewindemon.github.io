angular.module('phoneApp', [])
	.controller('PhoneListCtrl', function($scope, $http) {
		$http.get('data/text.json')
			.success(function(data) {
		  		$scope.phones = data;
		  	});
});