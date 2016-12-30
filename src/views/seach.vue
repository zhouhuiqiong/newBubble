<template>
  <div class="container">
	<header class="bar bar-nav title-bar">
		<form class="search-input-box1">
			<div class="search-input">
				<label class="iconfont icon-chaxun" for="search"></label>
				<input type="search" id="search" placeholder="输入城市…" v-model="searchVal"  @keyup="showDel" @blur="showDel">
				<i class="iconfont icon-shanchu" v-show="isDelVal" @click="delInputVal"></i>
			</div>
	    	<a class="search-input-cancel" v-link="{name:'home'}">取消</a>
		</form>
	</header>
	<div class="content infinite-scroll seach-content bg">
		<!--商家-->
		<div class="seach-shop-list">
			<h3 class="s-title">商家</h3>
			<div class="list-block media-list">
				<ul>
					<li  class="itme-style" v-for="item in dataList1">
						<a v-link="{name: 'details', query: {shopid: item.id,lon: item.locationBaidu[0], lat: item.locationBaidu[1]}}" class="item-content">
							<div class="item-media"><img src="../images/1.jpg"></div>
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title">{{item.name}}</div>
									<div class="item-after">1.9km</div>
								</div>
								<div class="shop-tag-box">
									<span class="shop-tag shop-tag-active" v-for="tag in item.etags">{{tag}}</span>
									<span class="shop-tag" v-for="tag in item.ctags">{{tag}}</span>
								</div>
								<div class="item-title-row server-money-box">
									<label class="server-money">{{item.priceXMin | price}}日元~{{item.priceXMax | price}}日元</label>
									<div class="item-after">{{item.baojianNum}}人去过</div>
								</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<div class="more" v-if="isShow1" v-link="{name: 'home'}">
				<span>查看更多商家</span>
				<span class="iconfont icon-iconright"></span>
			</div>
		</div>
		<!--end 商家-->
		<!--服务-->
		<div class="seach-shop-list">
			<h3 class="s-title">服务</h3>
			<div class="list-block media-list">
				<ul>
					<li class="itme-style min-itme-style" v-for="item in dataList2">
						<a v-link="{name: 'orderdetails', query: {productId: item.id}}" class="item-content">
							<div class="item-media"><img  :src="item.logo"></div>
							<div class="item-inner sale-txt">
								<div class="item-title-row">
									<div class="item-title">{{item.scShopName}}</div>
								</div>
								<div class="sale">
									已售 {{item.fictitiousSales}}<span class="iconfont icon-iconright"></span>
								</div>

								<div class="sale-money">
									<label class="server-money ">">{{item.priceRealJpy | price}}日元</label>
									<i>{{item.priceViewJpy | price}}日元</i>
								</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<div class="more" v-if="isShow2">
				<span>查看更多商家</span>
				<span class="iconfont icon-iconright"></span>
			</div>
		</div>
		<!--end 服务-->
		<!--色相-->
		<!--end 色相-->
	</div>  
</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		$('.search-input-box1').on('submit', function(e){
			that.getServerList()
		  	return false;
		});
	},
	data:function(){
		return {
			title: '搜索',
			items: [],
			loading: false,
			searchVal: '',
			dataList1: [],
			dataList2: [],
			dataList3: [],
			isShow1: false,
			isShow2: false,
			isShow3: false,
			isDelVal: false //删除输入框的值
		}
	},
	route:{
		activate:function(transition){
			var that = this;
			this.$root.$set('header',this.title);
			transition.next();
			that.searchVal = that.$route.query.search;//搜索值变化
			that.showDel();
		}
	},
	methods: {
		showDel: function(){
			var that = this;
			that.isDelVal = that.searchVal ? true : false;
		},
		delInputVal: function(){
			var that = this;
			that.searchVal = '';
			that.isDelVal = false;
		},
		getServerList: function(type){
			var that = this;
			that.getServerData({
				url: 'sys/collect_search',
				data: {
					keywords: that.searchVal,
					pageNo: 1,
					pageSize: 10
				},
				success: function(results){
					that.regroup(results.content);
				}
			})
		},
		regroup: function(data){
			var that = this;
			for(var i=0; i<=data.length; i++){
				that['dataList' + data[i].type] = data[i].obj;
				if(i == data.length){//数据处理完毕
					for(var j=0; j<2; j++){
						if(data['dataList' + j].length > 2){
							data['dataList' + j].length = 2;
							that.isShow[j+1] = true;
						};
					};
				};
			};
		}
	}
};
</script>