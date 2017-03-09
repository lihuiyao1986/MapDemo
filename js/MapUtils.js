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
				}else{
					failFn(result);
				}
				geocoder= null;
			});
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