# Website-Template-WP-Theme
Version: 1.0.0

This is a blank slate WordPress theme that has the following integrated:<br/>

<ul>
  <li>Gulp</li>
  <li>Bootstrap v3.3.7</li>
  <li>ACF Pro</li>
</ul>

## Installation
Clone the project into <code>wp-content/themes</code> and rename it accordingly.

In Terminal, <code>cd</code> into the theme directory and install the Gulp packages (if you haven't already installed Gulp, you’ll need to <a href="https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md">do so</a> first), e.g:

<code>sudo npm install</code>

Once you have installed the packages, in Terminal, run <code>gulp</code>. Any changes to the SCSS files in <code>src/scss/</code> will lead to the creation of <code>main.css</code> and <code>main.min.css</code> in <code>assets/css</code>.

Likewise, any alterations to the JS files in <code>assets/js/</code> will be concatenated and uglified in <code>assets/js</code> to <code>main.js</code> and <code>main.min.js</code>.

There are also a selection of useful WordPress functions located in the <code>functions</code> directory, including the following:

<ul>
    <li>Change admin credit in footer</li>
    <li>Change default “Howdy” greeting</li>
    <li>Reorder admin menu</li>
    <li>Register custom navigation menu</li>
    <li>Remove trailing slash from permalinks</li>
    <li>Enqueue scripts and styles</li>
</ul>

## ACF
This theme includes the ACF Pro plugin used to create custom fields. Read more here: 

<ul>
  <li><a href="https://www.advancedcustomfields.com/pro/">ACF Website</a></li>
  <li><a href="https://www.advancedcustomfields.com/resources/">ACF Documentaton</a></li>
</ul>