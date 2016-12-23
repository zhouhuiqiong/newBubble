<template>
	<div class="container container1">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-icon1 pull-left" v-go-history></a>
		  <h1 class="title">我的订单</h1>
		</header>
		<div class="content infinite-scroll bg">
			<!--订单详情-->
			<div class="order-inf order-inf1 order-inf3"  v-for="item in orderInfo" track-by="$index" v-link="{ name: 'myorderdetails', query: { orderId: item.orderInfo}}">
				<h3 class="o-title active">
					<span class="item-t clr4">订单已关闭</span>
					<span class="item-a">2012-12-12 10:80 <a class="iconfont icon-lajitong order-del-ic" @click="delItem($event)"></a></span>
				</h3>
				<h3 class="order-inf-t" v-link="{ name: 'details', query: { orderId: '1'}}">
					<div><img src="http://www.renrenbuy.com/yungou/images/img_weixin.jpg"><span>去问问</span></div>
		  			<a class="iconfont icon-iconright"></a>
				</h3>
				<ul  class="list-block">
					<li class="item-content" >
						<div class="item-inner">
							<div class="item-title">项目套餐</div>
							<div class="item-after">								{{50000 | price}}</div>
						</div>
					</li>
					<li class="item-content" >
						<div class="item-inner">
							<div class="item-title">项目套餐</div>
							<div class="item-after">								{{50000 | price}}</div>
						</div>
					</li>
					<li class="item-content" >
						<div class="item-inner">
							<div class="item-title">项目套餐</div>
							<div class="item-after">								{{50000 | price}}</div>
						</div>
					</li>
				</ul>
				<div class="total-item">
					<div class="item-title">订单金额</div>
					<div class="item-after">合计:<span class="total">
							{{30000 | price}}日元</span></div>
				</div>
<!-- 				<div class="total-item">
					<span></span>
					<a href="javascript:void(0)" class="btn2">联系客服</a>
					<a href="javascript:void(0)" class="btn2 btn22">联系客服</a>

				</div> -->
				<div class="total-item">

					<p class="clr3"><i class="iconfont icon-tanhao ver1"></i>退款成功</p>
					<a  class="btn2" v-link="{ name: 'chat', query: { orderId: '1'}}" >联系客服</a>
				</div>
			</div>
			<!--end 订单详情-->

			<!--end 订单-->
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
	ready: function(){
		var that = this;
		that.currentPage = 1;
	},
	data:function(){
		return {
			pageSize: 20,
			noData: false,
			currentPage: 0,
			orderInfo: []
		}
	},
	watch: {
		'currentPage': function(){
			var that = this;
			that.getOrderList();
		}
	},
	methods: {
		getOrderList: function(){
			var that = this;
			that.getServerData({
				url: 'user/order_list',
				data: {
					token: that.$root.userId,
					pageNo: that.currentPage,
					pageSize: that.pageSize
				},
				success: function(result){
					that.orderInfo = that.orderInfo.concat(result.content);
					if(result.content.length < that.pageSize) that.noData = true;
        			that.loading = true;
				}
			});
		},
		delItem: function(e){//删除数据
			$(e.target).parents('.order-inf').remove();
			$.toast('订单删除成功');
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