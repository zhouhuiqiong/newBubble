<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" @click="goback"></a>
		  <h1 class="title">提交订单</h1>
		</header>
		<div class="content list infinite-scroll home-content bg" >
			<div class="list-block media-list">
				<ul>
					<li class="itme-style min-itme-style">
						<a  v-link="{ name: 'orderdetails', query: { productId: orderInfo.product.id}}" class="item-content">
							<div class="item-media"><img src=""></div>
							<div class="item-inner sale-txt">
								<div class="item-title-row">
									<div class="item-title">{{orderInfo.product.name}}</div>
								</div>
								<div class="sale">
									已售 {{orderInfo.product.fictitiousSales}}<span class="icon icon-right"></span>
								</div>
								<div class="sale-money">
									<label class="server-money ">{{orderInfo.product.priceRealJpy | price}}日元</label>
									<i>{{orderInfo.product.priceViewJpy | price}}日元</i>
								</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<!--预约时间-->
			<div class="yu-time" @click="changeOrderTime()">
				<div class="item-title">预约时间</div>
				<div class="item-after">{{ordertime}}<span class="icon icon-right"></span></div>
			</div>
			<!--特别随从-->
			<div class="serve-type ">
				<h3 class="sub-title">附加服务</h3>
				<div class="bg1">
					<div class="server-item server-item1">
						<div class="server-t">
							<h3>{{orderInfo.entourageLevel.name}}<span class="clr3 check-box"><em>{{orderInfo.entourageLevel.priceRealJpy | price}}</em><i>日元</i></span></h3>
							<p @click="descPopup(orderInfo.entourageLevel.desc)">
								<i class="iconfont icon-tanhao"></i>为您解读，帮您沟通，更多服务请点击查看</p>
						</div>
						<div class="item-input" v-if="orderInfo.entourageLevel.priceRealJpy > 0">
							<label class="label-switch">
								<input type="checkbox" value="{{item.id}}" name="addition">
								<div class="checkbox"></div>
							</label>
						</div>
						<div class="giving" v-else>赠送</div>
					</div>
				</div>
				<div class="bg1">
					<div class="server-item server-item1" v-for="item in orderInfo.scAppendCacheList">
						<div class="server-t">
							<h3>{{item.name}}<span class="clr3 check-box"><em>{{item.priceRealJpy | price}}</em><i>日元</i></span></h3>
							<p @click="descPopup(item.desc)">
								<i class="iconfont icon-tanhao"></i>为您解读，帮您沟通，更多服务请点击查看</p>
						</div>
						<div class="item-input" v-if="item.priceRealJpy > 0">
							<label class="label-switch">
								<input type="checkbox" value="{{item.id}}" name="addition">
								<div class="checkbox"></div>
							</label>
						</div>
						<div class="giving" v-else>赠送</div>
					</div>
				</div>
			</div>
		</div>
		<!--预约时间ng-show="isShDate"-->
		<div v-show="isShDate" class="uidate-wrap" :class="{'animatebox' : isShDate}">
				<uidate :id="productId"></uidate>
		</div>
		<div class="select-shade" v-show="isSelectShade" @click="selectShade"></div>
		<!--预约按钮-->
		<button class="max-btn" @click="submitform" :class="{ 'disabled': isDisabled}">确认预约</button>
		<!--预约协议-->
		<div class="popup popup-services">
			<header class="bar bar-nav title-bar title-bar3">
			  <a class="iconfont icon-iconfontclosesmall pull-left" @click="closePopup()"></a>
			  <h1 class="title">附加服务简介</h1>
			</header>
			<div class="popup-desc">
				{{{desc}}}
			</div>
		</div>
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		if(that.ordertime != '请选择') that.isDisabled = false;
		that.q = that.$route.query;
		that.productId = that.q.productId;
		that.getOrderDetails();
	},
	data:function(){
		return {
			ordertime: '请选择',
			isDisabled: true,//确认预约按钮
			isSelectShade: false,//遮罩
			orderInfo: {
				product: {},
				entourageLevel: {}
			},
			desc:"",
			isShDate: false //预约时间弹出层
		}
	},
	methods: {
		descPopup: function(txt){
			var that = this;
			$.popup('.popup-services');
			that.desc = txt;
		},
		closePopup: function(){
			$.closeModal('.popup-services');
		},
		goback: function(){
			var t = this;
			$.confirm('订单未提交，要返回吗？',
				function () {
					t.goBack();
					t.closeModel();
				},
				function () {
					t.closeModel();
				},'返回');
		},
		changeOrderTime: function(){
			var t = this;
			t.isShDate = t.isSelectShade = true;
			setTimeout(function(){
                new Swiper('.swper', {
                    direction: 'vertical',
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    paginationClickable :true,
                    effect: 'slide',
                    direction: 'horizontal'
                });
            },100);
		},
		submitform: function(){
			var that = this;
			if(that.ordertime == '请选择'){
				$.toast('请选择预约时间');
				return;
			};
			//提交订单
			that.getServerData({
				url: 'order/submit',
				data: {
					token: that.$root.userId,
					productId: that.q.productId,
					appointmentTime: that.ordertime + ':00',
					appendIds: that.checkList($("input[name='addition']:checked")).join(',')
				},
				success: function(result){
					that.$router.go({path:'/pay'});//支付页面
				}
			});
			
		},
		selectShade: function(){
		},
		getOrderDetails: function(){
			var that = this;
			that.getServerData({
				url: 'order/pre',
				data: {
					pid: that.q.productId
				},
				success: function(result){
					that.orderInfo = result.content;
				}
			});
		}

	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	},
	components:{
      uidate: require('../components/date.vue'),
    }
};

</script>