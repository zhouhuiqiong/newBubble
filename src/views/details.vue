<template>
	<div class="container">
		<header class="bar bar-nav">
		  <a class="icon icon-left pull-left" @click="gohistory"></a>
		  <h1 class="title">商家详情</h1>
		</header>
		<div class="content list infinite-scroll list-content">
			<div class="list-block infinite-list  media-list">
				<ul>
					<li>
						<a href="#" class="item-content">
						  <div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" style='width: 4rem;'></div>
						  <div class="item-inner">
						    <div class="item-title-row">
						      <div class="item-title">wqewqewqe</div>
						      <div class="item-after">$15</div>
						    </div>
						    <div class="item-title-row">
						    	<div>
						    		wrewr
						    	</div>
						    	<div>
						    		泡泡域
						    	</div>
						    </div>
						  </div>
						</a>
					</li>
				</ul>
			</div>
			<div class="buttons-tab fixed-tab" data-offset="44">
				<a href="#tab1" class="tab-link active button" @click="changeType('all')">全部</a>
				<a href="#tab2" class="tab-link button" @click="changeType('all')">待付款</a>
			</div>
			<!--tab list-->
			<div class="content-block">
				<div class="tabs">
					<div id="tab1" class="tab active">
						<div class="content-block">
							<p  v-for="item in dataList" track-by="$index">This is tab 1 content</p>
						</div>
					</div>
					<div id="tab2" class="tab">
						<div class="content-block">
							<p  v-for="item in dataList" track-by="$index">This is tab 1 content</p>
						</div>
					</div>
				</div>
				<!-- 加载提示符 -->
				<div v-show="!loading">
					<uiload></uiload>
				</div>
			</div>
			<!--end tab list-->
		</div>
		<uigoback target-scroll="infinite-scroll"></uigoback>
	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
		this.$dispatch('isIndex', false);
		this.changeType();
	},
	data:function(){
		return {
			loadMore: {
				url: '3理解2空间',
				type: 'all',
				items: []
			},
			dataList: []
		}
	},
	methods: {
		gohistory: function(){
			util.goBack();
		},
		changeType: function(){
			//加载数据
			var dataObj = new util.scrollList();
			dataObj.init(this,{
				le: '.active .content-block',//承载列表的数据
				scrollObj: '.content'
			});
			dataObj.getListData();
		}
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	},
	components:{
      uigoback: require('../components/goback.vue'),
      uiload: require('../components/load.vue')
    }
};

</script>