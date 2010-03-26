// body-class-swap v .01 for jQuery 1.3
// c) 2010 Alex Welch - www.alexwelch.com - me@alexwelch.com
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 

(function($) {
	
	String.prototype.toLink = function() {
		return this.toLowerCase().replace(/ /g,'-').replace(/\./g, '_').replace(/#/g, '');
	};
	
	function getTargetClasses(container) {				
		return $.map($(container), function(a) { return $(a).attr('href').toLink() })
	};
	
	$.fn.switchClass = function(container, body_class, target) {
		$container = $(this);
		var current_class = 'current';
		var body_classes = getTargetClasses($(container).find('a')).join(' ');
		
		container.find('a').removeClass(current_class);
		target.addClass(current_class);				
		
		$container.removeClass(body_classes);
		$container.addClass(body_class);
	};
	
	$.fn.classSwapper = function(options) {		
		settings = $.extend({
			target_container: 'body'	
		}, options);
		
		$links_container = $(this);
		$target_container = $(settings.target_container);
		
		// check for body_class cookie
		if($.cookie) {
			cookie_name = $links_container.attr('id');
			var body_class = $.cookie(cookie_name);		
			if(body_class) {
				var body_class = body_class
				target = $links_container.find('a[href~="#' + body_class + '"]');
				var $target = $(target)				
				$target_container.switchClass($links_container, body_class, $target);
			}
		}
		
		
		$links_container.click(function(e) {	
			var target = e.target
			var $target = $(target);
			//fixme: do this a better way
			var $parent = $target.closest('div');
							
			if(target.nodeName === 'A') {
				var body_class = $target.attr('href').toLink();				
				$target_container.switchClass($parent, body_class, $target);										
				if($.cookie) {				
					var cookie_name = $parent.attr('id');					
					$.cookie(cookie_name, body_class);
				}
				return false;
			}
		});
	};
}(jQuery));