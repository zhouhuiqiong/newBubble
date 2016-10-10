<template>
	<div class="go-back" v-show="isGoback" @click="goBack">
	</div>
</template>
<script type="text/javascript">
	module.exports = {
		props: ['targetScroll'],
		ready: function(){
			var that = this;
			$('.' + that.targetScroll ).on('scroll', function(){
				if($(this).scrollTop() > 200){
					that.isGoback = true;
				}
			});
		},
		data:function(){
			return {
				isGoback: false
			}
		},
		methods: {
			goBack: function(event){
				$('.' + this.targetScroll ).scrollTop(0);
				this.isGoback = false;
			}
		}
	};
</script>
<style>
	.go-back{
		width: 2rem;
		height: 2rem;
		background-color: #f00;
		position: fixed;
		bottom: 2.7rem;
		right: 1rem;
		border-radius: 50%;
		z-index: 100;
	}
</style>
