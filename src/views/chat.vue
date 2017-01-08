<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a>
		  <h1 class="title">{{sendName}}</h1>
		</header>
		<div class="content home-content">
			<!--消息区域-->
			<div class="chat-list">
<!-- 				<section class="msg-list">
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
				</section> -->
				
			</div>
			<!--end 消息区域-->
		</div>
		<div class="chat-input-box">
			<input type="text" name="" placeholder="输入内容" v-model="sendNews">
			<button class="btn2 btn23 btn231" @click="sendNewsFn()">发送</button>
		</div>
	</div>
</template>
<script>
require('../js/strophe-custom-1.3.2.js');
require('../js/littlec.im-1.3.2.js');
module.exports = {
	ready: function(){
		var that = this;
		that.init();
		that.q = that.$route.query;
		that.sendName = that.q.name;
		that.$newsBox = $('.chat-list');
		that.logo();
	},
	data:function(){
		return {
			sendNews: '',
			limit: 10//获取几条历史信息
		}
	},
	methods: {
		init: function(){
			var that = this;
			that.conn = new Littlec.im.Connection();
			that.conn.init({
				appKey: that.$root.appKey,
				//当连接成功时的回调方法 
				onOpened: function(message) {
					console.log(message);
					that.historyNews();
				},
				//当连接关闭时的回调方法 
				onClosed: function() {
				},
				//收到文本、表情消息时的回调方法 
				onTextMessage: function(message) {
					that.getNewNews(message);
				},
				//消息到达好友的回调
				onArriveMessage: function(message){ 
					that.mySendNews(message);
				},
				//接收管理员消息
				onSystemMessage: function(message){
					that.getSystemNews(message);
				},
				//系统通知回调方法 
				onSysemMessage: function(msg) {
				}
			});
		},
		sendNewsFn: function(){
			var that = this;
			var options = {
				to :[that.sendName], //长度为 1 的好友用户名数组,单聊 
				msg : that.sendNews,
				type :'chat', //单聊 
				error:function(e){
					console.log(e)
				}
			};
			that.conn.sendTextMessage(options);		
		},
		logo: function(){
			var that = this;
			// var options = {
			// 	username: 'test', //用户名字符串 
			// 	password: '123456',//密码字符串 name:’testnick,//用户昵称字符串
			// 	success: function(msg){
			// 		console.log(msg)
			// 	}//注册成功回调函数 error:function(e){console.log(e) }//注册失败回调函数
			// }
			// that.conn.registerUserWithoutPhoneCode(options);
			//登录
			that.conn.open({
				user :'test',
				pwd : '123456' 
			});
		},
		historyNews: function(){//获取历史消息
			var that = this;
			var hisStroy = {
				to: that.sendName, //好友用户名
				limit: that.limit,//历史消息数量 
				success:function(messages){//成功回调函数
					console.log(messages);
				},
				error:function(e){//失败回调函数
					
				}
			};
			that.conn.queryChat(hisStroy);
		},
		mySendNews: function(message){//我发送的消息
			var that = this;
			var html ='<section class="msg-list">' + 
						'<div class="iword"><p><span><i class="u-jian"></i>' +
								'<em>'+message.time+'</em><br>' + 
									that.sendNews +
							'</span></p></div></section>';
			that.$newsBox.append(html);
		},
		getNewNews: function(message){//接收好友消息
			var that = this;
			var html ='<section class="msg-list">' + 
						'<div class="uword"><img class="offline" src="./src/images/userph.jpg"><p><span><i class="u-jian"></i>' +
								'<em>'+message.time+'</em><br>' + 
									message.data +
							'</span></p></div></section>';
			that.$newsBox.append(html);
		},
		getSystemNews: function(message){//接收系统的消息
			var that = this;
			var html ='<section class="msg-list">' + 
						'<div class="uword"><img class="offline" src="./src/images/userph.jpg"><p><span><i class="u-jian"></i>' +
								'<em>'+message.time+'</em><br>' + 
									message.content+
							'</span></p></div></section>';
			that.$newsBox.append(html);
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