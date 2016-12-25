<template>
	<div class="container">
		<header class="bar bar-nav title-bar title-bar3 ">
		  <a class="save-btn" v-link="{name:'forget'}">注册</a>
		  <a class="iconfont icon-iconfontclosesmall pull-left" v-go-history></a>
		  <h1 class="title">邮箱登录</h1>
		</header>
		<div class="content login-box" >
			<div class="edit-box">
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">输入邮箱登录</span>
					<input type="text" name=""  v-model="user.phone" value="{{user.phone}}">
					<i class="iconfont icon-shanchu"></i>
				</div>
				<div class="input-style" v-show-placeholder>
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
		//new util.inputAnmition().init();
		t.user.phone = '121212';

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
			var t = this
			console.log(t.user.phone);
			if(!t.string.isEmail(t.user.phone)){
				$.toast('输入邮箱地址');
			}else if(!t.string.isNull(t.user.password)){
				$.toast('输入密码');
			}else{//开始登录，cookie
				t.$dispatch('userId','99999');
				t.cookie.set('userId', '999999');
				t.goBack();
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