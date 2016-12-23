<template>
    <!--v-el:swper-->
	<div class="swiper-container swper" >
	    <div class="swiper-wrapper" >
	        <div class="swiper-slide" v-for="item in bannerAry">
                <a :href="item.h5url">
                    <img :src="item.logoUrl">
                </a>
            </div>
	    </div>
	    <div class="swiper-pagination"></div>
	</div>
</template>
<script>
	require('../css/swiper.min.css');
	var Swiper = require('../js/swiper');
	module.exports = {
        props: ['bannerAry']
		ready:function(){
            var that = this;

			new Swiper('.swper', {
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
	.swper {
        width: 100%;
        height: 300px;
        margin: 20px auto;
    }
    .swper .swiper-slide {
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

