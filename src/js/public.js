(function(){
	var vuePublic = {}
	vuePublic.install = function(Vue){
		var that = Vue.prototype;
		//远程获取数据
		//this.$http.jsonp('/someUrl', [data], [options]).then(successCallback, errorCallback);
		that.getServerData = function(data){
			var type = data.type ? data.type : 'post';
			// this.$http({
			// 	method: 'get',
			// 	url: 'http://192.168.3.156:9000/src/data/' + data.url + '.json',
			// 	data: data.data
			// }).then(function(results){
			// 	data.scuess(results.data);
			// });
			//跨域
			$.ajax({  
		        type: 'post',  
		        url : 'http://118.178.188.7:8104/'+ data.url +'.action',  
		        data: data.data, 
		        success: function(results){
		        	if(results.state == 200){
		        		data.success(results);
		        	}else{
		        		if(typeof data.error == 'function') data.error(results);
		        	};
		        },  
		        error: function(results) {	
		        }  
		    }); 
		     
		};
		//滚动条加载数据
		that.scrollList = function(data){
			var t = this;
			var params = $.extend({
			},data);
			$(params.scrollObj).scrollTop(0);
			$(params.scrollObj).on('scroll', function(){
				var el = $(this);
				if(t.noData){
					t.loading = true;
					return;
				}else{
					t.loading = false;
				};
				var totalHeight = parseFloat(el.height()) + parseFloat(el.scrollTop());
				//tab 多个
				var str = t.currentStr ? t.currentStr : '';
				if(el[0].scrollHeight - totalHeight <=3){
					setTimeout(function(){
          				if (t.loading) return;
						var scrollTop = el[0].scrollHeight - el.height() - 20;
						t['currentPage' + str] ++;
						el.scrollTop(scrollTop);
					}, 1000);
				};
		    });
		};
		//返回顶部动画
		that.scrollTo = function(options){
			var defaults = {
		        toT : 0,    //滚动目标位置
		        durTime : 500,  //过渡动画时间
		        delay : 30,     //定时器时间
		        callback:null   //回调函数
		    };
		    var opts = $.extend(defaults,options),
		        timer = null,
		        _this = opts.scope.scroll,//元素
		        curTop = _this.scrollTop(),//滚动条当前的位置
		        subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
		        index = 0,
		        dur = Math.round(opts.durTime / opts.delay),
		        smoothScroll = function(t){
		            index++;
		            var per = Math.round(subTop/dur);
		            if(index >= dur){
		                _this.scrollTop(t);
		                window.clearInterval(timer);
		                if(opts.callback && typeof opts.callback == 'function') opts.callback();
		                return;
		            }else{
		                _this.scrollTop(curTop + index*per);
		            }
		        };
		    timer = setInterval(function(){
		        smoothScroll(opts.toT);
		    }, opts.delay);
		};
		//返回上一个页面
		that.goBack = function(){
			history.go(-1);
		};
		//倒计时,阅读窗口
		that.domeTime = function(data){
			var opts = $.extend({
				time: 10
			},data);
			opts.scope.btntext = ''+ opts.time +'s';
			var timer = setInterval(function(){
				opts.time --;
				opts.scope.btntext = ''+ opts.time +'s';
				if(opts.time == 0){
					opts.scope.btntext = opts.endText;
					clearInterval(timer);
					if(typeof opts.callback == 'function') opts.callback();
				};
			},1000);
		};
		//cookie操作
		that.cookie = {
			set: function(key, val, time){
				var str = key + '=' + escape(val);
				if(time > 0){
					var date = new Date();
					date.setTime(time * 3600 * 100);
					str += '; expires=' + date.toUTCString();
				};
				document.cookie = str;
			},
			get: function(key){
				for (var i = document.cookie.split("; "), n = 0; n < i.length; n++) {
					var t = i[n].split("=");
					if (t[0] == key) return unescape(t[1])
				}
			},
			del: function(key){
				var i = new Date;
				i.setTime(i.getTime() - 1e4),
				document.cookie = key + "=a; expires=" + i.toGMTString();
			}
		};
		//验证
		that.string = {
			isMobile: function(val) {//手机验证
			    var phoneReg = /^(((13[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			    return phoneReg.test(val);
			},
			isEmail: function(val){
    			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/i.exec(val) != null;
  			},
  			isImg: function(val){
				return new RegExp("[.]+(jpg|jpeg|png|bmp|gif)$", "gi").test(val);
			},
			trim: function(val){
				if(!val) return;
    			return val.replace(/(^\s*)|(\s*$)/g, '');
  			},
  			isNull: function(val){
			    val = this.trim(val);
			    return val != null && val.length > 0;
			},
			isLength: function(val, l){
			    val = this.trim(val);
			    return val.length >= l;
			},
			isEquality: function(str1, str2){
			    return this.trim(str1) == this.trim(str2);
			}
		};
		//home 拉动滚动条浮动菜单栏{scope: }
		that.fixedBoxPlug = function(data){
			var opts = $.extend({
				scollParent: '.infinite-scroll',//监听滚动对象
				fixedbox: '.select-wrap' //需要浮动的对象
			},data);
			var $scroll = $(opts.scollParent),$obj = $(opts.fixedbox);
    		var top = $obj[0].offsetTop;

		    $obj.on('click',function() {
		    	var total = $(window).height() + $scroll.scrollTop(),
		    		body = $scroll[0].scrollHeight;
				if (!opts.scope.isFixedbox && total < body) {
					opts.scope.isFixedbox = true;
					$scroll.scrollTop(top);
				};
				
		    });
		    $scroll.on('scroll',function() {
		    	opts.scope.isFixedbox = $(this).scrollTop() < top ? false : true;
    		});
		};
		//选中样式,相邻的删除
		that.eStyle = {
			clickActive: function(obj) {
				obj.addClass('active').siblings().removeClass('active');
			}
		};
		//提交订单预约，时间处理yyyy-MM-dd HH:mm:ss
		// that.orderTime = function(str){
		// 	var data = new Date(),
		// 		y = data.getFullYear(),
		// 		m = data.getMonth() + 1,
		// 		d = data.getDate();
		// 		console.log(str);
		// 	return str + ':00';
		// };
		//获取选中多选框的值
		that.checkList = function(obj){
			var ary = [];
			obj.each(function(){
				ary.push($(this).val());
			});
			return ary;
		};
		that.getUserInfo =  function(scope,fn){
			that.getServerData({
				url: 'user/info',
				data: {
					token: scope.$root.userId
				},
				success: function(result){
					scope.userInfo = result.content;
					if(typeof fn == 'function') fn();
				}
			});
		};
		//退出登录
		that.exitFun = function(scope){
			that.getServerData({
				url: 'logout',
				data: {
					token: that.cookie.get('userId')
				},
				success: function(){
					that.cookie.del('userId');
					scope.$dispatch('userId','');
					if(scope.goHome){
						$.toast('退出成功!');
						scope.$router.go({path:'/home'});
					}else{
						scope.$router.go({path:'/login'});
					}
				}
			})
		};
		that.closeModel = function(){
			$.closeModal($('.modal-in'));
		}
		// that.promiseFun = function(data){
		// 	return new Promise(function(resolve){
		// 		that.getServerData({
		// 			url: data.url,
		// 			data: data.data,
		// 			success: function(result){
		// 				resolve(result);
		// 			}
		// 		});
		// 	});
		// }
	}
	module.exports = vuePublic
})();

