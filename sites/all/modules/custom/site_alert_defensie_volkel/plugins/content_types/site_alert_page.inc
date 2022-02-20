<?php

/**
 * Plugin to handle the 'site_alert' content type.
 *
 * This allows the Site Alert to be embedded into a panel.
 *
 * @file
 */

/**
 * Create a $plugin array.
 */
$plugin = array(
  'title' => t('Site Alert'),
  'single' => TRUE,
  'description' => t('A site wide alert.'),
  'category' => t('Page elements'),
  'render callback' => 'site_alert_defensie_volkel_page_content_type_render',
  'render last' => TRUE,
);

/**
 * Callback for the 'site_alert' content type.
 *
 * Outputs the site alert for the current page.
 */
function site_alert_defensie_volkel_page_content_type_render($subtype, $conf, $panel_args) {

  drupal_add_js(drupal_get_path('module', 'site_alert_defensie_volkel') . 'site_alert_defensie_volkel.js');
  drupal_add_js(array('site_alert_defensie_volkel' => array('timeout' =>  variable_get('site_alert_defensie_volkel_timeout', site_alert_defensie_volkel_TIMEOUT_DEFAULT))), 'setting');

  $block = new stdClass();
  $block->content = array('#theme' => 'site_alert_defensie_volkel_wrapper');
  return $block;
}
