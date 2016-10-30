<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="pull-right save-btn">保存</a>
		  <a class="icon icon-left pull-left" @click="gohistory"></a>
		  <h1 class="title">修改密码</h1>
		</header>
		<div class="content" >
			<div class="edit-box">
				<div class="input-style">
					<span class="place-tag">旧密码</span>
					<input type="password" name=""  value="111">
					<i class="iconfont icon-shanchu"></i>

				</div>
				<div class="input-style">
					<span class="place-tag">新密码(不少于8位)</span>
					<input type="password" name=""  value="222">
					<i class="iconfont icon-shanchu"></i>
				</div>
				<div class="input-style">
					<span class="place-tag">确认新密码</span>
					<input type="password" name=""  value="23233333232">
					<i class="iconfont icon-shanchu"></i>
				</div>
			</div>
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