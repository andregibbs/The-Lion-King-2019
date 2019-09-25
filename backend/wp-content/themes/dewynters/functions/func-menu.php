<?php
/**
 * Menu functions.
 *
 * @package Website-Template-WP-Theme
 */

/**
 * Register nav menus.
 */
function dewynters_wp_register_menus() {
	register_nav_menus(
		array(
			'primary' => __( 'Primary' ),
		)
	);
}
add_action( 'init', 'dewynters_wp_register_menus' );
