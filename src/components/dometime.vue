<template>
  <button @click="getServerCode" class="btn2 btn21 " :class="{'disabled': !result
  }">{{btntext}}</button>
</template>

<script>
module.exports = {
  props: ['time','userPhone'],
  data: function(){
    return {
      phone: '',
      btntext: '获取验证码',
      result: true
    }
  },
  methods: {
    getServerCode: function(){
      var that = this;
      var time = that.time;
      if(util.string.isMobile(that.userPhone) &&  that.result){
        that.result = false;
        that.btntext = ''+time+' 秒';
        var timer = setInterval(function(){
            time--;
          that.btntext = ''+time+' 秒';
          if(time == 0){
            clearInterval(timer);
            that.btntext = '再次发送';
            that.result = true;
          };
        }, 1000);
        //获取验证码

      };
    }
  }
}
</script>
