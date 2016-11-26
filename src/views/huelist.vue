<template>
	<div class="container">
		<header class="bar bar-nav title-bar">

		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">色相</h1>
		  <div @click="changeType($event, 0)" class="hue-filtrate" >
			  <span>筛选</span>
			  <i class="iconfont icon-icon-copy-copy"></i>
			  
		  </div>
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
				<li class="card-item" v-link="{name:'huedertails',query: { id: '1'}}" >
					<img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg">
					<h3>在日本跟AV名女优一起洗泡泡浴是一种怎么样的体验
在日本跟AV名女优一起洗泡泡浴是一种怎么样的体验在日本跟AV名女优一起洗泡泡浴是一种怎么样的体验在日本跟AV名女优一起洗泡泡浴是一种怎么样的体验</h3>
					<p><span class="shop-tag shop-tag2">安全</span>AV服务极乐忘忧，为国争光精尽人亡。</p>
				</li>
				<li class="card-item" v-link="{name:'huedertails',query:{ id:'2'}}">
					<img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg">
					<h3>在日本跟AV名女优一起洗泡泡浴是一种怎么样的体验
一起洗泡泡浴是一种怎么样的……</h3>
					<p><span class="shop-tag shop-tag2">安全</span>AV服务极乐忘忧，为国争光精尽人亡。</p>
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