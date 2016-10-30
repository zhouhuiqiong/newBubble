
require('./css/common.css');//加载公共样式
require('./css/animate.css');//加载公共样式
require('./css/sm.css');//加载公共样式
require('./css/main.css');//加载公共样式
require('./js/zepto.min.js')
require('./js/sm.js')
require('./js/util.js')
var Vue = require('vue');
var VueTouch = require('./js/vtouch');
var VueRouter = require('vue-router');
var fastclick = require('fastclick');
var VueVallidator = require('vue-validator');



fastclick.attach(document.body);
// Directive
var directive =  require('./js/directives');
// register filters 自定义过滤器  金额格式化，
var filters = require('./js/filters');
//Vue.filter('filters', filters)

Object.keys(directive).forEach(function(k) {
  Vue.directive(k, directive[k]);
});

Object.keys(filters).forEach(function(k) {
  Vue.filter(k, filters[k]);
});

var App = Vue.extend(require('./app.vue'));

/*
    如果还想声明一个vue实例
	要放在 Vue.use(VueRouter); 之前
	因为当使用了 Vue.use(VueRouter)后，改写了 Vue 的实例化方法。
 */
//var newV = new Vue();//注意看上面说明

Vue.use(VueTouch);
Vue.use(VueRouter);
Vue.use(VueVallidator);
var router = new VueRouter(
	{
	  hashbang: false,  //为true的时候 example.com/#!/foo/bar ， false的时候 example.com/#/foo/bar
	  //abstract:true,  //地址栏不会有变化
	  //以下设置需要服务端设置
	  //history: false,   //当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
	  //saveScrollPosition: false
	  linkActiveClass:'custom-active-class' //全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
	}
);

require('./routers')(router);

router.start(App,'#app');