<template>
	<div class="container">
		<div class="content home-content">
			<uiswipertxt></uiswipertxt>
			<!--客户评价区域-->
			<div class="list-block media-list">
				<a class="item-link item-content" v-link="{name:'judgelist'}">
					<div class="item-inner">
						<div class="item-title-row">
							<div class="item-title">客户评价</div>
							<div class="item-after">200人去过</div>
						</div>
						<div class="item-text"><span>很好</span></div>
					</div>
				</a>
			</div>
			<!--营业时间-->
			<div>
				营业时间:18:00 9:00
			</div>
			<!--预约须知-->
			<div class="card">
	            <div class="card-header">预约须知</div>
	            <div class="card-content">
	                <div class="card-content-inner">
	                    <h3>滚动具有三种模式：</h3>
	                    <ul>
	                        <li>1. auto模式: scroller.js 根据系统版本号来决定什么时候使用js的滚动（默认）</li>
	                        <li>2. js模式: 总是使用js滚动（即IScroll）</li>
	                        <li>3. native模式： 总是使用原生滚动条</li>
	                    </ul>
	                </div>
	            </div>
	        </div>
	        </div>
	        <!--end 预约须知-->
			<nav class="bar bar-tab foot-bar">
				<span>5000日元</span>
				<button @click="orderdialog">预约</button>
 		    </nav>
 		    <!--预约弹出框-->
 		    <div class="dialog-wrap orderdialog" v-show="isOrderDialog">
 		    	<div class="dialog-main">
 		    		<h3>预约前必读</h3>
 		    		<div class="content-padded">
 		    			我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,
 		    			我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,
 		    			我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,我的左右两边有留白,
 		    		</div>
 		    		<div class="ordercheck"><input type="checkbox" name="" v-model="checked" ><label>我已阅读以上规则并同意遵守</label></div>
 		    		<div class="btn-box">
 		    			<button class="button-success" v-bind:class="{ 'disabled': isDisabled}"  @click="referorder">我知道了<i></i></button>
 		    		</div>
 		    	</div>
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
			this.$root.cookies ? (this.isOrderDialog = true) : (window.location.href = '#/login');
		},
		referorder: function(){//预约
			var that = this;
			//that.result = util.domeTime();//停留时间
			if(!that.checked){
				$.toast("请选中已经阅读！");
				return false;
			}else{
				that.isDisabled = false;
			};
			window.location.href = '#/'
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