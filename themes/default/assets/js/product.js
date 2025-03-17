var product = {
	owlPrev: '<button type="button" class="btn-prev"></button>',
	owlNext: '<button type="button" class="btn-next"></button>',
	init: function(){
		$('.galleries').each(function(){
			$('.slider-for').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				autoplay: false,
				fade: true,
				focusOnSelect: true,
				autoplaySpeed: 5000,
				speed: 800,
				asNavFor: '.slider-nav',
				prevArrow: product.owlPrev,
				nextArrow: product.owlNext,
			});
			
			$('.slider-nav').slick({
				vertical: false,
				verticalSwiping: true,
				arrows: false,
				slidesToShow: 5,
				slidesToScroll: 1,
				asNavFor: '.slider-for',
				autoplay: false,
				autoplaySpeed: 5000,
				speed: 800,
				focusOnSelect: true,
				responsive: [
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 1,
						}
					}
				]
			});
			
			$('.fancybox').fancybox();
		});
		
		$('.brands.owl-carousel').each(function(){
			$(this).owlCarousel({
				nav: true,
				navText: [
					'<i class="fa fa-angle-left"></i>', 
					'<i class="fa fa-angle-right"></i>', 
				],
				loop: true,
				dots: false,
				autoplay: false,
				autoplaySpeed: 3000,
				autoplayTimeout: 4000,
				autoplayHoverPause: true,
				items: 9,
				margin: 10,
				responsive : {
					0: {
						items: 3,
					},
					768: {
						items: 4,
					},
					1024: {
						items: 5,
					},
					1200 : {
						items: 9,
					}
				}
			});
		});
		
		$('.posts.owl-carousel').each(function(){
			$(this).owlCarousel({
				nav: true,
				navText: [
					product.owlPrev, 
					product.owlNext,
				],
				loop: true,
				dots: false,
				autoplay: false,
				autoplaySpeed: 3000,
				autoplayTimeout: 4000,
				autoplayHoverPause: true,
				items: 4,
				responsive : {
					0: {
						items: 2,
					},
					768: {
						items: 3,
					},
					1024 : {
						items: 4,
					}
				}
			});
		});
	}
};

$(function(){	
	product.init();	
});