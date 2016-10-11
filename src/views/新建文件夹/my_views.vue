<template>
  <div class="content" data-type="" style="">
    <div class="buttons-tab fixed-tab" data-offset="44">
      <a href="#tab1" class="tab-link active button">全部</a>
      <a href="#tab2" class="tab-link button">待付款</a>
      <a href="#tab3" class="tab-link button">待发货</a>
    </div>
	<div id="tab1" class="tab infinite-scroll active infinite-scroll-bottom" data-distance="100">
      <div class="list-block">
        <ul class="list-container">
          
        </ul>
      </div>
      <!-- 加载提示符 -->
      <div class="infinite-scroll-preloader">
        <div class="preloader">
        </div>
      </div>
  </div>
</div>
</template>
<script>
module.exports = {
	//每次切换路由，在渲染出页面前都会执行
	route: {

	},
	ready: function(){
		var loading = false;
		var itemsPerLoad = 15;
		var maxItems = 100;
		var lastIndex = $('.list-container li').length;
		function addItems(number, lastIndex) {
	        var html = '';
	        for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
	          html += '<li class="item-content" onClick="alert(1)"><div class="item-inner"><div class="item-title">新条目</div></div></li>';
	        }
	        $('.infinite-scroll.active .list-container').append(html);
	    };
	    addItems(itemsPerLoad,lastIndex);
      $(document).on('infinite', '.infinite-scroll-bottom',function() {
      	 	console.log(1111111);
          // 如果正在加载，则退出
          if (loading) return;

          // 设置flag
          loading = true;

          // 模拟1s的加载过程
          setTimeout(function() {
              // 重置加载flag
              loading = false;

              if (lastIndex >= maxItems) {
                  // 加载完毕，则注销无限加载事件，以防不必要的加载
                  $.detachInfiniteScroll($('.infinite-scroll'));
                  // 删除加载提示符
                  $('.infinite-scroll-preloader').remove();
                  return;
              }

              // 添加新条目
              addItems(itemsPerLoad, lastIndex);
              // 更新最后加载的序号
              lastIndex = $('.list-container li').length;
              //容器发生改变,如果是js滚动，需要刷新滚动
              $.refreshScroller();
          }, 1000);
     });
	},
	data:function(){
		return {
			msg:'aboutMessage',
			title:'home'
		}
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	},
};
</script>