<template>
	<div class="container">
		<header class="bar bar-nav title-bar title-bar3 ">
		  <a class="save-btn" v-link="{name:'sign'}">注册</a>
		  <a class="iconfont icon-iconfontclosesmall pull-left" v-go-history></a>
		  <h1 class="title">邮箱登录</h1>
		</header>
		<div class="content login-box" >
			<div class="edit-box">
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">输入邮箱登录</span>
					<input type="text" v-model="user.email">
					<i class="iconfont icon-shanchu"></i>
				</div>
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">密码</span>
					<input type="password" v-model="user.pwd">
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
	},
	data:function(){
		return {
			user: {
				email: '',
				pwd: ''
			}
		}
	},
	methods: {
		goLogin: function(){
			var that = this
			if(!that.string.isEmail(that.user.email)){
				$.toast('输入正确邮箱地址');
			}else if(!that.string.isNull(that.user.pwd)){
				$.toast('输入密码');
			}else{//开始登录，cookie
				that.getServerData({
					url: 'login',
					data: that.user,
					success: function(result){
						that.cookie.set('userInf', JSON.stringify(result.content));
						that.cookie.set('userId', result.content.userToken);

						that.$dispatch('userId',result.content.userToken);
						$.toast('登录成功!');
						if(that.$route.query.back == 1){//从预约过来的
							that.goBack();
						}else{
							that.$router.go({path:'/personal'});
						};
					},
					error: function(result){
						$.toast(result.content);
					}
				});
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