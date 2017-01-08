<template>
  <div class="container">
	<div class="content list infinite-scroll home-content" :class="{'home-content1': isSelectShade}">
		<nav class="bar bar-nav bar-nav-static search-nav">
			<a class="open-adr-btn" v-link="{name:'address'}">
				{{countryName}}
				<i class="iconfont icon-icon-copy-copy"></i>
			</a>
			<form class="search-input-box" action="#">
				<div class="search-input">
					<label class="iconfont icon-chaxun" for="search"></label>
					<input type="text" v-model="searchVal" placeholder="输入商家、服务...." @>
				</div>
			</form>
			<a v-link="{name:'news'}" class="iconfont icon-home_news">
				<i class="news-tags">10</i>
			</a>
		</nav>
		<div class="home-swiper">
			<uiswiper :baseImgSrc="baseImgSrc"></uiswiper>
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
					<li><span>新宿1</span></li>
				</ul>
				<ul class="change-list hide item">
					<li><span>新宿1</span</li>
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
							<div v-for="item in evaluateTagsAry" >
								<span class="shop-tag1" value="{{item.id}}"  @click="screenFn($event,item.id,'evaluate')">{{item.name}}</span>
							</div>
						</dd>
					</dl>
					<dl class="screen-item clearfix">
						<dt>价格</dt>
						<dd class="screen-item-list">
							<div v-for="item in allPrice" >
								<span class="shop-tag1"  @click="screenFn($event,[item.min,item.max],'price')">{{item.min}}<i v-if="item.max">-{{item.max}}</i></span>
							</div>
						</dd>
					</dl>
					<div class="screen-btn-box">
						<button class="screen-btn" @click="resetBtn">重置</button>
						<button class="screen-btn-active" @click="submitScreen">确认</button>
					</div>
				</div>

			</div>
		</div>

		<div class="list-block infinite-list  media-list home-media-list">
			<ul><!--item.id-->
				<li v-for="item in dataList" track-by="$index" class="itme-style">
					<a v-link="{name: 'details', query: {shopid: item.id}}" class="item-content" >
						<div class="item-media"><img :src="$root.baseImgSrc + '/' +item.picLogo"></div>
						<div class="item-inner">
							<div class="item-title-row">
								<div class="item-title">{{item.name}}</div>
								<div class="item-after">{{item.miles}}km</div>
							</div>
							<div class="shop-tag-box">
								<!--shop-tag-active-->
								<span class="shop-tag shop-tag-active" v-for="tag in item.etagsArr" >{{tag}}</span>
								<span class="shop-tag" v-for="tag in item.ctagsArr">{{tag}}</span>
							</div>
							<div class="item-title-row server-money-box">
								<label class="server-money">{{item.priceXMin | price}}日元~{{item.priceXMax | price}}日元</label>
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
	data:function(){
		return {
			msg:'aboutMessage',
			title:'home',
			dataList: [],
			loading: true,//取反
			isSelectShade: false,
			countryName: '',
			isIndex: false,
			currentPage: 1,
			noData: false,
			searchVal: '',//搜索值
			isFixedbox: false,
			pageSize: 20,
			evaluateTagsAry: [],
			etagId: [],
			ctagArr: [],
			allPrice: [],
			priceXMin: '',
			priceXMax: '',
			baseImgSrc: ''
		}
	},
	ready: function(){
		var that = this;
	    that.fixedbox();
	    that.$nav = $('.seach-select-list li');
	    that.$item = $('.select-box .item');
	    //that.initCity();
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
		that.evaluateTags();
		that.getAllPrice();
	},
	watch: {
	    'currentPage': function (val, oldVal) {
	    	var that = this;
	    	if(that.currentPage == 1) return;
	    	that.getCityData();
		},
		'countryName': function(val, oldVal){
			var that = this;
			that.currentPage = 1;
			that.dataList = [];
			that.getCityData();
		}
	},
	route:{
		activate:function(transition){
			var that = this;
			that.$root.$set('header',that.title);
			transition.next();
			that.initCity();
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
		handle: function(event,id){
            var that = this;
            $(event.target).parent('.change-list').find('.icon-duigou').remove();
            $(event.target).append('<i class="iconfont icon-duigou"></i>');
            setTimeout(function(){
                $(event.target).parent().addClass('hide');
                that.isSelectShade = false;
                that.$nav.removeClass('active');
            },300);

            that.currentPage = 1;
            that.searchShopList();
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
			that.closeScreen();
			that.searchShopList();
		},
		closeScreen: function(){//关闭筛选
			var that = this;
			that.currentPage = 1;
			that.dataList = [];
			setTimeout(function(){
				$('.screen-list').addClass('hide');
				that.isSelectShade = false;
				that.$nav.removeClass('active');
			},300);
		},
		resetBtn: function(){//重置
			var that = this;
			$('.screen-item-list span').removeClass('active');
			that.closeScreen();
			that.priceXMin = that.priceXMax = '';
			that.etagId = [];
			that.currentPage == 1;
			that.searchShopList();
		},
		searchGo: function(){//搜索页面值
			if(this.searchVal) this.$router.go({path:'seach', query: {search: this.searchVal}});
		},
		initCity: function(){
			var that = this;
			var countryName = that.cookie.get('countryName');
	    	that.countryName = countryName ? countryName : '东京都';
		},
		getCityData: function(){
			var that = this;
			that.getServerData({
	   			url: 'shop/find_province',
	   			data: {
	   				provinceName: that.countryName,
	   				pageNo: that.currentPage,
	   				pageSize: that.pageSize
	   			},
	   			success: function(results){
	   				that.dataList = that.dataList.concat(results.content);
	   				if(results.content.length < that.pageSize) that.noData = true;
	   				that.loading = true;
	   			}
	   		});
		},
		evaluateTags: function(){//筛选-评价
			var that = this;
			that.getServerData({
	   			url: 'tag/ctags',
	   			success: function(results){
	   				that.evaluateTagsAry = results.content;
	   			}
	   		});
		},
		screenFn: function(e,id,type){//筛选-评价与价格
			var t = $(e.target), that = this;
			if(type == 'evaluate'){
				if($(e.target).hasClass('active')){
					$(e.target).removeClass('active')
					var num = that.etagId.indexOf(id);
					that.etagId.splice(num,1);
				}else{
					$(e.target).addClass('active');
					that.etagId.push(id);

				};
			};
			if(type == 'price'){
				var results = $(e.currentTarget).hasClass('active');
				$(e.currentTarget).parents('.screen-item-list').find('.shop-tag1').removeClass('active');
				if(results){
					that.priceXMin = '';
					that.priceXMax = '';
				}else{
					$(e.currentTarget).addClass('active');
					that.priceXMin = id[0];
					that.priceXMax = id[1];
				}
			};
		},
		searchShopList: function(){//标签筛选选查询
			var that = this;
			that.getServerData({
	   			url: 'shop/search',
	   			data: {
	   				etagId: that.etagId,
	   				priceXMin: that.priceXMin,
	   				priceXMax: that.priceXMax,
	   				pageNo: that.currentPage,
	   				pageSize: that.pageSize
	   			},
	   			success: function(results){
	   				that.dataList = that.dataList.concat(results.content);
	   				if(results.content.length < that.pageSize) that.noData = true;
	   				that.loading = true;
	   			}
	   		});
		},
		getAllPrice: function(){//获取全部价格
			var that = this;
			that.getServerData({
	   			url: 'sys/get_price',
	   			success: function(results){
	   				that.allPrice = results.content;
	   			}
	   		});
		}
	},
	components:{
      uiswiper: require('../components/swiper.vue'),
      uigoback: require('../components/goback.vue'),
      uiload: require('../components/load.vue')
    }
};
//computed
</script>
