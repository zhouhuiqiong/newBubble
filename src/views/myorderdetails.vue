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
						<a v-link="{ name: 'orderdetails', query: { productId: orderInfo.ocOrder.scProductId}}" class="item-content ">
							<div class="item-media"><img :src="$root.baseImgSrc + '/' + orderInfo.productPic"></div>
							<div class="item-inner sale-txt shop-txt">
								<div class="item-title-row">
									<div class="item-title">{{orderInfo.ocOrder.scProductName}}</div>
								</div>
								<div class="shop-sub-t">
									<span>{{orderInfo.ocOrder.scShopName}}</span>
									<span class="icon icon-right"></span>
								</div>
								<div class="shop-yu-time">预约时间：{{orderInfo.ocOrder.gmtAppointment | time}}</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<!--订单信息-->
			<div class="order-inf">
				<h3 class="o-title o-title1">
					<span class="item-t">订单信息</span>
					<span class="item-a clr1">{{orderInfo.ocOrder.status | statusAry}}</span>
				</h3>
				<div class="user-center-item">
					<div class="item-title">订单编号</div>
					<div class="item-after">{{orderInfo.ocOrder.code}}</div>
				</div>
				<div class="user-center-item">
					<div class="item-title">商家名称</div>
					<div class="item-after">{{orderInfo.ocOrder.scShopName}}</div>
				</div>
				<div class="user-center-item user-center-item2">
					<div class="item-title">商家地址</div>
					<div class="item-after"></div>
				</div>
				<div class="user-center-item user-center-item2">
					<div class="item-title">服务名称</div>
					<div class="item-after"><a href="tel:{{orderInfo.scShopTelphone}}" class="btn2 btn22">联系客服</a> {{orderInfo.ocOrder.scProductName}}</div>
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
							<div class="item-title">{{orderInfo.ocOrder.scProductName}}</div>
							<div class="item-after">{{orderInfo.ocOrder.scProductPrice | price}}日元</div>
						</div>
					</li>
					<li class="item-content" v-for="item in orderInfo.orderAppendList">
						<div class="item-inner">
							<div class="item-title">{{item.scAppendName}}</div>
							<div class="item-after" v-if="item.scAppendPrice > 0">{{item.scAppendPrice | price}}</div>
							<div class="item-after" v-else>赠送</div>
						</div>
					</li>
				</ul>
				<div class="total-item">
					<div class="item-title"></div>
					<div class="item-after">合计:<span class="total">
					{{orderInfo.ocOrder.priceTotal | price}}日元</span></div>
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
			orderInfo: {
				ocOrder: {},
				orderAppendList: []
			}
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