window.util = {
  goBack: function() {
    window.history.go(-1);
  },
  domeTime: function(data){
      var that = this;
      var opts = $.extend({
        time: 10,
        target : '.btn-box button'
      },data);
      var $obj = $(opts.target).find('i');
      $obj.text('('+opts.time+')');
      var timer = setInterval(function(){
        opts.time --;
        $obj.text('('+opts.time+')');
        if(opts.time == 0){
            $obj.text(null);
            clearInterval(timer);
            if(typeof opts.callback == 'function') opts.callback();
            return true;
        };
      },1000);
  },
  fixedbox: function(opts){//拉动滚动条浮动菜单栏
    var that = this;
    var opts = $.extend({
      scollParent: '.infinite-scroll',//监听滚动对象
      fixedbox: '.select-wrap'//需要浮动的对象
    }, opts);
    var $scroll = $(opts.scollParent),
        $obj = $(opts.fixedbox);
    var top = $obj[0].offsetTop;
    $obj.on('click', function(){
      if(!$(this).hasClass('fiex-select')){
          $(this).addClass('fiex-select');
          $scroll.scrollTop(top);
      };
    });
    $scroll.on('scroll', function(){
      if($(this).scrollTop() < top){
        $obj.removeClass('fiex-select')
      }else{
        $obj.addClass('fiex-select')
      }
    }); 
  },
  clickActive: function(obj){
    obj.addClass('active').siblings().removeClass('active');
  },
  

  /*
  ** 获取url地址栏的参数
  */
  getParsm: function(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
  }
};

