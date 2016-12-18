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
		that.scrollList = function(){
			var t = this;
			t.init = function(obj,data){
				t.obj = obj;
				t.data = $.extend({
					page: 1,
					size: 10,
					vessel: '',//组装数据的容器
					noData: false//false 有数据，ture 没数据
				},data);
				t.obj.item = parseInt(t.obj.item) ? t.obj.item : '';
				t.obj['dataList' + t.obj.item] =  [];
				t.initIScroll()
			};
			t.getListData = function(){//
      			t.obj['dataList' + t.obj.item].concat(ary);
      			t.data.page++;
    		};
    		t.initIScroll = function(){//滚动条动作
		      $(t.data.scrollObj).on('scroll', function(){
		          var el = $(this);
		          var h = parseFloat(el.height()),
		          scrollTop = parseFloat(el.scrollTop()),
		          totalHeight = h + scrollTop;
		          if(el[0].scrollHeight - totalHeight <= 3){
		            that.loadData();
		          };
		      });
    		};
    		t.loadData = function(){
		      var scroller = $(t.data.scrollObj);
		      t.obj.loading = false;
		      setTimeout(function() {
		          if (t.obj.loading) return;
		          t.obj.loading = true;
		          t.getListData();//远程获取数据
		          var scrollTop = scroller[0].scrollHeight - scroller.height() - 20;
		        scroller.scrollTop(scrollTop)
		      }, 1000);
		    };
			t.init();
		};
	};
	module.exports = vuePublic
})();

