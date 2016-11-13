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
						<a href="#" class="item-content">
							<div class="item-media"><img src=""></div>
							<div class="item-inner sale-txt">
								<div class="item-title-row">
									<div class="item-title">浜松町駅ビル店</div>
								</div>
								<div class="sale">
									已售 99999<span class="icon icon-right"></span>
								</div>
								<div class="sale-money">
									<label class="server-money ">¥5,000</label>
									<i>¥5,0000000</i>
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
				<h3 class="sub-title">增值服务</h3>
				<div class="bg1">
					<div class="server-item"  :class="{'active' : isChangeTe}" @click="changeType(1)">
						<div class="server-t"><h3>特别随从：</h3>
						<p><i class="iconfont icon-tanhao"></i>为您解读，帮您沟通，更多服务请点击查看</p></div>
						<div class="radio-box ">
							<span>{{especiallyMonye | price}}</span>
							<i class="change-icon"></i>
						</div>
					</div>
					<div class="server-item server-item1" :class="{'active' : isChangeZi}"  @click="changeType(2)">
						<div class="server-t"><h3>自选服务人员</h3>
						<p><i class="iconfont icon-tanhao"></i>为您解读，帮您沟通，更多服务请点击查看</p></div>
						<div class="radio-box">
							<span>{{especiallyMonye | price}}</span>
							<i class="change-icon"></i>
						</div>
					</div>
				</div>
			</div>


		</div>
		<!--预约时间ng-show="isShDate"-->
		<div v-show="isShDate" class="uidate-wrap" :class="{'animatebox' : isShDate}">
			<uidate></uidate>
		</div>
		<div class="select-shade" v-show="isSelectShade" @click="selectShade"></div>
		<!--预约按钮-->
		<a href="javascript:void(0)" class="max-btn" @click="submitform" :class="{ 'disabled': isDisabled}">确认预约</a>

	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
		var t = this;
		if( t.ordertime != '请选择'){
			that.isDisabled = false;
		};
	},
	data:function(){
		return {
			ordertime: '请选择',
			isDisabled: true,//确认预约按钮
			serveMonye: 500000,
			especiallyMonye: 3000,//特别随从的价格
			subjoinMonye: '2000',//附加人员的价格
			isChangeTe: false,//特别随从
			isChangeZi: false,
			isSelectShade: false,//遮罩
			isShDate: false //预约时间弹出层

		}
	},
	methods: {
		goback: function(){
			$.confirm('订单未提交，要返回吗？',
				function () {
					util.goBack();
				},
				function () {
					
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
		changeType: function(num){
			var t = this;
			if(num == 1){
				t.isChangeTe = !t.isChangeTe;
			}else{
				t.isChangeZi = !t.isChangeZi;
			};
		},
		submitform: function(){
			var that = this;
			if(that.ordertime == '请选择'){
				$.toast('请选择预约时间');
				return;
			};
			that.subjoinMonye = that.isChangeZi  ? that.subjoinMonye : 0;
			that.especiallyMonye = that.isChangeTe  ? that.especiallyMonye : 0;
			var shopList =  {
				type:{
					'服务名称及该服务的价格': that.serveMonye,
					'特别随从': that.especiallyMonye,
					'自选服务人员': that.subjoinMonye

				},
				title: '商家名称',
				total: Number(that.serveMonye) + Number(that.especiallyMonye) + Number(that.subjoinMonye)
			};
			sessionStorage.shopList = JSON.stringify(shopList);
			window.location.href = '#pay'
		},
		selectShade: function(){

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