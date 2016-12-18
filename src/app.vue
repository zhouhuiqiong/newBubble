<style>
[v-cloak] {
  display: none;
}
.view {
  transition: all .3s ease;
}
.fade-enter{
  opacity: 1;
}
.fade-leave {
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.bottom-enter{
  opacity: 1;
  transform: translate3d(0,100%, 0);
}

.bottom-leave {
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);

}
.left-enter{
  opacity: 1;
  transform: translate3d(100%,0, 0);
}
.left-leave {
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.back-enter {
  opacity: 1;
  -webkit-transform: translate3d(100%, 0, 0);
          transform: translate3d(100%, 0, 0);
}
.back-leave{
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.v-link-active {
  color: red;
}
.custom-active-class {
  color: #f60;
}
@keyframes testloading {
    0% {
      opacity: 0.2;
    }
    65% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
}
.testa {
    display: flex;
}
.place-tag-top{
  animation:placeTop .2s  ease  both;
  -webkit-animation:placeTop .2s  ease  both;
  font-size: 10px;
}
.place-tag-bottom{
  animation:placebottom .2s  ease  both;
  -webkit-animation:placebottom .2s  ease  both;
}
@keyframes placeTop {
  0%{
    opacity: 0;
      -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        font-size: 14px;
  }
  100%{
    opacity: 1;
      -webkit-transform: translate3d(0,-0.8rem,0);
        transform: translate3d(0, -0.8rem, 0);
        font-size: 10px;

  }
}

@keyframes placebottom {
  0%{
      -webkit-transform: translate3d(0,-0.8rem,0);
        transform: translate3d(0, -0.8rem, 0);
        font-size: 10px;

  }
  100%{
      -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        font-size: 14px;

  }
  
}
</style>

<template>
  <div class="app">
    <router-view class="view" id="view" keep-alive :transition="effect" transition-mode="out-in"></router-view>
      <bar class="bar-foot-nav" style="display:none" id="barNav">
        <baritem path="/home" label="大楽" icon="dairaku" class="active"></baritem>
        <baritem path="/huelist" label="色相" icon="hue"></baritem>
        <baritem path="/personal" label="我的" icon="user"></baritem>
      </bar>

      <suitebar class="bar-foot-nav"  id="suiteNav" style="display:none" id="suiteNav">
        <suitebaritem path="/suiteorder" label="订单" icon="order" class="active"></suitebaritem>
        <suitebaritem path="/suitenews" label="消息" icon="news"></suitebaritem>
      </suitebar>
  </div>
</template>
<script>
module.exports = {
    data: function() {
      return {
        renderLinks: false,
        isIndex: true,
        items:{
          '/home':{
            name:'home'
          },
          '/seach':{
            name:'seach'
          },
          '/news':{
            name:'news'
          },
          '/huelist': {
            name:'huelist'
          },
          '/details': {
            name:'details'
          },
          '/login': {
            name:'login'
          },
          '/personal': {
            name:'personal'
          },
          '/editlist': {
            name: 'editlist'
          },
          '/editph': {
            name: 'editph'
          },
          '/editname': {
            name: 'editname'
          },
          '/editmail': {
            name: 'editmail'
          },
          '/editpassword': {
            name: 'editpassword'
          },
          '/indentlist': {
            name:'indentlist'
          },
          '/help': {
            name:'help'
          },
          '/shopimg': {
            name: 'shopimg'
          },
          '/orderdetails':{
            name: 'orderdetails'
          },
          '/judgelist':{
            name: 'judgelist'
          },
          '/ordersubmit':{
            name: 'ordersubmit'
          },
          '/pay':{
            name: 'pay'
          },
          '/map':{
            name: 'map'
          },
          '/address':{
            name: 'address'
          },
          '/sign':{
            name: 'sign'
          },
          '/forget': {
            name: 'forget'
          },
          '/myorder': {
            name: 'myorder'
          },
          '/myorderdetails': {
            name: 'myorderdetails'
          },
          '/suitelogin': {
            name: 'suitelogin'
          },
          '/suiteorder': {
            name: 'suiteorder'
          },
          '/suitepersonal': {
            name: 'suitepersonal'
          },
          '/suitenews': {
            name: 'suitenews'
          },
          '/huedertails': {
            name: 'huedertails'
          },
          '/chat': {
            name: 'chat'
          },
          '/test': {
            name: 'test'
          }

        },
        effect          : 'fade',
        header          : '首页',
        routeList       : [],    //访问周期中所访问了那些路径,在route.js中设置
        userId: ''
        
      };
    },
    components:{
      bar: require('./components/bar.vue'),
      baritem: require('./components/baritem.vue'),
      suitebar: require('./components/suitebar.vue'),
      suitebaritem: require('./components/suitebaritem.vue')
    },
    created:function(){

    },
    events:{
      'isIndex': function(isIndex){
        this.isIndex = isIndex;
      },
      'userId': function(userInf){
          this.userId = 'userInf';
      }
    },
    methods:{
      
    },
    ready:function(){ 
      if(!this.userId) this.userId = util.cookie.get('userId');
      console.log(this.userId);
    }
}
</script>
