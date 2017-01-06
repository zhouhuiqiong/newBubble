<template>
	<div class="container container1">
		<header class="bar bar-nav title-bar title-bar1">
		  <a class="iconfont icon-gerenzhongxin pull-right" v-link="{name: 'suitepersonal'}"></a>
		  <h1 class="title">我的订单</h1>
		</header>
		<div class="content infinite-scroll bg home-content">
			<div class="buttons-tab details-tab details-tab1">
				<a href="#" class="tab-link button active" type="2"><span>待服务</span></a>
				<a href="#" class="tab-link button" type="3"><span>已完成</span></a>
				<a href="#" class="tab-link button" type=""><span>全部订单</span></a>
			</div>
			<div class="infinite-order-list">
				<!--订单详情v-for="item in dataList" track-by="$index"-->
				<div class="order-inf order-inf1 order-inf3" v-for="item in dataList">
					<!--待服务订单-->
					<h3 class="o-title" :class="{'o-title2': {{item.status == 1}}, 'o-title1': {{item.status == 3}} }">
						<span class="item-t">{{item.status | statusAry}}</span>
						<span class="item-a">{{item.gmtCreateTime}}</a></span>
					</h3>
					<h3 class="order-inf-t">
						<div>
							<img src="http://www.renrenbuy.com/yungou/images/img_weixin.jpg">
							<span>{{item.scShopName}}</span>
						</div>
					</h3>
					<div class="user-center-item user-center-item2 user-center-item4">
						<div class="item-title">商家地址</div>
						<div class="item-after" >
							<div></div>
							<a class="iconfont icon-iconright"></a>
						</div>
					</div>
					<div class="user-center-item user-center-item2">
						<div class="item-title">客户名称</div>
						<div class="item-after">
							{{item.ucUserRealName}}
						</div>
					</div>
					<div class="user-center-item user-center-item2">
						<div class="item-title">预约时间</div>
						<div class="item-after">
							{{item.gmtAppointment}}
						</div>
					</div>
					<div class="user-center-item user-center-item2">
						<div class="item-title">随从规格</div>
						<div class="item-after">
							{{item.scEntourageName}}
						</div>
					</div>
					<div class="user-center-item3">
						<div class="item-title">订单服务</div>
						<div class="tr">
							<p>{{item.scProductName}}</p>
						</div>
					</div>
					<div class="total-item1">
						<a href="" class="btn2">联系客服</a>
						<a href="tel:{{item.scShopTelphone}}" class="btn2 btn23">联系客户</a>
					</div>
				</div>
				<!--end 订单详情-->
				<!--商品详情-->
				<div v-show="!loading">
					<uiload></uiload>
				</div>
			</div>
		</div>	
		<uigoback target-scroll="infinite-scroll"></uigoback>
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		that.suiteUserId = that.cookie.get('suiteUserId');
		//点击
		$('.details-tab1>a').on('click', function(){
			that.orderType = $(this).attr('type');
			$(this).addClass('active').siblings('a').removeClass('active');
		});
		//加载数据
		that.scrollList({
			le: '.infinite-order-list',
			scrollObj: '.content'
		});
		that.getOrderList();
	},
	data:function(){
		return {
			dataList: [],
			noData: false,
			pageSize: 10,
			currentPage: 1,
			loading: true,
			orderType: 2//订单状态：2：支付,3:已完成，空：全部
		}
	},
	methods: {
		getOrderList: function(){
			var that = this;
			that.getServerData({
	   			url: 'entourage/order_list',
	   			data: {
	   				id: that.suiteUserId,
	   				status: that.orderType,
	   				pageNo: that.currentPage,
	   				pageSize: that.pageSize
	   			},
	   			success: function(results){
	   				that.dataList = that.dataList.concat(results.content);
	   				if(results.content.length < that.pageSize) that.noData = true;
	   				that.loading = true;
	   			}
	   		});
		}
	},
	watch: {
		'orderType': function(){
			var that = this;
			that.dataList = [];
			that.currentPage = 1;
			that.getOrderList();
			
		},
		'currentPage': function(){
			that.getOrderList();
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