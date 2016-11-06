<template>
	<div class="container ">
		<div class="content bg">
			<div class="user-inf-wap">
				<div class="image-text">
					<img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2995040420,4087761391&fm=96">
					<p><a v-link="{name:'editlist'}">去去就来<span class="icon icon-right ml"></span>
	</a ></p>
				</div>
			</div>
			<div class="user-nav-list">
				<a class="yu-time">
					<div class="item-title"><i class="iconfont icon-cf-c78 mr"></i>我的订单</div>
					<div class="item-after"><span class="icon icon-right "></span></div>
				</a>
				<!--订单信息-->
				<div class="order-inf order-inf1">
					<h3 class="o-title active">
						<span class="item-t">订单确认</span>
						<span class="item-a">2012-12-12 10:80</span>
					</h3>
					<h3 class="order-inf-t"><img src="http://www.renrenbuy.com/yungou/images/img_weixin.jpg">去问问</h3>
					<ul  class="list-block">
						<li class="item-content" >
							<div class="item-inner">
								<div class="item-title">项目套餐</div>
								<div class="item-after">								{{50000 | price}}</div>
							</div>
						</li>
						<li class="item-content" >
							<div class="item-inner">
								<div class="item-title">项目套餐</div>
								<div class="item-after">								{{50000 | price}}</div>
							</div>
						</li>
						<li class="item-content" >
							<div class="item-inner">
								<div class="item-title">项目套餐</div>
								<div class="item-after">								{{50000 | price}}</div>
							</div>
						</li>
					</ul>
					<div class="total-item">
						<div class="item-title">订单合计:</div>
						<div class="item-after">合计:<span class="total">
								{{30000 | price}}</span></div>
					</div>
					<div class="total-item">
						<span></span>
						<a href="javascript:void(0)" class="btn2">联系客服</a>
					</div>

				</div>
				<!--订单信息-->
				<a class="yu-time">
					<div class="item-title"><i class="iconfont icon-icon mr"></i>联系我们</div>
					<div class="item-after"><span class="icon icon-right"></span></div>
				</a>
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