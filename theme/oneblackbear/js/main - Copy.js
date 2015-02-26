'use strict';

var OneBlackBear = (function(window, $) {
	
	var initLoad = true;

	var _resize = function() {

		var setHeight = function() {

			$(".menu-cover").height($(window).height());
			// $(".timeline .timeline-section").height($(window).height());


			if($(window).width() > 900) {
				$("#mast").height($(window).height());
				$("#mast-container").height($(window).height());
				$("#background-cover").height($(window).height());
				$(".slide").height($(window).height());
				$(".slider-cover").height($(window).height());
			}

			if(initLoad) {
				// $(".js .mast-container, .js .col-left, .js .col-right").velocity("transition.fadeIn");
				initLoad = false;
			}
		};

		// if(!_isMobile()) {
			$(window).bind('resizeEnd', function () {
			  setHeight();
			});

			$(window).resize(function () {
			  if (this.resizeTO) clearTimeout(this.resizeTO);
			  this.resizeTO = setTimeout(function () {
			    $(this).trigger('resizeEnd');
			  }, 300);
			}).trigger("resize");
		// } else {
			// setHeight();
		// }

		
	};

	var _isMobile = function () {
		if($(window).width() < 900) {
			return true;
		} else {
			return false;
		} 

	};

	var _initHomePageSlide = function() {
		// if($("body").hasClass("homepage") && !_isMobile()) {
		// 	var currentIndex = 1;

		// 	var $mastContainer = $("#mast-container");
		// 	var $slider = $(".slider");

		// 	var beforeMove = function(intendedIndex) {

		// 		if(intendedIndex === 2 && currentIndex === 1) {
		// 			$mastContainer.velocity({"max-width" : "50%"}, {duration:350, easing: [0.7,0,0.3,1]});
		// 		} else if(currentIndex === 2 && intendedIndex === 1) {
		// 			$mastContainer.velocity({"max-width" : "100%"}, {duration:350, easing: [0.7,0,0.3,1]});
		// 		}

		// 		currentIndex = intendedIndex;

		// 		console.log("beforeMoveIdnex: " + currentIndex);
		// 	};

		// 	var afterMove = function(intendedIndex) {

		// 		console.log("afterMoveIndex: " + currentIndex);
		// 	};

		// 	$slider.onepage_scroll({
		// 		sectionContainer: ".slide", 
		// 		loop: false, 
		// 		easing: "ease",
		// 		animationTime: 300,
		// 		beforeMove: beforeMove,
		// 		afterMove: afterMove
		// 	});
		// }



		var $mastContainer = $("#mast-container");
		var $slider = $(".slider");

		// var currentIndex = 1;

		if(!$("#slider").fullpage) return;

		$('#slider').fullpage({

			slideSelector: ".something-else",
			sectionSelector: ".slide",
			scrollingSpeed: 350,
			// easing: 'easeInQuart',

			onLeave: function  (currentIndex, index, direction) {
				if(index == 2 && currentIndex === 1) {
					$mastContainer.velocity({"max-width" : "50%"}, {duration:350, easing: [0.7,0,0.3,1]});
				} else if(index === 1 && currentIndex === 2) {
					$mastContainer.velocity({"max-width" : "100%"}, {duration:350, easing: [0.7,0,0.3,1]});
				}
				console.log(index);
			},

			// onSlideLeave: function(anchorLink, index, slideIndex, direction) {
				
			// },

			// afterSlideLoad: function(anchorLink, index, slideIndex, directio) {
			// 	console.log("afterSlideLoad called");
			// }


		});
	};



	var _initHomePageSlideBGFade = function () {
		if(!Waypoint) return;


		// init setup
		$(".timeline-section").each(function(index, el) {
			// console.log(index);
			$(this).data("index", index + 1);
			// console.log($(this));

			// console.log($(this).data("index"));

			// if(index !== 0) {
			// 	$(this).children().velocity("transition.fadeOut");
			// }
		});

		//at top 
		var atTopHandler = function (event) {
			if($(window).scrollTop() <= 250) {
				console.log("at top");
				var url = "url(/img/timeline-" + 1 + ".jpg)";
				$(".timeline-section-bg").css("background-image", url);

			}
		};

		$(window).mousewheel(atTopHandler);
		$(window).on("touchmove", atTopHandler);


		//hit waypoint
		// var waypointHandler = function (direction) {
		// 	console.log("Called");
		// 	var index = $(this.element).data("index");

		// 	var url = "url(/img/timeline-" + index + ".jpg)";
		// 	$(".timeline-section-bg").css("background-image", url);
		// };

		var waypointHandler = function(direction) {

			var index = $(this.element).data("index");
			var $slide = $($(".timeline-section").get(index - 1));

			var myPlayer = videojs('#office-video');
			myPlayer.volume(0);


			//video slide

			if($slide.hasClass("video-slide")) {
				//hide bg
				$(".timeline-section-bg").velocity("transition.fadeOut");
				$(".timeline-section-bg").addClass("hidden");

				//start video
				myPlayer.play();
			} else {
				var url = "url(/img/timeline-" + index + ".jpg)";
				$(".timeline-section-bg").css("background-image", url);

				//un hide bg
				if($(".timeline-section-bg").hasClass("hidden")) {
					//pause video
					myPlayer.pause();

					$(".timeline-section-bg").velocity("transition.fadeIn");
					$(".timeline-section-bg").removeClass("hidden");
				}
				
			}


			$(".timeline-section").removeClass("active");
			$(this.element).addClass("active");


			// $(".timeline-section-bg").velocity("stop");

			// $(".timeline-section-bg").velocity({"scale": "1.05"}, {duration: 10000});
		};

		// up
		$(".timeline-section").waypoint(function(direction) {
			if(direction === "up") {
				waypointHandler.call(this, direction);
			}
		}, {
			offset: '-25%'
		});

		//down
		$(".timeline-section").waypoint(function(direction) {
			if(direction === "down") {
				waypointHandler.call(this, direction);
			}
		}, {
			offset: '75%'
		});
		

	
		// $(".timeline-section").waypoint(function(direction) {
		// 	if(direction === "up") {
		// 		var index = $(this.element).data("index");
		// 		var url = "url(/img/timeline-" + index + ".jpg)";
		// 		$(".timeline-section-bg").css("background-image", url);

		// 		$(".timeline-section").removeClass("active");
		// 		$(this.element).addClass("active");
		// 	}
		// }, {
		// 	offset: '-25%'
		// });


		// $(".timeline-section").waypoint(, {
		// 	offset: '75%'
		// });
	};



	//this needs work to accomadate multiple slides
	var _initTimelineSlide = function() {

		//first slide 

		$(".timeline-section .timeline-content").first().children().velocity("transition.slideUpIn");

		if($("body").hasClass("timeline-page") && !_isMobile()) {

			//cache index of slide to determine direction slide (up/down)
			var currentIndex = 1;
			var videoSlide = -1;
			var myPlayer;

			//get index of video slides
			videojs("office-video").ready(function(){

				$(".timeline-section").each(function(index, el) {
					console.log(el);
					if($(el).hasClass("video-slide")) {
						// videoSlide.push(index + 1);
						$(el).height($(window).height());
						myPlayer = videojs('#office-video');
						myPlayer.volume(0);
						videoSlide = index + 1;
						$(el).css("opacity", 1);
					}
				});

			});


			//animation init
			// $(".timeline-content").css("opacity", "0");

			

			var beforeMove = function(intendedIndex) {
		
			};

			var afterMove = function (intendedIndex	) {
				if(intendedIndex === videoSlide && myPlayer) {
					myPlayer.play();
				}

				var velocityOptions = {
					stagger: 150
				};

				$(".timeline-content").children().css("opacity", "0");

				$($(".timeline-content").get(intendedIndex - 1)).children().velocity("transition.slideUpIn");
			};

			$("#timeline").onepage_scroll({
				sectionContainer: "section", 
				loop: false, 
				easing: "ease",
				animationTime: 300,
				afterMove: afterMove
			});
		}

	};
	

	var _initMenuOpen = function() {

		var $menu = $("#menu");
		var $menuButtonContainer = $("#menu-button-container");
		var $menuButton = $("#menu-button");

		$menu.find(".menu-items a").css("opacity", 0);
		$menu.find(".menu-content .icons li").css("opacity", 0);

		/*Menu open/close*/
		$menuButtonContainer.on("click", function(e) {
			
			e.preventDefault();

			if($menu.hasClass("active")) {

				// $("body").toggleClass("menu-open");

				// var html = jQuery('html');
				//       var scrollPosition = html.data('scroll-position');
				//       html.css('overflow-y',
				//        html.data('previous-overflow'));
				//       window.scrollTo(scrollPosition[0], scrollPosition[1])
				

				$menu.find(".menu-content .icons li").velocity("transition.slideUpOut", {duration:350, delay: 250});

				$menu.find(".menu-items a, .menu-content .icons").velocity("transition.slideUpOut", {duration:150, stagger: 75, backwards : true, complete: function() {
					$menu.toggleClass("active");
					$menuButton .toggleClass("active");
				}});

			} else {



				// $("body").toggleClass("menu-open");
		      	// var scrollPosition = [
		       //        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
		       //        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
		       //      ];
		       //      console.log(scrollPosition);
		       //      var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
		       //      html.data('scroll-position', scrollPosition);
		       //      html.data('previous-overflow', html.css('overflow'));
		       //      html.css('overflow-y', 'hidden');
		       //      window.scrollTo(scrollPosition[0], scrollPosition[1]);

				$menuButton .toggleClass("active");
				$menu.toggleClass("active");

				$menu.find(".menu-items a, .menu-content .icons").velocity("transition.slideUpIn", {duration:350, stagger: 150, delay: 0});

				$menu.find(".menu-content .icons li").velocity("transition.fadeIn", {duration:350, delay: 250});

			}
		});
	};


	var _articleChange = function () {

		var changing = false;

		var hitBottom = false;

		if(!$("body").hasClass("article-change")) return;

		$("#next-article").children(".slider-content").children().css("opacity", 0);

		
		// set col-right to height of viewportand return
		if(_isMobile()) {
			// var viewportHeight = $(window).height();
			// $(".col-right").css("margin-bottom", viewportHeight);

			// return;
		}

		var lastY = 0; //needed for touchmove event

		
		// $(window).bind("mousewheel", function(e) { 
		// $(window).on("mousewheel", function(e) 

		var onScroll = function(event) {
			// console.log("event fired");
			var bottom = $(window).scrollTop() + $(window).height() == $(document).height();
			
			var goingDown;

		    // console.log(event.deltaY);

		    if(event.deltaY) {
		    	if(event.deltaY >= 0) {
		    		goingDown = false;
		    	} else {
		    		goingDown = true;
		    	}
		    } else {

		    	var currentY = event.detlaY ?  event.deltaY : event.originalEvent.touches[0].pageY;


		    	if(currentY >= lastY) {
		    		goingDown = true;
		    	} else {
		    		goingDown = false;
		    	}

		    	console.log("lastY " + lastY);
		    	console.log("currentY " + currentY);

		    	lastY = currentY;
		    	

		    	console.log(goingDown);

		    	console.log("++++++++++++++++++++++++++++++++");
		    }

	       if (!goingDown && !changing && hitBottom) {

	       		hitBottom = false;
	       		console.log("scrolling up from bottom");

	       		if(!_isMobile()) {
	       			// $("#next-article").velocity({width: "50%"});
	       			$("#next-article").removeClass("shown");

	       			// $("#next-article").removeClass("expanded");
			       	$("#next-article").velocity("transition.fadeOut");
			       	$("#current-article").velocity("transition.fadeIn");

	       			$(".article-list-col").addClass("hidden");


			       	$("#article-menu").addClass("hidden");

		       		// $(".article").velocity({"opacity": "1"}, {duration: 150, easing: [0.165, 0.840, 0.440, 1.000]});
	       		}

		       	$("#current-article").children(".slider-content").children()
		       		.velocity("transition.slideUpIn", {delay: 200,  complete: function() {

					$("#next-article").children(".slider-content").children().css("opacity", 0);

		       		changing = false;

		       	}});

		       	changing = true;
	       } else if(goingDown && !hitBottom && !changing && bottom) {
	       		console.log("hit bottom");
	       		hitBottom = true;

	       		if(!_isMobile()) {
	       			$("#current-article").velocity("transition.fadeOut");
	       			$("#next-article").velocity("transition.fadeIn");


	       			// $("#next-article").velocity({width: "100%"}, {duration: 300, complete: function() {

	       				$("#next-article").addClass("shown");

	       				$(".article-list-col").removeClass("hidden");

	       				// $("#next-article").addClass("expanded");
	       				// $("#article-menu").removeClass("hidden");

	       				$("#next-article").children(".slider-content").children()
	       					.velocity("transition.slideUpIn", {delay: 200,  complete: function() {

	       					// $("#current-article").children(".slider-content").children().css("opacity", 0);
	       					changing = false;

	       				}});
	       			// }});

	       			// $(".article").velocity({"opacity": "0"}, {duration: 450, easing: [0.165, 0.840, 0.440, 1.000]});
	       		} else {
	       			$("#next-article").children(".slider-content").children()
	       				.velocity("transition.slideUpIn", {delay: 200,  complete: function() {

	       				// $("#current-article").children(".slider-content").children().css("opacity", 0);
	       				changing = false;

	       			}});
	       		}
	       		changing = true;
	       }


		};

		$(window).mousewheel(onScroll);
		$(window).on("touchmove", onScroll);
	};


	// var _exitAnimation = function() {

	// 	$("a").on("click", function() {

	// 		var url = $(this).attr('href');

	// 		$(".col-right").velocity("transition.swoopOut", {complete: function() {
	// 		    document.location.href = url;
	// 		}});
			
	// 		return false;

	// 	});
	// };

	// var _entryAnimation = function() {
	// 	if($("body").hasClass("article-page")) {
	// 		$(".col-left").velocity("transition.swoopIn");

	// 	}
	// };


	//To make an image the full width of its parents parent
	var _fullWidthImageHack = function() {
		$(".full-width").each(function (index, el) {
			var $image = $(el);

			//hide image
			$image.css("opacity", 0);

			//duplicate image
			var $imageCopy = $image.clone();

			//put back in the dom
			$imageCopy.insertAfter($image);
			// var $imageCopy = $(imageCopy);

			//set new positing and margins
			$image
				.css("position", "absolute")
				.css("left", 0)
				.css("right", 0);

			$imageCopy
				.css("margin-top", "126px")
				.css("margin-bottom", "54px");

			$image.velocity("transition.fadeIn");


		});
	};


	var _sliderInit = function () {
		$('.logo-slider').slick({
		  infinite: true,
		  slidesToShow: 4,
		  slidesToScroll: 1,
		  autoplay: true,
		  autoplaySpeed: 4000,
		  slide: ".logo-slide",
		  arrows: false,
		  dots: true
		});

		$('.stats-slider').slick({
		  infinite: true,
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  autoplay: true,
		  autoplaySpeed: 4000,
		  slide: ".stats-slide",
		  arrows: false,
		  dots: true,
		  responsive: [
	      {
	        breakpoint: 1200,
	        settings: {
	          slidesToShow: 2
	       }},
	       {
	         breakpoint: 900,
	         settings: {
	           slidesToShow: 3
	        }},
	        {
	          breakpoint: 500,
	          settings: {
	            slidesToShow: 2
	         }}
	      ]
		});


	};

	var _internalLinksInit = function () {

		var clickHandler = function (e) {
			e.preventDefault();
			var target = this.hash;
			var $target = $(target);

			$target
			    .velocity("scroll", { duration: 750, offset: "-27px", mobileHA: false });
		};

		$("a[href^='#']").on("click", clickHandler);

		//add indexes
		$(".feature").each(function(index, el){ 
			var $el = $(el);

			$el.data("index", index);
		});


		var waypointHandler = function (direction) {
			var index = $(this.element).data("index");
			$(".services-list li").removeClass("active");
			$($(".services-list li").get(index)).addClass("active");
		}


		$(".feature").waypoint(function (direction) {
			if(direction === "down") {
				waypointHandler.call(this, direction);
			}
		}, {offset: "30px"});

		$(".feature").waypoint(function (direction) {
			if(direction === "up") {
				waypointHandler.call(this, direction);
			}
		}, {offset: "-30px"});


	};

	var _homepageExit = function () {

		var clickHandler = function (e) {

			e.preventDefault();

			var $this = $(this);
			var href = this.href;

			$(".slider-cover").addClass("leaving");
			$("body").addClass("leaving");

			setTimeout(function() {
				window.location = href;
			}, 350);
		}

		if($("body").hasClass("homepage")) {
			$("a").on("click", clickHandler);
		}
	};

	var _articleExit = function() {
		var clickHandler = function (e) {
			e.preventDefault();

			var $this = $(this);
			var href = this.href;

			if($("#next-article").hasClass("expanded")) {
				$("#next-article").velocity({width: "50%"}, {duration: 300});
			}

			$(".article-list-col").velocity("transition.fadeOut");

			$(".slider-cover").addClass("leaving");
			// $("body").addClass("leaving");

			setTimeout(function() {
				window.location = href;
			}, 300);
		}

		if($("body").hasClass("article-page")) {
			$("a").on("click", clickHandler);
		}
	}


	//public
	return {
		init: function() {
			_resize();
			_initHomePageSlide();
			// _initTimelineSlide();
			_initHomePageSlideBGFade();
			_initMenuOpen();
			_articleChange();
			_fullWidthImageHack();
			_sliderInit();
			_internalLinksInit();
			_homepageExit();
			_articleExit();

			//finishedLoading


			// _entryAnimation();
			// _exitAnimation();
		}
	};

})(window, $, undefined);


$(function() {

	OneBlackBear.init();
	$("body").addClass("finished-loading");



	

	// $("#mast h1 span:not(.light)").velocity("transition.slideUpIn", {stagger: 150, complete: function() {
	// $("#mast h1 span.light").velocity("transition.slideUpIn", {stagger: 150, duration: 700});
		
	// }});
	// $("#mast h1 span.epic").velocity("transition.bounceIn", {stagger: 150, duration: 700});

	
});