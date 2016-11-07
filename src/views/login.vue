<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="icon icon-left pull-left" @click="gohistory"></a>
		  <h1 class="title">邮箱登录</h1>
		</header>
		<div class="content login-box" >
			<div class="edit-box">
				<div class="input-style">
					<span class="place-tag">输入您的邮箱登录</span>
					<input type="text" name=""  value="">
					<i class="iconfont icon-shanchu"></i>
				</div>
				<div class="input-style">
					<span class="place-tag">密码</span>
					<input type="text" name=""  value="">
					<i class="iconfont icon-shanchu"></i>
				</div>
			</div>
			 <a href="javascript:void(0)" class="change-btn change-btn1 quit" >退出登录</a>
			 <p class="min-news">忘记密码</p>
		</div>	
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		new util.inputAnmition().init();
	},
	data:function(){
		return {
			
		}
	},
	methods: {
		gohistory: function(){
			util.goBack();
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