<template>
  <button @click="getServerCode" class="btn2 btn21 " :class="{'disabled': !result
}">{{btntext}}</button>
</template>
<script>
  module.exports = {
    data: function(){
      return {
        result: true,
        btntext: '获取证验'
      }
    },
    methods: {
      getServerCode: function(){
        var that = this;
        if(!that.string.isEmail(that.$parent.user.email)){
          $.toast('请输入正确邮箱地址');
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
        that.getServerData({
          url: 'user/sendCode',
          data: {
            eamil: that.$parent.user.email
          },
          success: function(result){
            $.toast('发送成功，注意查收!');
          },
          error: function(result){
            $.toast(result.content);
          }
        });
    }
  }
}
</script>
