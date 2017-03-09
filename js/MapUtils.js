(function() {
	$.extend($.fn, {
		getLocationByAddress: function(address, options, successFn, failFn) { //根据地址正向编码
			options = $.extend(true, {
				city: "010", //城市，默认：“全国”
				radius: 500 //范围，默认：500
			}, options);
			if(!$.fn.isEmpty(address)) {
				var geocoder = new AMap.Geocoder({
					city: options.city,
					radius: options.city
				});
				geocoder.getLocation(address, function(status, result) {
					if(status === 'complete' && result.info === 'OK') {
						successFn(result);
					} else {
						failFn(result);
					}
					geocoder = null;
				});
			}
		},
		registerMapPlugin: function(map, pluginName, completeFn) { //单个注册插件
			// 注册ToolBar插件
			map.plugin([pluginName], function() {
				plugin.completeFn && plugin.completeFn(map);
			});
		},
		registerMapPlugins: function(map, plugins) { //批量注册插件
			for(var index in plugins) {
				var plugin = plugins[index];
				var pluginName = plugin.pluginName;
				if(!$.fn.isEmpty(pluginName)) {
					// 注册ToolBar插件
					map.plugin([pluginName], function() {
						plugin.completeFn && plugin.completeFn(map);
					});
				}
			}
		},
		getAddressByLocation: function(cordi, options, successFn, failFn) { //根据坐标获取反向编码
			options = $.extend(true, {
				radius: 1000,
				extensions: "all"
			}, options);
			var geocoder = new AMap.Geocoder({
				radius: options.radius,
				extensions: options.extensions
			});
			geocoder.getAddress(cordi, function(status, result) {
				if(status === 'complete' && result.info === 'OK') {
					successFn(result);
				} else {
					failFn(result);
				}
				geocoder = null;
			});
		},
		/***
		 * options
		 * map-依附的地图对象
		 * position-覆盖物对象的位置(基点位置)
		 * icon-覆盖物图标
		 * offset-相对于基点的偏移位置
		 * draggable-是否可以拖动覆盖物 true-可以 false -不可以
		 * content-覆盖物显示的内容 注意如果设置了这个属性则icon属性无效
		 * raiseOnDrag-拖动是否触发动画
		 * 设置点标记的动画效果，此处为弹跳效果 marker.setAnimation('AMAP_ANIMATION_BOUNCE');
		 * cursor-拖动动画
		 * @param {Object} map
		 * @param {Object} options
		 */
		addMark: function(map,options) { //添加覆盖物
			options = $.extend(true, {}, options);
			var mark = new AMap.Marker(options);
			mark.setMap(map);
			return mark;
		},
		locate: function(map, options, onComplete, onError) { //定位
			options = $.extend(true, {
				enableHighAccuracy: true, //是否使用高精度定位，默认:true
				timeout: 10000, //超过10秒后停止定位，默认：无穷大
				maximumAge: 0, //定位结果缓存0毫秒，默认：0
				convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
				showButton: false, //显示定位按钮，默认：true
				buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
				buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
				showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
				panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
				zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			}, options);
			var geolocation = new AMap.Geolocation(options);
			map.addControl(geolocation);
			geolocation.off("complete");
			geolocation.off("error");
			geolocation.on("complete", function(data) {
				onComplete && onComplete(data);
				map.removeControl(geolocation);
				geolocation = null;
			});
			geolocation.on("error", function(data) {
				onError && onError(data);
				map.removeControl(geolocation);
				geolocation = null;
			});
			geolocation.getCurrentPosition();
		},
		isEmpty: function(obj) {
			return !(obj && obj.length > 0);
		},
		trimNull: function(str, defaultStr) {
			if(!str || str === null || typeof str === "undefined" || $.fn.equalsIgnoreCase(str, "null")) {
				return defaultStr || "";
			} else {
				return str;
			}
		},
		equalsIgnoreCase: function(str1, str2) {
			if(str1.toUpperCase() == str2.toUpperCase()) {
				return true;
			}
			return false;
		}
	});
})(jQuery);