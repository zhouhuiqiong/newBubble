<template>
	<div class="go-back iconfont icon-fanhuidingbu" v-show="isGoback" @click="goBack">
	</div>
</template>
<script type="text/javascript">
	module.exports = {
		props: ['targetScroll'],
		ready: function(){
			var that = this;
			$('.' + that.targetScroll ).on('scroll', function(){
				that.isGoback = $(this).scrollTop() > 200 ? true : false;
			});
		},
		data:function(){
			return {
				isGoback: false
			}
		},
		methods: {
			goBack: function(event){
				$('.' + this.targetScroll ).scrollTo(0);
				this.isGoback = false;
			}
		}
	};
</script>
<style>
	.go-back{
		font-size: 30px;
		position: fixed;
		bottom: 2.7rem;
		right: 1rem;
		border-radius: 50%;
		z-index: 100;
		text-align: center;
		color: #b8b8b8;
	}
	.icon-fanhuidingbu{
		

	}
</style>
