<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Website-Template-WP-Theme
 */
get_header(); ?>

<?php if ( have_posts() ) : ?>

	<?php while ( have_posts() ) : the_post(); ?>

		<header>
			<h1><?php the_title(); ?></h1>
		</header>

		<?php the_content(); ?>

	<?php endwhile; ?>

<?php endif; ?>

<?php get_footer();
