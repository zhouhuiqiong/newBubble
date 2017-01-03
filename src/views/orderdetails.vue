<template>
	<div class="container  ">
		<div class="content home-content bg" :class="{'home-content1': isFootBar}">
			<a class="iconfont icon-icon1 order-details-back" v-go-history></a>
			<div class="home-swiper">
				<uiswipertxt></uiswipertxt>
			</div>
			<dl class="introduce">
				<dt>{{prodcutInfo.name}}</dt>
				<dd>{{prodcutInfo.desc}}</dd>
			</dl>
			<!--客户评价区域-->
			<div class="list-block media-list estimate">
				<a class="item-link item-content" v-link="{name:'judgelist',query: {productId: productId}}">
					<div class="item-inner">
						<div class="item-title-row">
							<div class="item-title">客户评价</div>
							<div class="item-after">210人去过</div>
						</div>
						<div class="item-text" v-for="(key,val) in prodcutInfo.etagMap">
							<span class="shop-tag min-shop-tag">{{key}}({{val}})</span>
						</div>
					</div>
				</a>
			</div>
			<!--营业时间-->
			<div class="do-time">
				营业时间:  {{prodcutInfo.gmtStart}} - {{prodcutInfo.gmtEnd}}
			</div>
			<!--预约须知-->
			<dl class="clause">
				<dt>预定须知</dt>
				<dd><div>{{prodcutInfo.notice}}</div></dd>
			</dl>
 		</div>
 		<!--预约弹出框 -->
	    <div class="dialog-wrap orderdialog" v-show="isOrderDialog">
	    	<div class="dialog-main yu-treaty">
	    		<h3 class="text-center">预约前必读</h3>
	    		<div class="content-padded">
	    			{{prodcutInfo.descBeforeOrder}}
	    		</div>
	    		<div class="ordercheck">
	    			<span class="iconfont icon-checkbox  read-chekbox" @click="checkedFun($event)" :class="{'may': isMay,'icon-duoxuan':checked}"></span>
	    			<label @click="checkedFun($event)" >我已阅读以上规则并同意遵守</label>
	    			<span class="clr3">({{news}})</span>
	    		</div>
	    		<div class="btn-box">
	    			<button class="btn2 btn24" :class="{'disabled': isDisabled}"  @click="referorder">我知道了<i class="dome-time">{{btntext}}</i></button>
	    		</div>
	    	</div>
	    </div>
 		<!--end 预约须知-->
		<nav class="bar bar-tab foot-bar" >
			<div class="sale-money">
				<label class="server-money server-money1 ">
					<em>{{prodcutInfo.priceRealJpy | price}}</em>日元</label>
					<i>{{prodcutInfo.priceViewJpy | price}}日元</i>
			</div>
			<button @click="orderdialog" class="btn1" >立刻预约</button>
		</nav>
 	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		that.q = that.$route.query;
 		that.$check = $('.read-chekbox');
 		that.getProdcutDetail();
	},
	data:function(){
		var that = this;
		return {
			checked: false,//是否选中
			isOrderDialog: false,
			isFootBar: false,
			news: '阅读完毕才能勾选',
			isReadFinish: false,
			isMay: false,
			aryimg: [],
			prodcutInfo: {},
			priceRealJpy: {},
			productId: that.$route.query.productId,
			isDisabled: true,//按钮是否可点
			btntext: ''
		}
	},
	methods: {
		orderdialog: function(){
			this.$root.userId ? (this.isOrderDialog = true,this.orderHandle()) : (this.$router.go({path:'/login',query: {back:1}}));
		},
		checkedFun: function(e){// icon-duoxuan
			var that = this;
			if(that.isMay){
				that.checked = !that.checked;
			}else{
				$.toast('阅读完毕才能勾选！');
			}
		},
		orderHandle: function(){
			var that = this;
			that.domeTime({
				endText: '',
				scope: that,
				callback: function(){
					if(that.isBase && that.checked) that.isDisabled = false;
				}
			});
			that.isBase = false;
			$('.content-padded').on('scroll', function(){
				var h = $(this).scrollTop()  + $(this)[0].clientHeight,
					hContent = $(this)[0].scrollHeight;
					if(hContent - h <= 10){
						//that.isDisabled = false;
						that.isMay = true;
						that.news = '请勾选';
						that.isBase = true;
					};
			});
		},
		referorder: function(){//预约
			var that = this;
			that.time = $('.dome-time').text();
			if(!that.isBase){
				$.toast("请阅读完！");
			}else if(!that.checked){
				$.toast("请选中已经阅读！");
			}else if(!that.time){//时间到了
				that.isOrderDialog = that.isDisabled = false;
				that.$router.go({path:'/ordersubmit?productId=' + that.q.productId });
			};
		},
		getProdcutDetail: function(){
			var that = this;
			that.getServerData({
				url: 'product/detail',
				data: {
					pid: that.q.productId
				},
				success: function(result){
					that.prodcutInfo = result.content;
				}
			});
		}
		

	},
	route:{
		activate:function(transition){
			//阅读初始化
			this.news = '阅读完毕才能勾选';
			this.checked = this.isMay = false;
			this.isDisabled = true;
			//大图
			this.$children[0].maxbox = false;
			this.isFootBar = false;

			this.$root.$set('header',this.title);
			transition.next();
		}
	},
	components:{
      uiswipertxt: require('../components/swipertxt.vue')
    }
};

</script>