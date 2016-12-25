<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">毛大毛</h1>
		</header>
		<div class="content home-content">
			<!--消息区域-->
			<div class="chat-list">
				<section class="msg-list">
					<div class="uword">
						<img class="offline" src="http://a.tbcdn.cn/mw/app/ww/h5/images/offline.png">
						<p>
							<span>
							<i class="u-jian"></i>

								<em>11-27 09:48:19</em>
								<br>
							少爷正在用餐，亲可自行拍下，有问题少爷会稍后给亲详细的回复，希望亲可以购物愉快~！
							</span>
						</p>
					</div>
				</section>
				<section class="msg-list">
					<div class="iword">
						<p>
							<span>
							<i class="u-jian"></i>

								<em>11-27 09:48:19</em>
								<br>
									希望亲可以购物愉快~！
							</span>
						</p>
					</div>
				</section>
				<section class="msg-list">
					<div class="uword">
						<img class="offline" src="http://a.tbcdn.cn/mw/app/ww/h5/images/offline.png">
						<p>
							<span>
							<i class="u-jian"></i>
							<em>11-27 09:48:19</em><br>
wkegqwjegwqjegwqej~！wkegqwjegwqjegwqejwk问了我去egqwjegwqjegwqejwkegqwjegwqjegwqejwkegqwjegwqjegwqej</span>
						</p>
					</div>
				</section>
				
			</div>
			<!--end 消息区域-->
		</div>
		<div class="chat-input-box">
			<input type="text" name="" placeholder="输入内容">
			<button class="btn2 btn23 btn231">发送</button>
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
			
		}
	},
	methods: {
		
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	}
};

</script>