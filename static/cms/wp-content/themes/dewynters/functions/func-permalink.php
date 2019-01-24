<?php
/**
 * Permalink functions.
 *
 * @package Website-Template-WP-Theme
 */

/**
 * Remove trailing slashes from permalink.
 */
function dewynters_wp_permalinks( $link ) {
	return untrailingslashit( $link );
}
add_filter( 'page_link', 'dewynters_wp_permalinks' );
add_filter( 'post_type_link', 'dewynters_wp_permalinks' );
