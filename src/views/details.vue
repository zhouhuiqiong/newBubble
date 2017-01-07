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
							<div class="item-media rel" @click="say(1)"><img :src="$root.baseImgSrc + '/' +shopInfo.picLogo">
								<span class="img-num">{{imgL}}</span>
							</div>
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title">{{shopInfo.name}}</div>
									<div class="item-after">{{shopInfo.miles}}km</div>
								</div>
								<div class="shop-tag-box">
									<span class="shop-tag shop-tag-active" v-for="tag in shopInfo.etagsArr">{{tag}}</span>
									<span class="shop-tag" v-for="tag in shopInfo.etagsArr">{{tag}}</span>
								</div>
								<div class="item-title-row server-money-box">
									<label class="server-money">{{shopInfo.priceXMin | price}}日元~{{shopInfo.priceXMax  | price}}日元</label>
									<div class="item-after">{{shopInfo.baojianNum}}人去过</div>
								</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<div class="map-box">
				<!--target="_blank"-->
				<a class="adr-specific"  href="https://www.google.com/maps/place/{{shopInfo.addressDetail}}/@{{locationBaidu[0]}},{{locationBaidu[1]}}">
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
						<!--商家服务orderdetails-->
						<div class="list-block media-list">
							<ul>
								<li class="itme-style min-itme-style" v-for="item in dataList0" track-by="$index">
									<a v-link="{name: 'orderdetails', query: {productId: item.id}}" class="item-content">
										<div class="item-media">
											<img :src="$root.baseImgSrc + '/' +item.logo"></div>
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
						<!--end 商家服务-->
					</div>
					<div class="swiper-slide">
						<div class="list-block media-list evaluate-list" >
							<ul>
								<li  v-for="item in dataList1" >
									<a href="javascript:void(0);" class="item-content evaluate-content">
										<div class="item-media">
											<img :src="$root.baseImgSrc + '/' + item.userPic" >
										</div>
										<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">{{item.userNick}}</div>
												<div class="item-after">{{item.gmtCreated | time}}</div>
											</div>
											<div class="evaluate-tag-box">
												<span class="shop-tag min-shop-tag" v-for="tag in item.etagsArr">{{tag}}</span>
											</div>
											<div class="txt-box txt-hide">
												{{item.content}}
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
		//滚动获取数据
		that.scrollList({
			le: '.media-list',
			scrollObj: '.content'
		});
		that.currentPage0 = 1; 
		that.changeType(0);
		that.shopDetails();
	},
	data:function(){
		return {
			dataList0: [],//服务列表
			dataList1: [],//用户评论
			maxbox: false,//大图是否显示
			aryimg: [],//大图数组
			shopInfo: {},
			productList: {},
			pageSize: 20,
			currentPage0: 0,
			currentPage1: 0,
			currentStr: '0',
			loading: false,
			noData: false,//无数据标志
			listType: 0,//1用户评论列表
			imgL: '',
			locationBaidu: []
		}
	},
	watch: {
		'currentPage0': function (val, oldVal) {
	    	var that = this;
	    	that.getProduct();
	   	},
	   	'currentPage1': function (val, oldVal) {
	    	var that = this;
	    	that.getReview();
	   	},
	},
	methods: {
		changeType: function(item){
	    	var that = this;
	    	if(item == 1 && that.currentPage1 == 0) that.currentPage1 = 1;//初次加载
			that.linkInit(item)
			that.listType = item;
			that.currentStr = item + '';
			that.noData = false;
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
        //店铺详情
        shopDetails: function(){
        	var that = this;
        	that.getServerData({
        		url: 'shop/detail',
        		data: {
        			sid: that.q.shopid
        		},
        		success: function(result){
        			that.shopInfo = result.content.shopInfo;
        			that.productList = result.content.productList[0];
        			that.aryimg = that.shopInfo.picsArr;
        			that.imgL = that.aryimg.length;
        			that.locationBaidu = that.shopInfo.locationBaidu.split(';');
        		}
        	});	
        },
        //服务列表
        getProduct: function(){
        	var that = this;
        	that.getServerData({
        		url: 'product/list_by_shop',
        		data: {
        			scShopId: that.q.shopid,
        			pageNo: that.currentPage0,
        			pageSize: that.pageSize
        		},
        		success: function(result){
        			that.dataList0 = that.dataList0.concat(result.content);
        			if(result.content && result.content.length < that.pageSize) that.noData = true;
        			that.loading = true;
        		}
        	});
        },
        //取商户评论
        getReview: function(){
        	var that = this;
        	var data = {
        		sid: that.q.shopid,
        		pageSize: that.pageSize
        	};
        	if(that.currentPage1 > 1) data.eid = that.dataList1[that.dataList1.length - 1].scShopId;
        	that.getServerData({
        		url: 'shop/evaluate/list',
        		data: data,
        		success: function(result){
        			if(result.content){
        				that.dataList1 = that.dataList1.concat(result.content);
	        			if(result.content.length < that.pageSize) that.noData = true;
        			};
        			that.loading = true;
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
					setTimeout(function() {
						$('.swiper-pagination-bullet').eq(0).text('商家服务');
						$('.swiper-pagination-bullet').eq(1).text('客户评价');
					}, 500);
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