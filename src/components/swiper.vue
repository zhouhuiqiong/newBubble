<template>
    <div class="swiper-container swper" >
        <div class="swiper-wrapper" >
            <a href="{{item.h5url}}" class="swiper-slide" v-for="item in bannerary">
                <img :src="item.logoUrl">
            </a>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
    require('../css/swiper.min.css');
    var Swiper = require('../js/swiper');
    module.exports = {
        ready:function(){
            var that = this;
            that.bannerList();
        },
        data: function(){
            return {
                bannerary: []
            }
        },
        methods: {
            bannerList: function(){
                var that = this;
                that.getServerData({
                    url: 'ad/list',
                    data: {
                        type: 1
                    },
                    success: function(results){
                        that.bannerary = results.content;
                        setTimeout(function(){
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
                        },200);
                    }
                });
            }
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

