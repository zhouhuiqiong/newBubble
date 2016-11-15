<template>
	<div class="container  ">
		<div class="content home-content bg">
			<div class="home-swiper">
				<uiswipertxt></uiswipertxt>
			</div>
			<dl class="introduce">
				<dt>大保健全套服务</dt>
				<dd>俩人团购的118套餐，一小份虾，鱼豆腐，羊肉，蔬菜拼盘，火锅面足够了！虾特别大而且新鲜入味，香辣适中，保持了一贯的开背去线，</dd>
			</dl>
			<!--客户评价区域-->
			<div class="list-block media-list estimate">
				<a class="item-link item-content" v-link="{name:'judgelist'}">
					<div class="item-inner">
						<div class="item-title-row">
							<div class="item-title">客户评价</div>
							<div class="item-after">200人去过</div>
						</div>
						<div class="item-text">
							<span class="shop-tag min-shop-tag">漂亮(20)</span>
							<span class="shop-tag min-shop-tag">姑凉好看(1000)</span>
							<span class="shop-tag min-shop-tag">安全</span>
														<span class="shop-tag min-shop-tag">漂亮(20)</span>
							<span class="shop-tag min-shop-tag">姑凉好看(1000)</span>
							<span class="shop-tag min-shop-tag">安全</span>
						</div>
					</div>
				</a>
			</div>
			<!--营业时间-->
			<div class="do-time">
				营业时间:18:00 9:00
			</div>
			<!--预约须知-->
			<dl class="clause">
				<dt>预定须知</dt>
				<dd><i></i><div>以前没来过这样的洗浴中心，今天体验了感觉很好，女宾浴处三个池子(牛奶浴，人参浴，温水池)水温都很舒服，水比较干净，准备的用品也齐全，自己啥都不用带这儿全有，非常方便</div></dd>
				<dd><i></i><div>以前没来过这样的洗浴中心，今天体验了感觉很好，女宾浴处三个池子(牛奶浴，人参浴，温水池)水温都很舒服，水比较干净，准备的用品也齐全，自己啥都不用带这儿全有，非常方便</div></dd>
			</dl>

 		    <!--预约弹出框-->
 		    <div class="dialog-wrap orderdialog" v-show="isOrderDialog">
 		    	<div class="dialog-main">
 		    		<h3>预约前必读</h3>
 		    		<div class="content-padded">
 		    			我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,
 		    			我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,
 		    			我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,
 		    			我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,
 		    			我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,
 		    			我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白
 		    		</div>
 		    		<div class="ordercheck"><input type="checkbox" name="" v-model="checked" disabled="disabled"><label>我已阅读以上规则并同意遵守</label><span>阅读完毕才能勾选</span></div>
 		    		<div class="btn-box">
 		    			<button class="button-success" v-bind:class="{ 'disabled': isDisabled}"  @click="referorder">我知道了<i class="dome-time"></i></button>
 		    		</div>
 		    	</div>
 		    </div>
 		</div>
 		<!--end 预约须知-->
		<nav class="bar bar-tab foot-bar" >
			<div class="sale-money">
				<label class="server-money server-money1 ">¥<em>5,000</em></label>
				<i>¥5,0000000</i>
			</div>
			<button @click="orderdialog" class="btn1" >立刻预约</button>
		</nav>
 	</div>
</template>
<script>
module.exports = {
	route: {

	},
	ready: function(){
 

	},
	data:function(){
		return {
			checked: false,
			isDisabled: true,
			isOrderDialog: false
			
		}
	},
	methods: {
		orderdialog: function(){
			this.$root.userId ? (this.isOrderDialog = true,this.orderHandle()) : (this.$router.go({path:'/login',query: {back:1}}));
		},
		orderHandle: function(){
			var that = this;
			util.domeTime({
				callback: function(){
					if(that.isBase && that.checked) that.isDisabled = false;
				}
			});
			that.isBase = false;
			$('.content-padded').on('scroll', function(){
				var h = $(this).scrollTop()  + $(this)[0].clientHeight,
					hContent = $(this)[0].scrollHeight;
					if(h == hContent){
						$('.ordercheck input').removeAttr('disabled');
						that.isBase = true;
					};
			});
			

		},
		referorder: function(){//预约
			var that = this;
			that.time = $('.dome-time').text();
			if(!that.isBase){
				$.toast("请阅读完！");
			}else if(!that.checked){
				$.toast("请选中已经阅读！");
			}else if(!that.time){//时间到了
				that.isOrderDialog = that.isDisabled = false;
				that.$router.go({path:'/ordersubmit'});
			};
		}
	},
	route:{
		activate:function(transition){
			this.$root.$set('header',this.title);
			transition.next();
		}
	},
	components:{
      uiswipertxt: require('../components/swipertxt.vue')
    }
};

</script>