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
var delVal = {
	bind: function(){
		var t = this;
		$(t.el).on('click', function(){
			$(this).siblings('input').val('');
			var $span = $(this).siblings('span');
			$span.show();
			if($span.hasClass('place-tag-top')){
				$span.removeClass('place-tag-top').addClass('place-tag-bottom');
			}else{
				$span.removeClass('place-tag-top,place-tag-bottom');
			};
			$(this).hide();
		});
	}
}

var showPlaceholder =  {
	bind: function(){
		var t = this,
			$el = $(t.el);
			$span = $el.find('span'),
			$text = $el.find('input'),
			$del = $el.find('.icon-shanchu');
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
exports.infiniteScroll = infiniteScroll;
// exports.delVal = delVal;
// exports.showPlaceholder = showPlaceholder;