<?php
/**
 * @file
 * User Disk Quota Views field class.
 */

/**
 * User disk usage field handler for Views.
 */
class views_handler_field_user_disk_usage extends views_handler_field {

  function query() {
    // do nothing -- to override the parent query.
  }

  /**
   * Add user id to field initialization.
   */
  function init(&$view, &$data) {
    parent::init($view, $data);
    $this->additional_fields['uid'] = 'uid';
  }

  /**
   * Define field options.
   */
  function option_definition() {
    $options = parent::option_definition();
    $options['format_size'] = array('default' => TRUE, 'bool' => TRUE);
    return $options;
  }

  /**
   * Define field options form.
   */
  function options_form(&$form, &$form_state) {

    $form['format_size'] = array(
      '#title' => t('Output formatted limit'),
      '#description' => t("Output limit as a formatted value (i.e. 2 MB, 512 KB)."),
      '#type' => 'checkbox',
      '#default_value' => $this->options['format_size'],
    );
    parent::options_form($form, $form_state);
  }

  /**
   * Render field.
   */
  function render($values) {

    $value = $this->get_value($values);
    $value = $this->sanitize_value($value);
    if (isset($values->uid)) {
      $account = user_load($values->uid);
      if ($account) {
        $value = user_disk_quota_file_space_used($account->uid);
      }
    }
    if (!empty($value) && $this->options['format_size']) {
      $value = format_size($value);
    }
    return $value;
  }
}