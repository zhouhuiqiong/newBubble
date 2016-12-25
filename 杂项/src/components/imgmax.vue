<template>
    <div class="max-img-box " v-show="maxbox" :class="{'animatebox': maxbox}">
        <header class="bar bar-nav title-bar">
            <a class="iconfont icon-iconleft pull-left" @click='closeImgBox'></a>
            <h1 class="title">{{activeimg}}/{{imgnum}}</h1>
        </header>
        <!--大图幻灯片-->
        <div class="swiper-container maxswiperlist" >
            <div class="swiper-wrapper" >
                <div class="swiper-slide" v-for="item in aryimg">
                    <img :src="item.img" >
                </div> 
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
        <!--大图幻灯片-->
    </div>
</template>
<script>
	require('../../node_modules/swiper/dist/css/swiper.min.css');
	var Swiper = require('swiper');
	module.exports = {
        props:['maxbox','aryimg','index'],
		ready:function(){
            var that = this;
		},
        data: function(){
            return {
                imgnum: 1,
                activeimg: 1
            }
        },
        events: {
            'img-broadcast': function(val){
                var that = this;
                this.maxbox =  val.maxbox;
                this.index =  val.index ;
                this.activeimg = this.index + 1;
                setTimeout(function(){
                    that.loadImg();
                },100); 
            }
        },
        methods: {
            closeImgBox: function(){
                this.maxbox = false;
                this.$parent.$parent.isFootBar = false;
            },
            loadImg: function(){
                var that = this;
                that.mySwiper = new Swiper('.maxswiperlist', {
                    direction: 'vertical',
                    effect: 'slide',
                    autoplay: 5000,
                    autoplay: 0,
                    direction: 'horizontal',
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                    initialSlide: that.index,
                    onInit: function(swiper){
                        that.imgnum = swiper.imagesToLoad.length;
                    },
                    onSlideChangeEnd: function(swiper){
                        that.activeimg = swiper.snapIndex + 1;
                    }
                });
            }
        }
	}
</script>


