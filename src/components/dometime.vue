<template>
  <button @click="getServerCode" class="btn2 btn21 " :class="{'disabled': !result
}">{{btntext}}</button>
</template>
<script>
  module.exports = {
    props: ['userPhone'],
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
        if(!util.string.isEmail(that.$parent.phone)){
          $.toast('输入邮箱地址');
          return false;
        };
        if(that.result){
          that.result = false;
          that.domeTime({
            endText: '再次发送',
            time: 5,
            scope: that,
            callback: function(){
              that.result = true;
            }
          });
        };
        //获取验证码
    }
  }
}
</script>
