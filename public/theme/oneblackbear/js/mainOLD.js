
/*Full BG Image resize*/
$(document).ready(function () {
  $(window).bind('resizeEnd', function () {
    $("#mast").height($(window).height());
    $("#mast-container").height($(window).height());
    $("#background-cover").height($(window).height());
    $(".slide").height($(window).height());
    $(".slider-cover").height($(window).height());
    $(".menu-cover").height($(window).height());
  });

  $(window).resize(function () {
    if (this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function () {
      $(this).trigger('resizeEnd');
    }, 300);
  }).trigger("resize");
});


var main = (function() {

	var currentlyAnimating = false;
	var lastScrollTop = 0;
	var firstScroll = true;

	var currentIndex = 0;

	// $("#main-block p, #main-block h1, #main-block h2, #main-block h3, #main-block h4, #main-block h5, #main-block blockquote, #main-block li").css("opacity", "0");

	return {

		init: function() {


			$(window).bind("mousewheel DOMMouseScroll onmousewheel touchmove scroll",function(e) {

				if (e.originalEvent.wheelDelta >= 0 && !currentlyAnimating) {

					if(!currentlyAnimating && currentIndex === 1) {

						console.log('Scroll up');

						var $mast = $("#mast-container");
						var $mastContent = $("#mast .content");

						// $mast.css("max-width", "100%");
						$mast.velocity({"max-width" : "100%"}, {complete: function() {
							// $mastContent.velocity({"right" : "150px"},{ duration: 70});
							// $mastContent.css("left", "auto");
						}});
						

						currentIndex = 0;
			    		console.log(currentIndex);

					}

					// if(!currentlyAnimating && currentIndex > 1) {

					// 	currentlyAnimating =  true;

					// 	//scroll to slide
					// 	$($(".slider .slide").get(currentIndex - 2)).velocity("scroll", {duration: 350, complete: function() {

					// 		currentlyAnimating = false;
					// 		currentIndex -= 1;
			  //   			console.log("removing 1:   " + currentIndex);

					// 	}});

					// }    
			    }


			    else if(e.originalEvent.wheelDelta < 0) {

					if(!currentlyAnimating && currentIndex === 0 && $(window).scrollTop() === 0) {
			        	console.log('Scroll down');

						currentlyAnimating =  true;

						var $mast = $("#mast-container");
						var $mastContent = $("#mast .content");

						// $mast.css("max-width", "50%");
						// $mast.velocity({"max-width" : "50%"}, {complete: function() {
							// $mastContent.css("left", "150px");
							// $mastContent.velocity({"right" : "75px"},{ duration: 80});
							// $mastContent.css("right", "75px");
						// }});
						

				      //   $("#main-block").velocity("scroll", {duration:350, complete: function() {
				      //   	currentlyAnimating = false;
				      //   	currentIndex = 1;
			    			// console.log(currentIndex);

		        	     	
				      //   }});
					}

					// if(!currentlyAnimating && currentIndex > 0) {

					// 	currentlyAnimating =  true;

					// 	$($(".slider .slide").get(currentIndex)).velocity("scroll", {duration: 350, complete: function() {

					// 		currentlyAnimating = false;
					// 		currentIndex += 1;
			  //   			console.log(currentIndex);

					// 	}});

					// }
				}
			});	



			/*Full page scroller*/
			// $(".slider").onepage_scroll({
			// 	sectionContainer: ".slide", 
			// 	loop: false, 

			// 	afterMove: function(index) {
			// 		currentIndex = index;
			// 	}
			// });

		}
	}
})();


$(function() {
	// main.init();

	// var fsvs = $.fn.fsvs({
	// 		speed : 1000,
	// 		bodyID : 'slider',
	// 		selector : '.slide',
	// 	});
var $menu = $("#menu");
	$menu.find(".menu-items a").css("opacity", 0);
	$menu.find(".menu-content .icons li").css("opacity", 0);


/*Menu open/close*/
$("#menu-button-container").on("click", function() {
	


	if($menu.hasClass("active")) {
		$menu.find(".menu-content .icons li").velocity("transition.slideUpOut", {duration:350, delay: 250});
		// $menu.find(".menu-items a.button").velocity("transition.slideUpOut", {duration:350, delay: 0});
		// $menu.find(".menu-items a.button").css("opacity", 0);
		$menu.find(".menu-items a").velocity("transition.slideUpOut", {duration:150, stagger: 75, backwards : true, complete: function() {
			
				$("#menu").toggleClass("active");
				$("#menu-button").toggleClass("active");
		}});

		setTimeout(function() {
			


		}, 0);
		
	} else {
		$("#menu-button").toggleClass("active");
		$("#menu").toggleClass("active");

		// $("#menu .menu-cover").velocity({"background-color": "rgba(0,0,0,0.85)"}, {duration: 350, stagger: 150 delay: 0, complete: function() {

				$menu.find(".menu-items a").velocity("transition.slideUpIn", {duration:350, stagger: 150, delay: 0, complete: function() {
					

				}});

				// $menu.find(".menu-items a.button").velocity("transition.slideUpIn", {duration:350, delay: 300});

					$menu.find(".menu-content .icons li").velocity("transition.fadeIn", {duration:350, delay: 250});

		// }})



	}



});


/*Fullpage slider init*/
if($("body").hasClass("homepage")) {
	var currentIndex = 1;

	// $(".slider-content h3, .slider-content h1, .slider-content a, .slider-content p").css("opacity", 0);

	$(".slider").onepage_scroll({
		sectionContainer: ".slide", 
		loop: false, 
		easing: "ease",
		animationTime: 300,
		beforeMove: function(intendedIndex) {
			// $($(".slider .slide").get(currentIndex - 1)).velocity("transition.slideUpIn");

			if(intendedIndex === 2 && currentIndex === 1) {
				// $("#mast-container").velocity({"max-width" : "50%"}, {duration:350});
				$("#mast-container").velocity({"max-width" : "50%"}, {duration:350, easing: [0.7,0,0.3,1]});
			} else if(currentIndex === 2 && intendedIndex === 1) {
				// $("#mast-container").velocity({"max-width" : "100%"}, {duration:350});
				$("#mast-container").velocity({"max-width" : "100%"}, {duration:350, easing: [0.7,0,0.3,1]});
			}

			currentIndex = intendedIndex;

			// $($(".slider-content h3, .slider-content h1, .slider-content a, .slider-content p")
			// 	.get(currentIndex - 1)).velocity("transition.slideUpOut");

			// $($(".slider-content").get(currentIndex - 1)).find("h3, h1, a, p").velocity("transition.slideUpOut");



			console.log("beforeMoveIdnex: " + currentIndex);
		},
		afterMove: function(intendedIndex) {

			// $($(".slider-content h3, .slider-content h1, .slider-content a, .slider-content p")
			// 	.get(intendedIndex - 1)).velocity("transition.slideUpIn");

			// $($(".slider-content").get(intendedIndex - 1)).find("h3, h1, a, p").velocity("transition.slideUpIn");

			console.log("afterMoveIndex: " + currentIndex);

		}
	});
}

});

