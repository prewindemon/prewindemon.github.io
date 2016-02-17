

$.get('data/text.json').success(function(content){
// content就为文件data.txt的文本内容了,注意txt文件的编码需要与html文件的编码一致，最好保存成utf-8
	alert(content);
});
angular.module('phoneApp', [])
  .controller('PhoneListCtrl', function($scope) {
	    $scope.phones = [
	    {"name": "Nexus S",
	     "snippet": "Fast just got faster with Nexus S."},
	    {"name": "Motorola XOOM™ with Wi-Fi",
	     "snippet": "The Next, Next Generation tablet."},
	    {"name": "MOTOROLA XOOM™",
	     "snippet": "The Next, Next Generation tablet."}
	  	];
	});