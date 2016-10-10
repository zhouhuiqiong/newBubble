<template>
  <div class="container">
    消息
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