/*
**字符串操作
*/
(function(){
  function _String(){};
  /**
   * 手机号验证
   * @param  {[type]}  val [description]
   * @return {Boolean}     [description]
   */
  _String.isMobile = function(val) {
    var phoneReg = /^(((13[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return phoneReg.test(val);
  };
  /**
  * 去掉左右空格
  */
  _String.trim = function(val){
    return val.replace(/(^\s*)|(\s*$)/g, '');
  };
  /**
  * 检查是否为Null
  */
  _String.isNull = function(val){
    val = this.trim(val);
    return val != null && val.length > 0;
  };
  /**
  ** 长度验证
  */
  _String.isLength = function(val, l){
    val = this.trim(val);
    return val.length >= l;
  };
  /**
  *两个字符串是不是相等
  */
  _String.isEquality = function(str1, str2){
    str1 = this.trim(str1);
    str2 = this.trim(str2);
    return str1 == str2;
  };
  /**
  * 邮箱验证
  */
  _String.isEmail = function(val){
    return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/i.exec(val) != null;
  };
  /**
  * 图片
  */
  _String.isImg = function(val){
    return new RegExp("[.]+(jpg|jpeg|png|bmp|gif)$", "gi").test(val);
  };
  util.string = _String;
})();
(function(){
  function scrollList(){
  };
  scrollList.prototype = {
    init: function(obj,data){
      var that = this;
      that.obj = obj;
      that.data = $.extend({
        page: 1,
        size: 10,
        vessel: '',//组装数据的容器
        noData: false//false 有数据，ture 没数据
      },data);
      that.obj.item = parseInt(that.obj.item) ? that.obj.item : '';
      that.obj['dataList' + that.obj.item] =  [];

    },
    getServerDate: function(data){//获取远程数据
      $.ajax({
          method: 'POST',
          data: data.data,
          url: data.url,
          success: function(result){//成功

          }
      })

    },
    getListData: function(){//
      var that = this;
      if(that.data.page == 1) that.initIScroll();
      //数据
      var ary = [];
      for (var  i = 0; i < 10; i++) {
        that.obj['dataList' + that.obj.item].push({
          id: i,
          name: 'demo' +  i
        });
      };
      that.obj['dataList' + that.obj.item].concat(ary);
      that.data.page++;
    },
    initIScroll: function(){//滚动条动作
      var that = this;
      $(that.data.scrollObj).on('scroll', function(){
          var el = $(this);
          var h = parseFloat(el.height()),
          scrollTop = parseFloat(el.scrollTop()),
          totalHeight = h + scrollTop;
          if(el[0].scrollHeight - totalHeight <= 3){
            that.loadData();
          };
      });
    },
    loadData: function(){
      var that = this;
      var scroller = $(that.data.scrollObj);
      that.obj.loading = false;
      setTimeout(function() {
          if (that.obj.loading) return;
          that.obj.loading = true;
          that.getListData();//远程获取数据
          var scrollTop = scroller[0].scrollHeight - scroller.height() - 20;
        scroller.scrollTop(scrollTop)
      }, 1000);
    }
  }
  util.scrollList =  scrollList;
})()
$.fn.scrollTo =function(options){
    var defaults = {
        toT : 0,    //滚动目标位置
        durTime : 500,  //过渡动画时间
        delay : 30,     //定时器时间
        callback:null   //回调函数
    };
    var opts = $.extend(defaults,options),
        timer = null,
        _this = this,
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
                if(opts.callback && typeof opts.callback == 'function'){
                    opts.callback();
                }
                return;
            }else{
                _this.scrollTop(curTop + index*per);
            }
        };
    timer = window.setInterval(function(){
        smoothScroll(opts.toT);
    }, opts.delay);
    return _this;
};
/*
**cookie 增删减
*/
(function(){
  var Cookie = {
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
      document.cookie = key + "=a; expires=" + i.toGMTString()
    }
  }
  util.cookie =  Cookie;
})();
(function(){
  function YuTime(opts){
    var that = this;
    that.opts = $.extend({
      yuStartTime: '18:30',//营业时间
      yuEndTime: '03:30',//营业结束时间
      gap: 15,//最大预约时间断天数
      joint: '-',//时间拼接符号
      startAheadTime: 30,//最早可选时间为当前系统时间加30分后最近的半点
      endAheadTime: 1 //最晚可选时间为该服务营业时间之前1小时
    },opts);
  }
  YuTime.prototype = {
    init: function(){
      var that = this;
      that.tager = that;
    },
    nowTime: function(){//获取时间范围
      var that = this,opts = that.opts;
      var nowD = that.nowDate = that.getDateAry();
      var aryData = [];
      that.startYingTime = that.jointTime(nowD.y,nowD.m,nowD.d);
      aryData[0] = {
        y: that.startYingTime ,
        m:  '今天' + that.jointTime(nowD.y,nowD.m,nowD.d,'/', 'month')
      };
      for(var i=1; i<opts.gap; i++){
        var endD = that.endDate = that.getDateAry(i);
        that.endYingTime =  that.jointTime(endD.y,endD.m,endD.d);
        switch(i){
          case 1:  break;
          case 2: break;
          default: text 
        };
        if(i == 1){
          text = '明天';
        }else if(i == 2){
          text = '后天'; 
        }else{
          text = this.getWeek(endD.x);
        };
        aryData.push({
          y: that.endYingTime ,
          m: text + that.jointTime(endD.y,endD.m,endD.d,'/', 'month')
        });
      };
      return aryData;
    },
    getWeek: function(num){ //星期
      var text = '周日';
      switch(num){
        case 1: text='周一'; break;
        case 2: text='周二'; break;
        case 3: text='周三'; break;
        case 4: text='周四'; break;
        case 5: text='周五'; break;
        case 6: text='周六'; break;
      };
      return text;
    },
    getDateAry: function(gap){//获取时间
      var date = new Date();
      if(gap){
        var endDate = new Date();
        endDate.setDate(date.getDate() + gap);
        date = endDate;
      };
      var y = date.getFullYear();
      var m = date.getMonth();
      var d = date.getDate();
      var h = date.getHours();
      var mi = date.getMinutes();
      var x = date.getDay();
      return {
        y:y,
        m:m,
        d:d,
        h:h,
        mi: mi,
        x: x
      }
    },
    jointTime: function(y,m,d,joint,type){//拼接时间格式
      var that = this,opts = that.opts;
      var joint = joint ? joint : opts.joint;
      switch(type){
        case 'month' : str = that.initStr(m+1) + joint + that.initStr(d); break;
        default: str = y + joint + that.initStr(m+1) + joint + that.initStr(d);
      }
      return str;
    },
    initStr: function(str){
      return str > 9 ? str : '0' + str;
    },
    splitTime: function(time){//小时与分钟分开
      var str = time.split(':'),
        h = parseInt(str[0]),
        m = parseInt(str[1]);
      return {
        h: h,
        m: m
      }
    },
    initHour: function(val){
      var that = this,opts = that.opts;
      var time = new Date(val);//选中的时间
      var start = that.splitTime(opts.yuStartTime),
        end = that.splitTime(opts.yuEndTime),
        changed = time.getDate();
      that.nowTo = that.getDateAry();//获取当前时间
      if(changed == that.nowTo.d){//判断是不是当天
        if(start.h < end.h){//取中间
          if(start.h > that.nowTo.h){//当前时间小于预约时间，以预约时间为准
            that.yuStartObj = that.splitTime(opts.yuStartTime);
          }else{//以系统时间为准，上面加半小时
            that.yuStartObj = that.systemTime();
          };
          that.yuEndObj = that.endTime(opts.yuEndTime);
          return that.aryTimeList(that.yuStartObj,that.yuEndObj);       
        }else{//取两头
          that.yuEndObj = {
            h: 23,
            m: 30
          };
          that.yuStartObj = that.splitTime(opts.yuStartTime);
          that.systemTimeAry = that.systemTime();//获取系统当前时间
          if(that.systemTimeAry.h > that.yuStartObj.h) that.yuStartObj = that.systemTimeAry;
          return that.aryTimeList(that.yuStartObj,that.yuEndObj);
        };
      }else{
        if(start.h < end.h){
          that.yuStartObj = that.splitTime(opts.yuStartTime);
          that.yuEndObj = that.endTime(opts.yuEndTime);
          return that.aryTimeList(that.yuStartObj,that.yuEndObj);
          
        }else{
          that.yuStartObj = that.splitTime(opts.yuEndTime);
          that.yuEndObj = that.endTime(opts.yuStartTime);
          return that.calculate1();
        }
      };
    },
    systemTime: function(){
      var that = this;
        nowTime = that.nowTo;
      var h = nowTime.h,
          m = nowTime.m,
          nh,nm;
        if(m == 0){
          nh = h;
          nm = 30;
        }else if(m > 0 && m <= 30){
          nh = h + 1;
          nm = 0;
        }else{
          nh = h + 1;
          nm = 30;
        };
        return {
          h: nh,
          m: nm
        };
    },
    endTime: function(obj){//可预约时间是营业时间 - 1
      var that = this;
      var e = that.splitTime(obj);
      return  {
        h: e.h - 1,
        m: e.m
      };
    },
    calculate1: function(){//取中间
      var that = this;
      var s = that.yuStartObj,
        e = that.yuEndObj;
      var ary1 = that.aryTimeList({
        h: '0',
        m: '0'
      },s);
      var ary2 = that.aryTimeList(e,{
        h: '23',
        m: '30'
      });
      return [].concat(ary1,ary2);

    },
    aryTimeList: function(s,e){//s 开始时间，e:结束时间
      var that = this;
        opts = that.opts;
      var gap = opts.startAheadTime;
      var hourAry = [];
      for(var i = s.h,j=0; i<= e.h; i++,j++){
        if(i == s.h){
          if(s.m == gap){
            hourAry.push((s.h+j) + ':' + gap);
          }else{
            hourAry.push((s.h+j) + ': 00');
            hourAry.push((s.h+j) + ':' + gap);
          }
        }else if(i < e.h){
          hourAry.push((s.h+j) + ': 00');
          hourAry.push((s.h+j) + ':' + gap);
        }else if(i == e.h){
          if(e.m == gap){
            hourAry.push((s.h+j) + ': 00');
            hourAry.push((s.h+j) + ':' + gap);
          }else{
            hourAry.push((s.h+j) + ': 00');
          }
        }
      };
      return hourAry;
    }
  }
  util.yuTime = YuTime;
   //new util.yuTime().init();
})();
(function(){
  function inputAnmition(){    
  };
  inputAnmition.prototype = {
    init: function(data){
      var t = this;
      t.opts = $.extend({
          el : '.input-style',
          moveUp: 'place-tag-top',//移上去动画
          moveDown: 'place-tag-bottom'//下来动画
      },data);
      $el = $(t.opts.el);
      $el.each(function(item){
        t.delShow($(this));
        t.spanShow($(this));
      });
      t.active();
    },
    active: function(){
      var t = this;
      $el.find('.icon-shanchu').on('touchstart', function(){//点击删除
          var $input = $(this).siblings('input');
          var $span = $(this).siblings('span');
          $input.val('');
          t.spanShow($(this).parent(t.opts.el));
          if($span.hasClass('place-tag-top')){
            $span.removeClass('place-tag-top').addClass('place-tag-bottom');
          }else{
            $span.removeClass('place-tag-top,place-tag-bottom');
          };
          $(this).hide();
      });
      $el.find('span').on('click', function(){
        $(this).siblings('input').focus();
      });
      $el.find('input').on('focus', function(){
        t.add = t.opts.moveUp;
        t.del = t.opts.moveDown;
        t.styleHanle($(this));
        t.delShow($(this).parent(t.opts.el));
      }).on('blur', function(){
        t.add = t.opts.moveUp;
        t.del = t.opts.moveDown;
        t.styleHanle1($(this));
        t.delShow($(this).parent(t.opts.el));
      }).on('input', function(){
        t.add = t.opts.moveUp;
        t.del = t.opts.moveDown;
        t.delShow($(this).parent(t.opts.el));
        if(!$(this).val()){
          $(this).siblings('span').show().addClass(t.add).removeClass(t.del);
        } 
      });
    },
    delShow: function(obj){//删除按钮的显示
      var t = this;
      var $text = obj.find('input');
      var $del = obj.find('.icon-shanchu');
      $text.val() ? $del.show() : $del.hide();
    },
    spanShow: function(obj){//文本提示显示
      var t = this;
      var $span = obj.find('span');
      var $text = obj.find('input');
      $text.val() ? $span.hide() : $span.show();
    },
    styleHanle: function(that){
      var $span = that.siblings('span');
      var t = this;
      if(!that.val()){
        $span.addClass(t.add).removeClass(t.del);
      }else{
        $span.removeClass(t.del);
      };
    },
    styleHanle1: function(that){
      var $span = that.siblings('span');
      var t = this;
      if(!that.val()){
        $span.addClass(t.del).removeClass(t.add);
      }else{
        $span.removeClass(t.del);
      };
    }
  };
  util.inputAnmition = inputAnmition;
})()      
module.exports = util;



