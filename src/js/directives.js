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
		var that = this,
			$el = $(that.el);
			$span = $el.find('span'),
			$text = $el.find('input'),
			$del = $el.find('.icon-shanchu');
			var moveUp = 'place-tag-top',//移上去动画	
				moveDown = 'place-tag-bottom';//下来动画
			var el = '.input-style';
		$span.on('click',function() {
			$(this).siblings('input').focus();
		});
		$text.on('focus',function() {
			add = moveUp;
			del = moveDown;
			$text = $(this);
			$el = $text.parent(el)
			styleHanle();
			delShow();
		}).on('blur',function() {
			add = moveUp;
			del = moveDown;
			$text = $(this);
			$el = $text.parent(el)
			styleHanle1();
			delShow();
		}).on('input',function() {
			add = moveUp;
			del = moveDown;
			$text = $(this);
			$el = $text.parent(el)
			delShow();
			if (!$(this).val()) {
				$(this).siblings('span').show().addClass(add).removeClass(del);
			};
		});
		//点击删除
 		$del.on('touchstart',function() {
	        var $input = $(this).siblings('input');
	        var $span = $(this).siblings('span');
        	$input.val('');
        	$el = $(this).parent(el);
        	spanShow();
        	$span.removeClass(moveUp);
        	$span.hasClass(moveUp) ? $span.addClass(moveDown) : $span.removeClass(moveDown);
			$(this).hide();
      	});
		delShow();
        spanShow();
		function delShow() { //删除按钮的显示
			var $text = $el.find('input');
			var $del = $el.find('.icon-shanchu');
			$text.val() ? $del.show() : $del.hide();
		};
		function spanShow() { //文本提示显示
			var $span = $el.find('span');
			var $text = $el.find('input');
			$text.val() ? $span.hide() : $span.show();
    	};
    	function styleHanle() {
    		var obj = $text;
			var $span = obj.siblings('span');
			$span.removeClass(del);
			if(!obj.val()) $span.removeClass(del);
		};
		function styleHanle1() {
			var obj = $text;
      		var $span = obj.siblings('span');
      		!obj.val() ? $span.addClass(del).removeClass(add) : $span.removeClass(del);
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
};

exports.infiniteScroll = infiniteScroll;
exports.goHistory = goHistory;
exports.sliceStr = sliceStr;
exports.allRead = allRead;
exports.showPlaceholder = showPlaceholder;
