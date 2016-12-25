<template>
	<div>
	 	<div id="map">

	 	</div>
	 	<div  class="map-btn-box">
			<button @click="myAdr">定位本地位置</button>
			<button @click="myBus">公交</button>


		</div>
	</div>
</template>
<style type="text/css">
	body,html{width:100%; height: 100%;}
	#map{position: absolute; top:0px; left: 0px; right:0px; bottom: 0px;}
	.map-btn-box{position: absolute; top: 0px; height: 30px; left: 100px; background:#f00; z-index: 100;}
</style>
<script>
	module.exports = {
		ready: function(){
			var t = this;	
			function initMap() {
				t.chicago = {lat: 40.2221482000, lng: 116.2648088000};
				var mapOptions = {
				    center: new google.maps.LatLng(t.chicago),  //地图的中心点
				    zoom: 10,               　　　　　　　　　　//地图缩放比例
				    mapTypeId: google.maps.MapTypeId.ROADMAP, 
				    navigationControl: true,		      　　　　　　　　　　//指定地图展示类型：卫星图像、普通道路
				    scrollwheel: false ,        　　　　　　　　　 //是否允许滚轮滑动进行缩放
				};
				t.map = new google.maps.Map(document.getElementById("map"), mapOptions); //创建谷歌地图
				t.marker = new google.maps.Marker({
				    map: t.map,
				    position: new google.maps.LatLng(t.chicago)
				});

				var infowindow = new google.maps.InfoWindow({content: "北京市昌平东关物美" });
				infowindow.open(t.map, t.marker); //把这个infoWindow绑定在选定的marker上面
				//使用谷歌地图定义的事件，给这个marker添加点击事件
				google.maps.event.addListener(t.marker, "click", function(){
				    infowindow.open(t.map,t.marker);
				});
			};
				initMap();

			        
		},
		methods: {
			myAdr: function(){
				var t = this;
				var directionsDisplay = new google.maps.DirectionsRenderer({
			        	map: t.map
			        });
				t.marker.setMap(null);
			    t.indianapolis = {lat: 40.2412670000, lng:116.2674230000};
			      var request = {
			          destination: t.indianapolis,
			          origin: t.chicago,
			          travelMode: 'TRANSIT',
  transitOptions: {
    departureTime: new Date(1337675679473)
  },
  unitSystem: google.maps.UnitSystem.IMPERIAL
			      };

			        var directionsService = new google.maps.DirectionsService();
			        directionsService.route(request, function(response, status) {
			          if (status == 'OK') {
			            directionsDisplay.setDirections(response);
			          }
			        });   
			},
			myBus: function(){

			}
		},
		route:{
			activate:function(transition){
				this.$root.$set('header',this.title);
				transition.next();
			}
		}
	};
</script>