<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">用户评价</h1>
		</header>
		<div class="content list infinite-scroll home-content" >
			<!--item-->
			<div class="list-block media-list evaluate-list">
				<ul>
					<li v-for="item in evaluateAry">
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
			<!--item-->
		</div>
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		that.q = that.$route.query;
		that.currentPage = 1;
	},
	data:function(){
		return {
			evaluateAry: [],
			pageSize: 10,
			currentPage: 0,
			noData: false
		}
	},
	watch: {
		'currentPage': function(){
			var that = this;
			that.getServerData({
				url: 'product/evaluate/list',
				data: {
					pid: that.q.productId,
					eid: that.currentPage,
					pageSize: that.pageSize
				},
				success: function(result){
					that.evaluateAry = result.content;
					if(result.content && result.content.length < that.pageSize) that.noData = true;
	   				that.loading = true;
				}
			});
		}
	},
	methods: {
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	}
};
</script>