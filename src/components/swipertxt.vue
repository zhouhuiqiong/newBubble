<template>
    <div>
    	 <div class="swiper-container swipertxt" >
    	    <div class="swiper-wrapper" >
    	        <div class="swiper-slide" v-for="item in aryimg"  @click="say($index)">
                    <img :src="item" >
                </div>
    	    </div>
    	    <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
    	</div> 
    </div>
    <uiimgmax :maxbox='maxbox' :aryimg='aryimg' :index='index'></uiimgmax>
</template>
<script>
	require('../css/swiper.min.css');
    var Swiper = require('../js/swiper');
	module.exports = {
        props:['aryimg'],
		ready:function(){
			new Swiper('.swipertxt', {
                direction: 'vertical',
                pagination: '.swiper-pagination',
                paginationClickable :true,
                effect: 'slide',
                autoplay: 0,
                direction: 'horizontal',
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next'
            });
		},
        data: function(){
            return {
                maxbox: false,
                animatebox: ''
            }
        },
        methods: {
            say: function(index){
                this.maxbox = true;
                this.$dispatch('img-dispatch',{
                    maxbox: this.maxbox,
                    index: index
                });
                this.$parent.isFootBar = true;
            }
        },
        events: {
            'img-dispatch': function(data){
                this.$broadcast('img-broadcast',data);
            }
        },
        components: {
            uiimgmax: require('../components/imgmax.vue')
        }
	}
</script>


