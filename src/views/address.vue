<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
			<div class="search-input-box1">
			<div class="search-input">
				<label class="iconfont icon-chaxun" for="search"></label>
				<input type="search" id="search" placeholder="输入城市…" v-model="searchVal"  @keyup="showDel" @blur="showDel">
				<i class="iconfont icon-shanchu" v-show="isDelVal" @click="delInputVal"></i>
			</div>
			<a class="search-input-cancel" v-link="{name:'home'}">取消</a>
			</div>
		</header>
		<div class="content">
			<div class="now-address-box">
		   		<div class="now-address"><label>京东</label>当前gps定位城市</div>
		   		<i class="iconfont icon-duigou"></i>
		   	</div>
		   	<!--地址列表-->
		   	<div class="hot-adr-list">
		   		<dl class="hot-adr-item">
		   			<dt>日本热门城市</dt>
		   			<dd>东京</dd>
		   			<dd>大阪</dd>
		   			<dd>京东</dd>
		   		</dl>
<!-- 		   		<dl class="hot-adr-item">
		   			<dt>泰国热门城市</dt>
		   			<dd>东京</dd>
		   			<dd>大阪</dd>
		   			<dd>京东</dd>
		   		</dl> -->
		   	</div>
		   	<div class="input-adr-list" v-show="isInput">
		   		<dl class="hot-adr-item">
		   			<dd>东京</dd>
		   			<dd>大阪</dd>
		   			<dd>京东</dd>
		   			<dd>东京</dd>
		   			<dd>大阪</dd>
		   			<dd>京东</dd>
		   			<dd>东京</dd>
		   			<dd>大阪</dd>
		   			<dd>京东</dd>
		   			<dd>东京</dd>
		   			<dd>大阪</dd>
		   			<dd>京东</dd>
		   			<dd>东京</dd>
		   			<dd>大阪</dd>
		   			<dd>京东</dd>
		   			<dd>东京</dd>
		   			<dd>大阪</dd>
		   			<dd>京东</dd>
		   		</dl>
		   	</div>
		</div>
	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
		var t = this;
		t.$list = $('.hot-adr-list dd,.input-adr-list dd');
		t.$dui = $('.icon-duigou');
		t.handle();	
	},	
	data:function(){
		return {
			searchVal: '',
			isDelVal: false,//删除输入框的值
			isInput: false,
		}
	},
	methods: {
		showDel: function(){
			var that = this;
			that.isInput = that.isDelVal = that.searchVal ? true : false;
		},
		delInputVal: function(){
			var that = this;
			that.searchVal = '';
			that.isDelVal = false;
		},
		handle: function(){
			var t = this;
			t.$list.on('click', function(){
				$('.icon-duigou').remove();
				$(this).append('<i class="iconfont icon-duigou"></i>');
				var txt = $(this).text();
				util.cookie.set('address', txt);
				t.isInput = false;
				setTimeout(function(){
					t.$router.go({path:'/home'});
				},200)
			});	
		}
		
	},
	computed: {
		
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	}
};

</script>