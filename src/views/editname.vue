<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a href="javascript:void(0)" class="pull-right save-btn" @click="saveFun()">保存</a>
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">编辑资料</h1>
		</header>
		<div class="content" >
			<div class="edit-box">
				<div class="input-style" v-show-placeholder>
					<span class="place-tag">昵称</span>
					<input type="text" value="{{userInfo.realName}}" v-model="userInfo.realName" id="realName">
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
			if(!that.string.isNull($('#realName').val())){
				$.toast('昵称不能为空');
				return;
			};
			that.getServerData({
				url: 'user/update_nick_name',
				data: {
					token: that.$root.userId,
					realName: that.userInfo.userName
				},
				success: function(result){
					$.toast('修改成功!');
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