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
 		
 	}
}
exports.infiniteScroll = infiniteScroll;
