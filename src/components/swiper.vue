<template>
	<div class="swiper-container" v-el:swper>
	    <div class="swiper-wrapper">
	        <div class="swiper-slide">Slide 1</div>
	        <div class="swiper-slide">Slide 2</div>
	        <div class="swiper-slide">Slide 3</div>
	        <div class="swiper-slide">Slide 4</div>
	    </div>
	    <div class="swiper-pagination"></div>
	</div>
</template>
<script>
	require('../../node_modules/swiper/dist/css/swiper.min.css');
	var Swiper = require('swiper');
	module.exports = {
		ready:function(){
			new Swiper(this.$el, {
				direction: 'vertical',
    			loop: true,
    			pagination: '.swiper-pagination',
    			paginationClickable :true,
    			effect: 'slide',
    			autoplay: 5000,
    			loop: true,
    			direction: 'horizontal'
			});
		}
	}
</script>

<style>
	.swiper-container {
        width: 500px;
        height: 300px;
        margin: 20px auto;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
</style>

