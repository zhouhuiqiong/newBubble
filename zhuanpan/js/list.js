
var html = '<form class="delivery">'+
    '<div class="delivery-group"><label>收货人</label><input type="text" name="name"></div>'+
    '<div class="delivery-group"><label>手机号</label><input type="tel" name="mobile" ></div>'+
    '<div class="delivery-group"><label>详细地址</label>'+
    '<textarea  name="jiedao" ></textarea>'+
    '</div>'+
'</form>';
new Vue({
	el: '#app',
	data: {
		isAdr: false,//是否有地址
		recordAry: [],//我的中奖记录
		defaultAdr: {},
		allAdr: []//获取全部地址
	},
	ready: function(){
		var that = this;
		that.uid = that.getQueryString('uid');
		that.id = that.getQueryString('id');
		that.myRecord();
		that.getAllAdr();
	},
	computed: {
	},
	methods: {
		myRecord: function(){//获取个人中奖记录
			var that = this;
			that.getServerDate({
				data: {
					uid: that.uid,
					id: that.id
				},
				url: 'get_member_prizes',
				success: function(data){
					that.recordAry = data.list;
				}
			})
		},
		getAllAdr: function(){//获取全部地址
			var that = this;
			that.getServerDate({
				data: {
					uid: that.uid
				},
				url: 'get_all_address',
				success: function(data){
					that.allAdr = data.data;
					if(that.allAdr.length > 0) {
						that.isAdr = true;
						that.defaultAdr = that.allAdr[0];
					}
				}
			});
		},
		returnFn: function(){
			window.history.go(-1);
		},
		getQueryString: function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
    	},
    	getServerDate: function(data){//远程获取数据
		    $.ajax({
				data: data.data,
				url: 'http://test1.lianyingdai.com/yungouapi/activity/' + data.url,
				type: 'post',
				success: function(msg){
					if(msg.status == 0){//最后修改
						data.success(msg);
					}else{
						that.msg(msg.message);
					}
				}
			})
	    },
	    msg: function(msg){
			layer.open({
			    content: msg,
			    style: 'background:rgba(0,0,0,0.5);  color:#fff;  border:none;',
			    time: 1,
			    type: 0,
			    shade: false
			});
	    },
	    verify: function(){
	        var $form = $('.delivery'),
	        result = false;
	        var that = this;
	        $username = $form.find('input[name="name"]'),
	        $phone = $form.find('input[name="mobile"]'),
	        $address = $form.find('textarea[name="jiedao"]');
	        if(!$username.val()){
	            that.msg('请输入收件人姓名')
	        }else if(!/^(((13[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test($phone.val())){
	            that.msg('请输入有效的手机号码')
	        }else if(!$address.val()){
	            that.msg('请输入收件人地址');
	        }else{
	            result = true;
	        };
	        return result;
    	},
		setAdr: function(){//立即设置地址 
			var that = this;
			layer.open({
				title: '设置地址',
				btn: ['确认','返回首页'],
				type: 1,
				content: html,
				yes: function(){
					var form = new Form({
					  $form: $('.delivery')
					});
					if(that.verify()){
							form.init();
							layer.closeAll();
						var userData = $.extend({
							uid: that.uid
						},form.getFormData());
						//请求添加接口
						that.getServerDate({
							data: userData,
							url: 'add_member_address',
							success: function(data){
								that.msg('地址添加成功!');
								that.isAdr = true;
								that.changeAdr();
							}
						});
					}
				},
				no: function(){
					window.location.href = 'index.html';
				}
			});
		},
		changeAdr: function(){//编辑地址弹出框
			var that = this;
			var html = '<ul class="change-adr-list">';
			var list = that.allAdr;
			for(var i=0; i<list.length; i++){
				var check = i == 0 ? 'checked' : '';
				html += '<li><p class="boxJ"><label><input name="address" curcheck='+i+' type="radio" '+check+' value='+list[i].id+'>'+list[i].shouhuoren+'</label><span>'+list[i].mobile+'</span></p><div class="change-adr-inft">'+list[i].jiedao+'</div></li>';
			};
			html += '</ul>';
			layer.open({
				title: '添加新地址',
				btn: ['确认','取消'],
				type: 1,
				content: html,
				yes: function(){
				  that.setAddress();
				  layer.closeAll();
				},
				no: function(){

				}
			});
			$('.layermbox h3').addClass('add-adress-title').on('click', function(){
				layer.closeAll();
				that.addAdr();
			});
		},
		setAddress: function(){//编辑地址
	      var $curObj = $('.change-adr-list li input:checked');
	      that.curAdrId = $curObj.val();
	      that.curIndex = $curObj.attr('curcheck');
	      //加入修改地址的接口
	      that.getServerDate({
	        data:{	
	        	uid: that.uid, 
	        	did: that.curAdrId
	        },
	        url: 'get_member_address',
	        success: function(data){
	            that.defaultAdr = that.adrList[that.curIndex];
	            that.msg('地址修改成功!');
	        }
	      });
	    }
	}
});
Vue.filter('time' , function(value) {
  if(!value) return '';
  var time =  new Date(parseInt(value) * 1000);
  return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() +':'+ time.getMinutes() + ':' + time.getSeconds();
});
Vue.filter('phoneNum' , function(value) {
  if(!value) return '';
  var data = value.replace(/(\d{3})(\d{4})(\d{4})/,'$1****$3 ');
  return data; 
});
//获取表单数据
function Form(opts){
  var that = this;
  that.setting = {
    $form: ''
  }
  $.extend(that.setting, opts);
};
Form.prototype = {
  constructor: Form,
  init: function(){
    var that = this,opts = that.setting;
    if(opts.$form.length < 1) console.log(opts.$form + '表单元素不存在');
  },
  getFormEle: function(selector){
    var that = this,opts = that.setting;
    var allEle = selector ? opts.$form.find(selector) : opts.$form[0].elements;
    var ary = [];
    for(var i=0, l=allEle.length; i<l; i++){
      if(allEle[i].name) ary.push(allEle[i]);
    };
    return ary;
  },
  getFormData: function(selector){
    var that = this,opts = that.setting;
    var aryEle = that.getFormEle(selector);
    var result = {};
    aryEle.forEach(function(item,index){
        var name = item.name,
            type = item.type;
        if(((type == 'checkbox' || type == 'radio') && !item.checked)) return false;
        result[name] =  result[name] ? [].concat(result[name],item.value) : item.value;
    });
    return result;
  }
}