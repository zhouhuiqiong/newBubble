(function(){
	var vuePublic = {}
	vuePublic.install = function(Vue){
		var that = Vue.prototype;
		//远程获取数据
		that.getServerData = function(data){
			var type = data.type ? data.type : 'post';
			this.$http({
				method: type,
				url: data.url,
				data: data.data
			}).then(function(results){
				data.success(results);
			});
		};
		//滚动条加载数据
		that.scrollList = function(data){
			var t = this;
			var params = $.extend({
			},data);
			$(params.scrollObj).scrollTop(0);
			$(params.scrollObj).on('scroll', function(){
				var el = $(this);
				t.loading = false;
				if(t.currentPage > t.itemsPerPage){
					t.loading = true;
					return;
				};
				var totalHeight = parseFloat(el.height()) + parseFloat(el.scrollTop());
				if(el[0].scrollHeight == totalHeight){
					setTimeout(function(){
          				if (t.loading) return;
						var scrollTop = el[0].scrollHeight - el.height() - 20;
						t.currentPage ++;
						el.scrollTop(scrollTop);
					}, 1000);
				};
		    });
		};
	};
	module.exports = vuePublic
})();

