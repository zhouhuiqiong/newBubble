module.exports = {
	//每次切换路由，在渲染出页面前都会执行
	route: {

	},
	events: {
		'cookies': function(msg){
			console.log(msg);
		}
	},
	ready: function(){
		var that = this;
	    that.fixedbox();
	    //加载数据
		var dataObj = new util.scrollList();
		dataObj.init(this,{
			le: '.media-list',//承载列表的数据
			scrollObj: '.content'
		});
		dataObj.getListData();
		//附近
		that.$nearby = $('.change-list>li');
		that.$nearby.on('click', function(){
			var t = $(this);
			util.clickActive(t);
			setTimeout(function(){
				t.parent().addClass('hide');
				that.isSelectShade = false;
			},300);
		});
		//筛选
		that.$screen = $('.screen-item dd span');
		that.$screen.on('click', function(){
			var t = $(this);
			util.clickActive(t);
			setTimeout(function(){
				t.parents('.screen-item').addClass('hide');
				that.isSelectShade = false;
			},300);
		});
	},
	data:function(){
		return {
			msg:'aboutMessage',
			title:'home',
			dataList: [],
			loading: false,
			isSelectShade: false,
			
		}
	},
	computed: {
	    length: function(){
	      return this.items.length
	    }
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	},
	methods: {
		showAdr: function(){
			$.popup('.open-adr-btn');
		},
		fixedbox: function(){
			util.fixedbox({
				fixedbox:'.select-wrap'
			});
		},
		changeType: function(e,num){
			var that = this;
			that.isSelectShade = true;
			$(e.currentTarget).addClass('active').siblings('li').removeClass('active');
			$('.select-box .item ').eq(num).removeClass('hide');
			

		},
		selectShade: function(){
			this.isSelectShade = false;
		}
	},
	components:{
      uiswiper: require('../components/swiper.vue'),
      uigoback: require('../components/goback.vue'),
      uiload: require('../components/load.vue')
    }
};