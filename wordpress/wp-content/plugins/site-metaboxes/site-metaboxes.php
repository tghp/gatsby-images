<?php
/**
 * Plugin Name: Site Metaboxes
 * Description: Provides metaboxes for this test site.
 */



add_action('init', function () {
    
    // Add custom taxonomies
    register_taxonomy(
        'customtax',
        'post',
        [
            'hierarchical'      => true,
            'labels'            => [
                'name'              => __('Terms'),
                'singular_name'     => __('Term'),
                'search_items'      => __('Search Terms'),
                'all_items'         => __('All Terms'),
                'parent_item'       => __('Parent Term'),
                'parent_item_colon' => __('Parent Term:'),
                'edit_item'         => __('Edit Term'),
                'update_item'       => __('Update Term'),
                'add_new_item'      => __('Add New Term'),
                'new_item_name'     => __('New Term Name'),
                'menu_name'         => __('Terms'),
            ],
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'show_in_rest'      => true,
            'rewrite'           => ['slug' => 'customtax'],
            'show_in_graphql'   => true,
            'graphql_single_name' => 'tghpCustomtax',
            'graphql_plural_name' => 'tghpCustomtax',
        ]
    );

    // Control editor
    add_filter('use_block_editor_for_post', '__return_false');
    remove_post_type_support('page', 'editor');

    // Actually add metaboxes
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
                [
                    'id' => 'tghpReallyLongContent',
                    'name' => 'Really Long Content',
                    'type' => 'wysiwyg',
                ],
            ],
        ];

        $metaBoxes[] = [
            'id' => 'customtax_meta',
            'title' => 'Custom Taxonomy',
            'taxonomies' => 'customtax',
            'fields' => [
                [
                    'name' => 'Featured image',
                    'id' => 'tghpFeaturedImage',
                    'type' => 'single_image',
                ],
            ],
        ];

        return $metaBoxes;
    });

});