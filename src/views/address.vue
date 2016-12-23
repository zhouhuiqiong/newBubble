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
		   			<dt>{{countryName}}热门城市</dt>
		   			<dd v-for="item in hotCountryList" @click="handle($event,item)">{{item}}</dd>
		   		</dl>
		   	</div>
		   	<div class="input-adr-list" v-show="isInput">
		   		<dl class="hot-adr-item">
		   			<dd v-for="item in searchCountryList" @click="handle($event,item)">{{item}}</dd>
		   		</dl>
		   	</div>
		</div>
	</div>
</template>
<script>

module.exports = {
	ready: function(){
		var that = this;
		that.countryName = that.cookie.get('countryName');
		that.hotCountryFun();	
	},	
	data:function(){
		return {
			searchVal: '',
			isDelVal: false,//删除输入框的值
			isInput: false,
			countryName: '',//默认城市
			hotCountryList: [],
			searchCountryList: []
		}
	},
	methods: {
		showDel: function(){
			var that = this;
			that.isInput = that.isDelVal = that.searchVal ? true : false;
			that.searchCountryFun();
		},
		delInputVal: function(){
			var that = this;
			that.searchVal = '';
			that.isDelVal = false;
		},
		handle: function(event,adr){
			var that = this;
			$('.icon-duigou').remove();
			$(event.target).append('<i class="iconfont icon-duigou"></i>');
			that.cookie.set('countryName', adr);
			that.isInput = false;
			setTimeout(function(){
				that.$router.go({path:'/home'});
			},200);
		},
		hotCountryFun: function(){//搜索城市
			var that = this;
			that.getServerData({
				url: 'city/list',
				data: {
					countryName: that.countryName  
				},
				success: function(data){
					that.hotCountryList = data.content;
				}
			});
		},
		searchCountryFun: function(){//搜索城市
			var that = this;
			that.getServerData({
				url: 'city/list',
				data: {
					countryName: that.searchVal  
				},
				success: function(data){
					that.searchCountryList = data.content;
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