var global = {
	loadStatistics: function() {
		core.loadAjax({
			module: 'main',
			action: 'statistics',
			data: {
				doaction: 'statistics',
			}
		}, function(response) {
      console.log('response',response);

			$("#counter-hits").html(response.results.hits);
			$("#counter-online").html(response.results.online);
		});
	},
	ajaxSearch: function(e){
		document.body.classList.add('opened-search');
		core.loadAjax({
			module: 'product',
			action: 'search',
			data: {
				lang: lang,
				keyword: e.value,
				doaction: 'search',
			},
			beforeSend: () => {
				$('.maker').addClass('open');
			}
		}, (response) => {
			result = document.getElementById('result');
			result.classList.add('open');
			result.innerHTML = response.results;
			$('.tags-list>li').not(':first').on('click', (e) => {
				s = document.getElementById('s');
				s.value = e.target.textContent;
				s.form.submit();
			});
		});
	},
	dealTime: function(el){
		$(el).find('.deal-time').each((i, ul) => {
			var date = ul.dataset.date;
			date = new Date(date.replace(/-/g, '/'));
			var countDownDate = new Date(date).getTime();
			var x = setInterval(() => {
				var now = new Date().getTime();
				var distance = countDownDate - now;
				if(distance<1) {
					core.loadAjax({
						module: 'product',
						action: 'deldeal',
					}, (response) => {
						if(response.success) {
							$(el).remove();
						}
					});
					clearInterval(x);
				}

				var days, hours, minutes, seconds;
				days = Math.floor(distance / (1000 * 60 * 60 * 24));
				days = core.strPad(days, 2, 0);
				hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				hours = core.strPad(hours, 2, 0);
				minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				minutes = core.strPad(minutes, 2, 0);
				seconds = Math.floor((distance % (1000 * 60)) / 1000);
				seconds = core.strPad(seconds, 2, 0);
				$(ul).find('li').each((id, li) => {
					switch(id){
						case 1: $(li).find('.row0').html(days); break;
						case 2: $(li).find('.row0').html(hours); break;
						case 3: $(li).find('.row0').html(minutes); break;
						case 4: $(li).find('.row0').html(seconds); break;
					}
				});
			}, 1000);
		});
	},
	loadSupport: function(doaction, cb){
		core.callAjax({
			url: ajaxurl,
			data: {
				doaction: doaction,
			},
		}, (response) => {
			cb(response);
		});
	},
	miniCart: function(el){
		core.loadAjax({
			module: 'cart',
			action: 'widget',
		}, (response) => {
			el = document.getElementById(el);
			$(el).replaceWith(response.results);
		});
	},
	newsletter: function(f){
		core.callAjax({
			url: ajaxurl,
			data: {
				email: f.email.value,
				doaction: 'newsletter',
			},
		}, (response) => {
			alert(response.results);
		});
	},
	addToCart: function({pid, qty}, cb){
		core.loadAjax({
			module: 'cart',
			action: 'add',
			data: {
				pid: pid,
				qty: qty,
			},
		}, (response) => {
			if(cb && typeof cb === 'function') {
				cb(response);
			} else {
				global.miniCart(response.results.widget);
			}
		});
	},
	cartRemove: function(rowid){
		core.loadAjax({
			module: 'cart',
			action: 'remove',
			data: {
				rowid: rowid,
			},
		}, (response) => {
			global.miniCart(response.results.widget);
		});
	},
	megaMenu: function(id, cb){
		var el = document.getElementById(id);
		if(el.querySelector('.items')) return;
		core.loadAjax({
			module: 'product',
			action: 'megamenu',
		}, (response) => {
			if(typeof cb === 'function') {
				cb(response, el);
			} else {
				$(el).append(response.results);
			}
		});
	},
	isMobile: function(cb){
		return core.isMobile(cb);
	},
	toggleSidebar: function(el){
		$(el).addClass('toggle');
		var btn, content, btnText;
		btnText = $('h1').text();
		if($(el).find('.active').length) {
			btnText = $(el).find('.active').text();
		}
		$(el).prepend(() => {
			return `<button class="btn-toggle">${btnText}</button>`;
		});
		btn = $(el).find('.btn-toggle');
		content = $(el).find('.items');
		$(btn).on('click', (e) => {
			if(e.target.classList.contains('open')) {
				content.stop().slideUp();
				e.target.classList.remove('open');
			} else {
				content.stop().slideDown();
				e.target.classList.add('open');
			}
		});
	},
	toggleWidget: function(el){
		$(el).addClass('toggle');
		title = $(el).find('.widget-title');
		title.addClass('btn-toggle');
		content = $(el).find('.widget-content');
		title.on('click', (e) => {
			box = e.currentTarget.parentNode;
			if(box.classList.contains('open')) {
				box.classList.remove('open');
				content.stop().slideUp();
			} else {
				box.classList.add('open');
				content.stop().slideDown();
			}
		});
	},
	mmenu: function(el){
		$(el).mmenu({
			extensions: [
				'theme-light',
				'effect-menu-slide',
			],
			offCanvas: {
				position  : 'right',
				zposition : 'front',
			},
			slidingSubmenus: true,
		});

		var API = $(el).data('mmenu');

		// show mobile menu
		$(document).on('click', '#btn-mmenu', function(){
			API.open();
		});

		// close mobile menu
		$('.mm-btn-close').click(function() {
			API.close();
		});
	},
	playAudio: function(url){
		new Audio(url).play();
	},
	entry: function(tag, cb){
		$('.entry').find(tag).each((i, e) => {
			cb(e);
		});
	},
	extHead: function(){
		core.linkTag({
			src: seourl,
			args: {
				rel: 'canonical',
			}
		});
	},
	booking: function(id){
		// core.dd(module);
		// var scripts = $('script');
		// var script = scripts.slice(-1).pop();
		// core.dd(scripts);

		// core.scriptTag({
			// src: `${root}themes/default/assets/js/datetimepicker/js/moment-with-locales.min.js`,
			// id: 'moment-with-locales',
		// });
		// core.scriptTag({
			// src: `${root}themes/default/assets/js/datetimepicker/js/datetimepicker.min.js`,
			// id: 'datetimepicker',
		// });
		// core.scriptTag({
			// src: `${root}themes/default/assets/js/booking.js`,
			// id: 'booking',
		// });
	},
	init: function(mod){

		global.loadStatistics();

		core.init(mod, function(doc){

			new WOW().init();

			$('#header').each(function(){
				$(this).sticky({
					topSpacing: 0,
				});
				$(this).css({
					background: 'white',
				});
			});

			$('#header-sticky-wrapper').each(function(){
				$(this).css({
					zIndex: 999,
					position: 'relative',
				});
			});

			if($(window).width() < 768) {
				$('#mmenu').each(function(){
					global.mmenu(this);
				});
			}

			$('.select2').each(function(){
				$(this).select2();
			});

			switch(method){
				case 'single':
					core.scriptTag({
						src: 'https://connect.facebook.net/vi_VN/sdk.js',
					});
				break;
			}
		});
	},
};

$(function() {
	global.init(module);
});