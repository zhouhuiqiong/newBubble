<template>
	<div class="container">
		<header class="bar bar-nav">
		  <a class="icon icon-left pull-left" @click="gohistory"></a>
		  <h1 class="title">我的订单</h1>
		</header>
		<div class="content">
			<div class="list-block media-list">
				<!--item-->
				<div v-for="item in dataList" track-by="$index">
					<div class="item-title-row item-content1">
						<div class="item-title">标题</div>
						<div class="item-after">$15<span class="icon icon-remove"></span></div>
					</div>
					<a href="#" class="item-link item-content">
						<div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" style='width: 4rem;'></div>
						<div class="item-inner">
							<div class="item-title-row">
								<div class="item-title">标题</div>
								<div class="item-after">$15</div>
							</div>
							<div class="item-subtitle">标题</div>
							<div class="item-text">此处是文本内容...</div>
						</div>
					</a>
					<div class="item-btn-row">
						<a href="tel:18601921333"  class="button button-success">联系客服</a>
						<a href="tel:18601921333" class="button button-success">商家位置</a>
					</div>
				</div>
				<!--end item-->
				<!-- 加载提示符 -->
				<div v-show="!loading">
					<uiload></uiload>
				</div>
	        </div>
		</div>
		<uigoback target-scroll="content"></uigoback>
	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
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
			dataList: []
		}
	},
	methods: {
		gohistory: function(){
			util.goBack();
		}
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	},
	components:{
      uigoback: require('../components/goback.vue'),
      uiload: require('../components/load.vue')
    }
};

</script>