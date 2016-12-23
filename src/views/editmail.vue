<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="pull-right save-btn" @click="saveFun()">保存</a>
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">编辑资料</h1>
		</header>
		<div class="content" >
			<div class="edit-box">
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">邮箱</span>
					<input type="text" value="{{userInfo.email}}" v-model="userInfo.email" id="email">
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
		that.getUserInfo(that);
	},
	data:function(){
		return {
			userInfo: {}
		}
	},
	methods: {
		saveFun: function(){
			var that = this;
			if(!that.string.isNull($('#email').val())){
				$.toast('邮箱不能为空');
				return;
			};
			// that.getServerData({
			// 	url: 'user/update_nick_email',
			// 	data: {
			// 		token: that.$root.userId,
			// 		realName: that.userInfo.userName
			// 	},
			// 	success: function(result){
			// 		$.toast('修改成功!');
			// 	},
			// 	error: function(result){
			// 		$.toast(result.content);
			// 	}
			// });
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