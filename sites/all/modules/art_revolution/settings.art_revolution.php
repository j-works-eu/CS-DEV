
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
      'refresh' => '10800',
      'settings' => ''
    );
  }
	
	$form['#attached']['js'] = array(
		drupal_get_path('module', 'art_revolution') . '/js//clipboard.js',
	);

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
    '#title' => 'Naam van het bedrijf',
    '#default_value' => $slide['name'],
    '#disabled' => 'disabled',
    '#required' => TRUE,
  );

  $form['username'] = array(
    '#type' => 'hidden',
    '#title' => 'Login ID',
    '#description' => 'Login naam reclame blok',
    '#default_value' => $slide['username'],
    '#disabled' => 'disabled',
    '#required' => TRUE,
  );

  $form['data'] = array(
//    '#title' => t('data om te kopieren'),
    '#type' => 'textarea',
	  '#description' => t("Above you see the encrypted data of your settings file, Press the <b>Copy data</b> button to send it to the clipboard"),
    '#default_value' => $slide['settings'],
    '#rows' => 15,
    '#cols' => 30,
	'#attributes' => array('id' => "copytext"),
    '#resizable' => TRUE,
  );
	
	$form['copy'] = array(
		'#type' => 'button',
		'#value' => t('Copy Data'),
		'#attributes' => array('onclick' => "copyToClipboard('copytext')"),
	);
	
	$form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save')
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
        'settings' => $form['data']['#value'],
      ))
      ->condition('uid', $user_id)
      ->execute();


    //Clear cache on field to display field's updated value on front end
    $cid = 'field:user:' . $user_id;
    cache_clear_all($cid, 'cache_field');
    drupal_set_message("Slide '{$form['name']['#value']}' is aangepast.");
  }
  else {
    drupal_set_message('Niets gedaan....');
  }
    drupal_goto('<front>');
}

