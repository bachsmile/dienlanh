var page = {
	loadMap: function(el){
		core.modAjax('loadMap', {
			data: {
				lang: lang,
				id: el.dataset.id,
			},
		}, (response) => {
			book = response.results.book;
			setting = response.results.setting;
			el.style.width = setting.map_width;
			el.style.height = setting.map_height;
			lat_lng = new google.maps.LatLng(book.map_lat, book.map_lng);
			options = {
				center: lat_lng,
				mapTypeId: setting.map_type,
				zoom: Number(setting.map_zoom),
				disableDefaultUI: setting.disabled_map_control,
			};
			map = new google.maps.Map(el, options);
			marker = new google.maps.Marker({
				map: map,
				position: lat_lng,
				icon: setting.marker_icon
			});
			infowindow = new google.maps.InfoWindow({
				content: book.map_desc,
			});
			infowindow.open(map, marker);
			marker.addListener('click', function(){
				infowindow.open(map, marker);
			});
		});
	},
	loadBook: function(el){
		core.modAjax('loadBook', {
			data: {
				lang: lang,
			},
		}, (response) => {
			el.innerHTML = response.results.books;
		});
	},
	init: function(){
		$('#map').each(function(){
			page.loadMap(this);
		});
		$('#books').each(function(){
			page.loadBook(this);
		});
		$('#box-project .project.text').each(function(){
			$(this).height($('#box-project .project').height());
		});
		$('#box-project .project').each(function(){
			$(this).height($('#box-project .project.text').height());
		});
	}
};

$(function(){
	page.init();
});