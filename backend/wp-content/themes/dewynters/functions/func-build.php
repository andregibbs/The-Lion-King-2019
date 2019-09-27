<?php
/**
 * Group functions related to building Gatsby
 *
 * @since Lion King 1.0
 */

/**
 * Add the 'Publish Changes' button to the wordpress admin bar
 *
 * @since Lion King 1.0
 */
function lk_admin_bar_menu($admin_bar) {

    $admin_bar->add_menu( array(
        'id'    => 'publish-changes',
        'title' => 'Publish Changes',
        'href'  => '#',
        'meta'  => array(
            'title' => __('Click to publish changes to frontend site'),
        ),
    ));
}
add_action('admin_bar_menu', 'lk_admin_bar_menu', 100);



/**
 * Enqueue admin scripts and styles
 *
 * @since Lion King 1.0
 */
function lk_load_custom_wp_admin($hook_suffix) {

    wp_register_script( 'lk_admin_scripts', get_stylesheet_directory_uri() . '/assets/js/admin.js', array('jquery'), '1.0', false );
    wp_register_style( 'lk_admin_css', get_template_directory_uri() . '/assets/css/admin.css', false, '1.0.0' );
    wp_enqueue_style( 'lk_admin_css' );

    wp_enqueue_script( 'lk_admin_scripts' );

    wp_localize_script( 'lk_admin_scripts', 'lk_vars', array(
            'nonce'    => wp_create_nonce( 'lk_publish_changes' ),
            'ajax_url' => admin_url( 'admin-ajax.php' ),
        )
    );
}
add_action( 'admin_enqueue_scripts', 'lk_load_custom_wp_admin' );


/**
 * This is the function that is called via ajax when the button in the admin bar is clicked
 *
 * @since Lion King 1.0
 */
function lk_build() {
    
    check_ajax_referer( 'lk_publish_changes', 'security' );

    $buildPath = ABSPATH.'../../gatsby/';

    //run the build script
    $logDir = $buildPath.'logs/';

    ini_set('error_log', $logDir.'php_errors.log');

    //is there a build already running?    
    $transientKey = 'lk-build';
    if ( get_transient($transientKey) ) {
        print "Build is already running, please try again in a few minutes.";
    } else {
        set_transient($transientKey, true, 300 );//set for 5 minutes

        chdir($buildPath);
        
        //are we on live or staging?
        $environment = 'production';
        if (strpos(get_bloginfo('wpurl'), 'staging')!==FALSE) {
            $environment = 'staging';
        }
        
        $cmd = 'GATSBY_ACTIVE_ENV='.$environment.' npm run build 2>&1';
        
        $result = shell_exec($cmd);

        //check in the output for the string 'Done building in', to see if the build was successful
        if (strpos($result, 'Done building in')!==false) {

            $target = '../live/';
            if (is_dir($buildPath.'public')) {
                //move the built site to the the web root
                $cmd = 'cp -R public/* '.$target.' 2>&1';
                $result2 = shell_exec($cmd);
                if (is_string($result2)) {
                    $result .= $result2;
                }
            } else {
                error_log("public dir doesn't exist");
            }
            print "Build complete!";
        } else {
            //the build failed - send an error email with the output
            wp_mail('feltond@usefuldigital.co.uk', 'Lion King build failed', get_bloginfo('wpurl')."\n\n".$cmd."\n\n".$result);
            print "Build failed. Dev staff have been notified.";
        }

        //write the output to the php log file
        $file = $logDir.'php_output.log';
        $fp = fopen($file, 'w');
        fwrite($fp, $result);
        fclose($fp);

        delete_transient( $transientKey );
    }
    wp_die();
}
add_action('wp_ajax_lk_build', 'lk_build');
