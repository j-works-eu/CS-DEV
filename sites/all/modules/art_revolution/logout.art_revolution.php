<?php
	global $user;
	$roll = $user->roles;
	

		function art_revolution_form() {
		
		$refreshtext = t("Press the logout button to logout the user");
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
				'klantnaam' => '',
				'username' => '',
				'mail' => ''
			);
		}
		$form = array();
	
	$form['cutomtext'] = array(
		'#type' => 'item',
		'#markup' => "<div><h5> $refreshtext  <strong>{$slide['name']}</strong> with id <strong>{$slide['id']}</strong></h5></div>",
		'#weight' => -10, // Adjust so that you can place it whereever
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
		
		
		$form['fpr'] = array(
			'#type' => 'hidden',
			'#description' => t(''),
			'#default_value' => 1
		);
		


		$form['submit'] = array(
			'#type' => 'submit',
			'#value' => 'Logout',
		);
		return $form;
	}


function art_revolution_form_submit($form) {

	
			$slideid = $form['id']['#value'];
			$username = $form['username']['#value'];
			$user = user_load_by_name($username);
			$user_id = $user->uid;
			$klantnaam = $form['klantnaam']['#value'];
			
			
	drupal_session_destroy_uid($user_id);
	
	//Clear cache on field to display field's updated value on front end
	$cid = 'field:user:' . $user_id;
	cache_clear_all($cid, 'cache_field');
	
	watchdog('Stream', "Stream is logout for user '{$klantnaam}' with id '{$slideid}'", array(), WATCHDOG_INFO);
	drupal_goto('<front>');
}