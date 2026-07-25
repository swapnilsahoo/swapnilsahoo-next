<?php

/* Disable WordPress global styles */
remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');

/* Disable emojis */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

/* Disable Gutenberg block CSS */
add_action('wp_enqueue_scripts', function () {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('global-styles');
}, 100);

/* Load ONLY your CSS & JS */
function aarya_vashisth_assets() {
    wp_enqueue_style(
        'aarya-main-css',
        get_template_directory_uri() . '/assets/css/main.css',
        [],
        '1.0'
    );

    wp_enqueue_script(
        'aarya-main-js',
        get_template_directory_uri() . '/assets/js/main.js',
        [],
        '1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'aarya_vashisth_assets');