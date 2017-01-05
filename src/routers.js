module.exports = function(router){
	router.map({
		'/home':{
			name:'home',
			component: require('./views/home.vue')
		},
		'/seach':{
			name:'seach',
			component: require('./views/seach.vue')
		},
		'/news':{
			name:'news',
			component: require('./views/news.vue')
		},
		'/huelist': {//色相
			name:'huelist',
			component: require('./views/huelist.vue')
		},
		'/details': {
			name:'details',
			component: require('./views/details.vue')
		},
		'/login': {
			name:'login',
			component: require('./views/login.vue')
		},
		'/personal': {//用户中心
			name:'personal',
			component: require('./views/personal.vue')
		},
		'/editph': {//编辑资料（用户中心）
			name: 'editph',
			component: require('./views/editph.vue')
		},
		'/editlist': {//编辑资料（用户中心）
			name: 'editlist',
			component: require('./views/editlist.vue')
		},
		'/editname': {//编辑昵称（用户中心）
			name: 'editname',
			component: require('./views/editname.vue')
		},
		'/editmail': {//编辑邮箱（用户中心）
			name: 'editmail',
			component: require('./views/editmail.vue')
		},
		'/editpassword': {//修改密码（用户中心）
			name: 'editpassword',
			component: require('./views/editpassword.vue')
		},
		// '/shopimg': {//帮助中心
		// 	name: 'shopimg',
		// 	component: require('./views/shopimg.vue')
		// },
		'/orderdetails': {//服务详情页
			name: 'orderdetails',
			component: require('./views/orderdetails.vue')
		},
		'/judgelist': {//用户评价列表
			name: 'judgelist',
			component: require('./views/judgelist.vue')
		},
		'/ordersubmit': {//提交订单
			name: 'ordersubmit',
			component: require('./views/ordersubmit.vue')
		},
		'/pay': {//支付页面
			name: 'pay',
			component: require('./views/pay.vue')
		},
		'/address': {//定位
			name: 'address',
			component: require('./views/address.vue')
		},
		'/sign': {//注册
			name: 'sign',
			component: require('./views/sign.vue')
		},
		'/forget': {//忘记密码
			name: 'forget',
			component: require('./views/forget.vue')
		},
		'/myorder': {//我的订单
			name: 'myorder',
			component: require('./views/myorder.vue')
		},
		'/myorderdetails': {//我的订单详情
			name: 'myorderdetails',
			component: require('./views/myorderdetails.vue')
		},
		'/suitelogin': {//随从登录
			name: 'suitelogin',
			component: require('./views/suitelogin.vue')
		},
		'/suiteorder': {//随从订单
			name: 'suiteorder',
			component: require('./views/suiteorder.vue')
		},
		'/suitepersonal': {//随从个人中心
			name: 'suitepersonal',
			component: require('./views/suitepersonal.vue')
		},
		'/suitenews': {//随从个人中心
			name: 'suitenews',
			component: require('./views/suitenews.vue')
		},
		'/huedertails': {//色相详情页
			name: 'huedertails',
			component: require('./views/huedertails.vue')
		},
		'/chat': {//聊天
			name: 'chat',
			component: require('./views/chat.vue')
		},
		'*': {
	      component: require('./views/home.vue')
	    }
	    
		// '/my_views/:viewId': {
		// 	name:'my_views_detail',
		// 	component: require('./views/my_views_detail.vue'),
		// 	auth: true // 此页面需要用户登录
		// },
		// 'async':{
		// 	//http://forum.vuejs.org/topic/114/vue-router-异步加载的例子
		// 	//http://vuejs.github.io/vue-router/zh-cn/lazy.html
		// 	name:'async',
		// 	component: function(reslove){
		// 		//异步加载，
		// 		//例子
		// 		return require(['./views/async.vue'],reslove)
		// 	}
		// },
		// 'async_loading':{
		// 	//http://forum.vuejs.org/topic/114/vue-router-异步加载的例子
		// 	name:'async_loading',
		// 	component: function(reslove){
		// 		//异步加载，
		// 		//例子
		// 		return require(['./views/async_loading.vue'],reslove)
		// 	}
		// },

		// //触摸事件
		// 'touch':{
		// 	name:'touch',
		// 	component:function(reslove){
		// 		return require(['./views/touch.vue'],reslove)
		// 	}
		// },
		// // not found handler
	 //    '*': {
	 //      component: require('./views/not_found.vue')
	 //    }
	});

	window.routeList=[];
	router.beforeEach(function(transition){
		//可以通过在路由中的自定义字段来验证用户是否需要登陆
		// if(transition.to.auth){
		// 	console.log('通过配置路由中自定义的字段验证是否需要登陆');
		// }

		// //如果是中止，这里可以判断用户登录
		// //if(transition.to.path === '/forbidden'){
		if(transition.to.name == 'forbidden'){
			router.app.authenticating = true
			setTimeout(function(){
				router.app.authenticating = false
				alert('此路由在全局中设置为中止');
				transition.abort();
			},1500);
		}
		var result = transition.to.name;
		if(result == 'seach'){
			if(window.innerHeight <= 500 && window.innerWidth == 320){//4s以下设备
				router.app.effect='fade';
			}else{
				router.app.effect='bottom';
			};
		}else if(result == 'news' || result == 'details'  || result == 'orderdetails'){
			if(window.innerHeight <= 500 && window.innerWidth == 320){//4s以下设备
				router.app.effect='fade';
			}else{
				router.app.effect='left';
			};
		}else if(result == 'home' ||  !result){
			router.app.effect='fade';
		}else{
			router.app.effect='fade';
		};
		
		if(result == 'home' || result == 'personal' ||  result == 'huelist' || !result){
			$('#barNav').css('display','inline-block');
			$('#suiteNav').hide();
		}else if(result == 'suiteorder' || result == 'suitepersonal' || result == 'suitenews'){
			$('#suiteNav').css('display','inline-block');
			$('#barNav').hide();
		}else{
			$('#barNav,#suiteNav').hide();

		};
		if(routeList.length > 1 && transition.to.name==routeList[routeList.length-2]['name']){
			//router.app.effect='back';
			routeList.splice(routeList.length-1,1);
		} else {
			//router.app.effect='fade';
			routeList.push({
				name : transition.to.name,
				path : transition.to.path,
				query : transition.to.query,
				params : transition.to.params,
				timer: +new Date
			});

		}
		transition.next();

	});


	//可以记录访问路径
	router.afterEach(function(transition){
		for (var i = 0; i < routeList.length; i++) {
			//console.log(routeList[i].name);
		};
	});
}