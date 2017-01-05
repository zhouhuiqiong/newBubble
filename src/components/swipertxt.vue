<template>
    <div>
    	 <div class="swiper-container swipertxt" >
    	    <div class="swiper-wrapper" >
    	        <div class="swiper-slide" v-for="item in aryimg"  @click="say($index)">
                    <img :src="$root.baseImgSrc + '/' + item.picUrl" >
                </div>
    	    </div>
    	    <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
    	</div> 
    </div>
    <uiimgmax :maxbox='maxbox' :aryimg='maxAryimg' :index='index'></uiimgmax>
</template>
<script>
	require('../css/swiper.min.css');
    var Swiper = require('../js/swiper');
	module.exports = {
        props:['aryimg'],
		ready:function(){
            var that = this;
            that.q = that.$route.query;
            that.getSwiperImg();
			
		},
        data: function(){
            return {
                maxbox: false,
                animatebox: '',
                maxAryimg: []
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
            },
            getSwiperImg: function(){
                var that = this;
                that.getServerData({
                    url: 'product/pics',
                    data: {
                        productId: that.q.productId
                    },
                    success: function(result){
                        that.aryimg = result.content;
                        for(var i=0; i<that.aryimg.length; i++){
                            that.maxAryimg.push(that.aryimg[i].picUrl);
                        };
                        setTimeout(function(){
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
                        },200);
                    }
                });
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


