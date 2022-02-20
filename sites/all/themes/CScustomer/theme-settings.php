<?php


	/**
	 *
 * Implements hook_form_system_theme_settings_alter()
 */
function CScustomer_form_system_theme_settings_alter(&$form, &$form_state) {

    $contact_icon = theme_get_setting('contact_icon');
    if (file_uri_scheme($contact_icon) == 'public') {
        $contact_icon = file_uri_target($contact_icon);
    }

    // Main settings wrapper
    $form['options'] = array(
        '#type' => 'vertical_tabs',
        '#default_tab' => 'defaults',
        '#weight' => '-10',
        '#attached' => array(
            'css' => array(drupal_get_path('theme', 'CScustomer') . '/css/theme-options.css'),
        ),
    );

    // ----------- General -----------
    $form['options']['general'] = array(
        '#type' => 'fieldset',
        '#title' => t('General'),
    );

    // General Settings
    $form['options']['general']['settings'] = array(
        '#type' => 'fieldset',
        '#title' => '<div class="plus"></div><h3 class="options_heading">General Settings</h3>',
    );

    // Breadcrumbs
    $form['options']['general']['settings']['breadcrumbs'] = array(
        '#type' => 'checkbox',
        '#title' => 'Show Breadcrumbs',
        '#default_value' => theme_get_setting('breadcrumbs'),
    );

    $form['options']['general']['settings']['use_preloader'] = array(
        '#type' => 'select',
        '#title' => 'Use Pre-Loader',
        '#default_value' => theme_get_setting('use_preloader'),
        '#options' => array(
            '0' => 'No',
            '1' => 'Yes',
        ),
    );


    // Contact MAP
    $form['options']['general']['contactmap'] = array(
        '#type' => 'fieldset',
        '#title' => '<div class="plus"></div><h3 class="options_heading">Contact Map</h3>',
    );

    // Company Name
    $form['options']['general']['contactmap']['contactmap_title'] = array(
        '#type' => 'textfield',
        '#title' => 'Company Name',
        '#default_value' => theme_get_setting('contactmap_title'),
    );

    // Website
    $form['options']['general']['contactmap']['contactmap_website'] = array(
        '#type' => 'textfield',
        '#title' => 'Website',
        '#default_value' => theme_get_setting('contactmap_website'),
    );

    // Contact MAP Address
    $form['options']['general']['contactmap']['contactmap_address'] = array(
        '#type' => 'textarea',
        '#title' => 'Address',
        '#default_value' => theme_get_setting('contactmap_address'),
    );

    // Contact MAP Phone
    $form['options']['general']['contactmap']['contactmap_phone'] = array(
        '#type' => 'textfield',
        '#title' => 'Telephone',
        '#default_value' => theme_get_setting('contactmap_phone'),
    );

    // Contact MAP Lat
    $form['options']['general']['contactmap']['contactmap_lat'] = array(
        '#type' => 'textfield',
        '#title' => 'Lat',
        '#default_value' => theme_get_setting('contactmap_lat'),
    );

    // Contact MAP Long
    $form['options']['general']['contactmap']['contactmap_long'] = array(
        '#type' => 'textfield',
        '#title' => 'Long',
        '#default_value' => theme_get_setting('contactmap_long'),
    );

    $form['options']['general']['contactmap']['contactmap_styles'] = array(
        '#type' => 'checkbox',
        '#title' => 'Use Contact Map Styles ?',
        '#default_value' => theme_get_setting('contactmap_styles'),
    );

    $form['options']['general']['contactmap']['contactmap_zoom'] = array(
        '#type' => 'textfield',
        '#title' => 'Zoom',
        '#default_value' => theme_get_setting('contactmap_zoom'),
    );

    $form['options']['general']['contactmap']['contactmap_hue'] = array(
        '#type' => 'textfield',
        '#title' => 'Hue',
        '#default_value' => theme_get_setting('contactmap_hue'),
    );

    $form['options']['general']['contactmap']['contactmap_saturation'] = array(
        '#type' => 'textfield',
        '#title' => 'Saturation',
        '#default_value' => theme_get_setting('contactmap_saturation'),
    );

    $form['options']['general']['contactmap']['contactmap_gamma'] = array(
        '#type' => 'textfield',
        '#title' => 'Gamma',
        '#default_value' => theme_get_setting('contactmap_gamma'),
    );

    $form['options']['general']['contactmap']['contact_icon'] = array(
        '#type' => 'textfield',
        '#title' => 'Path to Contact Icon',
        '#default_value' => $contact_icon,
        '#disabled' => TRUE,
    );

    $form['options']['general']['contactmap']['contact_icon_upload'] = array(
        '#type' => 'file',
        '#title' => 'Upload Contact Icon',
        '#description' => 'Upload a new Contact Icon.',
    );

    // -------- SEO ---------
    $form['options']['general']['seo'] = array(
        '#type' => 'fieldset',
        '#title' => '<div class="plus"></div><h3 class="options_heading">SEO</h3>',
    );

    // SEO Title
    $form['options']['general']['seo']['seo_title'] = array(
        '#type' => 'textfield',
        '#title' => 'Title',
        '#default_value' => theme_get_setting('seo_title'),
    );

    // SEO Description
    $form['options']['general']['seo']['seo_description'] = array(
        '#type' => 'textarea',
        '#title' => 'Description',
        '#default_value' => theme_get_setting('seo_description'),
    );

    // SEO Keywords
    $form['options']['general']['seo']['seo_keywords'] = array(
        '#type' => 'textarea',
        '#title' => 'Keywords',
        '#default_value' => theme_get_setting('seo_keywords'),
    );


    // ----------- Design  Settings -----------
    $form['options']['design'] = array(
        '#type' => 'fieldset',
        '#title' => 'Design',
    );

    // CSS
    $form['options']['design']['css'] = array(
        '#type' => 'fieldset',
        '#title' => '<div class="plus"></div><h3 class="options_heading">CSS</h3>',
    );

    // User CSS
    $form['options']['design']['css']['user_css'] = array(
        '#type' => 'textarea',
        '#title' => 'Add your own CSS',
        '#default_value' => theme_get_setting('user_css'),
    );

    // Submit Button
    $form['#submit'][] = 'CScustomer_settings_submit';
}

function CScustomer_settings_submit($form, &$form_state) {
    // Get the previous value
    $previous = 'public://' . $form['options']['general']['contactmap']['contact_icon']['#default_value'];

    $file = file_save_upload('contact_icon_upload');
    if ($file) {
        $parts = pathinfo($file->filename);
        $destination = 'public://' . $parts['basename'];
        $file->status = FILE_STATUS_PERMANENT;

        if (file_copy($file, $destination, FILE_EXISTS_REPLACE)) {
            $_POST['contact_icon'] = $form_state['values']['contact_icon'] = $destination;
            if ($destination != $previous) {
                return;
            }
        }
    } else {
        // Avoid error when the form is submitted without specifying a new image
        $_POST['contact_icon'] = $form_state['values']['contact_icon'] = $previous;
    }
}

