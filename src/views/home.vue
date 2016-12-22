<template>
  <div class="container">
	<div class="content list infinite-scroll home-content" :class="{'home-content1': isSelectShade}">
		<nav class="bar bar-nav bar-nav-static search-nav">
			<a class="open-adr-btn" v-link="{name:'address'}">{{countryName}}<i class="iconfont icon-icon-copy-copy"></i></a>
			<form class="search-input-box" action="#">
				<div class="search-input">
					<label class="iconfont icon-chaxun" for="search"></label>
					<input type="text" v-model="searchVal" placeholder="输入城市…" @>
				</div>
			</form>
			<a v-link="{name:'news'}" class="iconfont icon-home_news">
				<i class="news-tags">10</i>
			</a>
		</nav>
		<div class="home-swiper">
			<uiswiper></uiswiper>
		</div>
		<div class="select-wrap" :class="{'fiex-select': isFixedbox}">
			<ul class="seach-select-list">
				<li @click="changeType($event,0)"><span>附近</span><i class="iconfont icon-icon-copy-copy"></i></li>
				<li @click="changeType($event,1)"><span>全部风俗</span><i class="iconfont icon-icon-copy-copy"></i></li>
				<li @click="changeType($event,2)"><span>智能排序</span><i class=" iconfont icon-icon-copy-copy"></i></li>
				<li @click="changeType($event,3)"><span>筛选</span><i class=" iconfont icon-icon-copy-copy"></i></li>
			</ul>
			<!--list-->
			<div class="select-box" >
				<ul class="change-list hide item">
					<li><span>新宿1</span></li>
					<li><span>新宿1</span</li>
				</ul>
				<ul class="change-list hide item">
					<li><span >新宿2</span></li>
					<li><span>新宿2</span</li>
				</ul>
				<ul class="change-list hide item">
					<li><span >新宿3</span></li>
					<li><span>新宿3</span</li>
				</ul>
				<!---->
				<div class="screen-list hide item">
					<dl class="screen-item ">
						<dt>评价</dt>
						<dd  class="screen-item-list clearfix">
							<div><span class="shop-tag1">服务好</span></div>
							<div><span class="shop-tag1 ">一级棒</span></div>
							<div><span class="shop-tag1">性价比高</span></div>
							<div><span class="shop-tag1">安全</span></div>
							<div><span class="shop-tag1 ">服务好</span></div>
							<div><span class="shop-tag1 ">一级棒</span></div>
							<div><span class="shop-tag1">性价比高</span></div>
							<div><span class="shop-tag1">安全</span></div>
						</dd>
					</dl>
					<dl class="screen-item clearfix">
						<dt>价格</dt>
						<dd class="screen-item-list"><div><span class="shop-tag1 active">服务好</span></div>
							<div><span class="shop-tag1 ">一级棒</span></div>
							<div><span class="shop-tag1">性价比高</span></div>
							<div><span class="shop-tag1">安全</span></div></dd>
					</dl>
					<div class="screen-btn-box">
						<button class="screen-btn" @click="resetBtn">重置</button>
						<button class="screen-btn-active" @click="submitScreen">确认</button>
					</div>
				</div>

			</div>
		</div>
		<div class="list-block infinite-list  media-list home-media-list">
			<ul>
				<li v-for="item in dataList" track-by="$index" class="itme-style">
					<a v-link="{name: 'details', query: {shopid: item.id,lon: item.locationBaidu[0], lat: item.locationBaidu[1]}}" class="item-content" >
						<div class="item-media"><img :src="item.picLogo"></div>
						<div class="item-inner">
							<div class="item-title-row">
								<div class="item-title">{{item.name}}</div>
								<div class="item-after">1.9km</div>
							</div>
							<div class="shop-tag-box">
								<!--shop-tag-active-->
								<span class="shop-tag shop-tag-active" v-for="tag in item.etags">{{tag}}</span>
								<span class="shop-tag" v-for="tag in item.ctags">{{tag}}</span>
							</div>
							<div class="item-title-row server-money-box">
								<label class="server-money">5,00~5,0000日元</label>
								<div class="item-after">{{item.baojianNum}}人去过</div>
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
	    that.$item = $('.select-box .item');
	    that.cookie.set('countryName', that.countryName);
		//附近
		that.$nearby = $('.change-list>li');
		that.$nearby.on('click', function(){
			var t = $(this);
			$('.icon-duigou').remove();
			t.append('<i class="iconfont icon-duigou"></i>');
			that.eStyle.clickActive(t);
			setTimeout(function(){
				t.parent().addClass('hide');
				that.isSelectShade = false;
				that.$nav.removeClass('active');
			},300);
			//选项更改后变化，加载数据
			that.currentPage = 1;		
		});
		//筛选
		that.$screen = $('.screen-item dd span');
		that.$screen.on('click', function(){
			var t = $(this);
			$(this).addClass('active');
		});
		//鼠标键盘事件，右下角
		$('.search-input-box').on('submit', function(e){
			that.searchGo()
		  	return false;
		});
		//滚动获取数据
		that.scrollList({
			le: '.media-list',
			scrollObj: '.content'
		});
		that.currentPage = 1;
	},
	watch: {
	    'currentPage': function (val, oldVal) {
	    	var that = this;
	    	if(that.currentPage == 1) that.dataList = [];
	   		that.getServerData({
	   			url: 'shop/find_city.do',
	   			data: {
	   				cityName: that.countryName
	   			},
	   			success: function(results){
	   				that.dataList = that.dataList.concat(results.data.content);
	   				that.loading = true;
	   			}
	   		});
	   		//假数据
	   		that.dataList =[{
	   			id:1,
				name:'商家名称',
				addressCountry:'所在国家',
				addressProvince:'所在县',
				addressCity:'所在城市',
				addressDetail:'详细地址',
				locationBaidu:['36.5856490000','139.0614540000'],
				telphone:'18601921313',
				picLogo:'https://pic3.zhimg.com/f2b216f82779b9112d21a92792358e7a_s.jpg',
				etags:['不错','很好'],
				ctags: ['泡泡浴','很好'],
				pics:'图片列表，逗号分隔',
				baojianNum:'100'
	   		}] 
		}
	},
	data:function(){
		return {
			msg:'aboutMessage',
			title:'home',
			dataList: [],
			loading: true,//取反
			isSelectShade: false,
			countryName: '日本',
			isIndex: false,
			currentPage: 0,
			searchVal: '',//搜索值
			isFixedbox: false
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
			var adr = t.cookie.get('countryName');
			t.countryName = adr ? adr : t.countryName;
			setTimeout(function(){
				$('.icon-dairaku').parent('.tab-item').addClass('active');
			},10);
		}
	},
	methods: {
		fixedbox: function(){
			var that = this;
			that.fixedBoxPlug({
				scope: that
			});
		},
		changeType: function(e,num){
			var that = this;
			var $obj = $(e.currentTarget);
			if($obj.hasClass('active')){
				that.selectShade();
			}else{
				$obj.addClass('active').siblings('li').removeClass('active');
				that.$item.addClass('hide').eq(num).removeClass('hide');
				that.isSelectShade = true;
			};
		},
		selectShade: function(){
			var that = this;
			that.$nav.removeClass('active');
			that.isSelectShade = false;
			that.$item.addClass('hide');
		},
		submitScreen: function(){
			var that = this;
			setTimeout(function(){
				$('.screen-list').addClass('hide');
				that.isSelectShade = false;
				that.$nav.removeClass('active');
			},300);
		},
		resetBtn: function(){
			var that = this;
			$('.screen-item-list span').removeClass('active');
		},
		searchGo: function(){//搜索页面值
			if(this.searchVal) this.$router.go({path:'seach', query: {search: this.searchVal}});
		}
	},
	components:{
      uiswiper: require('../components/swiper.vue'),
      uigoback: require('../components/goback.vue'),
      uiload: require('../components/load.vue')
    }
};
</script>
