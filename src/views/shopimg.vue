<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">商家相册</h1>
		</header>
		<div class="content list infinite-scroll home-content" >
			<div class="content-padded shop-img-list clearfix">
				<div>
			    <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3646051749,3801647591&fm=80&w=179&h=119&img.JPEG">
				</div>
			    <div>
			    <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3646051749,3801647591&fm=80&w=179&h=119&img.JPEG">
				</div>

				<div>
			    <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3646051749,3801647591&fm=80&w=179&h=119&img.JPEG">
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
		this.$dispatch('isIndex', false);	
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