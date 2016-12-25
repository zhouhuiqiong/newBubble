<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">编辑资料</h1>
		</header>
		<div class="content bg content2" >
			<ul class="user-center-list">
				<li class="user-center-item user-center-item1" v-link="{name: 'editph'}">
					<div class="item-title">头像</div>
					<div class="item-after">
						<img :src="userInfo.pic" class="user-img">
						<span class="iconfont icon-iconright ml"></span>
					</div>
				</li>
				<li class="user-center-item" v-link="{name:'editname'}">
					<div class="item-title">昵称</div>
					<div class="item-after">{{userInfo.userName}}<span class="iconfont icon-iconright ml"></span></div>
				</li>
				<li class="user-center-item" v-link="{name:'editmail'}">
					<div class="item-title">邮箱</div>
					<div class="item-after">{{userInfo.email}}<span class="iconfont icon-iconright ml"></span></div>
				</li>
			</ul>
			<ul class="user-center-list">
				<li class="user-center-item" v-link="{name:'editpassword'}">
					<div class="item-title">修改密码</div>
					<div class="item-after"><span class="iconfont icon-iconright ml"></span></div>
				</li>
			</ul>
        	<a href="javascript:void(0)" class="change-btn change-btn1 quit"   @click="exit">退出登录</a>

		</div>	
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		that.getUserInfo(that);
	},
	data:function(){
		return {
			userInfo: {},
			goHome: true
		}
	},
	methods: {
		exit: function(){
			var that = this;
			that.exitFun(that);
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