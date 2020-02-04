;(function($, window, undefined) {

	var DEFAULTS = {
		wrapClass: 'sp-container',
		offsetTop: null,
		parent: '<div/>'
	};

	var model = {};

	function Stackpage(elements, options) {
		this.elements = elements;
		this.config	= $.extend({}, DEFAULTS, options);
		this.init();
	}

	Stackpage.prototype.init = function() {
		var that = this;

		$(document.body).css({position: "relative"});

		function calcOffsetTop(target) {
			var offsetTop = 0;
			$(target).first().parents().each(function(i, el) {
				offsetTop += $(el).offset().top;
			});
			return offsetTop;
		}

		function calcHeights () {
			var heights = [];
			var elHeights = [];
			var bodyHeight = 0;

			var _w = 0;
			if ($(window).width() <= 991) _w = 95;

			if (that.config.offsetTop) {
				that.config.parent.css({top: that.config.offsetTop - calcOffsetTop(that.elements)});
			} else {
				that.config.offsetTop = calcOffsetTop(that.elements);
			}

			that.elements.each(function(i, el) {
				heights.push(bodyHeight);
				elHeights.push($(el).height() + _w);
				$(el).css({
					'z-index': $(that.elements).length - i
				});
				bodyHeight += ($(el).height() + _w);
				if (i !== 0 && $(document.body).scrollTop() <= that.config.offsetTop) {
					$(el).addClass('sp-fixed').css({
						visibility: 'hidden',
						top: '0',
						left: '0'
					});
				}

			});

			bodyHeight += that.config.offsetTop;
			var initBody = elHeights[0] + elHeights[1] + that.config.offsetTop;
			$(document.body).css({
				height: initBody + 'px'
			});

			model.heights = heights;
			model.bodyHeight = initBody;
			model.elHeights = elHeights;

			$('html, body').animate({
				scrollTop: 0
			}, 0);
		}

		function showCurrentPos(){
			var top = $(window).scrollTop();
			var active_pos = 0;
			for (var i = 1; i < model.heights.length; i ++){
				var dd= model.heights[i];
				if (top < model.heights[i] + that.config.offsetTop){
					active_pos = i;
					break;
				}
			}
			if (active_pos == 0) active_pos = 6;
			$(".indicator div").removeClass("in-active");
			$("#in-"+active_pos+" .in-item").addClass("in-active");

			renderBody();
		}

		function renderBody(){
			var bodyHeight = 0;
			var active_page = $(".in-active").attr("data-page");
			for (var i = 0; i < model.elHeights.length; i ++){
				if (i <= active_page){
					bodyHeight += model.elHeights[i];
				}
			}

			bodyHeight += that.config.offsetTop;
			$(document.body).css({
				height: bodyHeight + 'px'
			});
			model.bodyHeight = bodyHeight;
		}
		
		this.config.parent = $(this.config.parent)
			.addClass(this.config.wrapClass)
			.css({
				position: 'relative',
		});

		calcHeights();
		showCurrentPos();

		$(window).resize(function(){
			calcHeights();
		})
		
		$(window).scroll(function(e) {
			var top = $(window).scrollTop();
			for (var i = 1; i < model.heights.length; i++) {
				if (top  >= model.heights[i] + that.config.offsetTop) {
					that.elements.eq(i).removeClass('sp-fixed');

				} else {
					that.elements.eq(i).addClass('sp-fixed');
				}
				if (top < that.config.offsetTop) {
					$('.sp-fixed').css({visibility: 'hidden'});
				} else {
					$('.page').add('.sp-fixed').css({visibility: 'visible'});
				}
			}
			
			$(".page").removeClass("active-scroll");
			$(".sp-container .page").not(".sp-fixed").last().addClass("active-scroll");
			
			clearTimeout($.data(this, 'scrollTimer'));
			$.data(this, 'scrollTimer', setTimeout(function(){
				if ($(".sp-container").hasClass("click-s") == false){
					showCurrentPos();
				}else{
					$(".sp-container").removeClass("click-s");
					renderBody();
				}
			}, 100));
		});

		$(".in-item").click(function(){
			var page = $(this).attr("data-page");
			var scrollTop = model.heights[page - 1] + that.config.offsetTop
			if (!$(this).hasClass("in-active")){
				$('html, body').animate({
					scrollTop: scrollTop
				}, 1000);
			}
			$(".sp-container").addClass("click-s");
			$(".indicator div").removeClass("in-active");
			$(this).addClass("in-active");

			// renderBody();
		})

		// IE fix jumpy scroll
		if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
	        $('body').on("mousewheel", function () {
	            // remove default behavior
	            event.preventDefault(); 

	            //scroll without smoothing
	            var wheelDelta = event.wheelDelta;
	            var currentScrollPosition = window.pageYOffset;
	            window.scrollTo(0, currentScrollPosition - wheelDelta);
	        });
		}
	};

	$.fn.stackpage = function(options) {
		new Stackpage(this, options);
		return this;
	};

})(jQuery, window);