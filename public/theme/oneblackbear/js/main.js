'use strict';

var OneBlackBear = (function(window, $) {
	

	var initLoad = true;


	var _resize = function() {

		var setHeight = function() {

			$(".menu-cover").height($(window).height());

			if($(window).width() > 900) {
				$("#mast").height($(window).height());
				$("#mast-container").height($(window).height());
				$("#background-cover").height($(window).height());
				// $(".slide").height($(window).height());
				// $(".slider-cover").height($(window).height());
			}

			if(initLoad) {
				initLoad = false;
			}
		};

		$(window).bind('resizeEnd', function () {
		  setHeight();
		});

		$(window).resize(function () {
		  if (this.resizeTO) clearTimeout(this.resizeTO);
		  this.resizeTO = setTimeout(function () {
		    $(this).trigger('resizeEnd');
		  }, 300);
		}).trigger("resize");

	};


	var _isMobile = function () {
		if($(window).width() < 900) {
			return true;
		} else {
			return false;
		} 

	};

	var _initHomePageSlide = function() {

		if($("body").hasClass("homepage") && !_isMobile()) {

			var $mastContainer = $("#mast-container");
			var $slider = $(".slider");

			if(!$("#slider").fullpage) return;

			$('#slider').fullpage({

				slideSelector: ".something-else",
				sectionSelector: ".slide",
				scrollingSpeed: 350,

				onLeave: function  (currentIndex, index, direction) {
					if(index == 2 && currentIndex === 1) {
						$mastContainer.velocity({"max-width" : "50%"}, {duration:350, easing: [0.7,0,0.3,1]});
					} else if(index === 1 && currentIndex === 2) {
						$mastContainer.velocity({"max-width" : "100%"}, {duration:350, easing: [0.7,0,0.3,1]});
					}
					console.log(index);
				},

			});

		}
	};



	var _initTimelineSlideBGFade = function () {
		if(!Waypoint) return;


		$("video").css("opacity", 0);
		$(".video.js").css("opacity", "1");

		// init setup
		$(".timeline-section").each(function(index, el) {
			$(this).data("index", index + 1);
		});

		//at top 
		var atTopHandler = function (event) {
			if($(window).scrollTop() <= 150) {
				console.log("at top");
				var url = "url(/img/timeline-" + 1 + ".jpg)";
				$(".timeline-section-bg").css("background-image", url);

			}
		};

		$(window).mousewheel(atTopHandler);
		$(window).on("touchmove", atTopHandler);

		var waypointHandler = function(direction) {

			var index = $(this.element).data("index");
			var $slide = $($(".timeline-section").get(index - 1));

			

			var myPlayer = videojs('#office-video');
			myPlayer.volume(0);


			//video slide

			if($slide.hasClass("video-slide")) {

				$("video").css("opacity", 1);

				$(".timeline-section-bg").velocity("transition.fadeOut", {duration: 550});
				$(".background-cover").addClass("active");
					
				$(".timeline-section-bg").velocity("transition.fadeOut", {delay: 0});
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
					
					$(".background-cover").removeClass("active");

					$(".timeline-section-bg").velocity("transition.fadeIn", {complete: function() {
							$("video").css("opacity", 0);
					}});
					$(".timeline-section-bg").removeClass("hidden");
				}
				
			}


			$(".timeline-section").removeClass("active");
			$(this.element).addClass("active");

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

				$menu.find(".menu-content .icons li").velocity("transition.slideUpOut", {duration:350, delay: 250});

				$menu.find(".menu-items a, .menu-content .icons").velocity("transition.slideUpOut", {duration:150, stagger: 75, backwards : true, complete: function() {
					$menu.toggleClass("active");
					$menuButton .toggleClass("active");
				}});

			} else {

				$menuButton .toggleClass("active");
				$menu.toggleClass("active");

				$menu.find(".menu-items a, .menu-content .icons").velocity("transition.slideUpIn", {duration:350, stagger: 150, delay: 0});

				$menu.find(".menu-content .icons li").velocity("transition.fadeIn", {duration:350, delay: 250});

			}
		});
	};


	var _articleChange = function () {

		if(!$("body").hasClass("article-page")) return;

		$("#next-article").children(".slider-content").children().css("opacity", 0);

		//add a hook to the end of the article
		$(".article .columns").append("<div class='article-end' style='padding-bottom:80px'></div>");

		// var changed = false;

		var waypointHandlerDown = function (direction) {
			if(direction === "down") {
				console.log("reached end of article;");

	       		if(!_isMobile()) {
	       			$("#current-article").velocity("transition.fadeOut");

	       			$("#next-article").velocity("transition.fadeIn");

       				$("#next-article").addClass("shown");

       				$(".article-list-col").removeClass("hidden");

       				$(".article .columns").velocity({opacity: "0.5"});
	       		}

	       		$("#next-article").children(".slider-content").children()
       					.velocity("transition.slideUpIn", {delay: 200});
			}	
		};

		var waypointHandlerUp = function (direction) {
			console.log("hit");
			if(direction === "up") {

		   		if(!_isMobile()) {
		   			$("#next-article").removeClass("shown");

			       	$("#next-article").velocity("transition.fadeOut");
			       	$("#current-article").velocity("transition.fadeIn");

		   			$(".article-list-col").addClass("hidden");
			       	$("#article-menu").addClass("hidden");

       				$(".article .columns").velocity({opacity: "1"});
		   		} 

				$("#next-article").children(".slider-content").children().css("opacity", 0);
			}

		};

		$(".article-end").waypoint(waypointHandlerDown, {offset: "bottom-in-view"});

		$(".article-end").waypoint(waypointHandlerUp, {offset: "bottom-in-view"});

	};


	var _articleChangeOLD = function () {

		var changing = false;

		var hitBottom = false;

		if(!$("body").hasClass("article-change")) return;

		$("#next-article").children(".slider-content").children().css("opacity", 0);


		var lastY = 0; //needed for touchmove event


		var onScroll = function(event) {
			var bottom = $(window).scrollTop() + $(window).height() == $(document).height();
			
			var goingDown;

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

		    	lastY = currentY;
		    	
		    }

	       if (!goingDown && !changing && hitBottom) {

	       		hitBottom = false;
	       		console.log("scrolling up from bottom");

	       		if(!_isMobile()) {
	       			$("#next-article").removeClass("shown");
			       	$("#next-article").velocity("transition.fadeOut");
			       	$("#current-article").velocity("transition.fadeIn");

	       			$(".article-list-col").addClass("hidden");


			       	$("#article-menu").addClass("hidden");

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

	       				$("#next-article").addClass("shown");

	       				$(".article-list-col").removeClass("hidden");

	       				$("#next-article").children(".slider-content").children()
	       					.velocity("transition.slideUpIn", {delay: 200,  complete: function() {

	       					changing = false;

	       				}});
	       		} else {
	       			$("#next-article").children(".slider-content").children()
	       				.velocity("transition.slideUpIn", {delay: 200,  complete: function() {

	       				changing = false;

	       			}});
	       		}
	       		changing = true;
	       }


		};

		$(window).mousewheel(onScroll);
		$(window).on("touchmove", onScroll);
	};


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

			//set new positions and margins
			$image
				.css("position", "absolute")
				.css("left", 0)
				.css("right", 0)
				.css("margin", 0);

			if(!_isMobile()) {
				$imageCopy
					.css("margin-top", "126px")
					.css("margin-bottom", "54px");
			} else {
				$imageCopy
					.css("margin-top", "80px")
					.css("margin-bottom", "54px");

			}

			if($image.hasClass("margin-bottom-zero")) {
				$imageCopy.css("margin-bottom", "-10px");
			}

			//show image
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
		  dots: true,
	  	  responsive: [
	        {
	          breakpoint: 1200,
	          settings: {
	            slidesToShow: 3
	         }},
	         {
	           breakpoint: 900,
	           settings: {
	             slidesToShow: 4
	          }},
	          {
	            breakpoint: 500,
	            settings: {
	              slidesToShow: 3
	           }}
	        ]
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
	            slidesToShow: 1
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
			$(el).data("index", index);
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


	var _normalExit = function () {

		var clickHandler = function (e) {

			var $this = $(this);
			var href = this.href;

			if (!$this.hasClass("next")) {
		        return;
		    } else {
				e.preventDefault();

				$(".slider-cover").addClass("leaving");
				$("body").addClass("leaving");

				setTimeout(function() {
					window.location = href;
				}, 350);
			}
		}

		if($("body").hasClass("homepage") || $("body").hasClass("article-list-page")) {
			$("a").on("click", clickHandler);
		}
	};


	var _articleExit = function() {
		var clickHandler = function (e) {

			var $this = $(this);
			var href = this.href;

			if (!$this.hasClass("next")) {
		        return;
		    } else {
				e.preventDefault();

				if($("#next-article").hasClass("expanded")) {
					$("#next-article").velocity({width: "50%"}, {duration: 300});
				}

				$(".article-list-col").velocity("transition.fadeOut");

				$(".slider-cover").addClass("leaving");

				setTimeout(function() {
					window.location = href;
				}, 350);

			}
		}

		if($("body").hasClass("article-page")) {
			$("a").on("click", clickHandler);
		}
	};

	var _homepageLoad = function () {
		if($(window).width() > 900) {
			$(".homepage .mast").velocity("transition.fadeIn", {duration: 700, complete: function() {

				$(".homepage").addClass("normal");

				$(".homepage .fixed .logo").velocity("transition.slideRightBigIn", {duration: 350, delay: 0});
				$(".homepage .mast .content h1").velocity("transition.slideUpIn", {stagger: 0, duration: 350, delay: 0});

				$(".homepage .slider").velocity("transition.slideUpIn", {duration: 350});
			}});
		} else {
			$(".homepage").addClass("normal");
		}	
	};


	//public
	return {
		init: function() {
			_resize();
			_initHomePageSlide();
			// _initTimelineSlide();
			_initTimelineSlideBGFade();
			_initMenuOpen();
			_articleChange();
			_fullWidthImageHack();
			_sliderInit();
			_internalLinksInit();
			_normalExit();
			_articleExit();

			_homepageLoad();
		}
	};

})(window, $, undefined);


$(function() {
	OneBlackBear.init();
	$("body").addClass("finished-loading");
});