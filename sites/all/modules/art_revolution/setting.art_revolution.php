<?php

function art_revolution_form() {



  $randomnumber = date("mdisG");
  $all_users = entity_load('user');
  foreach ($all_users as $value) {
    $user_list = (array) $value;
    $users[$user_list['uid']] = $user_list['name'];

  }

  $slideid = arg(2);
  if (is_numeric($slideid)) {
    $slide = db_select('{art_revolution}', 'd')
      ->fields('d')
      ->condition('id', $slideid, '=')
      ->execute()
      ->fetchAssoc();
  }

  else {
    $slide = array(
      'locker' => '',
      'id' => $randomnumber,
      'name' => '',
      'username' => '',
      'mail' => '',
      'password' => '',
      'refresh' => ''
    );
  }
  $form = array();



  $form['locker'] = array(
    '#type' => 'hidden',
    '#default_value' => $slide['locker']
  );


  $form['id'] = array(
    '#type' => 'hidden',
    '#default_value' => $slide['id']
  );

  $form['name'] = array(
    '#type' => 'textfield',
    '#title' => 'Naam van het bedrijf',
    '#default_value' => $slide['name'],
    '#required' => TRUE,
  );

  $form['username'] = array(
    '#type' => 'textfield',
    '#title' => 'Login ID',
    '#description' => 'Login naam reclame blok',
    '#default_value' => $slide['username'],
    '#required' => TRUE,
  );

  $form['password'] = array(
    '#type' => 'textfield',
    '#title' => 'wachtwoord',
    '#default_value' => $slide['password'],
    '#required' => TRUE,
    '#disabled' => TRUE,
    '#description' => 'Wachtwoord reclame blok'

  );

  $form['mail'] = array(
    '#type' => 'textfield',
    '#title' => 'E-mail',
    '#description' => 'E-mail van de klant',
    '#required' => TRUE,
    '#default_value' => $slide['mail']
  );

  $form['refresh'] = array(
    '#type' => 'textfield',
    '#title' => 'refresh snelheid pagina',
    '#default_value' => $slide['refresh'],
    '#required' => TRUE,
    '#description' => 'Dit is de refresh snelheid voor de klant zijn reclame pagina <br /><br /> 3600 = 1 uur <br /> 7200 = 2 uur <br /> 10800 = 3uur (standaard)'
  );


  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => 'Opslaan'
  );
  return $form;
}

function art_revolution_form_submit($form) {

  if ($form['locker']['#value']) {
    $username = $form['username']['#value'];
    $user = user_load_by_name($username);
    $user_id = $user->uid;

    db_update("art_revolution")
      ->fields(array(
        'name' => $form['name']['#value'],
        'mail' => $form['mail']['#value'],
        'password' => $form['password']['#value'],
        'uid' => $user_id,
        'refresh' => $form['refresh']['#value'],


      ))
      ->condition('uid', $user_id)
      ->execute();

    db_update('users')
      ->fields(array(
        'mail' => $form['mail']['#value'],
      ))
      ->condition('uid', $user_id)
      ->execute();

    db_update("field_data_field_pagina_reload_snelheid")
      ->fields(array(
        'field_pagina_reload_snelheid_value' => $form['refresh']['#value'],
      ))
      ->condition('entity_id', $user_id)
      ->execute();

    db_update("field_data_field_force_refresh_page")
      ->fields(array(
        'field_force_refresh_page_value' => $form['fpr']['#value'],
      ))
      ->condition('entity_id', $user->uid)
      ->execute();

    //Clear cache on field to display field's updated value on front end
    $cid = 'field:user:' . $user_id;
    cache_clear_all($cid, 'cache_field');

    drupal_set_message("Slide '{$form['name']['#value']}' is aangepast.");
	  drupal_goto('<front>');

  }
  else {

    $form_state = array();
    $form_state['values']['name'] = $form['username']['#value'];
    $form_state['values']['mail'] = $form['mail']['#value'];
    $form_state['values']['pass']['pass1'] = $form['password']['#value'];
    $form_state['values']['pass']['pass2'] = $form['password']['#value'];
    drupal_form_submit('user_register_form', $form_state);

    $username = $form['username']['#value'];
    $user = user_load_by_name($username);
    $user_id = $user->uid;


    db_insert("art_revolution")
      ->fields(array(
        'id' => $form['id']['#value'],
        'name' => $form['name']['#value'],
        'username' => $form['username']['#value'],
        'mail' => $form['mail']['#value'],
        'password' => $form['password']['#value'],
        'uid' => $user_id,
        'refresh' => $form['refresh']['#value'],
        'locker' => 1,
        'settings' => '',
        'data' => ''

      ))
      ->execute();

    db_update("field_data_field_reclame_id")
      ->fields(array(
        'field_reclame_id_value' => $form['id']['#value'],
      ))
      ->condition('entity_id', $user_id)
      ->execute();

    db_update("field_data_field_pagina_reload_snelheid")
      ->fields(array(
        'field_pagina_reload_snelheid_value' => $form['refresh']['#value'],
      ))
      ->condition('entity_id', $user_id)
      ->execute();
    

    $cid = 'field:user:' . $user_id;
    cache_clear_all($cid, 'cache_field', TRUE);

    drupal_set_message('Reclame en gebruiker aangemaakt');
    drupal_goto('database');
  }
}