<template>
	<div class="order-date-list">
        <h3 class="order-date-t">
            <span>选择服务时间</span>
            <i class="iconfont icon-iconfontclosesmall" @click="isCloseDialog"></i>
        </h3>
        <div class="swiper-container swper" >
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in dateAry" track-by="$index"  @click="changeDateFn($event,item.y)">
                    <div class="date-itme" :class="{'active' : $index == 0}">
                        <div>
                            <h3>{{item.m}}</h3>
                            <p>可预约</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg1 content-padded-wap">
            <div class="content-padded1">
                <h3>商家营业时间：{{start}} ～ {{end}}</h3>
                <p>请至少提前1小时预约，可选择15天内服务时间</p>
            </div>
        </div>
        <ul class="hour-list clearfix bg1">
            <li v-for="item in hourAry"  @click="changeHourFn($event,item)">
                <span :class="{'active' : $index == 0}"><em>{{item}}</em></span>
            </li>
        </ul>
        <a href="javascript:void(0)" class="change-btn" @click="submitTime">确认</a>
    </div>
</template>
<script>
	require('../css/swiper.min.css');
	var Swiper = require('../js/swiper');
	module.exports = {
        props:['start','end'],
		ready:function(){
            var t = this;
            t.$time = new util.yuTime({
                yuStartTime: t.start,//营业时间
                yuEndTime: t.end//营业结束时间
            });
            t.nowTime = t.$time.getDateAry();
            t.changeDate = t.nowTime.y + '-' + t.nowTime.m + '-' + t.nowTime.d;
            t.dateAry = t.$time.nowTime();
            t.hourAry = t.$time.initHour(t.changeDate);
            t.changeHour = t.hourAry[0];
            
		},
        data: function(){
            return {
                dateAry: [],
                hourAry: [],
                yuStartTime: '18:30',
                yuEndTime: '05:30',
                changeDate: '',
                changeHour: ''
            }
        },
        methods: {
            changeDateFn: function(e,y){
                var t = this;
                t.hourAry = t.$time.initHour(y);
                $(e.currentTarget).find('.date-itme').addClass('active')
                $(e.currentTarget).siblings('div').find('.date-itme').removeClass('active');
                t.changeDate = y;
                t.changeHour = t.hourAry[0];
            },
            changeHourFn: function(e,m){
                var t = this;
                $(e.currentTarget).find('span').addClass('active')
                $(e.currentTarget).siblings('li').find('span').removeClass('active');
                t.changeHour = m;
            },
            submitTime: function(){
                var t = this;
                t.$parent.ordertime =  t.changeDate + ' ' + t.changeHour;
                t.isCloseDialog();
            },
            isCloseDialog: function(){
                var t = this;
                t.$parent.isSelectShade = t.$parent.isShDate = false;
            }
        }

	}
</script>