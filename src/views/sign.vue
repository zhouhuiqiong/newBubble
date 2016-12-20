<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">新用户快捷注册</h1>
		</header>

		<div class="content login-box" >
			<div class="edit-box">
				<div class="input-style">
					<span class="place-tag">输入邮箱登录</span>
					<!-- <input type="text" name=""  value="" v-model="phone" v-slice-str="11"> -->
					<input type="text" name=""  value=""  v-model="phone">
					<i class="iconfont icon-shanchu"></i>
  					<div class="dome-time-box">
  						<uidometime :user-phone="phone"></uidometime>
  					</div>
				</div>
				<div class="input-style">
					<span class="place-tag">输入验证码</span>
					<input type="text" name=""  value="" v-model="code">
					<i class="iconfont icon-shanchu"></i>
				</div>
				<div class="input-style">
					<span class="place-tag">输入登录密码(不少于8位)</span>
					<input type="text" name=""  value="" v-model="password">
					<i class="iconfont icon-shanchu"></i>
				</div>
				<div class="input-style">
					<span class="place-tag">再次确认密码</span>
					<input type="text" name=""  value="" v-model="password1">
					<i class="iconfont icon-shanchu"></i>
				</div>
			</div>
		  	<a class="change-btn change-btn1 quit" @click="signSubmit">注册</a>
			<p class="min-news">验证码将在30分钟内发送至您的邮箱，请<em>查收邮件</em></p>
		</div>

	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var t = this;
		new util.inputAnmition().init();
	},
	data:function(){
		return {
			phone: '',
			code: '',
			password: '',
			password1: ''
		}
	},
	methods: {
		signSubmit: function(){
			var t = this;
			if(!t.string.isEmail(t.user.phone)){
				$.toast('输入邮箱地址');
			}else if(!t.string.isNull(t.code)){
				$.toast('输入验证码');
			}else if(!t.string.isLength(t.password,8)){
				$.toast('输入长度不小8的密码');
			}else if(!t.string.isEquality(t.password,t.password1)){
				$.toast('两次密码不一样');
			}else{
				console.log('验证完成');
			}
		}
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	},
	components:{
    	uidometime: require('../components/dometime.vue')
    }
};

</script>