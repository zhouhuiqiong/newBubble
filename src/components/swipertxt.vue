<template>
    <div>
    	 <div class="swiper-container swipertxt" >
    	    <div class="swiper-wrapper" >
    	        <div class="swiper-slide" v-for="item in aryimg"  @click="say($index)">
                    <img :src="item.img" >
<!--                     <div class="swiper-slide-explain" >
                        <h3>去问问我去饿我看起来就额</h3>
                        <p>{{$index}}</p>
                    </div> -->
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
	var Swiper = require('swiper');
	module.exports = {
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
                animatebox: '',
                aryimg: [{
                    img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1945941167,1388481778&fm=80&w=179&h=119&img.JPEG'
                },
                {
                    img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1592706537,1193956207&fm=80&w=179&h=119&img.JPEG'
                },
                {
                    img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1845208894,2480502039&fm=80&w=179&h=119&img.JPEG'
                },
                {
                    img: 'http://upload.cankaoxiaoxi.com/2016/1014/1476437777501.jpg'
                }]
            }
        },
        methods: {
            say: function(index){
                this.$dispatch('img-dispatch',{
                    maxbox: true,
                    index: index
                });
                //this.$parent.isFootBar = false;
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


