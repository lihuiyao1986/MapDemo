$(function() {

	var intervalHandler;

	var locationInterval = 2000;

	var map;

	var pageForm = {

		init: function() { //初始化
			this.initMap();
			this.eventFn();
			this.startCycleLocate();
		},
		initMap: function() {
			map = new AMap.Map('container', {
				center: [116.408075, 39.950187],
				zoom: 6
			});

			$.fn.registerMapPlugins(map, [{
				pluginName: "AMap.ToolBar",
				completeFn: function(map) {
					map.addControl(new AMap.ToolBar());
					console.log("注册ToolBar插件完成")
				}
			}, {
				pluginName: "AMap.Geocoder",
				completeFn: function(map) {
					console.log("注册地址编码插件完成")
				}
			}, {
				pluginName: "AMap.Geolocation",
				completeFn: function(map) {
					console.log("注册定位插件完成")
				}
			}]);
		},
		eventFn: function() { // 注册事件

		},
		startCycleLocate: function() { // 开启周期性定位
			intervalHandler = setInterval(this.locate, locationInterval);
		},
		locate: function() {
			//			$.fn.getLocationByAddress("杭州市西湖区墩莳家园",{city:"010",radius:1000},function(result){
			//				console.log("成功:" + result);
			//				var html = "正向编码成功</br>";
			//				html += "地址为:"+result.geocodes[0].formattedAddress;
			//				$("#info-zone").html(html);
			//			},function(result){
			//				$("#info-zone").html("正向编码失败");
			//			});
			//			$.fn.getAddressByLocation([116.396574, 39.992706], null, function(result) {
			//				var address = result.regeocode.formattedAddress; //返回地址描述
			//				$("#info-zone").html(address);
			//			}, function(result) {
			//				$("#info-zone").html("逆地理编码失败");
			//			});
			if(map) { //定位
				$.fn.locate(map, null, function(data) {
					var str = ['定位成功'];
					str.push('经度：' + data.position.getLng());
					str.push('纬度：' + data.position.getLat());
					str.push("地址:" + data.formattedAddress);
					if(data.accuracy) {
						str.push('精度：' + data.accuracy + ' 米');
					} //如为IP精确定位结果则没有精度信息
					str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
					$("#info-zone").html(str.join('<br>'));
				}, function() {
                    $("#info-zone").html("定位失败");
				});
			}
		},
		endCycleLocate: function() { // 结束周期性定位
			intervalHandler && clearInterval(intervalHandler);
		}

	};
	pageForm.init();
});

// mark - 高德地图初始化后调用
//function init() {

//	map.plugin(["AMap.ToolBar"], function() {
//		map.addControl(new AMap.ToolBar());
//	});
//	map.plugin(["AMap.Geocoder"], function() {
//
//	});
//	map.plugin('AMap.Geolocation', function() {
//		var geolocation = new AMap.Geolocation({
//			enableHighAccuracy: true, //是否使用高精度定位，默认:true
//			timeout: 10000, //超过10秒后停止定位，默认：无穷大
//			maximumAge: 0, //定位结果缓存0毫秒，默认：0
//			convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
//			showButton: true, //显示定位按钮，默认：true
//			buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
//			buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//			showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
//			showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
//			panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
//			zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//		});
//		map.addControl(geolocation);
//		geolocation.on("complete", onComplete);
//		geolocation.on("error", onError);
//		//AMap.event.addListener(geolocation, 'complete', onComplete);
//		//返回定位信息
//		//AMap.event.addListener(geolocation, 'error',onError);      //返回定位出错信息
//
//		//解析定位结果
//		function onComplete(data) {
//			alert("ddd");
//			var str = ['定位成功'];
//			str.push('经度：' + data.position.getLng());
//			str.push('纬度：' + data.position.getLat());
//			if(data.accuracy) {
//				str.push('精度：' + data.accuracy + ' 米');
//			} //如为IP精确定位结果则没有精度信息
//			str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
//			document.getElementById('tip').innerHTML = str.join('<br>');
//		}
//		//解析定位错误信息
//		function onError(data) {
//			alert("111ddd");
//			document.getElementById('tip').innerHTML = '定位失败';
//		}
//	});
//}