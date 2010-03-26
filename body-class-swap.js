// bodyClassSwitch v .01 for jQuery 1.3
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
		
		$this = $(this);
		$target_container = $(settings.target_container);
		// check for font_size cookie
		var font_size = $.cookie('font_size');		
		if(font_size) {
			var body_class = font_size
			target = $this.find('a[href~="#' + font_size + '"]');
			var $target = $(target)				
			$target_container.switchClass($this, body_class, $target);
		}
		
		$this.click(function(e) {	
			var target = e.target
			var $target = $(target);
							
			if(target.nodeName === 'A') {
				var body_class = $target.attr('href').toLink();				
				$target_container.switchClass($this, body_class, $target);										
				$.cookie('font_size', body_class);
				return false;
			}
		});
	};
}(jQuery));