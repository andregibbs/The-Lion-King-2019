<?php
/**
 * Add options page with ACF
 *
 * @since Material Matters 1.0
 */
if ( function_exists('acf_add_options_page') ) {

	acf_add_options_page();

}

/**
 * ACF Options Page for each language
 */
if ( function_exists( 'acf_add_options_page' ) ) {
	
	// Main Theme Settings Page
	// $parent = acf_add_options_page( array(
	// 	'page_title' => 'Sites Options',
	// 	'menu_title' => 'Site Options',
	// 	'redirect'   => 'Site Options',
	// ) );

	// 
	// Global Options
	// Same options on all languages. e.g., social profiles links
	// 

	acf_add_options_sub_page( array(
		'page_title' => 'Main Options',
		'menu_title' => __('Main Options', 'text-domain'),
		'menu_slug'  => "acf-options",
		'parent'     => $parent['menu_slug']
	) );

	// 
	// Language Specific Options
	// Translatable options specific languages. e.g., social profiles links
	// 

	$languages = array();

	if (function_exists('pll_languages_list')) {

		$translations = pll_languages_list();
		if ($translations) {
			foreach ($translations as $t) {
				$languages[] = $t;
			}
		}

	}

	foreach ( $languages as $lang ) {
		acf_add_options_sub_page( array(
			'page_title' => 'Options (' . strtoupper( $lang ) . ')',
			'menu_title' => __('Options (' . strtoupper( $lang ) . ')', 'text-domain'),
			'menu_slug'  => "options-${lang}",
			'post_id'    => $lang,
			'parent'     => $parent['menu_slug']
		) );
	}

}

//set a key for hte google maps api
// function my_acf_init() {

// 	acf_update_setting('google_api_key', 'AIzaSyAUUEDEEmlApdhGb_XqrjA16ya-uPx5Nlg');
// }

// add_action('acf/init', 'my_acf_init');


