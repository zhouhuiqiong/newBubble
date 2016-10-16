<template>
  <div class="container">
    <nav class="bar bar-nav">
      <h1 class="title">
      	<a v-link="{name:'seach'}">东京</a>
      	<a v-link="{name:'news'}">消息</a>
      </h1>
    </nav>
    <div class="content list infinite-scroll home-content" v-infinite-scroll="loadMore">
    	<uiswiper></uiswiper>
		<div class="list-block infinite-list  media-list">
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
		<!-- 加载提示符 -->
		 <div v-show="!loading">
			<uiload></uiload>
		 </div>
		</div>
		</div>
		<uigoback target-scroll="infinite-scroll"></uigoback>
	</div>
</template>
<script>
module.exports = {
	//每次切换路由，在渲染出页面前都会执行
	route: {

	},
	events: {
		'cookies': function(msg){
			console.log(msg);
		}
	},
	ready: function(){
		$.toast("操作失败");

		console.log(this.$parent.cookies);
		//this.$dispatch('isIndex', true);
		for (var  i = 0; i < 15; i++) {
	      this.items.push({
	        id: i,
	        name: 'demo' +  i
	      })
	    };
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
	},
	components:{
      uiswiper: require('../components/swiper.vue'),
      uigoback: require('../components/goback.vue'),
      uiload: require('../components/load.vue')
    }
};
</script>
<style type="text/css">
	.list-block{
		margin:0px;
	}
</style>