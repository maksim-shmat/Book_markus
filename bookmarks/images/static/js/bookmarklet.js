(function(){
	var jquery_version = '3.3.1';
	var site_url = 'http://285072e131c9.ngrok.io'
	var static_url = site_url + 'static/';
	var min_vidth = 100;
	var min_height = 100;

	function bookmarklet(msg) {
	//load CSS
	var css = jQuery('<link>');
	css.attr({
	  rel: 'stylesheet',
	  type: 'text/css',
	  href: static_url + 'css/bookmarklet.css?r=' + Math.floor(Math.random()*99999999999999)
	});
	jQuery('head').append(css);
	//load HTML
	box_html = '<div id="bookmarklet"><a href="#" id="close">&time;</a><h1>Select an image to bookmark:</h1><div class="images"></div></div>';
	jQuery('body').append(box_html);

	// close event
	jQuery('#bookmarklet #close').click(function(){
		jQuery('#bookmarklet').remove();
	});
	
	// find images and display them
	jQuery.each(jQuery('img[src$="jpg"]'), function(index, image) {
	  if (jQuery(image).width() >= min_width && jQuery(image).height() >= min_height)
	  {
	    image_url = jQueri(image).attr('src');
	    jQuery('#bookmarklet .images').append('<a href="#"><img src="'+ image_url +'" /></a>');
	  }
	});
	
	// when an image is selected open URL with it
	jQuery('#bookmarklet .images a').click(function(e){
	  selected_image = jQuery(this).children('img').attr('src');
	  // hide bookmarklet
	  jQuery('#bookmarklet').hide();
	  // open new window to submit the image
	  window.open(site_url +'images/create/?url='
		      + encodeURIComponent(selected_image)
		      + '&title='
		      + encodeURIComponent(jQuery('title').text()),
		      '_blank');
	});
      };
	// Test on JQuery
	if(typeof window.jQuery != 'undefined') {
	  bookmarklet();
	} else {
	  // Test athribute $ window don't on another object
	  var conflict = typeof window.$ !='undefined';
	  // Make tag <script> with load jQuery
	  var script = document.createElement('script');
	  script.src = '//ajax.googleapis.com/ajax/libs/jquery/' +
	  jquery_version + '/jquery.min.js';
	  // Add tag on block <head> of document.
	  document.head.appendChild(script);
	  // Add more use jQuery
	  var attempts = 15;
	  (function(){
	    // Check on jQuery
            if(typeof window.jQuery == 'undefined') {
	      if(--attempts> 0) {
	        // If do not on try more one load
	        window.setTimeout(arguments.callee, 250)
	      } else {
	        // Loads overflow
	        alert('An error occurred while loading jQuery')
	      }
	    } else {
	      bookmarklet();
	    }
          })();
	}
      })()
