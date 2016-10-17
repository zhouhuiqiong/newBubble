<style>
[v-cloak] {
  display: none;
}
.view {
  transition: all .3s ease;
}
.fade-enter{
  opacity: 1;
  transform: translate3d(100%, 0, 0);
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
  -webkit-transform: translate3d(-110%, 0, 0);
          transform: translate3d(-110%, 0, 0);

}
.back-leave{
  opacity: 0;
  /*transform: translate3d(100%, 0, 0);*/
  -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
}
.v-link-active {
  color: red;
}

.custom-active-class {
  color: #f60;
}

/*css next 测试*/
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
/*css next 测试*/

nav{
  background-color: #000;
}
/*::-webkit-scrollbar {
  display: none;
}*/
</style>

<template>
  <div class="app">
    <router-view class="view" id="view" keep-alive :transition="effect" transition-mode="out-in"></router-view>
      <bar class="barNav" style="display:none">
        <baritem path="/home" label="首页" icon="browser"></baritem>
        <baritem path="/list" label="色相" icon="picture"></baritem>
        <baritem path="/list" label="我的" icon="home"></baritem>
      </bar>
    </template>
  </div>
</template>
<script>

module.exports = {
    data: function() {
      return {
        renderLinks: false,
        isIndex: true,
        items:{
          '/':{
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
          '/userlist': {
            name:'userlist'
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
          }
          // '/my_views/:viewId': {
          //   name:'my_views_detail'
          // },

          // '/forbidden':{
          //   name:'forbidden'
          // },
          // '/modal_view': {
          //   name:'modal_view'
          // },
          // '/select_view': {
          //   name:'select_view'
          // },
          // '/radio_view': {
          //   name:'radio_view'
          // },
          // '/tab_view': {
          //   name:'tab_view'
          // },
          // '/slider_view': {
          //   name:'slider_view'
          // },
          // '/test':{
          //   name:'test_view'
          // },
          // 'async':{
          //   //http://forum.vuejs.org/topic/114/vue-router-异步加载的例子
          //   name:'async'
          // },
          // 'async_loading':{
          //   //http://forum.vuejs.org/topic/114/vue-router-异步加载的例子
          //   name:'async_loading'
          // },
          // //触摸事件
          // 'touch':{
          //   name:'touch'
          // }
        },
        effect          : 'fade',
        header          : '首页',
        routeList       : []    //访问周期中所访问了那些路径,在route.js中设置
        
      };
    },
    components:{
      bar: require('./components/bar.vue'),
      baritem: require('./components/baritem.vue')
    },
    created:function(){

    },
    events:{
      'isIndex': function(isIndex){
          this.isIndex = isIndex;
      }
    },
    methods:{
      
    },
    ready:function(){
      this.cookies = '123123';
      //this.$broadcast('cookie','232424');
    }
}
</script>
