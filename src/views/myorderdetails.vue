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
						<a href="#" class="item-content">
							<div class="item-media"><img src=""></div>
							<div class="item-inner sale-txt">
								<div class="item-title-row">
									<div class="item-title">浜松町駅ビル店</div>
								</div>
								<div>
									商家名称商家名称商家名称商家名称商家名称
								</div>
								<div>预约时间：2016-08-09 21:00</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<!--订单信息-->
			<div class="order-inf order-inf1">
				<h3 class="o-title active">
					<span class="item-t">订单信息</span>
					<span class="item-a">订单已确认</span>
				</h3>
				<div class="user-center-item">
					<div class="item-title">头像</div>
					<div class="item-after">
					请问请问请问
					</div>
				</div>
			</div>
			<!--订单金额-->
			<div class="order-inf order-inf1">
				<h3 class="o-title active">
					<span class="item-t">订单确认</span>
					<span class="item-a">2012-12-12 10:80</span>
				</h3>
				<h3 class="order-inf-t"><img src="http://www.renrenbuy.com/yungou/images/img_weixin.jpg">去问问</h3>
				<ul class="list-block">
					<li class="item-content">
						<div class="item-inner">
							<div class="item-title">项目套餐</div>
							<div class="item-after">								¥50,000</div>
						</div>
					</li>
					<li class="item-content">
						<div class="item-inner">
							<div class="item-title">项目套餐</div>
							<div class="item-after">								¥50,000</div>
						</div>
					</li>
					<li class="item-content">
						<div class="item-inner">
							<div class="item-title">项目套餐</div>
							<div class="item-after">								¥50,000</div>
						</div>
					</li>
				</ul>
				<div class="total-item">
					<div class="item-title">订单合计:</div>
					<div class="item-after">合计:<span class="total">
					¥30,000</span></div>
				</div>
			</div>
			<!--end 订单金额-->
		</div>
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		console.log(this.$route.query);
	},
	data:function(){
		return {

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
    }
};

</script>