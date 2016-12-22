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
							<div class="item-media rel" @click="say(1)"><img :src="shopInfo.picLogo">
								<span class="img-num">{{imgL}}</span>
							</div>
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title">{{shopInfo.name}}</div>
									<div class="item-after">1.9km</div>
								</div>
								<div class="shop-tag-box">
									<span class="shop-tag shop-tag-active" v-for="tag in shopInfo.etags">{{tag}}</span>
									<span class="shop-tag" v-for="tag in shopInfo.ctags">{{tag}}</span>
								</div>
								<div class="item-title-row server-money-box">
									<label class="server-money">5,00日元~5,000日元</label>
									<div class="item-after">{{shopInfo.baojianNum}}人去过</div>
								</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<div class="map-box">
				<!--target="_blank"-->
				<a class="adr-specific"  href="https://www.google.com/maps/place/					{{shopInfo.addressDetail}}/@{{shopInfo.lon}},					{{shopInfo.lat}},15z/">
					<span class="iconfont icon-ditu"></span>
					{{shopInfo.addressDetail}}
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
										<div class="item-media"><img :src="item.logo"></div>
										<div class="item-inner sale-txt">
											<div class="item-title-row">
												<div class="item-title">{{item.scShopName}}</div>
											</div>
											<div class="sale">
												已售 {{item.fictitiousSales}}<span class="iconfont icon-iconright"></span>
											</div>

											<div class="sale-money">
												<label class="server-money ">{{item.priceRealJpy | price}}日元</label>
												<i>{{item.priceViewJpy | price}}日元</i>
											</div>
										</div>
									</a>
								</li>
							</ul>
						</div>
						<!--end 商家服务v-for="item in dataList1"-->
					</div>
					<div class="swiper-slide">
						<div class="list-block media-list evaluate-list" >
							<ul>
								<li  track-by="$index">
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
		that.q = that.$route.query;
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
			aryimg: [],
			shopInfo: {},
			imgL: ''
		}
	},
	methods: {
		changeType: function(item,type){
			var that = this;
			that.linkInit(item)
			that.shopDetails()
			//加载数据
			// that.item = item;
			// var dataObj = new util.scrollList();
			// dataObj.init(this,{
			// 	le: '.swiper-slide-active .content-block',//承载列表的数据
			// 	scrollObj: '.content'
			// });
			// dataObj.getListData();
		},
		linkInit: function(type){//link 初始化位置计算
			var that = this;
			var w = that.w = $(window).width() / 2;
			that.site1= (w - 64)/2;
			that.site2 = w + that.site1;
			that.$link.css({
				left: type * w + that.site1
			});
		},
		say: function(index){
            this.maxbox = true;
            this.$dispatch('img-dispatch',{
                maxbox: this.maxbox,
                index: 0
            });
        },
        //服务列表与店铺
        shopDetails: function(){
        	var that = this;
        	that.getServerData({
        		url: 'shop/detail',
        		data: {
        			sid: that.q.shopid,
        			lat: that.q.lat,
        			lon: that.q.lon
        		},
        		scuess: function(result){
        			that.dataList0 = that.dataList0.concat(result.content.productList);
        			that.shopInfo = result.content.shopInfo;
        			that.aryimg = that.shopInfo.pics;
        			that.imgL = that.aryimg.length;
        		}
        	});
        	that.shopInfo = {
        		id:1,
				name:'商家名称',
				addressCountry:'所在国家',
				addressProvince:'所在县',
				addressCity:'北京',
				addressDetail:'中国北京市昌平区水库路东侧北京随园公寓',
				locationBaidu:['36.5856490000','139.0614540000'],
				telphone:'18601921313',
				picLogo:'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3646051749,3801647591&fm=80&w=179&h=119&img.JPEG',
				etags:['不错','很好'],
				ctags: ['泡泡浴','很好'],
				pics: ['https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1945941167,1388481778&fm=80&w=179&h=119&img.JPEG',
				'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/864063689.png'],
				baojianNum:'100'
        	};
        	that.dataList0 = [{
        		scShopId:1,
				scShopName:'商家名称',
				priceRealJpy:'5000',
				priceViewJpy:'100000',
				fictitiousSales: '1000',
				logo:'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/864063689.png'
        	}]
        	that.aryimg = that.shopInfo.pics;
        	that.imgL = that.shopInfo.pics.length;
        },
        //取商户评论
        getReview: function(){
        	var that = this;
        	that.getServerData({
        		url: 'shop/evaluate/list',
        		data: {
        			sid: that.q.shopid,
        			pageSize: 10,
        			lon: that.q.lon
        		},
        		scuess: function(result){
        			that.dataList0 = that.dataList0.concat(result.content.productList);
        			that.shopInfo = result.content.shopInfo;
        			that.aryimg = that.shopInfo.pics;
        			that.imgL = that.aryimg.length;
        		}
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
					setTimeout(function() {
						$('.swiper-pagination-bullet').eq(0).text('商家服务');
						$('.swiper-pagination-bullet').eq(1).text('客户评价');
					}, 1000);
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