<template>
	<div class="container">
		<header class="bar bar-nav">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">消息</h1>
		</header>
		<div class="content list infinite-scroll home-content" >
			<div class="list-block infinite-list  media-list">
				<ul>
					<li >
						<a href="#" class="item-content">
						  <div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" style='width: 4rem;'></div>
						  <div class="item-inner">
						    <div class="item-title-row">
						      <div class="item-title">标题</div>
						      <div class="item-after">$15</div>
						    </div>
						    <div class="item-title-row">
						    	<div>
						    		一級棒
						    	</div>
						    	<div>
						    		泡泡域
						    	</div>
						    </div>
						  </div>
						</a>
					</li>
				</ul>
			</div>
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