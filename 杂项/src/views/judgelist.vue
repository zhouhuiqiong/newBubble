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
					<li>
						<a href="javascript:void(0);" class="item-content evaluate-content">
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
								<div class="txt-box txt-hide">
									评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
									评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
									评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
									评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
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
	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
	},
	data:function(){
		return {
			
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