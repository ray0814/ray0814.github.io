const baseLayers = {};
baseLayers['本地地圖'] = L.tileLayer("/tiles/L{z}/{y}/{x}.png", {
		  tileSize: 256,
		  maxZoom: 19,
		  minZoom: 7,
		  attribution: ''
		});
baseLayers['ArcGIS Online'] = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 18,
		  attribution: 'ArcGIS Online'
		});
baseLayers['OSM'] = L.tileLayer('https://b.tile.osm.org/{z}/{x}/{y}.png', {
		  tileSize: 256,
		  maxZoom: 18,
		  attribution: 'OSM'
		});
baseLayers['OpenStreetMap'] = L.tileLayer('https://c.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		  tileSize: 256,
		  maxZoom: 18,
		  attribution: 'OpenStreetMap'
		});
baseLayers['臺灣通用電子地圖'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖透明'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP2/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖(套疊等高線)OpenData, 最大比例尺一萬八千分之一'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP5_OPENDATA/default/GoogleMapsCompatible/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖(等高線+門牌)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP5/default/GoogleMapsCompatible/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖(不含等高線)OpenData, 最大比例尺一萬八千分之一'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP6_OPENDATA/default/GoogleMapsCompatible/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖(無等高線)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP6/default/GoogleMapsCompatible/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['TaiwanE-Map(Transparent)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP7/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['TaiwanE-Map(EN)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP8/default/GoogleMapsCompatible/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖(無等高線及門牌)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP16/default/GoogleMapsCompatible/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖(等高線無門牌)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP15/default/GoogleMapsCompatible/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖透明(無門牌)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP12/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['正射影像圖(通用)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['1/100000 地形圖'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/B100000/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['1/25000 地形圖'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/B25000/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['1/50000 地形圖'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/B50000/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['1/5000基本地形圖'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/B5000/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['地段外圍圖(段籍圖)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/LANDSECT/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['道路路網'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/ROAD/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['鄉鎮區界'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/TOWN/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['村里界'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/Village/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['104年正射影像圖'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/PHOTO2015/default/GoogleMapsCompatible/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖(無鐵公路)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP9/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖(無文字)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAPX99/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['正射影像(混合)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/PHOTO_MIX/default/GoogleMapsCompatible/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['Taiwan e-Map(new)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP97/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖(高DPI字)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP96/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖(新)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP98/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['國土利用現況調查-2類森林'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/LUIMAP02/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['國土利用現況調查-3類交通'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/LUIMAP03/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['國土利用現況調查-4類水利'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/LUIMAP04/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['AED位置'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/AED/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['臺灣通用電子地圖(灰階)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/EMAP01/default/GoogleMapsCompatible/{z}/{y}/{x}.jpeg', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['坡向圖'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/MOI_ASPECT/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['陰影圖'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/MOI_HILLSHADE/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['渲染圖'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/MOI_SHADERMAP/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
baseLayers['便利商店(超商)'] = L.tileLayer('https://wmts.nlsc.gov.tw/wmts/ConvenienceStore/default/GoogleMapsCompatible/{z}/{y}/{x}.png', {
		  tileSize: 256,
		  maxZoom: 19,
		  attribution: '© NLSC Taiwan'
		});
