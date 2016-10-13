<template>
	<div class="container">
		<header class="bar bar-nav">
		  <a class="icon icon-left pull-left" @click="gohistory"></a>
		  <h1 class="title">个人中心</h1>
		</header>
		<div class="content">
			<div class="list-block media-list">
				<a href="#" class="item-link item-content">
					<div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" style='width: 4rem;'></div>
					<div class="item-inner">
						<div class="item-title-row">
							<div class="item-title">标题</div>
							<div class="item-after">$15</div>
						</div>
						<div class="item-subtitle">标题</div>
						<div class="item-text">此处是文本内容...</div>
					</div>
				</a>
	        </div>
	        <!--简单列表-->
			<div class="list-block">
				<ul>
					<li>
						<a class="item-link item-content" v-link="{name:'indentlist'}">
							<span class="icon icon-browser"></span>
							<div class="item-inner">
								<div class="item-title">我的订单</div>
								<div class="item-after">待评价2</div>
							</div>
						</a>
					</li>
					<li>
						<a class="item-link item-content" v-link="{name:'help'}">
							<span class="icon icon-browser"></span>
							<div class="item-inner">
								<div class="item-title">帮助中心</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<!--end 简单列表-->
		</div>
	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
		this.$dispatch('isIndex', false);	
	},
	data:function(){
		return {
			
		}
	},
	methods: {
		gohistory: function(){
			util.goBack();
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