<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">支付订单</h1>
		</header>
		<div class="content list infinite-scroll home-content bg" >
			<div class="bg1 content-padded-wap">
				<div class="content-padded1">
				 	<h3><i class="iconfont icon-tanhao mr"></i>由于服务的特殊性，所有订单均不提供退款。</h3>
				 	<p>商家会提前为您准备，请于预约时间准时到达商家使用服务。</p>
				</div>
			</div>
			<!--订单信息v-for="(key,val) in shopList.type"-->
			<div class="order-inf order-inf4">
				<h3 class="order-inf-t">
					<img src="http://www.renrenbuy.com/yungou/images/img_weixin.jpg">
					{{orderInf.scShopName}}
				</h3>
				<ul  class="list-block">
					<li class="item-content">
						<div class="item-inner">
							<div class="item-title">{{orderInf.scProductName}}</div>
							<div class="item-after">{{orderInf.scProductPrice}}</div>
						</div>
					</li>
					<li class="item-content" v-for="item in orderList">
						<div class="item-inner">
							<div class="item-title">{{item.scAppendName}}</div>
							<div class="item-after" v-if="item.scAppendPrice > 0">{{item.scAppendPrice}}</div>
							<div class="item-after" v-else>赠送</div>
						</div>
					</li>
				</ul>
				<div class="total-item">
					<div class="item-title">订单金额</div>
					<div class="item-after">合计:<span class="total">
					{{orderInf.priceTotal | price}}日元</span></div>
				</div>
			</div>
			<!-- 付款方式-->
			<h3 class="sub-title sub-title1">付款方式</h3>
			<div class="pay-type bg1">
				<div class="server-item server-item2" :class="{'active' : isChange1}"  @click="changeType(1)">
					<div class="server-t">
						<img src="http://www.renrenbuy.com/yungou/images/img_weixin.jpg">
						<div>
							<h3>信用支付</h3>
							<p>为您解读，帮您沟通，更多服务请点击查看</p>
						</div>
					</div>
					<div class="radio-box">
						<i class="change-icon"></i>
					</div>
				</div>
				<div class="server-item server-item2" :class="{'active' : isChange2}"  @click="changeType(2)">
					<div class="server-t">
						<img src="http://www.renrenbuy.com/yungou/images/aibei.png">
						<div>
							<h3>信用支付</h3>
							<p>为您解读，帮您沟通，更多服务请点击查看</p>
						</div>
					</div>
					<div class="radio-box">
						<i class="change-icon"></i>
					</div>
				</div>
			</div>
			<!---->
		</div>
		<!--预约按钮-->
		<button class="max-btn" @click="submitPay">确认支付</button>
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		that.q = that.$route.query;
		that.getOrderDetails();	
	},
	data: function(){
		return {
			isChange1: true,
			isChange2: false,
			orderInf: {},
			orderList: []
		}
	},
	methods: {
		submitPay: function(){
			
		},
		getOrderDetails: function(){
			var that = this;
			that.getServerData({
				url: 'order/detail',
				data: {
					orderId: that.q.orderId,
					token: that.$root.userId
				},
				success: function(result){
					that.orderInf = result.content.ocOrder;
					that.orderList = result.content.orderAppendList;
				}
			});
		},
		changeType: function(num){
			for(var i=1; i< 3; i++){
				this['isChange' + i] = num == i  ? true : false;
			};
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