<?php
/**
 * Style functions.
 *
 * @package Website-Template-WP-Theme
 */

/**
 * Enqueue theme styles.
 */
function dewynters_wp_theme_styles() {
	wp_register_style(
		'styles',
		get_template_directory_uri() . '/assets/css/main.min.css',
		array(),
		'1.0.0',
		'all'
	);
	wp_enqueue_style( 'styles' );

}
add_action( 'wp_enqueue_scripts', 'dewynters_wp_theme_styles' );
