/**
 * Admin javascript file for Lion King wordpress site.
 * This file uses revealing module design pattern
 */
lionking = function($) {

    var init = function() {
	    initialiseBuilder();
    };

    /*
     * javascript for Gatsby site builder button
     */
    var initialiseBuilder = function() {

    	var $button = $('#wp-admin-bar-publish-changes a');
    	
    	if ($button.length && $button.is(':visible')) {
    		
	    	//when the button is clicked
    		$button.click(function(e) {
	    		e.preventDefault();
	    		
	    		showModal();
	    		
	    		var requestdata = {
	    			action: 'lk_build',
	    			security: lk_vars.nonce
	    		};
	
	    		//submit data to server		  		
				$.ajax({
					url: lk_vars.ajax_url,
					data: requestdata,
					cache: false,
					method: "POST",
					timeout: 0
				}).done(function( responsedata ) {
					$('#build-modal .message').text(responsedata);
				}).fail(function(jqXHR, textStatus, errorThrown) {
					console.log('error when retrieving enabled status');
					console.log( jqXHR );
					console.log( textStatus );
					$('#build-modal .message').text('Error running build, please try again later');
				}).always(function() {
					$('#build-modal .pop span.anim').hide();
					$('#build-modal .close').fadeIn();
			    });
				
	    	});
    		
    		//to close the modal
    		$('body').on('click', '#build-modal .close button', function() {
    			$('#build-modal').fadeOut();
    		});
    	}
    };
    
    /**
     * Display a modal dialog saying that the build is running
     */
    var showModal = function() {
    	$('body').append('<div id="build-modal"><div class="pop"><p class="message">Running build. This should take approximately 2 minutes...</p><span class="anim" /><p class="close"><button type="button">Close</button></p></div></div>');
    };
    
    return{init:init}//return items that are available outside

}(jQuery);


//document ready
jQuery(function() {
	lionking.init();
});


