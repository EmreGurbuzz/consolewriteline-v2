(function ( $ ) {

	"use strict";
	
	$.fn.tesla_slider = function( options ) {

		return this.each(function(i, e){

			var $e = $(e);

			var settings = $.extend({

				item: '.item',
				next: '.next',
				prev: '.prev',
				container: $e,
				autoplay: true,
				autoplayTime: 4000

			},options,{

				item: $e.attr('data-tesla-item'),
				next: $e.attr('data-tesla-next'),
				prev: $e.attr('data-tesla-prev'),
				container: $e.attr('data-tesla-container'),
				autoplay: $e.attr('data-tesla-autoplay')!=="false",
				autoplayTime: $e.attr('data-tesla-autoplay-time') ? parseInt($e.attr('data-tesla-autoplay-time'), 10) : $e.attr('data-tesla-autoplay-time')

			});

			var container = $(settings.container);

			var items = container.find(settings.item);

			var next = $e.find(settings.next);

			var prev = $e.find(settings.prev);

			var max = items.length - 1;

			var index = 0;

			var prev_action;

			var next_action;

			var process;

			var autoplay_interval;

			var autoplay_timeout;

			var autoplay_play;

			var autoplay_stop;

			var autoplay_resume;

			prev_action = function(){

				var index_old = index;
				var index_new;

				index--;

				if( index < 0 )
					index = max;

				index_new = index;

				container.css({
					height: Math.max(items.eq(index_old).outerHeight(true), items.eq(index_new).outerHeight(true))
				});

				items.eq(index_old).stop(true, true).fadeOut(1000, function(){
					
				});
				items.eq(index).stop(true, true).fadeIn(1000, function(){
					container.css({
						height: items.eq(index_new).outerHeight(true)
					});
				});

			};

			next_action = function(){

				var index_old = index;
				var index_new;

				index++;

				if( index > max )
					index = 0;

				index_new = index;

				container.css({
					height: Math.max(items.eq(index_old).outerHeight(true), items.eq(index_new).outerHeight(true))
				});

				items.eq(index_old).stop(true, true).fadeOut(1000, function(){

				});
				items.eq(index).stop(true, true).fadeIn(1000, function(){
					container.css({
						height: items.eq(index_new).outerHeight(true)
					});
				});

			};

			process = function(){

				container.css({
					position: 'relative',
					height: items.eq(0).outerHeight(true)
				});
				items.css({
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0
				});
				items.filter(':gt(0)').css({
					display: 'none'
				});

				$(window).resize(function(){

					container.css({
						height: items.eq(0).outerHeight(true)
					});

				});

				prev.click(function(ev){

					autoplay_stop();
					prev_action();
					autoplay_resume();

					if(ev.preventDefault)
						ev.preventDefault();
					else
						return false;

				});

				next.click(function(ev){

					autoplay_stop();
					next_action();
					autoplay_resume();

					if(ev.preventDefault)
						ev.preventDefault();
					else
						return false;

				});

				items.hover(function(){

					autoplay_stop();

				},function(){

					autoplay_resume();

				});

				autoplay_play = function(){

					autoplay_interval = setInterval(next_action, settings.autoplayTime);

				};

				autoplay_stop = function(){

					clearInterval(autoplay_interval);
					clearTimeout(autoplay_timeout);

				};

				autoplay_resume = function(){

					autoplay_timeout = setTimeout(autoplay_play, settings.autoplayTime);

				};

				autoplay_play();

			};

			if( max > 0 ){

				if(imagesLoaded){

					imagesLoaded(container[0], function(){

						process();

					});

				}else{

					process();

				}

			}

		});

};

$.fn.tesla_masonry = function( options ) {

	return this.each(function(i, e){

		var $e = $(e);

		var settings = $.extend({

			filters: '[data-tesla-plugin="filters"]'

		},options,{

			filters: $e.attr('data-tesla-filters')

		});

		var filters = $(settings.filters);

		var items = $e.children();

		var process = function(){

			$e.masonry();

			if(filters.length){

				filters.on('teslaFiltersChange', function(ev, data){

					var i;

					var n = data.categories.length;

					var selector = '';

					var masonry_object = $e.data('masonry');

					for(i=0; i<n; i++){

						if(i)
							selector += ', ';

						selector += '.' + data.categories[i];

					}

					if(''===selector){

						masonry_object.options.itemSelector = undefined;

						items.stop(true, true).fadeIn(400);

					}else{

						masonry_object.options.itemSelector = selector;

						items.stop(true, true);

						items.filter(selector).fadeIn(400);

						items.not(selector).fadeOut(400);

					}

					masonry_object.reloadItems();

					masonry_object.layout();

				});

			}

		};

		if($.fn.masonry){

			if(imagesLoaded){

				imagesLoaded(e, function(){

					process();

				});

			}else{

				process();

			}

		}

	});

};

$.fn.tesla_filters = function( options ) {

	return this.each(function(i, e){

		var $e = $(e);

		var settings = $.extend({

			categories: '[data-category]'

		},options,{

			categories: $e.attr('data-tesla-category')

		});

		var categories = $e.find(settings.categories);

		categories.click(function(ev){

			var t = $(this);

			var cat_array;

			if(t.hasClass('active')){

				if(''===t.attr('data-category')){

					categories.filter('[data-category=""]').removeClass('active');

					categories.filter('[data-category!=""]').addClass('active');

				}else{

					categories.filter(t).removeClass('active');

					if(!categories.filter('.active').length)
						categories.filter('[data-category=""]').addClass('active');
					
				}

			}else{

				if(''===t.attr('data-category')){

					categories.filter('[data-category=""]').addClass('active');

					categories.filter('[data-category!=""]').removeClass('active');

				}else{

					categories.filter('[data-category=""]').removeClass('active');

					categories.filter(t).addClass('active');
					
				}

			}

			cat_array = categories.filter('.active[data-category!=""]').map(function(){

				return $(this).attr('data-category');

			}).get();

			$e.trigger('teslaFiltersChange', {'categories': cat_array});

			if(ev.preventDefault)
				ev.preventDefault();
			else
				return false;

		});

});

};

$(function(){

	$('[data-tesla-plugin="slider"]').tesla_slider();

	$('[data-tesla-plugin="masonry"]').tesla_masonry();

	$('[data-tesla-plugin="filters"]').tesla_filters();

});

}( jQuery ));