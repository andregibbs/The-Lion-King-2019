<?php
/**
 * The front page template
 *
 * This is the template that displays the front page
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Website-Template-WP-Theme
 */
get_header(); ?>

<main id="main" class="site-main" role="main">

	<?php
	while ( have_posts() ) : the_post();

		get_template_part( 'template-parts/content', 'page' );

	endwhile; // End of the loop.
	?>

</main><!-- #main -->

<?php get_footer(); ?>