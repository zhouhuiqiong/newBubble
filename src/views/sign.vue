<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">新用户快捷注册</h1>
		</header>
		<div class="content login-box" >
			<div class="edit-box">
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">输入邮箱登录</span>
					<input type="text"   v-model="user.email">
					<i class="iconfont icon-shanchu"></i>
  					<div class="dome-time-box">
  						<uidometime></uidometime>
  					</div>
				</div>
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">输入验证码</span>
					<input type="text"  v-model="user.code">
					<i class="iconfont icon-shanchu"></i>
				</div>
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">输入登录密码(不少于8位)</span>
					<input type="password"  v-model="user.pwd">
					<i class="iconfont icon-shanchu"></i>
				</div>
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">再次确认密码</span>
					<input type="password" v-model="user.password1">
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
	},
	data:function(){
		return {
			user: {
				email: '',
				code: '',
				pwd: '',
				password1: ''
			}
		}
	},
	methods: {
		signSubmit: function(){
			var that = this;
			if(!that.string.isEmail(that.user.email)){
				$.toast('输入邮箱地址');
			}else if(!that.string.isNull(that.user.code)){
				$.toast('输入验证码');
			}else if(!that.string.isLength(that.user.pwd,8)){
				$.toast('输入长度不小8的密码');
			}else if(!that.string.isEquality(that.user.pwd,that.user.password1)){
				$.toast('两次密码不一样');
			}else{
				that.submitform();
			};
		},
		submitform: function(){
			var that = this;
			that.getServerData({
				url: 'user/register',
				data: that.user,
				success: function(result){
					$.toast('注册成功');
					that.$router.go({path:'/login'});
					that.exitFun(scope);
				},
				error: function(result){
					$.toast(result.content);
				}
			});
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