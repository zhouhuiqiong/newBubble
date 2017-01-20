<template>
	<div class="container">
		<header class="bar bar-nav title-bar">
<!-- 
		  <a class="iconfont icon-iconleft pull-left" v-go-history></a> -->
		  <h1 class="title">色相</h1>
		  <div @click="changeType($event, 0)" class="hue-filtrate" >
              <span>筛选</span>
              <i class="iconfont icon-icon-copy-copy"></i> 
          </div>
		</header>
        <div class="select-box">
            <ul class="change-list item hide">
                <li v-for="item in tagsAry"  @click="handle($event,item.id)"><span>{{item.name}}</span></li>
            </ul>
        </div>
		<div class="content infinite-scroll home-content bg" >
			<!--item-->
			<ul class="card-box">
				<li class="card-item" v-for="item in hueAry"  v-link="{name:'huedertails',query: {id: item.id}}" >
                    <img :src="$root.baseImgSrc + '/' + item.pic">
                    <h3>{{item.title}}</h3>
                    <p>
                        <span class="shop-tag shop-tag2" v-for="tag in item.tagsArr">
                            {{tag}}
                        </span>
                        {{item.desc}}
                    </p>
				</li>
			</ul>
			<!--end item-->
		</div>
		<div class="select-shade select-shade1" v-show="isSelectShade" @click="selectShade"></div>

	</div>
</template>
<script>
module.exports = {
    ready: function(){
        var that = this;
        that.$item = $('.select-box .item ');
        that.$nearby = $('.change-list>li');
        that.$nav = $('.hue-filtrate');
        //滚动获取数据
        that.scrollList({
            le: '.card-box',
            scrollObj: '.content',
            scope: that

        });

        that.getTagsList();
        that.getHueList();
    },
    data:function(){
        return {
            isSelectShade: false,
            pageSize: 20,
            hueAry: [],
            noData: false,
            currentPage: 1,
            tagId: '',//默认值
            tagsAry: [],
            loading: true,
            loaded: true//加载完了才能加载下一次

        }
    },
    watch: {
        'currentPage': function(){
            var that = this;
            if(that.currentPage == 1) return;
            that.getHueList();
        },
        'tagId': function(){
            var that = this;
            that.getHueList();
        }
    },
    methods: {
        handle: function(event,id){
            var that = this;
            that.currentPage = 1;
            $('.icon-duigou').remove();
            that.tagId = id;
            $(event.target).append('<i class="iconfont icon-duigou"></i>');
            setTimeout(function(){
                $(event.target).parent().addClass('hide');
                that.isSelectShade = false;
                that.$nav.removeClass('active');
            },300);
        },
        changeType: function(e,num){
            var that = this;
            var $obj = $(e.currentTarget);
            if($obj.hasClass('active')){
                that.selectShade();
            }else{
                $obj.addClass('active').siblings('li').removeClass('active');
                that.$item.addClass('hide').eq(num).removeClass('hide');
                that.isSelectShade = true;
            }
        },
        selectShade: function(e){
            var that = this;
            that.$nav.removeClass('active');
            that.isSelectShade = false;
            that.$item.addClass('hide');
        },
        getHueList: function(){//获取列表
            var that = this;
            that.getServerData({
                url: 'sex_article/list',
                data: {
                    tag: that.tagId,
                    pageNo: that.currentPage,//页码
                    pageSize: that.pageSize
                },
                success: function(results){
                    that.hueAry = results.content;
                    if(results.content.length < that.pageSize) that.noData = true;
                    that.loading = true;
                    that.loaded = true;
                    
                }
            })
        },
        getTagsList: function(){//获取全部标签
            var that = this;
            that.getServerData({
                url: 'sex_article/all_tag',
                success: function(results){
                    that.tagsAry = results.content;
                }
            })
        }
    },
    route:{
        activate:function(transition){
            var that = this;
            that.$root.$set('header',that.title);
            transition.next();
        }
    },
    components:{
      uigoback: require('../components/goback.vue'),
      uiload: require('../components/load.vue')
    }
};

</script>