$(function(){
	var that = this;
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
    	var turnplate = {
			restaraunts:[],				//大转盘奖品名称
			colors:[],					//大转盘奖品区块对应背景颜色
			outsideRadius:192,			//大转盘外圆的半径
			textRadius:155,				//大转盘奖品位置距离圆心的距离
			insideRadius:68,			//大转盘内圆的半径
			startAngle:0,				//开始角度
			bRotate:false				//false:停止;ture:旋转
		};
		turnplate.defText = ["15元红包", "5夺金币", "200元京东E卡", "3元红包", "3夺金币", "50元的充值卡", "小米手环2 ", "1夺金币"];//VIP
		turnplate.vipText = ["30元红包", "ipad Air2", "500元京东E卡", "10元红包", "3元现金券", "小米 Note2", "7元现金券 ", "iPhone 7"];//VIP
		turnplate.vipPh = ['1.png', '2.png', '11.png', '1.png', '4.png','10.png','5.png','3.png'];
		turnplate.defPh = ['1.png','6.png','9.png','1.png','6.png','8.png','7.png','6.png'];
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
				var angles = item * (360 / turnplate.defText.length) - (360 / (turnplate.defText.length*2));
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
				if(turnplate.bRotate)return;
				turnplate.bRotate = !turnplate.bRotate;
				//获取随机数(奖品个数范围内)
				var item = rnd(1,turnplate.defText.length);
				//奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
				var index = item - 1;

				if(that.index == 0){//普通
					that.text = turnplate.defText[index];
					that.ph = turnplate.defPh[index];
				}else{
					that.text = turnplate.vipText[index];
					that.ph = turnplate.vipPh[index];
				};
				$('.zhong-ph').css('background-image', 'url("images/jiang/'+that.ph+'")');
				console.log(that.text);
				$('.zhong-t').text(that.text);
				rotateFn(item);

			});
			function rnd(n, m){
				var random = Math.floor(Math.random()*(m-n+1)+n);
				return random;
			}
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
			$('#wheelcanvas').addClass('wheelcanvas' + index);
			//
		});
		$('.close-dialog').on('click', function(){
			$('#zhong-dialog').hide();
		});
	};
    that.init = function(){
    	that.index = 0;
		that.rollInf();
		that.turnplateFun();
		that.action();
	};
	that.init();
});