$(function() {

	var intervalHandler;

	var locationInterval = 2000;

	var pageForm = {

		init: function() { //初始化
			this.eventFn();
			this.startCycleLocate();
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
			$.fn.getAddressByLocation([116.396574, 39.992706], null, function(result) {
				var address = result.regeocode.formattedAddress; //返回地址描述
				$("#info-zone").html(address);
			}, function(result) {
				$("#info-zone").html("逆地理编码失败");
			});
		},
		endCycleLocate: function() { // 结束周期性定位
			intervalHandler && clearInterval(intervalHandler);
		}

	};

	pageForm.init();
});

// mark - 高德地图初始化后调用
function init() {
	var map = new AMap.Map('container', {
		center: [116.408075, 39.950187],
		zoom: 6
	});
	map.plugin(["AMap.ToolBar"], function() {
		map.addControl(new AMap.ToolBar());
	});
	map.plugin(["AMap.Geocoder"], function() {

	});
}