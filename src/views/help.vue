<template>
  <div class="container">
		<div>
			<input type="number" name="" v-model="phone" placeholder="请输入手机号码">
			<uidometime time="5" :user-phone="phone"></uidometime>
		</div>
		<div>
			<input type="text" v-model="code" placeholder="请输入验证码">
		</div>
		<div><a href="javascript:void(0)" class="button button-big button-warning" @click="submit">登陆</a></div>
  </div>
</template>
<script>
module.exports = {
	//每次切换路由，在渲染出页面前都会执行
	route: {

	},
	ready: function(){
		
	},
	data:function(){
		return {
			phone: '',
			code: ''
		}
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	},
	methods: {
		submit: function(){
			if(util.string.isMobile(this.phone) && this.code.length == 0){
				 $.toast("输入验证码");
			}else{//提交

			}
		}
	},
	components:{
		uidometime: require('../components/dometime.vue')
    }
};

</script>