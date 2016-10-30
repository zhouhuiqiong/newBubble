<template>
  <div class="container">
	<div class="content list infinite-scroll home-content">
		<nav class="bar bar-nav bar-nav-static search-nav">
			<a class="open-adr-btn" v-link="{name:'address'}">{{address}}<i class="icon icon-down"></i></a>
			<a v-link="{name:'seach'}" class="search-input-box">
				<div class="search-input">
					<label class="icon icon-search" for="search"></label>
					<input type="search" id="search" placeholder="输入商家,服务名称...">
				</div>
			</a>
			<a v-link="{name:'news'}" class="iconfont icon-home_news">
				<i class="news-tags">10</i>
			</a>
		</nav>
		<div class="home-swiper">
			<uiswiper></uiswiper>
		</div>
		<div class="select-wrap">
			<ul class="seach-select-list">
				<li @click="changeType($event,0)"><span>附近</span><i class="icon icon-down"></i></li>
				<li @click="changeType($event,0)"><span>全部风俗</span><i class="icon icon-down"></i></li>
				<li @click="changeType($event,0)"><span>智能排序</span><i class="icon icon-down"></i></li>
				<li @click="changeType($event,1)"><span>筛选</span><i class="icon icon-down"></i></li>
			</ul>
			<!--list-->
			<div class="select-box">
				<ul class="change-list hide item">
					<li class="active"><span >新宿</span><i class="iconfont icon-duigou"></i></li>
					<li ><span>新宿</span</li>
				</ul>
				<!---->
				<div class="screen-list hide item">
					<dl class="screen-item ">
						<dt>评价</dt>
						<dd><span class="shop-tag1 active">服务好</span><span class="shop-tag1 ">一级棒</span><span class="shop-tag1">性价比高</span><span class="shop-tag1">安全</span>
						</dd>
					</dl>
					<dl class="screen-item">
						<dt>价格</dt>
						<dd><span class="shop-tag1 active">服务好</span><span class="shop-tag1">一级棒</span><span class="shop-tag1">性价比高</span><span class="shop-tag1">安全</span></dd>
					</dl>
					<div class="screen-btn-box">
						<button class="screen-btn">重置</button>
						<button class="screen-btn-active" @click="submitScreen">确认</button>
					</div>
				</div>

			</div>
		</div>
		<div class="list-block infinite-list  media-list">
			<ul>
				<li v-for="item in dataList" track-by="$index" class="itme-style">
					<a href="#" class="item-content">
						<div class="item-media"><img src=""></div>
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
			<!-- 加载提示符 -->
			 <div v-show="!loading">
				<uiload></uiload>
			 </div>
		</div>
		<div class="select-shade" v-show="isSelectShade" @click="selectShade"></div>
	</div>
	<uigoback target-scroll="infinite-scroll"></uigoback>
</template>
<script>
module.exports = {
	//每次切换路由，在渲染出页面前都会执
	events: {
		'cookies': function(msg){
			console.log(msg);
		}
	},
	ready: function(){
		var that = this;
	    that.fixedbox();
	    that.$nav = $('.seach-select-list li');
	    that.$item = $('.select-box .item ');
	    //加载数据
		var dataObj = new util.scrollList();
		dataObj.init(this,{
			le: '.media-list',//承载列表的数据
			scrollObj: '.content'
		});
		dataObj.getListData();
		//附近
		that.$nearby = $('.change-list>li');
		that.$nearby.on('click', function(){
			var t = $(this);
			$('.icon-duigou').remove();
			t.append('<i class="iconfont icon-duigou"></i>');
			util.clickActive(t);
			setTimeout(function(){
				t.parent().addClass('hide');
				that.isSelectShade = false;
				that.$nav.removeClass('active');
			},300);
		});
		//筛选
		that.$screen = $('.screen-item dd span');
		that.$screen.on('click', function(){
			var t = $(this);
			util.clickActive(t);
		});
		
	},
	data:function(){
		return {
			msg:'aboutMessage',
			title:'home',
			dataList: [],
			loading: false,
			isSelectShade: false,
			address: '东京'
			
		}
	},
	computed: {
	    length: function(){
	      return this.items.length
	    }
	},
	route:{
		activate:function(transition){
			var t = this;
			t.$root.$set('header',t.title);
			transition.next();
			var adr = util.cookie.get('address');
			t.address = adr ? adr : '东京';
		}
	},
	methods: {
		// showAdr: function(){
		// 	$.popup('.popup-about');
		// },
		fixedbox: function(){
			util.fixedbox({
				fixedbox:'.select-wrap'
			});
		},
		changeType: function(e,num){
			var that = this;
			
			that.isSelectShade = num != undefined ? true : false;
			$(e.currentTarget).addClass('active').siblings('li').removeClass('active');
			that.$item.addClass('hide').eq(num).removeClass('hide');
		},
		selectShade: function(e){
			this.changeType(e);
		},
		submitScreen: function(){
			var that = this;
			setTimeout(function(){
				$('.screen-list').addClass('hide');
				that.isSelectShade = false;
				that.$nav.removeClass('active');
			},300);
		}
	},
	components:{
      uiswiper: require('../components/swiper.vue'),
      uigoback: require('../components/goback.vue'),
      uiload: require('../components/load.vue'),
    }
};
</script>
