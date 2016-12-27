<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">色相</h1>
		</header>
		<div class="content bg" >
			<!--item-->
			<ul class="card-box">
				<li class="card-item card-item2">
					<h3>{{article.title}}</h3>
					<div class="card-item-tiem">
						<div>
							<span class="shop-tag shop-tag2" v-for="item in article.tags">{{item}}</span>
						</div>
						<i class="data">{{article.gmtCreateTime | time}}</i>
					</div>
					<img :src="article.pic">
					<div class="hue-content">
						{{article.desc}}
					</div>
					<!-- <div class="hue-shop-inf">
						<div class="text-center"><span class="hue-shop-btn">商家信息</span></div>
						<div class="hue-shop-adr">
							<div class="hue-shop-adr-d">
								<h3>浜松町駅ビル店</h3>
								<div class="hue-shop-adr-c">
									<span class="iconfont icon-ditu"></span>
									<div class="hue-shop-adr-n">代々木、南新宿、新宿 / イタリアン、ワインバ代々木、南新宿、新宿 / イタリアン、ワインバ代々木、南新宿、新宿 / イタリアン、ワインバ</div>
								</div>
							</div>
							<span class="iconfont icon-iconright"></span>
						</div>
					</div> -->
					<div class="hue-content">
						{{{article.context}}}
					</div>
				</li>
			</ul>
			<!--end item-->
		</div>
		
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
	    that.id = that.$route.query.id;
	    that.getDetailsData();
	},
	data:function(){
		return {
			article: {}
		}
	},
	methods: {
		getDetailsData: function(){
			var that = this;
			that.getServerData({
				url: 'sex_article/detail',
				data: {
					id: that.id
				},
				success: function(results){
					that.article = results.content;
				}
			});
		}
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	}
};

</script>