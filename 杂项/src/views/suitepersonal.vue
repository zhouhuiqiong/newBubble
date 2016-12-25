<template>
	<div class="container container1">
		<header class="bar bar-nav title-bar title-bar1 title-bar2">

		  <a class="iconfont icon-mingpianxuanzhong01 pull-right"></a>
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>

		  <h1 class="title">个人中心</h1>
		</header>
		<div class="content  home-content">
			<div class="user-inf-wap">
				<div class="image-text">
					<img src="https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=3829429095,3803476155&amp;fm=85&amp;s=92D415CEDFE1B9725445C007000030C1">
					<p class="user-name"><a href="javascript:void(0);">苦艾又去大保健啦
					<span class="iconfont icon-yxj-auth clr3"></span></a></p>
					<div class="suite-inf">
						<p>联系电话：109439482</p>
						<p>联系邮箱：email@email.com</p>
					</div>
				</div>

			</div>
			<!--订单信息-->
			<div class="order-num">
				<div>
					<p>今日完成订单</p>
					<h3>20</h3>
				</div>
				<div>
					<p>本周完成订单</p>
					<h3>100</h3>
				</div>
				<div>
					<p>本月完成订单</p>
					<h3>300</h3>
				</div>
			</div>
		</div>	
	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
		
		
	},
	data:function(){
		return {
			dataList: []
			
		}
	},
	methods: {
		
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	},
	components:{
      
    }
};

</script>