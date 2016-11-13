<template>
	<div class="container">
		<header class="bar bar-nav">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">商家相册</h1>
		</header>
		<div class="content list infinite-scroll home-content" >
			<div class="content-padded grid-demo">
			    <div class="row">
			      <div class="col-50">50%</div>
			      <div class="col-50">50%</div>
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