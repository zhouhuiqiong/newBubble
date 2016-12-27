<template>
	<div class="container ">
		<div class="content bg home-content">
			<div class="user-inf-wap">
				<span class="iconfont icon-1 user-inf-news" v-link="{name:'news'}"></span>
				<div class="image-text">
					<img v-if="userId" :src="userInfo.pic">
					<img v-else="userId" src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2995040420,4087761391&fm=96">
					<p v-if="userId" class="user-name"><a v-link="{name:'editlist'}">{{userInfo.userName}}<span class="iconfont icon-iconright ml"></span>
	</a ></p>
					<p v-else class="user-name"><a v-link="{name:'login'}">点击登录<span class="iconfont icon-iconright ml"></span>
	</a ></p>
				</div>
			</div>
			<div class="user-nav-list" >
				<a class="yu-time" v-if="userId" v-link="{name:'myorder'}">
					<div class="item-title"><i class="iconfont icon-cf-c78 mr"></i>我的订单</div>
					<div class="item-after"><span class="iconfont icon-iconright "></span></div>
				</a>
				<a class="yu-time" v-else v-link="{name:'login'}">
					<div class="item-title" v-link="{name: 'myorder'}"><i class="iconfont icon-cf-c78 mr"></i>我的订单</div>
					<div class="item-after"><span class="iconfont icon-iconright "></span></div>
				</a>
				<!--订单信息-->
				<div class="order-inf order-inf1 order-inf3" v-if="userId && lastOrderInfo.length > 0" v-link="{ name: 'myorderdetails', query: { orderId: lastOrderInfo.id}}">
					<h3 class="o-title active">
						<span class="item-t">{{lastOrderInfo.status | statusAry}}</span>
						<span class="item-a">{{lastOrderInfo.gmtCreateTime}}</span>
					</h3>
					<h3 class="order-inf-t" v-link="{ name: 'details', query: { shopid:lastOrderInfo.scShopId}}">
					<div>
						<img src="http://www.renrenbuy.com/yungou/images/img_weixin.jpg">
						<span>{{lastOrderInfo.scShopName}}</span>
					</div>
		  			<a class="iconfont icon-iconright"></a>
					</h3>
					<ul  class="list-block">
						<li class="item-content" >
							<div class="item-inner">
								<div class="item-title">{{lastOrderInfo.scProductName}}</div>
								<div class="item-after">{{lastOrderInfo.scProductPrice | price}}日元</div>
							</div>
						</li>
						<li class="item-content" >
							<div class="item-inner">
								<div class="item-title">{{lastOrderInfo.scEntourageName}}</div>
								<div class="item-after">								{{lastOrderInfo.scEntouragePrice | price}}日元</div>
							</div>
						</li>
					</ul>
					<div class="total-item">
						<div class="item-title">订单合计:</div>
						<div class="item-after">合计:<span class="total">
								{{lastOrderInfo.priceTotal | price}}日元</span></div>
					</div>
					<div class="total-item">
						<span></span>
						<a href="tel:{{lastOrderInfo.scShopTelphone}}" class="btn2">联系客服</a>
					</div>

				</div>
				<!--订单信息-->
				<a class="yu-time" href="tel://18603921359">
					<div class="item-title"><i class="iconfont icon-icon mr"></i>联系我们</div>
					<div class="item-after"><span class="icon icon-right"></span></div>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		that.getUserInfo();
		that.getLastOrderInfo();
	},
	data:function(){
		var that = this;
		return {
			userId: that.$root.userId,
			userInfo: {},
			lastOrderInfo: {},
			userPh: 'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=3829429095,3803476155&fm=85&s=92D415CEDFE1B9725445C007000030C1'
		}
	},
	methods: {
		getUserInfo: function(){
			var that = this;
			that.getServerData({
				url: 'user/info',
				data: {
					token: that.$root.userId
				},
				success: function(result){
					that.userInfo = result.content;
				}
			});
		},
		getLastOrderInfo: function(){
			var that = this;
			that.getServerData({
				url: 'user/lastOrder',
				data: {
					token: that.$root.userId
				},
				success: function(result){
					that.lastOrderInfo = result.content;
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