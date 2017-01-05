<template>
	<div class="container container1">
		<header class="bar bar-nav title-bar title-bar1 title-bar2">

		  <a class="iconfont icon-mingpianxuanzhong01 pull-right"></a>
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>

		  <h1 class="title">个人中心</h1>
		</header>
		<div class="content  home-content">
			<div class="user-inf-wap">
				<div class="image-text">
					<img :src="$root.baseImgSrc + '/' + info.logo">
					<p class="user-name">
						<a href="javascript:void(0);">{{info.name}}
					<span class="iconfont icon-yxj-auth clr3"></span></a></p>
					<div class="suite-inf">
						<p>联系电话：{{info.mobile}}</p>
						<p>联系邮箱：{{info.emial}}</p>
					</div>
				</div>

			</div>
			<!--订单信息-->
			<div class="order-num">
				<div>
					<p>今日完成订单</p>
					<h3>20</h3>
				</div>
				<div>
					<p>本周完成订单</p>
					<h3>100</h3>
				</div>
				<div>
					<p>本月完成订单</p>
					<h3>300</h3>
				</div>
			</div>
		</div>	
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		that.suiteUserId = that.cookie.get('suiteUserId');
		that.getSuiteInfo();
		
	},
	data:function(){
		return {
			info: {}
		}
	},
	methods: {
		getSuiteInfo: function(){
			var that = this;
			that.getServerData({
				url: 'entourage/info',
				data: {
					id: that.suiteUserId
				},
				success: function(result){
					that.info = result.content;
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