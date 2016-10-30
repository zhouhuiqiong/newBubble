<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="pull-right save-btn">保存</a>
		  <a class="icon icon-left pull-left" @click="gohistory"></a>
		  <h1 class="title">编辑资料</h1>
		</header>
		<div class="content" >
			<div class="edit-box">
				<div class="input-style">
					<span class="place-tag">昵称</span>
					<input type="text" name=""  value="21里21快">
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