<?php

if ( ! function_exists( 'dewynters_setup' ) ) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 */
	function dewynters_setup() {

		// Add default posts RSS feed links to head
		add_theme_support( 'automatic-feed-links' );

		//Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		// Enable HTML5 markup support
		// http://codex.wordpress.org/Function_Reference/add_theme_support#HTML5
		add_theme_support( 'html5', array( 'caption', 'comment-form', 'comment-list', 'gallery', 'search-form' ) );

		// Add custom image sizes based on bootstrap breakpoints
		// 9999 for auto height
		add_image_size( 'imagesize_xl', 1920, 9999 );
		add_image_size( 'imagesize_lg', 992, 9999 );
		add_image_size( 'imagesize_md', 768, 9999 );
		add_image_size( 'imagesize_sm', 576, 9999 );
	}
}
/** Tell WordPress to run dewynters_setup() when the 'after_setup_theme' hook is run. */
add_action( 'after_setup_theme', 'dewynters_setup' );

/**
* Allow SVGs to be uplaoded into the media library
*/
function upload_mimes( $mimes ) {
	$mimes['svg'] = 'image/svg+xml';
	$mimes['zip'] = 'application/zip';

	return $mimes;
}
add_filter( 'upload_mimes', 'upload_mimes' );


// Remove script and style type attributes to solve warnings in w3c
function codeless_remove_type_attr($tag, $handle) {
    return preg_replace( "/type=['\"]text\/(javascript|css)['\"]/", '', $tag );
}
add_filter('style_loader_tag', 'codeless_remove_type_attr', 10, 2);
add_filter('script_loader_tag', 'codeless_remove_type_attr', 10, 2);

// Remove WP emoji
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );