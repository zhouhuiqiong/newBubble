<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">登录</h1>
		</header>
		<div class="content login-box" >
			<div class="edit-box">
				<div class="input-style">
					<span class="place-tag">输入您的手机登录</span>
					<input type="text" name=""  value="" v-slice-str="11" v-model="user.phone">
					<i class="iconfont icon-shanchu"></i>
				</div>
				<div class="input-style">
					<span class="place-tag">密码</span>
					<input type="password" name=""  value="" v-model="user.password">
					<i class="iconfont icon-shanchu"></i>
				</div>
			</div>
			 <a href="javascript:void(0)" class="change-btn change-btn1 quit" @click="goLogin()">登录</a>
			 <p class="min-news" v-link="{name:'forget'}">忘记密码</p>
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
			console.log(t.user.phone);
			if(!t.v.isMobile(t.user.phone)){

			}else if(!t.v.isNull(t.user.password)){
				$.toast('输入密码');
			}else{//开始登录，cookie
				t.$dispatch('userId','666');
				util.cookie.set('userId', '666');
				if(t.$route.query.back == 1){
					util.goBack();
				}else{
					t.$router.go({path:'/home'});
				};
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