<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="pull-right save-btn" @click="saveFun()">保存</a>
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">修改密码</h1>
		</header>
		<div class="content" >
			<div class="edit-box">
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">旧密码</span>
					<input type="oldPwd" type="password" v-model="user.oldPwd">
					<i class="iconfont icon-shanchu"></i>

				</div>
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">新密码(不少于8位)</span>
					<input type="password" type="password" v-model="user.newPwd">
					<i class="iconfont icon-shanchu"></i>
				</div>
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">确认新密码</span>
					<input type="password" type="password" v-model="user.newPwd1">
					<i class="iconfont icon-shanchu"></i>
				</div>
			</div>
		</div>	
	</div>
</template>
<script>
module.exports = {
	ready: function(){
		var that = this;
		that.user.token = that.$root.userId;
	},
	data:function(){
		return {
			user: {

			}
		}
	},
	methods: {
		saveFun: function(){
			var that = this;
			if(!that.string.isNull(that.user.oldPwd)){
				$.toast('输入旧密码');
			}else if(!that.string.isLength(that.user.newPwd,8)){
				$.toast('输入长度不小8的密码');
			}else if(!that.string.isEquality(that.user.newPwd,that.user.newPwd1)){
				$.toast('两次密码不一样');
			}else{
				that.editPaw();
			}
		},
		editPaw: function(){
			var that = this;
			that.getServerData({
				url: 'user/update_password',
				data: that.user,
				success: function(result){
					$.toast('密码修改成功!');
					that.exitFun(that);
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
	}
};

</script>