<template>
	<div class="container container1">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-icon1 pull-left" v-go-history></a>
		  <h1 class="title">商家详情</h1>
		</header>
    	<uiimgmax :maxbox='maxbox' :aryimg='aryimg' :index='index'></uiimgmax>
		<div class="content list infinite-scroll list-content content1">
			<!--商品详情-->
			<div class="list-block media-list">
				<ul>
					<li class="itme-style itme-style1">
						<a href="javascript:void(0)" class="item-content">
							<div class="item-media rel" @click="say(1)"><img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3646051749,3801647591&fm=80&w=179&h=119&img.JPEG">
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
			<div class="swiper-container swper" id="tab-swiper">
				<div class="details-tab">
					<div class="swiper-pagination"></div>
					<div class="activelink"></div>
				</div>
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<!--商家服务-->
						<div class="list-block media-list">
							<ul>
								<li class="itme-style min-itme-style" v-for="item in dataList0" track-by="$index">
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
					<div class="swiper-slide">
						<div class="list-block media-list evaluate-list" >
							<ul>
								<li v-for="item in dataList1" track-by="$index">
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
												内容评价内容评价内容评价内容
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
var Swiper = require('../js/swiper');
module.exports = {
	ready: function(){
		var that = this;
		that.initSwper();
		that.$link = $('.activelink');
		that.changeType(0);
	},
	data:function(){
		return {
			loadMore: {
				url: '3理解2空间',
				items: []
			},
			dataList0: [],
			dataList1: [],
			maxbox: false,
			aryimg: [{
                img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1945941167,1388481778&fm=80&w=179&h=119&img.JPEG'
            },
            {
                img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1592706537,1193956207&fm=80&w=179&h=119&img.JPEG'
            },
            {
                img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1845208894,2480502039&fm=80&w=179&h=119&img.JPEG'
            },
            {
                img: 'http://upload.cankaoxiaoxi.com/2016/1014/1476437777501.jpg'
            }]
		}
	},
	methods: {
		changeType: function(item,type){
			var that = this;
			that.linkInit(item)
			//加载数据
			that.item = item;
			var dataObj = new util.scrollList();
			dataObj.init(this,{
				le: '.swiper-slide-active .content-block',//承载列表的数据
				scrollObj: '.content'
			});
			dataObj.getListData();
		},
		linkInit: function(type){//link 初始化位置计算
			var that = this;
			var w = that.w = $(window).width() / 2;
			that.site1= (w - 64)/2;
			that.site2 = w + t.site1;
			that.$link.css({
				left: type * w + t.site1
			});
		},
		say: function(index){
            this.maxbox = true;
            this.$dispatch('img-dispatch',{
                maxbox: this.maxbox,
                index: 0
            });
        },
        initSwper: function(){
        	var that = this;
        	that.mySwiper = new Swiper('.swper', {
				direction: 'vertical',
				pagination: '.swiper-pagination',
				createPagination :false,
				paginationClickable :true,
				effect: 'slide',
				direction: 'horizontal',
				linkTouchMove: function(num){
					num = Math.abs(num);
					num = num < that.site1 ? that.site1 : (num > that.site2 ? that.site2 : num);
					that.$link.css({
						left: num
					});
				},
				onTouchStart: function(swiper){
					that.start = swiper.activeIndex;
				},
				onSlideChangeEnd: function(swiper){
					that.end = swiper.activeIndex;
					if(that.end != that.start){
						that.changeType(that.end);//加载数据
					};
				},
				onInit: function(){
					var $nav = $('.swiper-pagination .swiper-pagination-bullet');
					$nav.click(function(){
						var index = $nav.index($(this));
						//根据类型不同做出判断要加
						that.changeType(index,'');
					});
					$('.swiper-pagination-bullet').eq(0).text('商家服务');
					$('.swiper-pagination-bullet').eq(1).text('客户评价');
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
	events: {
        'img-dispatch': function(data){
            this.$broadcast('img-broadcast',data);
       	}
    },
	components:{
      uigoback: require('../components/goback.vue'),
      uiload: require('../components/load.vue'),
      uiimgmax: require('../components/imgmax.vue')
    }
};

</script>