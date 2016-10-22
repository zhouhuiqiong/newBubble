var util = {
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
      if(!phoneReg.test(val)){
        $.toast("输入确证的手机号");
        return false;
      };
      return true;
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
        noData: false//false 有数据，ture 没数据
      },data);
      that.obj.dataList = [];
    },
    getServerDate: function(url,data){//获取远程数据
      return $.ajax({
          method: 'POST',
          data: data,
          url: url 
      })
    },
    getListData: function(){
      var that = this;
      if(that.data.page == 1) that.initIScroll();
      //数据
      var ary = [];
      for (var  i = 0; i < 15; i++) {
        that.obj.dataList.push({
          id: i,
          name: 'demo' +  i
        });
      };
      // that.obj.dataList.concat(ary);
      
      that.data.page++;
      // that.getServerDate('http://www.renrenbuy.com/index.php/yungouapi/goods/get_shaidan_list',{
      // }).success(function(data){

      // })
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
          that.getListData();
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
      



