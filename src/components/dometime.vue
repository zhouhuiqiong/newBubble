<template>
  <input type="number" name="" v-model="phone">
  <button @click="getServerCode">获取验证码</button>
</template>

<script>
module.exports = {
  props: ['time'],
  data: function(){
    return {
      phone: '',
    }
  },

  methods: {
    getServerCode: function(){
      if(this.verifyPhone){

      };
    },
    verifyPhone: function(){
      var phoneReg = /^(((13[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if(!phoneReg.test(this.phone)){
        $.toast("输入确证的手机号");
        return false;
      };
        return true;
    }
  }
}
</script>
