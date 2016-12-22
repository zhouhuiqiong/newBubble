<template>
  <div class="container">
	<header class="bar bar-nav title-bar">
		<div class="search-input-box1">
			<div class="search-input">
				<label class="iconfont icon-chaxun" for="search"></label>
				<input type="search" id="search" placeholder="输入城市…" v-model="searchVal"  @keyup="showDel" @blur="showDel">
				<i class="iconfont icon-shanchu" v-show="isDelVal" @click="delInputVal"></i>
			</div>
	    	<a class="search-input-cancel" v-link="{name:'home'}">取消</a>
		</div>
	</header>
	<div class="content infinite-scroll seach-content bg">
		<!--商家-->
		<div class="seach-shop-list">
			<h3 class="s-title">曲目</h3>
			<div class="list-block media-list">
				<ul>
					<li  class="itme-style">
						<a href="#/details" class="item-content">
							<div class="item-media"><img src="../images/1.jpg"></div>
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title">浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル店</div>
									<div class="item-after">1.9km</div>
								</div>
								<div class="shop-tag-box">
									<span class="shop-tag shop-tag-active">一級棒</span>
									<span class="shop-tag ">安全</span>
								</div>
								<div class="item-title-row server-money-box">
									<label class="server-money">5,00~5,0000日元</label>
									<div class="item-after">1113人去过</div>
								</div>
							</div>
						</a>
					</li>
					<li  class="itme-style">
						<a href="#/details" class="item-content">
							<div class="item-media"><img src="../images/1.jpg"></div>
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title">浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル浜松町駅ビル店</div>
									<div class="item-after">1.9km</div>
								</div>
								<div class="shop-tag-box">
									<span class="shop-tag shop-tag-active">一級棒</span>
									<span class="shop-tag ">安全</span>
								</div>
								<div class="item-title-row server-money-box">
									<label class="server-money">5,00~5,0000日元</label>
									<div class="item-after">1113人去过</div>
								</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<div class="more">
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
					<li class="itme-style min-itme-style">
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
									<label class="server-money ">5,00日元</label>
									<i>¥5,0000日元</i>
								</div>
								
							</div>
						</a>
					</li>
				</ul>
			</div>
			<div class="more">
				<span>查看更多商家</span>
				<span class="iconfont icon-iconright"></span>
			</div>
		</div>
		<!--end 服务-->
	</div>  
</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		
		for (var  i = 0; i < 15; i++) {
	      this.items.push({
	        id: i,
	        name: 'demo' +  i
	      })
	    };
	},
	data:function(){
		return {
			title: '搜索',
			items: [],
			loading: false,
			searchVal: '',
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
		loadMore: function(){
			var that = this;
			var scroller = $('.infinite-scroll');
			that.loading = false;
			setTimeout(function() {
	      		if (that.loading) return;
	        	that.loading = true;
	        	for (var  i = 0; i < 15; i++) {
			      that.items.push({
			        id: i,
			        name: 'demo' +  i+length
			      })
			    };
			    var scrollTop = scroller[0].scrollHeight - scroller.height() - 20;
				scroller.scrollTop(scrollTop)
			}, 1000);
		}
	},
	components:{
    }
};

</script>