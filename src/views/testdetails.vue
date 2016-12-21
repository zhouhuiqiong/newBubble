<template>
	<div class="container container1">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-icon1 pull-left" v-go-history></a>
		  <h1 class="title">商家详情</h1>
		</header>
		<div class="content list infinite-scroll list-content content1">
			<!--商品详情-->
			<div class="list-block media-list">
				<ul>
					<li class="itme-style itme-style1">
						<a href="javascript:void(0)" class="item-content">
							<div class="item-media rel" v-link="{ name: 'shopimg', query: { shopid: '1'}}"><img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3646051749,3801647591&fm=80&w=179&h=119&img.JPEG">
								<span class="img-num">22</span>
							</div>
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title">浜松町駅ビル店</div>
									<div class="item-after">1.9km</div>
								</div>
								<div class="shop-tag-box">
									<span class="shop-tag shop-tag-active">一級棒</span>
									<span class="shop-tag ">安全</span>
								</div>
								<div class="item-title-row server-money-box">
									<label class="server-money">5,00日元~5,000日元</label>
									<div class="item-after">1113人去过</div>
								</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<div class="map-box">
				<!--target="_blank"-->
				<a class="adr-specific"  href="https://www.google.com/maps/place/中国北京市昌平区水库路东侧北京随园公寓/@40.241267,116.267423,15z/">
					<span class="iconfont icon-ditu"></span>
					中国北京市昌平区水库路东侧北京随园公寓
				</a>
				<span class="icon icon-right"></span>
			</div>
			<!--商品详情-->
			<div class="swiper-container swper " id="tab-swiper">
				<div class="buttons-tab details-tab">
					<span class="tab-link button" @click="changeType(1,'all')">商家服务</span>
					<span class="tab-link button" @click="changeType(2,'all')">客户评价</span>
					<div class="activelink"></div>
				</div>
					<div class="tabs">
						<div id="tab1" class="tab active">
							<!--商家服务-->
							<div class="list-block media-list">
								<ul>
									<li class="itme-style min-itme-style" v-for="item in dataList1" track-by="$index">
										<a href="#/orderdetails" class="item-content">
											<div class="item-media"><img src="https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/864063689.png"></div>
											<div class="item-inner sale-txt">
												<div class="item-title-row">
													<div class="item-title">浜松町駅ビル店</div>
												</div>
												<div class="sale">
													已售 99999<span class="iconfont icon-iconright"></span>
												</div>

												<div class="sale-money">
													<label class="server-money ">5,000日元</label>
													<i>5,0000日元</i>
												</div>
											</div>
										</a>
									</li>
								</ul>
							</div>
							<!--end 商家服务-->
						</div>
						<div id="tab2" class="tab">
							<div class="list-block media-list evaluate-list" >
								<ul>
									<li v-for="item in dataList2" track-by="$index">
										<a href="javascript:void(0);" class="item-content evaluate-content">
											<div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" ></div>
											<div class="item-inner">
												<div class="item-title-row">
													<div class="item-title">标题</div>
													<div class="item-after">2015-23-23</div>
												</div>
												<div class="evaluate-tag-box">
													<span class="shop-tag min-shop-tag">安全</span>
													<span class="shop-tag min-shop-tag">一级棒</span>

												</div>
												<div class="txt-box txt-hide">
													评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
													评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
													评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
													评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
												</div>
												<div class="all-essay" v-all-read>全文</div>
											</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
			</div>
			<!--end tab list-->
			<!-- 加载提示符 -->
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
		t.$link = $('.activelink');
		t.linkInit();
		t.changeType(1);
	},
	data:function(){
		return {
			loadMore: {
				url: '3理解2空间',
				type: 'all',
				items: []
			},
			dataList2: [],
			dataList1: []
		}
	},
	methods: {
		changeType: function(item,type){
			var t = this;
			if(item){
				if(item == 1){
					var site =  t.site1;
				}else {
					var site =  t.site2;
				}
				t.$link.css({
					left: site
				});
			};
			
			//加载数据
			t.item = item;
			var dataObj = new util.scrollList();
			dataObj.init(this,{
				le: '.swiper-slide-active .content-block',//承载列表的数据
				scrollObj: '.content'
			});
			dataObj.getListData();
		},
		linkInit: function(){//link 初始化位置计算
			var t = this;
			var w = t.w = $(window).width() * 0.5;
			t.site1 = (w - 64)/2;
			t.site2 = w + t.site1;
			t.$link.css({
				left: t.site1
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
      uigoback: require('../components/goback.vue'),
      uiload: require('../components/load.vue')
    }
};

</script>