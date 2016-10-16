<template>
	<div class="container">
		<header class="bar bar-nav">
		  <a class="icon icon-left pull-left" @click="gohistory"></a>
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
						<div class="item-after">杜蕾斯</div>
					</div>
				</a>
				<div class="item-content">营业时间：18:00 - 02:00，请至少提前1小时预约</div>
			</div>
			<!--特别随从-->
			<div class="list-block">
				<a class="item-content">
					<div class="item-inner">
						<div class="item-title">特别随从</div>
						<div class="item-after">杜蕾斯</div>
					</div>
				</a>
				<div class="item-content">为您解读，帮您沟通，更多服务请点击查看</div>
			</div>
			<!--自选服务人员-->
			<div class="list-block">
				<a class="item-content">
					<div class="item-inner">
						<div class="item-title">自选服务人员</div>
						<div class="item-after">杜蕾斯</div>
					</div>
				</a>
				<div class="item-content">点击查看说明</div>
			</div>
		</div>
	</div>
	<!--预约按钮-->
	<div class="bar bar-tab">
		<a href="#" class="button button-fill button-big button-dark">确认预约</a>
	</div>
</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
		this.$dispatch('isIndex', false);	
	},
	data:function(){
		return {
			
		}
	},
	methods: {
		gohistory: function(){
			window.history.go(-1);
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