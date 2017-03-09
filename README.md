# MapDemo
操作高德地图的demo

# MapUtils中的方法

### 根据地址正向编码 --  需要先注册AMap.Geocoder组件
getLocationByAddress: function(address, options, successFn, failFn)

### 注册单个地图插件 -- 
registerMapPlugin: function(map, pluginName, completeFn) 

### 批量注册插件
registerMapPlugins: function(map, plugins)

### 根据坐标获取反向编码 -- 需要先注册AMap.Geocoder组件
getAddressByLocation: function(cordi, options, successFn, failFn)

### 定位 -- 需要先注册AMap.Geolocation组件
locate: function(map,options,onComplete,onError) 
