<template>
	<div class="container container1">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-icon1 pull-left" v-go-history></a>
		  <h1 class="title">我的订单</h1>
		</header>
		<div class="content infinite-scroll bg">
			<!--订单详情-->
			<div class="order-inf order-inf1 order-inf3"  v-for="item in orderInfo" track-by="$index" v-link="{ name: 'myorderdetails', query: { orderId: item.ocOrder.id}}">
				<h3 class="o-title active">
					<span class="item-t clr3" :class="{'clr3': item.ocOrder.status > 2}">{{item.ocOrder.status | statusAry}}</span>
					<span class="item-a">{{item.ocOrder.gmtAppointment | time}} <a class="iconfont icon-lajitong order-del-ic" @click="delItem($event,item.ocOrder.id)" v-if="item.ocOrder.status == 3"></a></span>
				</h3>
				<h3 class="order-inf-t" v-link="{ name: 'details', query: { shopid: item.ocOrder.scShopId}}">
					<div><img src="http://www.renrenbuy.com/yungou/images/img_weixin.jpg"><span>{{item.ocOrder.scShopName}}</span></div>
		  			<a class="iconfont icon-iconright"></a>
				</h3>
				<ul  class="list-block">
						<li class="item-content" >
							<div class="item-inner">
								<div class="item-title">{{item.ocOrder.scProductName}}</div>
								<div class="item-after">{{item.ocOrder.scProductPrice | price}}</div>
							</div>
						</li>
						<li class="item-content" v-for="item in item.orderAppendList">
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
							{{item.ocOrder.priceTotal | price}}日元</span></div>
				</div>
				<div class="total-item">
					<p class="clr3" v-if="item.ocOrder.status == 4"><i class="iconfont icon-tanhao ver1"></i></p>
					<a href="tel:{{item.ocOrder.scShopTelphone}}" class="btn2">联系客服</a>
					<a href="javascript:void(0)" class="btn2 btn22" v-if="item.ocOrder.status == 1|| item.ocOrder.status == 2">商家位置</a>
					<a href="javascript:void(0)" class="btn2 btn22" v-if="item.ocOrder.status == 2">联系随从</a>
					<a href="javascript:void(0)" class="btn2 btn22" v-if="item.ocOrder.status == 3" @click="orderEvaluate(item.ocOrder.id)">评价</a>
				</div>
			</div>
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
		//滚动获取数据
        that.scrollList({
            le: '.content',
            scrollObj: '.content'
        });
	},
	data:function(){
		return {
			pageSize: 10,
			noData: false,
			currentPage: 0,
			orderInfo: [],
			loading: true
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
		delItem: function(e,id){//删除数据
			var that = this;
			that.getServerData({
				url: 'order/cancle',
				data: {
					orderId: id,
					token: that.$root.userId
				},
				success: function(result){
					$(e.target).parents('.order-inf').remove();
					$.toast('订单删除成功');
				},
				error: function(result){
					$.toast(result.content);
				}
			});
		},
		orderEvaluate: function(id){//订单评论
			var that = this;
			$.confirm('<div  class="evaluate-txt"><textarea id="evaluateTxt"></textarea></div>', '订单评论', function(){
				that.sumbitEvaluate(id);
			}, function(){
				that.closeModel();
			});
		},
		sumbitEvaluate: function(id){
			var that = this;
			that.val =  $('#evaluateTxt').val();
			if(!that.string.isNull(that.val)){
				$.toast('请输入订单评价内容');
				return;
			};
			that.getServerData({
				url: 'order/evaluate_submit',
				data: {
					orderId: id,
					content: that.val
				},
				success: function(result){
					$.toast(result.content);
					that.closeModel();
				}
			})
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