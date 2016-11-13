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
			<!--订单信息-->
			<div class="order-inf">
				<h3 class="order-inf-t"><img src="http://www.renrenbuy.com/yungou/images/img_weixin.jpg">{{shopList.title}}</h3>
				<ul  class="list-block">
					<li class="item-content" v-for="(key,val) in shopList.type">
						<div class="item-inner">
							<div class="item-title">{{key}}</div>
							<div class="item-after">{{val}}</div>
						</div>
					</li>
				</ul>
				<div class="total-item">
							<div class="item-title">订单合计:</div>
							<div class="item-after">合计:<span class="total">
							{{shopList.total | price}}</span></div>
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
		<a href="javascript:void(0)" class="max-btn" @click="submitPay">确认支付</a>
	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
		var that = this;
			
	},
	data:function(){
		return {
			shopList: JSON.parse(sessionStorage.shopList),
			isChange1: true,
			isChange2: false
		}
	},
	methods: {
		
		submitPay: function(){
			
		},
		changeType: function(num){
			for(var i=1; i< 3; i++){
				this['isChange' + i] = num == i  ? true : false;
			};
		}
	},
	computed: {
		total: function(){
			var m = this.shopList,
				num = 0;
				for(var i in m.type){
					num +=m.type[i]
				}
			return num;
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