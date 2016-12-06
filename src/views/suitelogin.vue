<template>
	<div class="container">
		<div class="content login-box" >
			<img src="../images/suite/logbg.jpg" class="logbg">

			<div class="edit-box">
				<div class="input-style">
					<span class="place-tag">输入您的邮箱地址</span>
					<input type="text" name=""  value="" v-model="user.phone">
					<i class="iconfont icon-shanchu"></i>
				</div>
				<div class="input-style">
					<span class="place-tag">密码</span>
					<input type="password" name=""  value="" v-model="user.password">
					<i class="iconfont icon-shanchu"></i>
				</div>
			</div>
			 <a href="javascript:void(0)" class="change-btn change-btn1 quit change-btn2" @click="goLogin()">登录</a>
		</div>	
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var t = this;
		new util.inputAnmition().init();
		t.v = util.string;

	},
	data:function(){
		return {
			user: {
				phone: '',
				password: ''
			}

		}
	},
	methods: {
		goLogin: function(){
			var t = this;
			if(!t.v.isEmail(t.user.phone)){
				$.toast('输入邮箱地址');
			}else if(!t.v.isNull(t.user.password)){
				$.toast('输入密码');
			}else{//开始登录，cookie
				t.$dispatch('suiteUserId','666');
				util.cookie.set('suiteUserId', '666');
				t.$router.go({path:'/suitepersonal'});
				
			}
		}
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	}
};

</script>