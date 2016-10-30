<template>
	<div class="container container1">
		<header class="bar bar-nav title-bar">
		  <a class="icon icon-left pull-left" @click="gohistory"></a>
		  <h1 class="title">商家详情</h1>
		</header>
		<div class="content list infinite-scroll list-content content1">
			<!--商品详情-->
			<div class="list-block media-list">
				<ul>
					<li class="itme-style itme-style1">
						<a href="#" class="item-content">
							<div class="item-media rel"><img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3646051749,3801647591&fm=80&w=179&h=119&img.JPEG">
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
									<label class="server-money">¥5,000~¥5,000000</label>
									<div class="item-after">1113人去过</div>
								</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<div class="map-box">
				<div class="adr-specific">
					<span class="icon icon-browser"></span>
					林奇葳哦亲我看呢全文
				</div>
				<span class="icon icon-right"></span>
			</div>
			<!--商品详情-->
			<div class="buttons-tab details-tab">
				<a href="#tab1" class="tab-link active button" @click="changeType('all')">商家服务</a>
				<a href="#tab2" class="tab-link button" @click="changeType('all')">客户评价</a>
			</div>
			<!--tab list-->
			<div class="tabs">
				<!--tab1-->
					<div id="tab1" class="tab active">
						<!--商家服务-->
						<div class="list-block media-list">
							<ul>
								<li class="itme-style min-itme-style" v-for="item in dataList" track-by="$index">
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
						<!--end 商家服务-->
					</div>
				<!--tab2-->
				<div id="tab2" class="tab ">
					<div class="list-block media-list evaluate-list">
						<ul>
							<li v-for="item in dataList" track-by="$index">
								<a href="#" class="item-content evaluate-content">
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
										<div class="txt-box">
											评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
										</div>
										<div class="all-essay">全文</div>
									</div>

								</a>
							</li>
						</ul>
					</div>
				</div>
				<!--end tab2-->
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
		this.changeType();
	},
	data:function(){
		return {
			loadMore: {
				url: '3理解2空间',
				type: 'all',
				items: []
			},
			dataList: []
		}
	},
	methods: {
		gohistory: function(){
			util.goBack();
		},
		changeType: function(){
			//加载数据
			var dataObj = new util.scrollList();
			dataObj.init(this,{
				le: '.active .content-block',//承载列表的数据
				scrollObj: '.content'
			});
			dataObj.getListData();
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