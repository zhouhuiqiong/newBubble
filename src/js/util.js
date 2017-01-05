window.util = {};
(function() {
  function YuTime(opts) {
    var that = this;
    that.opts = $.extend({
      yuStartTime: '18:30',
      //营业时间
      yuEndTime: '03:30',
      //营业结束时间
      gap: 15,
      //最大预约时间断天数
      joint: '-',
      //时间拼接符号
      startAheadTime: 30,
      //最早可选时间为当前系统时间加30分后最近的半点
      endAheadTime: 1 //最晚可选时间为该服务营业时间之前1小时
    },
    opts);
  }
  YuTime.prototype = {
    init: function() {
      var that = this;
      that.tager = that;
    },
    nowTime: function() { //获取时间范围
      var that = this,
      opts = that.opts;
      var nowD = that.nowDate = that.getDateAry();
      var aryData = [];
      that.startYingTime = that.jointTime(nowD.y, nowD.m, nowD.d);
      aryData[0] = {
        y: that.startYingTime,
        m: '今天' + that.jointTime(nowD.y, nowD.m, nowD.d, '/', 'month')
      };
      for (var i = 1; i < opts.gap; i++) {
        var endD = that.endDate = that.getDateAry(i);
        that.endYingTime = that.jointTime(endD.y, endD.m, endD.d);
        switch (i) {
        case 1:
          break;
        case 2:
          break;
        default:
          text
        };
        if (i == 1) {
          text = '明天';
        } else if (i == 2) {
          text = '后天';
        } else {
          text = this.getWeek(endD.x);
        };
        aryData.push({
          y: that.endYingTime,
          m: text + that.jointTime(endD.y, endD.m, endD.d, '/', 'month')
        });
      };
      return aryData;
    },
    getWeek: function(num) { //星期
      var text = '周日';
      switch (num) {
      case 1:
        text = '周一';
        break;
      case 2:
        text = '周二';
        break;
      case 3:
        text = '周三';
        break;
      case 4:
        text = '周四';
        break;
      case 5:
        text = '周五';
        break;
      case 6:
        text = '周六';
        break;
      };
      return text;
    },
    getDateAry: function(gap) { //获取时间
      var date = new Date();
      if (gap) {
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
        y: y,
        m: m,
        d: d,
        h: h,
        mi: mi,
        x: x
      }
    },
    jointTime: function(y, m, d, joint, type) { //拼接时间格式
      var that = this,
      opts = that.opts;
      var joint = joint ? joint: opts.joint;
      switch (type) {
      case 'month':
        str = that.initStr(m + 1) + joint + that.initStr(d);
        break;
      default:
        str = y + joint + that.initStr(m + 1) + joint + that.initStr(d);
      }
      return str;
    },
    initStr: function(str) {
      return str > 9 ? str: '0' + str;
    },
    splitTime: function(time) { //小时与分钟分开
      var str = time.split(':'),
      h = parseInt(str[0]),
      m = parseInt(str[1]);
      return {
        h: h,
        m: m
      }
    },
    initHour: function(val) {
      var that = this,
      opts = that.opts;
      var time = new Date(val); //选中的时间
      var start = that.splitTime(opts.yuStartTime),
      end = that.splitTime(opts.yuEndTime),
      changed = time.getDate();
      that.nowTo = that.getDateAry(); //获取当前时间
      if (changed == that.nowTo.d) { //判断是不是当天
        if (start.h < end.h) { //取中间
          if (start.h > that.nowTo.h) { //当前时间小于预约时间，以预约时间为准
            that.yuStartObj = that.splitTime(opts.yuStartTime);
          } else { //以系统时间为准，上面加半小时
            that.yuStartObj = that.systemTime();
          };
          that.yuEndObj = that.endTime(opts.yuEndTime);
          return that.aryTimeList(that.yuStartObj, that.yuEndObj);
        } else { //取两头
          that.yuEndObj = {
            h: 23,
            m: 30
          };
          that.yuStartObj = that.splitTime(opts.yuStartTime);
          that.systemTimeAry = that.systemTime(); //获取系统当前时间
          if (that.systemTimeAry.h > that.yuStartObj.h) that.yuStartObj = that.systemTimeAry;
          return that.aryTimeList(that.yuStartObj,that.yuEndObj);
        };
      } else {
        if (start.h < end.h) {
          that.yuStartObj = that.splitTime(opts.yuStartTime);
          that.yuEndObj = that.endTime(opts.yuEndTime);
          return that.aryTimeList(that.yuStartObj, that.yuEndObj);
        } else {
          that.yuStartObj = that.endTime(opts.yuEndTime);
          that.yuEndObj = that.splitTime(opts.yuStartTime);
          return that.calculate1();
        }
      };
    },
    systemTime: function() {
      var that = this;
      nowTime = that.nowTo;
      var h = nowTime.h,
      m = nowTime.m,
      nh, nm;
      if (m == 0) {
        nh = h;
        nm = 30;
      } else if (m > 0 && m <= 30) {
        nh = h + 1;
        nm = 0;
      } else {
        nh = h + 1;
        nm = 30;
      };
      return {
        h: nh,
        m: nm
      };
    },
    endTime: function(obj,isSplit) { //可预约时间是营业时间 - 1
      var that = this;
      var e = isSplit ? obj : that.splitTime(obj);
      return {
        h: e.h - 1,
        m: e.m
      };
    },
    calculate1: function() { //取中间
      var that = this;
      var s = that.yuStartObj,
      e = that.yuEndObj;
      var ary1 = that.aryTimeList({
        h: '0',
        m: '0'
      },s);
      var ary2 = that.aryTimeList(e, {
        h: '23',
        m: '30'
      });
      return [].concat(ary1, ary2);
    },
    aryTimeList: function(s, e) { //s 开始时间，e:结束时间
      var that = this;
      opts = that.opts;
      var gap = opts.startAheadTime;
      var hourAry = [];
      for (var i = s.h,j = 0; i <= e.h; i++, j++) {
        if (i == s.h) {
          if (s.m == gap) {
            hourAry.push((s.h + j) + ':' + gap);
          } else {
            hourAry.push((s.h + j) + ':00');
            hourAry.push((s.h + j) + ':' + gap);
          }
        } else if (i < e.h) {
          hourAry.push((s.h + j) + ':00');
          hourAry.push((s.h + j) + ':' + gap);
        } else if (i == e.h) {
          if (e.m == gap) {
            hourAry.push((s.h + j) + ':00');
            hourAry.push((s.h + j) + ':' + gap);
          } else {
            hourAry.push((s.h + j) + ':00');
          }
        }
      };
      return hourAry;
    }
  }
  util.yuTime = YuTime;  //new util.yuTime().init();
})(); 
module.exports = util;