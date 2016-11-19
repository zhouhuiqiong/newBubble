<template>
	<div class="container">
		<div class="adr-main">
			<div class="bar-header-secondary">
				<div class="searchbar">
					<a class="searchbar-cancel" >取消</a>
					<div class="search-input">
						<label class="iconfont icon-chaxun" for="search"></label>
						<input type="search" id='search' placeholder='输入商家,服务名称...' v-model="searchAdr"/>
						<i class="iconfont icon-shanchu" v-show="isDel" @click="delVal"></i>
					</div>
				</div>
			</div>
			<div class="now-address-box">
		   		<div class="now-address"><label>京东</label>当前gps定位城市</div>
		   		<i class="iconfont icon-duigou"></i>
		   	</div>
		   	<!--地址列表-->
		   	<div class="hot-adr-list">
		   		<dl class="hot-adr-item">
		   			<dt>日本热名城市</dt>
		   			<dd>东京</dd>
		   			<dd>大阪</dd>
		   			<dd>京东</dd>
		   		</dl>
		   		<dl class="hot-adr-item">
		   			<dt>泰国热名城市</dt>
		   			<dd>东京</dd>
		   			<dd>大阪</dd>
		   			<dd>京东</dd>
		   		</dl>
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
		t.$search = $('#search');

		t.handle();	
	},	
	data:function(){
		return {
			isDel: false,
			isInput: false,
			searchAdr: ''
		}
	},
	methods: {
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
			t.$search.on('focus', function(){
				t.isDel = true;
			}).on('input', function(){
				t.isInput = true;
			});
		},
		delVal: function(){
			var t = this;
			t.isInput = t.isDel = false;
			t.searchAdr = '';
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