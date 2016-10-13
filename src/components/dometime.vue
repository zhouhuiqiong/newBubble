<template>
  <button @click="getServerCode">{{btntext}}</button>
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
        that.btntext = '重新发送('+time+')';
        var timer = setInterval(function(){
            time--;
          that.btntext = '重新发送('+time+')';
          if(time == 0){
            clearInterval(timer);
            that.btntext = '发送验证码';
            that.result = true;
          };
        }, 1000);
        //获取验证码

      };
    }
  }
}
</script>
