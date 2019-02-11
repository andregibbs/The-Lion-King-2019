<?php
/**
 * The header for our theme
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Website-Template-WP-Theme
 */

// Redirect front end
header( "Location: https://thelionking.co.uk" );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php wp_title( '&ndash;', true, 'right' ); ?></title>
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<header class="header" role="banner">

		<nav class="main-navigation" role="navigation">
			<?php wp_nav_menu(); ?>
		</nav><!-- #site-navigation -->
	</header>
