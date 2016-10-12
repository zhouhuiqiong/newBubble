<template>
  <div class="container">
		<div>
			<uidometime time="60"></uidometime>
		</div>
  </div>
</template>
<script>
module.exports = {
	//每次切换路由，在渲染出页面前都会执行
	route: {

	},
	ready: function(){
		
	},
	data:function(){
		return {
			title: '搜索',
			items: [],
			loading: false
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
		uidometime: require('../components/dometime.vue')
    }
};

</script>