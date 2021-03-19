jQuery(window).load(function(){
	'use strict';
	// Loader
	$('.loader .inner').fadeOut(500, function(){
		$('.loader').fadeOut(750);
	});

	// Portfolio
	var $container = $('.portfolio-items');
	$container.isotope({
		filter: '*',
		animationOptions: {
			duration: 1500,
			easing: 'linear',
			queue: false
		}
	});

	$('#filters a').click(function(){
		$('#filters .current').removeClass('current');
		$(this).addClass('current');

		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector,
			animationOptions: {
				duration: 1500,
				easing: 'linear',
				queue: false
			}
		});
		return false;
	});

});

$(document).ready(function(){
	'use strict';
	// Scroll
	$('.scrollto').click(function(e){
		e.preventDefault();
		var scrollElm = $(this).attr('href');
		var scrollTo = $(scrollElm).offset().top;
		$('html, body').animate({ scrollTop: scrollTo - 50 }, "slow");
	});

	// Slides
	$('#slides').superslides({
		animation: 'fade',
		play: 5000
	});

	// Skills
	var owl = $("#skills-slide");
	owl.owlCarousel({
		autoPlay:true,
		items:4,
		itemsDesktop:[1000,4],
		itemsDesktopSmall:[900,3],
		itemsTablet:[600,2],
		itemsMobile:[480,1]
	});

	// Portfolio modal
	$('.fullwidth').boxer();

	// Animations
	var windowH = $(window).height();

	$(window).bind('resize', function () {
		windowH = $(window).height();
	});

	$('.hidethis').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).removeClass('hidethis');
		}
	});

	var servicesTopOffset = $('.services .services-inner').offset().top;
	var timelineTopOffset = $('.timeline').offset().top;
	var skillsTopOffset = $('.skills').offset().top;
	$(window).scroll(function(){
		// Fixed Navbar
		if(window.pageYOffset > windowH)
		{
			$('.navbar-flat').addClass('navbar-fixed-top');
			$('.firstSec').addClass('fixed');
		}
		else
		{
			$('.navbar-flat').removeClass('navbar-fixed-top');
			$('.firstSec').removeClass('fixed');
		}
		// Timeline animation
		if(window.pageYOffset > timelineTopOffset-windowH+200)
		{
			$('.timeline li').addClass('fadeInUp');
		}
		// Skills Chart animation
		if(window.pageYOffset > skillsTopOffset-windowH+200)
		{
			$('.chart').easyPieChart({
				easing: 'easeInOut',
				barColor: '#ffffff',
				trackColor: '#d82c2e',
				scaleColor: false,
				lineWidth: 4,
				size: 152,
				onStep: function(from, to, percent) {
					$(this.el).find('.percent').text(Math.round(percent));
				}
			});
		}
	});


	if(!Modernizr.input.placeholder){
		$('[placeholder]').each(function(){
			if($(this).val()=="" && $(this).attr("placeholder")!=""){
				$(this).val($(this).attr("placeholder"));
				$(this).focus(function(){
					if($(this).val()==$(this).attr("placeholder")) $(this).val("");
				});
				$(this).blur(function(){
					if($(this).val()=="") $(this).val($(this).attr("placeholder"));
				});
			}
		});
	}

	// Form Validation
	$.validate({
		form:'.contactform',
		borderColorOnError : '#c12728',
		scrollToTopOnError : false,
		validateOnBlur : false,
		onError:function() {
			//alert('Validation failed');
		},
		onSuccess:function(){
			$('.sendcontact').prop("disabled",true);
			$('p.error').html('Your message has been sent!');
			var name		= $("form[name=contactform] input[name='send[name]']").val(),
				email		= $("form[name=contactform] input[name='send[email]']").val(),
				message		= $("form[name=contactform] textarea[name='send[message]']").val();

			$.ajax({
				url: '/send.php',
				type: 'POST',
				data: {type: 'contact', name : name, email : email, message : message},
				dataType: 'json',
				success: function(data)
				{
					$('.sendcontact').prop("disabled",true);
					$('p.error').html('Your message has been sent!');
				},
				error: function(){
					$("#xhr").removeClass('xhr');
				}
			});
		}
	});

});