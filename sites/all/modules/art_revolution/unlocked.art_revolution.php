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
  } else {
    $slide = array(
      'locker' => '',
      'id' => $randomnumber,
      'name' => '',
      'klantnaam' => '',
      'username' => '',
      'mail' => ''
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
    '#type' => 'hidden',
    '#default_value' => $slide['name']
  );

  $form['klantnaam'] = array(
    '#type' => 'hidden',
    '#default_value' => $slide['klantnaam']
  );

  $form['username'] = array(
    '#type' => 'hidden',
    '#default_value' => $slide['username']
  );

  $form['mail'] = array(
    '#type' => 'hidden',
    '#default_value' => $slide['mail']
  );

  $forcepage = array(
    '2' => t('Aanvinken om klant te unlocken')
  );

# the drupal checkboxes form field definition
  $form['locked'] = array(
    '#type' => 'checkboxes',
    '#description' => t(''),
    '#options' => $forcepage,
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
        'locked' => $form['locked']['#value'],
      ))
      ->condition('uid', $user_id)
      ->execute();

    //Clear cache on field to display field's updated value on front end
    $cid = 'field:user:' . $user_id;
    cache_clear_all($cid, 'cache_field');

    drupal_set_message("Klant is nu unlocked");
	  drupal_goto('<front>');
  }
}