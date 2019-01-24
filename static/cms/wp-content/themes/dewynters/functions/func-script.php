<?php
/**
 * Script functions.
 *
 * @package Website-Template-WP-Theme
 */

/**
 * Enqueue theme scripts.
 */
function dewynters_wp_theme_scripts() {
	wp_register_script(
		'mainjs',
		get_template_directory_uri() . '/assets/js/main.min.js',
		array(),
		'1.0.0',
		true
	);
	// Localize ajax_url
	wp_localize_script( 'mainjs', 'ajax_params', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
	wp_enqueue_script( 'mainjs' );

}
add_action( 'wp_enqueue_scripts', 'dewynters_wp_theme_scripts' );

