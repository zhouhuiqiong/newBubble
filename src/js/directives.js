var infiniteScroll = {
 	bind: function(){
 		var that = this,
 			el = $(that.el);
 		el.on('scroll', function(){
 			var h = parseFloat(el.height()),
 			scrollTop = parseFloat(el.scrollTop()),
 			totalHeight = h + scrollTop;
	 		if(el[0].scrollHeight - totalHeight <= 3){
	 			that.vm[that.expression]();
	 		};
 		});
 	},
 	update: function(value){
 		
 	}
}

var showPlaceholder =  {
	bind: function(){
		var t = this,
			$el = $(t.el);
			$span = $el.find('span'),
			$text = $el.find('input'),
			$del = $el.find('.icon-shanchu');


			console.log(this);
 		style();
		$text.on('focus', function(){

			$pan = $(this).siblings('span');
			$del =  $(this).siblings('.icon-shanchu');
			style();
			console.log(!$(this).val());
			if(!$(this).val()){
				$span.addClass('place-tag-top').removeClass('place-tag-bottom');
			}else{
				$span.removeClass('place-tag-top,place-tag-bottom');
			};
		});
		$text.on('blur', function(){
			$pan = $(this).siblings('span');
			if(!$(this).val()){
				$span.addClass('place-tag-bottom').removeClass('place-tag-top');
			}else{
				$span.removeClass('place-tag-top,place-tag-bottom');
			}
		});
		function style(){
			if($text.val()){
				$span.hide();
				$del.show();
			}else{
				$span.show();
				$del.hide();
			}
		};
		
	}
}
//返回顶部
var goHistory = {
	bind: function(){
		$(this.el).bind('click', function(event){
			window.history.go(-1);
			event.stopPropagation();
		});
	}
}
//输入字段截取
var sliceStr = {
	bind: function(){
		var t = this;
		$(this.el).on('input', function(){
			var str = $(this).val();
			if(str.length > t.expression){
				$(this).val(str.slice(0,t.expression));
			};	
		});
	}
}
//全文阅读
var allRead = {
	bind: function(){
		var t = this;
		t.on('click', function(){
			var $obj = $(this).siblings('.txt-box');
			var result = $obj.hasClass('txt-hide');
			if(result){
				$(this).text('收起');
				$obj.removeClass('txt-hide');
			}else{
				$(this).text('全文');
				$obj.addClass('txt-hide');
			};
		});
	}
}
exports.infiniteScroll = infiniteScroll;
exports.goHistory = goHistory;
exports.sliceStr = sliceStr;
exports.allRead = allRead;
// exports.delVal = delVal;
exports.showPlaceholder = showPlaceholder;
