<?php
/**
 * Plugin Name: Site Metaboxes
 * Description: Provides metaboxes for this test site.
 */

add_action('init', function () {

    add_filter('use_block_editor_for_post', '__return_false');
    remove_post_type_support('page', 'editor');

    add_filter('rwmb_meta_boxes', function ($metaBoxes) {
        $metaBoxes[] = [
            'title' => 'Test',
            'post_types' => ['page'],
            'fields' => [
                [
                    'id' => 'tghpImage',
                    'name' => 'Image',
                    'type' => 'single_image',
                ],
                [
                    'id' => 'tghpImageMultiple',
                    'name' => 'Images',
                    'type' => 'image_advanced',
                ],
            ],
        ];

        return $metaBoxes;
    });

});