<template>
  <div class="container">
    <nav class="bar bar-nav">
      <h1 class="title">滚动加载更多</h1>
    </nav>
    <div class="content list" v-infinite-scroll="loadMore">
      <div class="list-block infinite-list">
        <ul>
          <li class="item-content" v-for="item in items" track-by="$index">
            <div class="item-media"><i class="icon icon-dianji"></i></div>
            <div class="item-inner">
              <div class="item-title">商品名称</div>
              <div class="item-after">{{item.name}}</div>
            </div>
          </li>
        </ul>
        <!-- 加载提示符 -->
	      <div class="infinite-scroll-preloader" v-if="!loading">
	          <div class="preloader"></div>
	      </div>
      </div>
     
    </div>
  </div>
</template>
<script>
module.exports = {
	//每次切换路由，在渲染出页面前都会执行
	route: {

	},
	ready: function(){
		
		for (var  i = 0; i < 15; i++) {
	      this.items.push({
	        id: i,
	        name: 'demo' +  i
	      })
	    };
		// $('.content').on('scroll', function() {
		//   var  el = $(this);
	 //      var height = parseFloat(el.height());
	 //      var scrollTop = parseFloat(el.scrollTop());
	 //      var totalHeight = height + scrollTop;
	 //      that.loading = false;
	 //      if (el[0].scrollHeight - totalHeight <= 3) {
	 //      		setTimeout(function() {
		//       		if (that.loading) return;
		//         	that.loading = true;
		//         	for (var  i = 0; i < 15; i++) {
		// 		      that.items.push({
		// 		        id: i,
		// 		        name: 'demo' +  i+length
		// 		      })
		// 		    };
		// 		    var scrollTop = scroller[0].scrollHeight - scroller.height() - 20;
  //       			scroller.scrollTop(scrollTop)
		// 		}, 1000);
	 //       };
	 //    })
	},
	data:function(){
		return {
			msg:'aboutMessage',
			title:'home',
			items: [],
			loading: false
		}
	},
	computed: {
	    length: function(){
	      return this.items.length
	    }
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	},
	methods: {
		loadMore: function(){
			var that = this;
			var scroller = $('.list');
			that.loading = false;
			setTimeout(function() {
	      		if (that.loading) return;
	        	that.loading = true;
	        	for (var  i = 0; i < 15; i++) {
			      that.items.push({
			        id: i,
			        name: 'demo' +  i+length
			      })
			    };
			    var scrollTop = scroller[0].scrollHeight - scroller.height() - 20;
				scroller.scrollTop(scrollTop)
			}, 1000);
		}
	}
};

</script>
<style type="text/css">
	.content{
		bottom: 2.5rem;
	}
	.list-block{
		margin:0px;
	}
</style>