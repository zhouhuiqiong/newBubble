<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">色相</h1>
		</header>
		<div class="select-box">
			<ul class="change-list item hide">
				<li class="active"><span >新宿</span><i class="iconfont icon-duigou"></i></li>
				<li ><span>新宿</span</li>
			</ul>
		</div>
		<div class="content infinite-scroll home-content bg" >
			<!--item-->
			<ul class="card-box">
				<li class="card-item card-item2">
					<h3>在日本跟AV名女优一起洗泡泡浴是一种怎么样的体验
在日本跟AV名女优一起洗泡泡浴是一种怎么样的体验在日本跟AV名女优一起洗泡泡浴是一种怎么样的体验在日本跟AV名女优一起洗泡泡浴是一种怎么样的体验</h3>
					<div class="card-item-tiem">
						<span class="shop-tag shop-tag2">安全</span>
						<i class="data">2016-10-10 20:06</i>
					</div>
					<div class="hue-content">
						欢迎收看本期的[A week hot:一周热评]！上周，Maroon 5发布新单，骚当卖萌不可耻；林宥嘉、阿肆公开新单MV；张若昀献唱《法医秦明》片尾曲，小鲜肉作词暴露诗人属性；印尼爆红新星Rich Chigga，发布热单Remix版本；色长朴宰范一改黄暴风格，公布新专先行曲；SPYAIR献唱动画新番主题曲，燃度再次爆表。一起来看看上周的新歌与热评吧
					</div>
					<img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" class="hue-content-ph">
					<div class="hue-content">
						欢迎收看本期的[A week hot:一周热评]！上周，Maroon 5发布新单，骚当卖萌不可耻；林宥嘉、阿肆公开新单MV；张若昀献唱《法医秦明》片尾曲，小鲜肉作词暴露诗人属性；印尼爆红新星Rich Chigga，发布热单Remix版本；色长朴宰范一改黄暴风格，公布新专先行曲；SPYAIR献唱动画新番主题曲，燃度再次爆表。一起来看看上周的新歌与热评吧
					</div>
					<div class="hue-shop-inf">
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
					</div>
					<div class="hue-content">
						欢迎收看本期的[A week hot:一周热评]！上周，Maroon 5发布新单，骚当卖萌不可耻；林宥嘉、阿肆公开新单MV；张若昀献唱《法医秦明》片尾曲，小鲜肉作词暴露诗人属性；印尼爆红新星Rich Chigga，发布热单Remix版本；色长朴宰范一改黄暴风格，公布新专先行曲；SPYAIR献唱动画新番主题曲，燃度再次爆表。一起来看看上周的新歌与热评吧
					</div>
				</li>
			</ul>
			<!--end item-->
		</div>
		<div class="select-shade select-shade1" v-show="isSelectShade" @click="selectShade"></div>

	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
		var that = this;
	    that.$item = $('.select-box .item ');
		that.$nearby = $('.change-list>li');
	    that.$nav = $('.hue-filtrate');

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
	},
	data:function(){
		return {
			isSelectShade: false
		}
	},
	methods: {
		changeType: function(e,num){
			var that = this;
			that.isSelectShade = num != undefined ? true : false;
			console.log(that.isSelectShade);
			$(e.currentTarget).addClass('active').siblings('li').removeClass('active');
			that.$item.addClass('hide').eq(num).removeClass('hide');
		},
		selectShade: function(e){
			var that = this;
			that.$nav.removeClass('active');
			that.changeType(e);
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