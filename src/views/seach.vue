<template>
  <div class="container">
	<header class="bar bar-nav">
	  	<div class="searchbar">
		    <a class="searchbar-cancel" v-link="{name:'home'}">取消</a>
		    <div class="search-input">
		      <label class="iconfont icon-chaxun" for="search"></label>
		      <input type="search" id='search' placeholder='输入关键字...'/>
		    </div>
		</div>
	</header>
	<div class="content infinite-scroll seach-content" v-infinite-scroll="loadMore">
		<div class="content-block-title">曲目</div>
		<div class="list-block media-list">
			<ul>
			  <li v-for="item in items" track-by="$index">
			    <a href="#" class="item-content">
		          <div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" style='width: 4rem;'></div>
		          <div class="item-inner">
		            <div class="item-title-row">
		              <div class="item-title">标题</div>
		              <div class="item-after">$15</div>
		            </div>
		            <div class="item-title-row">
		            	<div>
		            		<span>一級棒</span>
		            		<span>一級棒</span>
		            	</div>
		            	<div>
		            		泡泡域
		            	</div>
		            </div>
		            <div class="item-title-row">
		            	<div>
		            		<span>一級棒</span>
		            		<span>一級棒</span>
		            	</div>
		            	<div>
		            		泡泡域
		            	</div>
		            </div>
		          </div>
		        </a>
			  </li>
			</ul>
			<a class="item-content item-link">
	          <div class="item-media"><i class="icon icon-f7"></i></div>
	          <div class="item-inner">
	            <div class="item-title">库存</div>
	          </div>
	        </a>
		</div>
		<div v-show="!loading">
			<uiload></uiload>
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
	},
	data:function(){
		return {
			title: '搜索',
			items: [],
			loading: false
		}
	},
	computed: {
	    
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
			var scroller = $('.infinite-scroll');
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
	},
	components:{
		uiload: require('../components/load.vue')
    }
};

</script>