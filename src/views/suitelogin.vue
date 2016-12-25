<template>
	<div class="container">
		<div class="content login-box" >
			<img src="../images/suite/logbg.jpg" class="logbg">

			<div class="edit-box">
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">输入您的邮箱地址</span>
					<input type="text"  v-model="user.email">
					<i class="iconfont icon-shanchu"></i>
				</div>
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">密码</span>
					<input type="password" v-model="user.pwd">
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
			var that = this;
			if(!that.string.isEmail(that.user.email)){
				$.toast('输入邮箱地址');
			}else if(!that.string.isNull(that.user.pwd)){
				$.toast('输入密码');
			}else{//开始登录，cookie
				that.getServerData({
					url: 'entourage/login_email',
					data: that.user,
					success: function(result){
						that.cookie.set('suiteUserId', result.content.id);
						$.toast('登录成功!');
						that.$router.go({path:'/suitepersonal'});
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