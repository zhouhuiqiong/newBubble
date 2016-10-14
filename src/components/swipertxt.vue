<template>
    <div>
    	 <!-- <div class="swiper-container swipertxt" >
    	    <div class="swiper-wrapper" >
    	        <div class="swiper-slide" v-for="item in aryimg"  @click="say($index)">
                    <img src="https://ss1.baidu.com/73N1bjeh1BF3odCf/it/u=383040761,3469971360&fm=202&gp=0.jpg" >
                    <div class="swiper-slide-explain" >
                        <h3>去问问我去饿我看起来就额</h3>
                        <p>{{$index}}</p>
                    </div>
                </div>
                
    	    </div>
    	    <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
    	</div>  -->
        <div class="max-img-box " v-show="maxbox" :class="{'animatebox': maxbox}">
            <header class="bar bar-nav">
                <a class="icon icon-left pull-left" @click="gohistory"></a>
                <h1 class="title">消息</h1>
            </header>
            <!--大图幻灯片-->
            <div class="swiper-container maxswiperlist" >
                <div class="swiper-wrapper" >
                    <div class="swiper-slide" v-for="item in aryimg">
                        <img src="https://ss1.baidu.com/73N1bjeh1BF3odCf/it/u=383040761,3469971360&fm=202&gp=0.jpg" >
                    </div> 
                </div>
            </div>
            <!--大图幻灯片-->
        </div>
    </div>
</template>
<script>
	require('../../node_modules/swiper/dist/css/swiper.min.css');
	var Swiper = require('swiper');
	module.exports = {
		ready:function(){
			// new Swiper('.swipertxt', {
   //              direction: 'vertical',
   //              loop: true,
   //              pagination: '.swiper-pagination',
   //              paginationClickable :true,
   //              effect: 'slide',
   //              autoplay: 5000,
   //              loop: false,
   //              direction: 'horizontal',
   //              prevButton:'.swiper-button-prev',
   //              nextButton:'.swiper-button-next'
   //          });
            new Swiper('.maxswiperlist', {
                direction: 'vertical',
                paginationClickable :true,
                effect: 'slide',
                autoplay: 5000,
                loop: false,
                direction: 'horizontal',
                onInit: function(swiper){
                    console.log(swiper.imagesLoaded);
                },
                onSlideChangeEnd: function(swiper){
                    console.log(swiper.activeIndex);
                }
             
            });
		},
        data: function(){
            return {
                maxbox: true,
                animatebox: '',
                aryimg: [{
                    img: 'https://ss1.baidu.com/73N1bjeh1BF3odCf/it/u=383040761,3469971360&fm=202&gp=0.jpg'
                },
                {
                    img: 'https://ss1.baidu.com/73N1bjeh1BF3odCf/it/u=383040761,3469971360&fm=202&gp=0.jpg'
                },
                {
                    img: 'https://ss1.baidu.com/73N1bjeh1BF3odCf/it/u=383040761,3469971360&fm=202&gp=0.jpg'
                },
                {
                    img: 'https://ss1.baidu.com/73N1bjeh1BF3odCf/it/u=383040761,3469971360&fm=202&gp=0.jpg'
                },{
                    img: 'https://ss1.baidu.com/73N1bjeh1BF3odCf/it/u=383040761,3469971360&fm=202&gp=0.jpg'
                },
                {
                    img: 'https://ss1.baidu.com/73N1bjeh1BF3odCf/it/u=383040761,3469971360&fm=202&gp=0.jpg'
                }]
            }
        },
        methods: {
            say: function(index){
                this.maxbox = true;

            }
        }
	}
</script>


