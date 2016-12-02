<template>
	<div class="container container1">
		<header class="bar bar-nav title-bar title-bar1">
		  <a class="iconfont icon-gerenzhongxin pull-right" v-link="{name: 'suitepersonal'}"></a>
		 
		  <h1 class="title">我的订单</h1>
		</header>
		<div class="content infinite-scroll bg home-content">
			<div class="buttons-tab details-tab details-tab1">
				<a href="#" class="tab-link button active" type="1"><span>待服务</span></a>
				<a href="#" class="tab-link button" type="2"><span>已完成</span></a>
				<a href="#" class="tab-link button" type="3"><span>全部订单</span></a>
			</div>
			<!--订单详情v-for="item in dataList" track-by="$index"-->
			<div class="order-inf order-inf1 order-inf3" v-show="type1">
				<!--待服务订单-->
				<h3 class="o-title o-title2">
					<span class="item-t">订单确认</span>
					<span class="item-a">2012-12-12 10:80</a></span>
				</h3>
				<h3 class="order-inf-t" v-link="{ name: 'myorderdetails', query: { orderId: '1'}}">
					<div><img src="http://www.renrenbuy.com/yungou/images/img_weixin.jpg"><span>去问问</span></div>

				</h3>
				<div class="user-center-item user-center-item2 user-center-item4">
					<div class="item-title">商家地址</div>
					<div class="item-after" >
						<div>5-11-1 Ginza, Chuo-ku,银座/筑地
						东京,东京都,104-0061,日本
						</div>
						<a class="iconfont icon-iconright"></a>
					</div>
				</div>
				<div class="user-center-item user-center-item2">
					<div class="item-title">客户名称</div>
					<div class="item-after">
						苦艾又去大保健啦
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
			<div class="order-inf order-inf1 order-inf3" v-show="type2">
				<h3 class="o-title o-title1">
					<span class="item-t">订单已完成</span>
					<span class="item-a clr4">2012-12-12 10:80</a></span>
				</h3>
				<h3 class="order-inf-t" v-link="{ name: 'myorderdetails', query: { orderId: '1'}}">
					<div><img src="http://www.renrenbuy.com/yungou/images/img_weixin.jpg"><span>去问问</span></div>

				</h3>
				<div class="user-center-item user-center-item2 user-center-item4">
					<div class="item-title">商家地址</div>
					<div class="item-after" >
						<div>5-11-1 Ginza, Chuo-ku,银座/筑地
						东京,东京都,104-0061,日本
						</div>
						<a class="iconfont icon-iconright"></a>
					</div>
				</div>
				<div class="user-center-item user-center-item2">
					<div class="item-title">客户名称</div>
					<div class="item-after">
						苦艾又去大保健啦
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
			<!-- <div v-show="!loading">
				<uiload></uiload>
			</div> -->
		</div>	
		<!-- <uigoback target-scroll="infinite-scroll"></uigoback> -->
	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
		var t = this;
			//加载数据
			// var dataObj = new util.scrollList();
			// dataObj.init(this,{
			// 	le: '.media-list',//承载列表的数据
			// 	scrollObj: '.content'
			// });
			// dataObj.getListData();

			//点击
			$('.details-tab1>a').on('click', function(){
				switch(parseInt($(this).attr('type'))){
					case 1: t.type1 = true, t.type2 = false; break;
					case 2: t.type1 = false, t.type2 = true; break;
					case 3: t.type1 = true, t.type2 = true; break;
				}
				$(this).addClass('active').siblings('a').removeClass('active');
			});
		
	},
	data:function(){
		return {
			dataList: [],
			type1: true,
			type2: false
			
		}
	},
	methods: {
		suiteChangeType: function(item, type){
			var t = this;
			for(var i=1; i<4; i++){
				this['isActive' +i] = (i == item) ? true : false;
			};
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