<?php
/**
 * Register custom endpoint 
 * List all primary menus
 */
add_action( 'rest_api_init', function () {
    register_rest_route( 'jacc', '/site-options', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'get_site_options',
    ));
});
function get_site_options() {
    if (function_exists('pll_languages_list')) {
        $output = array();
        $languages = pll_languages_list();
        $options =  array(
            "wordpress_id" => "null",
            "results" => false,
            "language" => "",
            "options" => array(
                "social_snapchat" => "",
                "social_facebook" => "",
                "social_twitter" => "",
                "social_instagram" => "",
                "footer_opening_hours" => array(
                    "title" => "",
                    "blocks" => array(
                        array(
                            "title" => "",
                            "text" => ""
                        )
                    )
                ),
                "footer_text" => "",
                "footer_map_text" => ""
            )
        );
        $count = 0;
        foreach ($languages as $lang) {
            
            /** get fields **/
            foreach ($options["options"] as $key => $value) {
                $field = get_field($key, $lang);
                $output[$count]["options"][$key] = $field ? $field : $value;
                // make sure empty array returned if false/empty in WP
                if ($key === "footer_opening_hours") {
                    if ($field["blocks"] === false) {
                        $output[$count]["options"][$key]["blocks"] = $options["options"][$key]["blocks"];
                    }
                }
            }
            $output[$count]["wordpress_id"] = "options$count"; // needed for gatsby to pickup endpoint
            $output[$count]["language"] = $lang;
            $output[$count]["results"] = true;
            $count++;
        }
    }
    return $output; 
