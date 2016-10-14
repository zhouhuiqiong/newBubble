<template>
	<div class="container">
		<div class="content">
			<uiswipertxt></uiswipertxt>
			
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
		gohistory: function(){
			window.history.go(-1);
		}
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	},
	components:{
      uiswipertxt: require('../components/swipertxt.vue')
    }
};

</script>