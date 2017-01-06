function urlize(text) {
  if (!text) return '';
  var pattern = /https?:\/\/[^\s<]+[^<.,:;"')\]\s]/g;
  return text.replace(pattern, function(u) {
    var t = u.replace('http://', '');
    return '<a href="' + u + '">' + t + '</a>';
  });
}
//获取图片地址，如果地址带有 http://那么就认为是绝对地址，然后直接返回
function imgUrl(url){
    if(url.match(/http:\/\//)){
        return url;
    }
    //全站统一配置，页面首先会引用
    if(window.abp){
        return window.abp.imageDomain + url;
    }
    var testUrl  = 'http://img.yaomaiche.com';  //此url到时候走配置

    if(this.isTest){
        testUrl = 'http://img.test.yaomaiche.com';
    }
    return testUrl + url;
}


//显示价格
function price(value,currency){
var digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : ''
  var stringified = Math.abs(value).toFixed(2)
  var _int = stringified.slice(0, -3)
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = stringified.slice(-3)
  var sign = value < 0 ? '-' : ''
  return currency + sign + head +
    _int.slice(i).replace(digitsRE, '$1,')
    //_float
    
}
//字符串转数组
function aryType(val){
  return val.split(',');
};
//订单状态
function statusAry(val){
  var ary = ['订单待支付','订单确认','订单已确认','订单已完成','订单已关闭','支付失败'];
  return ary[val];
};
//时间戳转年月日
function time(time){
  var str, first, second, arr;
      var seperator = '-';
      typeof time === 'string' && (time = parseInt(time, 10));
      str = new Date(time);
      first = str.toLocaleDateString().replace(/\//g, seperator);
      second = str.toLocaleTimeString();
      if (second.indexOf('上午') >= 0) {
          arr = second.replace('上午', '').split(':');
          if (parseInt(arr[0], 10) < 10) {
              arr[0] = '0' + arr[0];
          }
          second = arr.join(':');
      }
      if (second.indexOf('下午') >= 0) {
          arr = second.replace('下午', '').split(':');
          arr[0] = parseInt(arr[0], 10) + 12;
          arr[0] += '';
          second = arr.join(':');
      };
      var firstAry = first.split('-');
      var str1 = firstAry[1] < 10 ?  '0'+ firstAry[1]  : firstAry[1],
          str2 = firstAry[2] < 10 ?  '0'+ firstAry[2]  : firstAry[2];
      first = firstAry[0] + '-' + str1 + '-' + str2;
      return first + ' ' + second;
};
exports.imgUrl = imgUrl;
exports.price = price;
exports.urlize = urlize;
exports.aryType = aryType;
exports.statusAry = statusAry;
exports.time = time;
