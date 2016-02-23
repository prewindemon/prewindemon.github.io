
function GetQueryString(name){
           var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
           var r = window.location.search.substr(1).match(reg);
           if(r!=null)return  unescape(r[2]); return null;
}
var blogId = GetQueryString('blog');

angular.module('blogApp', [])
	.controller('myBlog', function($scope, $http) {
		if (blogId) {
			$http.get('data/blog.json')
			.success(function(data) {
				var curBlog;
		  		$.each(data, function(index, blog){
		  			if (blogId == blog.id) {
		  				curBlog = blog;
		  			}
		  		});
		  		if (curBlog) {
		  			var fileUrl = "blogs/" + blogId + ".md"
		  			$http.get(fileUrl)
						.success(function(data) {
				  			$scope.blog = {
				  				"title": curBlog.title,
				  				"remark": curBlog.remark,
				  				"date": curBlog.date,
				  				'content': marked(data)
				  			};
				  	});
		  		}
		  	});
			
		}
    }).filter('trustHtml', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        };
	});