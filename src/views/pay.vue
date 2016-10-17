<template>
	<div class="container">
		<header class="bar bar-nav">
		  <a class="icon icon-left pull-left" @click="goback"></a>
		  <h1 class="title">支付订单</h1>
		</header>
		<div class="content list infinite-scroll home-content" >
			<div class="content-padded">
			  <p>商家会提前为您准备，请于预约时间准时到达商家使用服务。由于服务的特殊性，所有订单均不提供退款。</p>
			</div>
			<!--订单信息-->
			<h3>{{shopList.title}}</h3>
			<ul  class="list-block">
				<li class="item-content" v-for="(key,val) in shopList.type">
					<div class="item-inner">
						<div class="item-title">{{key}}</div>
						<div class="item-after">{{val}}</div>
					</div>
				</li>
				<li class="item-content">
					<div class="item-inner">
						<div class="item-title">订单合计:</div>
						<div class="item-after">合计:{{shopList.total}}</div>
					</div>
				</li>
			</ul>
			<!-- 付款方式-->
			<h3>付款方式</h3>
			<ul>
				<li>
					<label class="label-checkbox item-content">
						<input type="radio" name="my-radio">
						<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
						<div class="item-inner">
							<div class="item-title-row">
								<div class="item-title">石头</div>
								<div class="item-after">17:14</div>
							</div>
							<div class="item-subtitle">New messages from John Doe</div>
							<div class="item-text">Lorem ipsum dolor sit amet...</div>
						</div>
					</label>
				</li>
			</ul>
			<!---->
		</div>
		<!--预约按钮-->
		<div class="bar bar-tab">
			<a href="javascript:void(0)" class="button button-fill button-big button-dark " @click="submitPay">支付订单</a>
		</div>
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
			shopList: JSON.parse(sessionStorage.shopList)
		}
	},
	methods: {
		goback: function(){
			util.goBack();
		},
		submitPay: function(){
			
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