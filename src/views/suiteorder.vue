<template>
	<div class="container container1">
		<header class="bar bar-nav title-bar title-bar1">
		  <a class="iconfont icon-home-hollow pull-right" v-go-history></a>
		  <h1 class="title">我的订单</h1>
		</header>
		<div class="content infinite-scroll bg">
			<div class="buttons-tab details-tab details-tab1">
				<a href="javascript:void(0)" class="tab-link button active"><span>待服务</span></a>
				<a href="javascript:void(0)" class="tab-link button">已完成</a>
				<a href="javascript:void(0)" class="tab-link button">全部订单</a>
			</div>
			<!--订单详情-->
			<div class="order-inf order-inf1 order-inf3"  v-for="item in dataList" track-by="$index">
				<h3 class="o-title o-title2">
					<span class="item-t">订单确认</span>
					<span class="item-a">2012-12-12 10:80</a></span>
				</h3>
				<h3 class="order-inf-t" v-link="{ name: 'myorderdetails', query: { orderId: '1'}}">
					<div><img src="http://www.renrenbuy.com/yungou/images/img_weixin.jpg"><span>去问问</span></div>
		  			<a class="icon icon-right"></a>
				</h3>
				<div class="user-center-item">
					<div class="item-title">商家地址</div>
					<div class="item-after">3301029192847573</div>
				</div>
				<div class="total-item">
					<div class="item-title">订单合计:</div>
					<div class="item-after">合计:<span class="total">
							{{30000 | price}}</span></div>
				</div>
<!-- 				<div class="total-item">
					<span></span>
					<a href="javascript:void(0)" class="btn2">联系客服</a>
					<a href="javascript:void(0)" class="btn2 btn22">联系客服</a>

				</div> -->
				<div class="total-item">

					<p class="clr3"><i class="iconfont icon-tanhao ver"></i>退款成功</p>
					<a href="javascript:void(0)" class="btn2">商家位置</a>
				</div>
			</div>
			<!--end 订单详情-->

			<!--end 订单-->
			<!--商品详情-->
			<div v-show="!loading">
				<uiload></uiload>
			</div>
		</div>	
		<uigoback target-scroll="infinite-scroll"></uigoback>
	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
		var t = this;
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