<style>
[v-cloak] {
  display: none;
}
.view {
  transition: all .3s ease;
 
  padding:1em 0px;
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
::-webkit-scrollbar {
  display: none;
}
</style>

<template>
  <div class="app">
    <router-view class="view" id="view" keep-alive :transition="effect" transition-mode="out-in"></router-view>
      <bar v-if="isIndex">
        <baritem path="/home" label="首页" icon="home"></baritem>
        <baritem path="/tasks" label="任务" icon="tasks"></baritem>
        <baritem path="/list" label="列表" icon="mytask"></baritem>
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
          '/my_views': {
            name:'my_views'
          },
          '/my_views/:viewId': {
            name:'my_views_detail'
          },
          '/about':{
            name:'about'
          },
          '/forbidden':{
            name:'forbidden'
          },
          '/modal_view': {
            name:'modal_view'
          },
          '/select_view': {
            name:'select_view'
          },
          '/radio_view': {
            name:'radio_view'
          },
          '/tab_view': {
            name:'tab_view'
          },
          '/slider_view': {
            name:'slider_view'
          },
          '/test':{
            name:'test_view'
          },
          'async':{
            //http://forum.vuejs.org/topic/114/vue-router-异步加载的例子
            name:'async'
          },
          'async_loading':{
            //http://forum.vuejs.org/topic/114/vue-router-异步加载的例子
            name:'async_loading'
          },
          //触摸事件
          'touch':{
            name:'touch'
          }
        },
        effect          : 'fade',
        header          : '首页',
        routeList       : []    //访问周期中所访问了那些路径,在route.js中设置
        
      };
    },
    components:{
      bar: require('./components/bar.vue'),
      baritem: require('./components/baritem.vue')
      //modal:require('./components/modal.vue'),
    },
    created:function(){

    },
    events:{
      
    },
    methods:{
      
    },
    ready:function(){
      //this.$set('as',new AwesomeSheet({ touchDismiss: false }));
    }
}
</script>
