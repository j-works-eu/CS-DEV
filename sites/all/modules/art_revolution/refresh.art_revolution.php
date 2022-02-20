<?php
	global $user;
	$roll = $user->roles;

	$sessionID = $_GET['sessionID'];
	$sessionUID = $_GET['sessionUID'];

	// Check to see if $user has the administrator role.

	if (in_array('nopayment', array_values($user->roles))) {
	print t('Disabled');
	}

	elseif (in_array('administrator', array_values($user->roles))) {

		function art_revolution_form() {
		$refreshtext = t("Press the refresh button to remotely refresh the display");
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
			'#type' => 'textfield',
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

//		$forcepage = array(
//			'1' => t('Aanvinken om een remote refresh door te drukken')
//		);

# the drupal checkboxes form field definition
		$form['fpr'] = array(
			'#type' => 'hidden',
			'#description' => t(''),
			'#default_value' => 1
		);



		$form['submit'] = array(
			'#type' => 'submit',
			'#value' => 'Refresh',
		);
		return $form;
	}


	function art_revolution_form_submit($form) {

		if ($form['locker']['#value']) {
			$username = $form['username']['#value'];
			$user = user_load_by_name($username);

			db_update("field_data_field_force_refresh_page")
				->fields(array(
					'field_force_refresh_page_value' => $form['fpr']['#value'],
				))
				->condition('entity_id', $user->uid)
				->execute();

			db_update("art_revolution")
				->fields(array(
					'field_force_refresh_page_value' => $form['fpr']['#value'],
				))
				->condition('uid', $user->uid)
				->execute();

			db_update("sessions")
				->fields(array(
					'refreshPending' => 1,
				))
				->condition('sid', $_GET['sessionID'])
				->execute();

      db_insert("art_revolution_fpr")
        ->fields(array(
          'uid' => $user->uid,
          'sessionID' => $_GET['sessionID'],
          'sessionUID' => $_GET['sessionUID'],
          'streamName' => $form['username']['#value'],
          'resetDone' => 0,
        ))
        ->execute();

//			$to = $mail;
//			$from = 'info@cloudscreen.nl';
//			// Set headers etc
//			$subject = "Uw reclame display krijgt een herstart op afstand.";
//			$body = "Beste $klantnaam<br /><br />Uw reclame display krijgt binnen 5 minuten een <b>herstart op afstand </b><br />Na deze herstart zal uw reclame display weer automatisch verder gaan.<br /><br />Wij hopen u zo voldoende te hebben geïnformeerd.<br /><br />Met vriendelijke groet,<br />Push Reclame";
//
//
//
//			if (simple_mail_send($from, $to, $subject, $body) != TRUE) {
//				watchdog('reclame', 'Remote refresh mail verstuurd naar '. $klantnaam .' &nbsp; (' . $mail . ') mislukt!', array(), WATCHDOG_ERROR);
//				drupal_set_message("Remote refresh mail verstuurd naar $klantnaam ($mail) mislukt!", 'error');
//			}
//			else {
//				watchdog('reclame', 'Remote refresh mail verstuurd naar  '. $klantnaam .  ' &nbsp; (' . $mail . ') mislukt!', array(), WATCHDOG_INFO);
//				drupal_set_message("Remote refresh mail verstuurd naar $klantnaam ($mail) gelukt!");
//			}

			//Clear cache on field to display field's updated value on front end

			cache_clear_all();

			drupal_set_message ( t("Remote refresh is executed...") );
			drupal_set_message ( t("The refresh can take up to 1 minute to complete.") );
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit;
		}
	}
	}
	//$check = array_intersect(array('klant', 'defensie'), array_values($user->roles));
	elseif (array_intersect(array('authenticated user'), array_values($user->roles))) {
function art_revolution_form() {
	  $refreshtext = t("Press the refresh button to remotely refresh the display");
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
		'#markup' => "<div><h5>Druk op de refresh knop om stream (<strong><span class='kleurtje'>{$slide['id']}</span></strong>) op de tv een refresh te geven.</h5></div>",
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
			'#value' => 'Refresh'
		);
		return $form;
	}


	function art_revolution_form_submit($form) {

		if ($form['locker']['#value']) {
			$username = $form['username']['#value'];
			$user = user_load_by_name($username);

			db_update("field_data_field_force_refresh_page")
				->fields(array(
					'field_force_refresh_page_value' => $form['fpr']['#value'],
				))
				->condition('entity_id', $user->uid)
				->execute();

			db_update("art_revolution")
				->fields(array(
					'field_force_refresh_page_value' => $form['fpr']['#value'],
				))
				->condition('uid', $user->uid)
				->execute();

      db_update("sessions")
        ->fields(array(
          'refreshPending' => 1,
        ))
        ->condition('sid', $_GET['sessionID'])
        ->execute();

      db_insert("art_revolution_fpr")
        ->fields(array(
          'uid' => $user->uid,
          'sessionID' => $_GET['sessionID'],
          'sessionUID' => $_GET['sessionUID'],
          'streamName' => $form['username']['#value'],
          'resetDone' => 0,
        ))
        ->execute();


//			$to = $mail;
//			$from = 'info@cloudscreen.nl';
//			// Set headers etc
//			$subject = "Uw reclame display krijgt een herstart op afstand.";
//			$body = "Beste $klantnaam<br /><br />Uw reclame display krijgt binnen 5 minuten een <b>herstart op afstand </b><br />Na deze herstart zal uw reclame display weer automatisch verder gaan.<br /><br />Wij hopen u zo voldoende te hebben geïnformeerd.<br /><br />Met vriendelijke groet,<br />Push Reclame";
//
//
//
//			if (simple_mail_send($from, $to, $subject, $body) != TRUE) {
//				watchdog('reclame', 'Remote refresh mail verstuurd naar '. $klantnaam .' &nbsp; (' . $mail . ') mislukt!', array(), WATCHDOG_ERROR);
//				drupal_set_message("Remote refresh mail verstuurd naar $klantnaam ($mail) mislukt!", 'error');
//			}
//			else {
//				watchdog('reclame', 'Remote refresh mail verstuurd naar  '. $klantnaam .  ' &nbsp; (' . $mail . ') mislukt!', array(), WATCHDOG_INFO);
//				drupal_set_message("Remote refresh mail verstuurd naar $klantnaam ($mail) gelukt!");
//			}

		//Clear cache

        cache_clear_all();

        drupal_set_message ( t("Remote refresh is executed...") );
        drupal_set_message ( t("The refresh can take up to 1 minute to complete.") );
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;

		}
	}
} else {
    drupal_goto('/403');
	}