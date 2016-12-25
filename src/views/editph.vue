<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="pull-right save-btn" @click="uploadPh()">保存</a>
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">编辑图像</h1>
		</header>
		<div class="content" >
			<div class="edit-box">
				<img :src="pic">
				<div class="upload-btn-box">
					<input type="file"  accept="image/png,image/gif" @change="onFileChange" >
					<a href="javascript:void(0);" class="button button-fill">{{btnText}}</a>
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
			pic: '',
			btnText: '上传图片'
		}
	},
	methods: {
		onFileChange: function(e){
			var that = this;
			that.files = e.target.files || e.dataTransfer.files;
            if (!that.files.length) return;
            that.createImage(that.files);
        },
		createImage: function(file){
			var image = new Image();         
            var reader = new FileReader();
            var that = this;
            reader.readAsDataURL(file[0]); 
            reader.onload =function(e){
            	that.pic = e.target.result;
            };     
		},
		uploadPh: function(){
			var that = this;
			that.getServerData({
				url: 'user/update_nick_name',
				data: {
					token: that.$root.userId,
					file: that.pic
				},
				success: function(result){
					$.toast('图片上传成功');
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