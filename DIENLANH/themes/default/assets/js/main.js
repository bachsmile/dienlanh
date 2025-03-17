var main = {
	owlPrev: '<i class="fa fa-angle-left"></i>',
	owlNext: '<i class="fa fa-angle-right"></i>',
	init: function(){
		$('.banner-slide').each(function(){
			$(this).owlCarousel({
				nav: true,
				navText: [
					main.owlPrev,
					main.owlNext,
				],
				loop: true,
				dots: false,
				autoplay: true,
				autoplaySpeed: 3000,
				autoplayTimeout: 4000,
				autoplayHoverPause: true,
				items: 1,
				animateIn: 'fadeIn',
				animateOut: 'fadeOut',
			});
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
	main.init();
});