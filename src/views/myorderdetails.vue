<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">订单详情</h1>
		</header>
		<div class="content list infinite-scroll  bg" >
			<div class="list-block media-list">
				<ul>
					<li class="itme-style min-itme-style">
						<a v-link="{ name: 'details', query: { productId: orderInfo.scProductId}}" class="item-content ">
							<div class="item-media"><img src=""></div>
							<div class="item-inner sale-txt shop-txt">
								<div class="item-title-row">
									<div class="item-title">{{orderInfo.scShopName}}</div>
								</div>
								<div class="shop-sub-t">
									<span>商家名称商家名称商家名称商家名称商家名称商家名称商家名称商家名称商家名称商家名称商家名称商家名称商家名称商家名称商家名称</span>
									<span class="icon icon-right"></span>
								</div>
								<div class="shop-yu-time">预约时间：2016-08-09 21:00</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<!--订单信息-->
			<div class="order-inf">
				<h3 class="o-title o-title1">
					<span class="item-t">订单信息</span>
					<span class="item-a clr1">{{orderInfo.status | statusAry}}</span>
				</h3>
				<div class="user-center-item">
					<div class="item-title">订单编号</div>
					<div class="item-after">{{orderInfo.code}}</div>
				</div>
				<div class="user-center-item">
					<div class="item-title">商家名称</div>
					<div class="item-after">{{orderInfo.scShopName}}</div>
				</div>
				<div class="user-center-item user-center-item2">
					<div class="item-title">商家地址</div>
					<div class="item-after">5-11-1 Ginza, Chuo-ku,银座/筑地
东京,东京都,104-0061,日本</div>
				</div>
				<div class="user-center-item user-center-item2">
					<div class="item-title">服务名称</div>
					<div class="item-after"><a href="tel:{{orderInfo.scShopTelphone}}" class="btn2 btn22">联系客服</a> {{orderInfo.scEntourageName}}</div>
				</div>
			</div>
			<!--订单金额-->
			<div class="order-inf order-inf1">
				<h3 class="o-title o-title1">
					<span class="item-t">订单金额</span>
				</h3>
				<ul class="list-block">
					<li class="item-content">
						<div class="item-inner">
							<div class="item-title">{{orderInfo.scProductName}}</div>
							<div class="item-after">{{orderInfo.scProductPrice | price}}日元</div>
						</div>
					</li>
					<li class="item-content">
						<div class="item-inner">
							<div class="item-title">{{orderInfo.scEntourageName}}</div>
							<div class="item-after">{{orderInfo.scEntouragePrice}}日元</div>
						</div>
					</li>
				</ul>
				<div class="total-item">
					<div class="item-title"></div>
					<div class="item-after">合计:<span class="total">
					{{orderInfo.priceTotal | price}}日元</span></div>
				</div>
			</div>
			<!--end 订单金额-->
		</div>
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		that.q = that.$route.query;
		that.getMyOrderDetails();
	},
	data:function(){
		return {
			orderInfo: {}
		}
	},
	methods: {
		getMyOrderDetails: function(){
			var that = this;
			that.getServerData({
				url: 'order/detail',
				data: {
					token: that.$root.userId,
					orderId: that.q.orderId
				},
				success: function(result){
					that.orderInfo = result.content;
				}
			});
		}
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	}
};
</script>