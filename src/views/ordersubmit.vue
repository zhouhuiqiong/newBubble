<template>
	<div class="container">
		<header class="bar bar-nav">
		  <a class="icon icon-left pull-left" @click="goback"></a>
		  <h1 class="title">提交订单</h1>
		</header>
		<div class="content list infinite-scroll home-content" >
			<div class="list-block infinite-list  media-list">
				<div href="#" class="item-content">
					<div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" style='width: 4rem;'></div>
					<div class="item-inner">
						亲吻后请我喝哦亲我和权威环球网
					</div>
				</div>
			</div>
			<!--预约时间-->
			<div class="list-block">
				<a class="item-content item-link">
					<div class="item-inner">
						<div class="item-title">预约时间</div>
						<div class="item-after"><input type="text" id='datetime-picker' value="选择时间" v-model="ordertime"/>
</div>
					</div>
				</a>
				<div class="item-content">营业时间：18:00 - 02:00，请至少提前1小时预约</div>
			</div>
			<!--特别随从-->
			<div class="list-block">
				<a class="item-content">
					<div class="item-inner">
						<div class="item-title">特别随从</div>
						<div class="item-after">{{especiallyMonye}}</div>
					</div>
				</a>
				<div class="item-content">为您解读，帮您沟通，更多服务请点击查看</div>
			</div>
			<!--自选服务人员-->
			<div class="list-block">
				<a class="item-content">
					<div class="item-inner">
						<div class="item-title">自选服务人员:2000日元</div>
						<div class="item-after">
							<!---->
							<input type="checkbox"  v-model="checkChange">
							<!---->
						</div>
					</div>
				</a>
				<div class="item-content">点击查看说明</div>
			</div>
			<!---->
		</div>
		<!--预约按钮-->
		<div class="bar bar-tab">
			<a href="javascript:void(0)" class="button button-fill button-big button-dark " @click="submitform" :class="{ 'disabled': isDisabled}">确认预约</a>
		</div>
	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
		var that = this;
		$("#datetime-picker").datetimePicker({
		    value: ['2016', '11', '04', '9', '00'],
		    onOpen: function(){
		    	that.isDisabled = false;
		    	$('.picker-item')
		    }
		 });
		if($('.datetime-picker').val() != '预约时间'){
			that.isDisabled = false;
		}
	},
	data:function(){
		return {
			ordertime: '预约时间',
			isDisabled: true,
			serveMonye: 500000,
			especiallyMonye: 3000,//特别随从的价格
			checkChange: true,//附加人员的多选框
			subjoinMonye: '2000'//附加人员的价格
		}
	},
	methods: {
		goback: function(){
			$.confirm('订单未提交，要返回吗？',
				function () {
					util.goBack();
				},
				function () {
					
				},'返回');


		},
		submitform: function(){
			var that = this;
			if(that.isDisabled){
				$.toast('请选择预约时间');
				return;
			};
			that.subjoinMonye = that.checkChange ? that.subjoinMonye : 0;
			var shopList =  {
				type:{
					'服务名称及该服务的价格': that.serveMonye,
					'特别随从': that.especiallyMonye,
					'自选服务人员': that.subjoinMonye

				},
				title: '商家名称',
				total: that.serveMonye + that.especiallyMonye + that.subjoinMonye
			};
			sessionStorage.shopList = JSON.stringify(shopList);
			window.location.href = '#pay'
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