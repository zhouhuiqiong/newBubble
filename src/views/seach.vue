<template>
  <div class="container">
   查询
  </div>
</template>
<script>
module.exports = {
	//每次切换路由，在渲染出页面前都会执行
	route: {

	},
	ready: function(){
		this.$dispatch('isIndex', false);
		
	},
	data:function(){
		return {
			title: '搜索'
		}
	},
	computed: {
	    
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	},
	methods: {
		
	},
	components:{
    }
};

</script>