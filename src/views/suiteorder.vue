<template>
	<div class="container container1">
		<header class="bar bar-nav title-bar title-bar1">
		  <a class="iconfont icon-home-hollow pull-right"></a>
		  <h1 class="title">我的订单</h1>
		</header>
		<div class="content infinite-scroll bg home-content">
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

				</h3>
				<div class="user-center-item3">
					<div class="item-title">商家地址</div>
					<div class="txt-style">
						<div class="sub-txt">#5-11-1 Ginza, Chuo-ku,银座/筑地
						东京,东京都,104-0061,日本</div>
						<a class="icon icon-right"></a>
					</div>
				</div>
				<div class="user-center-item3">
					<div class="item-title">客户名称</div>
					<div class="txt-style">
						<div class="sub-txt">#5-11-1 Ginza, Chuo-ku,银座/筑地
						东京,东京都,104-0061,日本</div>
					</div>
				</div>
				<div class="user-center-item user-center-item2">
					<div class="item-title">预约时间</div>
					<div class="item-after">
					2012-12-12 23:23:23
					</div>
				</div>
				<div class="user-center-item user-center-item2">
					<div class="item-title">订单服务</div>
					<div class="item-after">
					wqkehkwq
					</div>
				</div>
				<div class="user-center-item3">
					<div class="item-title">订单服务</div>
					<div class="tr">
						<p>订单服务11</p>
						<p>订单服务22222</p>
						<p>订单服务2222</p>
					</div>
				</div>
				<div class="total-item1">
					<a href="javascript:void(0)" class="btn2">联系客服</a>
					<a href="javascript:void(0)" class="btn2 btn23">联系客服</a>
				</div>

			</div>
			<!--end 订单详情-->
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