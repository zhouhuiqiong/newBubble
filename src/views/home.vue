<template>
  <div class="container">
	<div class="content list infinite-scroll home-content">
		<nav class="bar bar-nav bar-nav-static">
			<h1 class="title">
				<span class="open-about" @click="showAdr">地址</span>
				<a v-link="{name:'seach'}"><input type="search" id='search' placeholder='输入商家,服务名称'/></a>
				<a v-link="{name:'news'}">消息</a>
			</h1>
		</nav>
		<uiswiper></uiswiper>
		<div class="seach-select-list" >搜索区域</div>
		<div class="list-block infinite-list  media-list">
			<ul>
				<li v-for="item in dataList" track-by="$index">
					<a href="#" class="item-content">
						<div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" style='width: 4rem;'></div>
						<div class="item-inner">
							<div class="item-title-row">
								<div class="item-title">标题</div>
								<div class="item-after">$15</div>
							</div>
							<div class="item-title-row">
								<span>一級棒</span>
								<span>一級棒</span>
							</div>
							<div class="item-title-row">
								<span>一級棒</span>
								<span>一級棒</span>
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
		<!-- address Popup -->
		<div class="popup popup-about">
			<div class="content-block">
				<header class="bar bar-nav">
					<a href="javascript:void(0)" class="close-popup">关闭</a>
				  	<div class="searchbar">
					    <div class="search-input">
					      <label class="icon icon-search" for="search"></label>
					      <input type="search" id='search' placeholder='输入关键字...'/>
					    </div>
					</div>
				</header>
			</div>
		</div>
		<!--address-->
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
		var that = this;
	    that.fixedbox();
	    //加载数据
		var dataObj = new util.scrollList();
		dataObj.init(this,{
			le: '.media-list',//承载列表的数据
			scrollObj: '.content'
		});
		dataObj.getListData();
	},
	data:function(){
		return {
			msg:'aboutMessage',
			title:'home',
			dataList: [],
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
		showAdr: function(){
			$.popup('.popup-about');
		},
		fixedbox: function(){
			util.fixedbox();
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