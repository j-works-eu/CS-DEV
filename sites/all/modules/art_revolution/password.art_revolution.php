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
      'username' => '',
      'password' => '',
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

  $form['username'] = array(
    '#type' => 'hidden',
    '#default_value' => $slide['username']
  );

  $form['password'] = array(
    '#title' => 'Hiermee kan je een ander wachtwoord aan de klant toewijzen.',
    '#type' => 'textfield',
    '#default_value' => $slide['password'],
    '#description' => '<h3 style="color:#ff3c46;">LET OP: WANNEER JE HET WACHTWOORD RESET DAN ZAL DE KLANT OP LOKATIE UITGELOGD WORDEN!</h3>'
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
    $user->pass = $form['password']['#value'];
    user_save((object) array('uid' =>  $user_id), (array) $user);

    db_update("art_revolution")
      ->fields(array(
        'password' => $form['password']['#value'],
      ))
      ->condition('uid', $user_id)
      ->execute();

    //Clear cache on field to display field's updated value on front end
    $cid = 'field:user:' . $user_id;
    cache_clear_all($cid, 'cache_field');

    drupal_set_message("Het wachtwoord is gereset.");
    drupal_set_message("Het nieuwe wachtwoord is <br /><br /> <b>'{$form['password']['#value']}'</b>");
	  drupal_goto('<front>');

  }
}