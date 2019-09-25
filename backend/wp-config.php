<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */


/* Which Enviornment? */
$live = $staging = $local = $dave = FALSE;

if (strpos($_SERVER['SERVER_NAME'], 'staging.') !== FALSE) {
	$staging = TRUE;
} else if (strpos($_SERVER['SERVER_NAME'], 'localhost') !== FALSE) {
    $local = TRUE; 
} else if (strpos($_SERVER['SERVER_NAME'], 'local') !== FALSE) {
    $dave = TRUE;
} else {
	$live = TRUE;
}

if ($staging) {
	// ** MySQL settings - You can get this info from your web host ** //
	/** The name of the database for WordPress */
	define('DB_NAME', 'thel10nk_cms2019staging');

	/** MySQL database username */
	define('DB_USER', 'thel10nk_cms');

	/** MySQL database password */
	define('DB_PASSWORD', 'h~NOJ1wM&NKl');

} elseif ($local) {
	// ** MySQL settings - You can get this info from your web host ** //
	/** The name of the database for WordPress */
	define('DB_NAME', 'houseseats');

	/** MySQL database username */
	define('DB_USER', 'root');

	/** MySQL database password */
	define('DB_PASSWORD', 'root');

	/** MySQL hostname */
	define('DB_HOST', 'localhost');
	
} elseif ($dave) {
    // ** MySQL settings - You can get this info from your web host ** //
    /** The name of the database for WordPress */
    define('DB_NAME', 'dewynters_lionking');
    
    /** MySQL database username */
    define('DB_USER', 'miraclemaker');
    
    /** MySQL database password */
    define('DB_PASSWORD', 'mi5acle');
    
    /** MySQL hostname */
    define('DB_HOST', 'localhost');
    
} else {
	// ** MySQL settings - You can get this info from your web host ** //
	/** The name of the database for WordPress */
	define('DB_NAME', 'thel10nk_cms2019');

	/** MySQL database username */
	define('DB_USER', 'thel10nk_cms');

	/** MySQL database password */
	define('DB_PASSWORD', 'h~NOJ1wM&NKl');
}


/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'B;(Z_$$]4)4p?+jaw!{YL{QbGb(=*n:c:-t!x-CUDy/mA>Jmr$gRy<~%X4.;8GA:');
define('SECURE_AUTH_KEY',  '<e@j/JQ</zLtC2:[itY<;9S C7]wC3`<,RY#-=^xrtD8lf%d;ZZU &&QZc9Y.31|');
define('LOGGED_IN_KEY',    'AOT<W]>6Dz,kvr.JHY;KEBR6DX.Y*##[~6CJ0vr_$tFIC[>fBM [;g1l+C8[vw d');
define('NONCE_KEY',        'c0<S0*lC5!+9*NfIE+N?g3W>T]GJ0g!cS.DI?i!.1bRMy;AiH{8~BBR$}z1QvOBG');
define('AUTH_SALT',        '{G?;%vKUmyD17pT:$O(jIUp15%-R)gUe]v>z3(j*-buUPK![8#+if?CV)O4v5>Hs');
define('SECURE_AUTH_SALT', '!gy0M_YO(5J^2Wb1XqgIfm*Ggu07o[MpftU8{ZvHIRht]M8<MSUo!#LBw#F9V$+(');
define('LOGGED_IN_SALT',   'vcFZgO:1q}+.9Bfe*PmRd/z_/6pXW!P:^~,rPw!fQ?pQX :%f|(9;Pa[+x~>m*4,');
define('NONCE_SALT',       '6yAUk$UbD7/?<fllS_$#kGOpOpgg/Y.NKMzhq]bkxhF^9}n)amd}DhuBy:-`!!&L');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
