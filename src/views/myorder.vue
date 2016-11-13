<template>
	<div class="container container1">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-icon1 pull-left" v-go-history></a>
		  <h1 class="title">商家详情</h1>
		</header>
		<div class="content infinite-scroll bg">
			<!--商品详情-->
			<div class="list-block infinite-list  media-list myorder-list">
				<!--订单-->
				<div class="order-inf order-inf2" v-for="item in dataList" track-by="$index">
					<h3 class="o-title active">
						<span class="item-t">订单确认</span>
						<span class="item-a">2012-12-12 10:80</span>
					</h3>
					<!--订单详情-->
					<div class="itme-style">
						<a v-link="{ name: 'myorderdetails', query: { orderId: '1'}}" class="item-content item-link">
							<div class="item-media rel"><img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3646051749,3801647591&fm=80&w=179&h=119&img.JPEG">
							</div>
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title">浜松町駅ビル店</div>
								</div>
								<div class="item-subtitle">
									预约时间：2016-08-08 21:00
								</div>
								<div>
									<p>翻译陪同讲解</p>
									<p>翻译陪同讲解</p>
								</div>
							</div>
						</a>
					</div>
					<!--end 订单详情-->
					<div class="total-item1">
						<a href="javascript:void(0)" class="btn2">联系客服</a>
						<a href="javascript:void(0)" class="btn2">商家位置</a>
					</div>
				</div>
				<!--end 订单-->

			</div>

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