<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="pull-right save-btn">保存</a>
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">编辑图像</h1>
		</header>
		<div class="content" >
			<div class="edit-box">
				<div class="input-style">
					<input type="file" name=""  value="" accept="image/png,image/gif" @change="onFileChange">
				</div>
				<img :src="images">

			</div>
		</div>	
	</div>
</template>
<script>
module.exports = {
	ready: function(){
	},
	data:function(){
		return {
			images: ''
		}
	},
	methods: {
		onFileChange: function(e){
			var files = e.target.files || e.dataTransfer.files;
            if (!files.length)return; 
            this.createImage(files);
		},
		createImage: function(file){
			var image = new Image();         
            var reader = new FileReader();
            var t = this;
            reader.readAsDataURL(file[0]); 
            reader.onload =function(e){
            	t.images = e.target.result;
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