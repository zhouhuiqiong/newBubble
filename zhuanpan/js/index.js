$(function(){
	var that = this;
	var turnplate = {
		awards: 8,//多少个奖品
		bRotate: false				//false:停止;ture:旋转
	};
	turnplate.defAward = {
		'155': {
			name: '15元红包',
			img: '1.png',
			index: 1
		},
		'156': {
			name: '5夺宝币',
			img: '6.png',
			index: 2
		},
		'157': {
			name: '200元京东E卡',
			img: '9.png',
			index: 3
		},
		'158': {
			name: '3元红包',
			img: '1.png',
			index: 4

		},
		'159': {
			name: '3夺宝币',
			img: '6.png',
			index: 5
		},
		'160': {
			name: '50元的充值卡',
			img: '8.png',
			index: 6
		},
		'161': {
			name: '小米手环2',
			img: '7.png',
			index: 7
		},
		'162': {
			name: '1夺宝币',
			img: '6.png',
			index: 8
		}
	};
	turnplate.vipAward = {
		'153': {
			name: '30元红包',
			img: '1.png',
			index: 1
		},
		'154': {
			name: 'ipad Air2',
			img: '2.png',
			index: 2
		},
		'157': {
			name: '500元京东E卡',
			img: '11.png',
			index: 3
		},
		'164': {
			name: '10元红包',
			img: '1.png',
			index: 4
		},
		'165': {
			name: '3元现金券',
			img: '4.png',
			index: 5
		},
		'166': {
			name: '小米 Note2',
			img: '10.png',
			index: 6
		},
		'167': {
			name: '7元现金券',
			img: '5.png',
			index: 7
		},
		'168': {
			name: 'iPhone 7',
			img: '3.png',
			index: 7
		}
	};
	that.msg = function(msg){
		layer.open({
		    content: msg,
		    style: 'background:rgba(0,0,0,0.5);  color:#fff;  border:none;',
		    time: 1,
		    type: 0,
		    shade: false
		});
    };
	//远程获取数据
	that.getServerDate = function(data){//远程获取数据
	    $.ajax({
			data: data.data,
			url: 'http://test1.lianyingdai.com/index.php/yungouapi/activity/' + data.url,
			type: 'post',
			success: function(msg){
				if(msg.status == 1){//最后修改
					data.success(msg);
				}
			}
		})
    };
	//信息滚动
    that.rollInf = function(){
      that.$roll = $('.win-use-news'),
      that.$rollList = $('.win-use-news li'),
      that.$firstItem = that.$rollList.eq(0);
      that.h = that.$firstItem.height();
      that.$roll.append(that.$firstItem.clone());
      that.maxItem = $('.win-use-news li').length;
      that.current = 0;
      var timer = setInterval(function(){
        if(that.current == (that.maxItem - 1)){
          that.$roll.css({
            marginTop: 0
          });
          that.current = 1;
        }else{
          that.current ++;
        }
         that.$roll.animate({
            marginTop: -(that.current * that.h)
          },1000);
      },3000);
    };
    //转盘操作
    that.turnplateFun = function(){
		var rotateTimeOut = function (){
			$('#wheelcanvas').rotate({
				angle:0,
				animateTo:2160,
				duration:8000,
				callback:function (){
					alert('网络超时，请检查您的网络设置！');
				}
			});
		};
		//旋转转盘 item:奖品位置; txt：提示语;
		var rotateFn = function (item, txt){
				var angles = item * (360 / turnplate.awards) - (360 / (turnplate.awards*2));
				if(angles<270){
					angles = 270 - angles; 
				}else{
					angles = 360 - angles + 270;
				};
				$('#wheelcanvas').stopRotate();
				$('#wheelcanvas').rotate({
					angle:0,
					animateTo:angles + 1800,
					duration: 3000,
					callback:function (){
						$('#zhong-dialog').show();
						turnplate.bRotate = !turnplate.bRotate;
					}
				});
			};
			$('#jiantou').click(function (){
				if(turnplate.bRotate) return;
				turnplate.bRotate = !turnplate.bRotate;
				that.getServerDate({
					data:{
						id: that.gameType,
						uid: that.uid
					},
					url: 'get_game_prizes',
					success: function(data){
						//获取随机数(奖品个数范围内)
						var gameId = data.data.id;
						that.aryData = that.index == 0 ? turnplate.defAward : turnplate.vipAward;
						that.text = that.aryData[gameId].name;
						that.ph = that.aryData[gameId].img;
						$('.zhong-ph').css('background-image', 'url("images/jiang/'+that.ph+'")');
						$('.zhong-t').text(that.text);
						rotateFn(parseInt(that.aryData[gameId].index));
						that.getGameNum();//游戏次数
					}
				});
			});
			
	};
	//获取游戏次数
	that.getGameNum = function(){
		that.getServerDate({
			data: {
				id: that.gameType,
				uid: that.uid
			},
			url: 'get_game_count',
			success: function(data){
				if(data.data){
					var num = data.data.count ? data.data.count : 0;
				}else{
					var num = 0;
				};
				$('.getGame' + that.index).text(num);    
			}
		});
	};
	that.action = function(){
		var that = this;
		that.$btn = $('.change-type-t .btn');
		that.$btn.on('click', function(){
			var index = that.index = that.$btn.index($(this));
			that.$btn.removeClass('active');
			$(this).addClass('active');
			//文本
			$('.change-txt:eq('+index+')').show().siblings('.change-txt').hide();
			//转盘图片
			$('#wheelcanvas').removeClass('wheelcanvas0').removeClass('wheelcanvas1');
			$('#wheelcanvas').addClass('wheelcanvas' + index);
			//选择的游戏类型
			that.gameType = index == 0 ? that.id : that.vid;
			that.setHref();//中奖记录地址设置
			that.getGameNum();//游戏次数
		});
		$('.close-dialog').on('click', function(){
			$('#zhong-dialog').hide();
		});
	};
	that.getQueryString = function(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	};
	that.getAwardList = function(){//全部中奖记录
		that.$rollObj = $('.win-use-news');
		that.getServerDate({
			data: {
				id: that.id
			},
			url: 'get_prizes_recent',
			success: function(data){
				var ary = data.data;
				var html = '';
				for(var i=0; i<ary.length; i++){
					var name = ary[i].mobile ? ary[i].mobile : ary[i].username;
					html += '<li>'+name+'刚刚抽中<em>'+ary[i].name+'！</em></li>';
				};
				that.$rollObj.empty().append(html);
				that.rollInf();
			}
		});
	};
	that.setHref = function(){
		$('#record').attr('href','list.html?uid=' + that.uid + '&id='+ that.id + '&gameType=' + that.gameType  + '&vid=' + that.vid);
	};
    that.init = function(){
    	that.index = 0;
		that.gameType = that.id = that.getQueryString('id');
		that.uid = that.getQueryString('uid');
		that.vid = that.getQueryString('vid');
		that.turnplateFun();
		that.action();
		that.getAwardList();//摇一摇中奖纪录轮播
		that.getGameNum();//游戏次数
		that.setHref();
	};

	that.init();
});