<?php

	require_once 'sites/all/modules/art_revolution/inc/check.inc';

	function art_revolution_base64toimage($str, $file) {
		$str = base64_decode($str);
		file_unmanaged_save_data($str, $file, FILE_EXISTS_REPLACE);
		return $file;
	}


	function art_revolution_form()
	{

		$randomnumber = date("mdisG");
		$all_users = entity_load('user');
		foreach ($all_users as $value) {
			$user_list = (array)$value;
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
        'sessionID' => 'SID'.$randomnumber,
				'name' => '',
				'company_subdivision' => '',
				'special_group' => '',
				'special_editor' => '',
				'klantnaam' => '',
				'username' => $randomnumber,
				'password' => $randomnumber,
				'mail' => '',
				'role' => '',
				'offline_status' => 1,
				'refresh' => '',
				'refreshHours' => '',
				'refreshMinutes' => '',
				'teamviewer' => '1',
				'plaatsing' => t('Unknown')
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

    $form['sessionID'] = array(
      '#type' => 'hidden',
      '#default_value' => $slide['sessionID']
    );

		$form['name'] = array(
			'#type' => 'textfield',
			'#title' => t('Company'),
			'#default_value' => $slide['name'],
			'#required' => TRUE,
		);


		$form['klantnaam'] = array(
			'#type' => 'hidden',
			'#title' => t('Name client'),
			'#default_value' => $slide['klantnaam'],
			'#required' => TRUE,
						'#autocomplete_path' => 'bedrijfsnaam/autocomplete',
		);

		$form['plaatsing'] = array(
			'#type' => 'textfield',
			'#title' => 'Waar is de box geplaatst?',
			'#default_value' => $slide['plaatsing'],
			'#required' => FALSE,
		);


		$form['company_subdivision'] = array(
			'#type' => 'hidden',
			'#default_value' => $slide['company_subdivision'],
			'#title' => t('Company subdivision'),
			'#autocomplete_path' => 'companysubdivision/autocomplete',
		);

		$form['special_group'] = array(
			'#type' => 'hidden',
			'#default_value' => $slide['special_group'],
			'#title' => t('Special group'),
			'#autocomplete_path' => 'specialgroup/autocomplete',
		);

		$form['special_editor'] = array(
			'#type' => 'hidden',
			'#default_value' => $slide['special_editor'],
			'#title' => t('Special Editor'),
			'#autocomplete_path' => 'specialeditor/autocomplete',
		);

		$form['username'] = array(
			'#type' => 'hidden',
			'#default_value' => $slide['username']

		);

		$form['password'] = array(
			'#type' => 'hidden',
			'#default_value' => $slide['password']
		);

		$form['mail'] = array(
			'#type' => 'hidden',
			'#title' => 'E-mail',
			//'#description' => 'E-mail van de klant',
			'#required' => TRUE,
			'#default_value' => $slide['mail'],
			'#autocomplete_path' => 'usermailadres/autocomplete',
		);

		$form['role'] = array(
			'#type' => 'hidden',
			'#title' => 'Role (Special)',
			//'#description' => 'E-mail van de klant',
			'#default_value' => $slide['role'],
			'#autocomplete_path' => 'userselectrole/autocomplete',
		);

		$form['offlinestatus'] = array(
			'#type' => 'hidden',
			'#default_value' => $slide['offline_status']
		);

		# the values for the dropdown box
		$form['type_options'] = array(
			'#type' => 'value',
			'#default_value' => $slide['refresh'],
			'#value' => array(
						'300' => '5 ' . t('minutes'),
				'600' => '10 ' . t('minutes'),
				'900' => '15 ' . t('minutes'),
				'1200' => '20 ' . t('minutes'),
				'1500' => '25 ' . t('minutes'),
				'1800' => '30 ' . t('minutes'),
				'2100' => '35 ' . t('minutes'),
				'2400' => '40 ' . t('minutes'),
				'2700' => '45 ' . t('minutes'),
				'3000' => '50 ' . t('minutes'),
				'3300' => '55 ' . t('minutes'),
				'3600' => '1 ' . t('hour'),
				'7200' => '2 ' . t('hours'),
				'10800' => '3 ' . t('hours'),
				'14400' => '4 ' . t('hours'),
				'18000' => '5 ' . t('hours'),
				'21600' => '6 ' . t('hours'),
				'28800' => '8 ' . t('hours'),
				'36000' => '10 ' . t('hours'),
				'43200' => '12 ' . t('hours'),
				'50400' => '14 ' . t('hours'),
				'57600' => '16 ' . t('hours'),
				'64800' => '18 ' . t('hours'),
				'72000' => '20 ' . t('hours'),
				'79200' => '22 ' . t('hours'),
				'82800' => '23 '. t('hours'),
				'86400' => '24 ' . t('hours'),
				'31556952000' => t('Geen refresh'),
			)
		);

		# the values for the dropdown box
		$form['type_options_Hour'] = array(
			'#type' => 'value',
			'#default_value' => $slide['refreshHours'],
			'#value' => array(
                'none' => t('Hours'),
				'1' => '1',
				'2' => '2',
				'3' => '3',
				'4' => '4',
				'5' => '5',
				'6' => '6',
				'7' => '7',
				'8' => '8',
				'9' => '9',
				'10' => '10',
				'11' => '11',
				'12' => '12',
				'13' => '13',
				'14' => '14',
				'15' => '15',
				'16' => '16',
				'17' => '17',
				'18' => '18',
				'19' => '19',
				'20' => '20',
                '21' => '21',
                '22' => '22',
                '23' => '23',
                '0' => '00',
			)
		);
		# the values for the dropdown box
		$form['type_options_Minutes'] = array(
			'#type' => 'value',
			'#default_value' => $slide['refreshMinutes'],
			'#value' => array(
				'none' => t('Minutes'),
                '0' => '00',
                '1' => '01',
                '2' => '02',
                '3' => '03',
                '4' => '04',
                '5' => '05',
                '6' => '06',
                '7' => '07',
                '8' => '08',
                '9' => '09',
                '10' => '10',
                '11' => '11',
                '12' => '12',
                '13' => '13',
                '14' => '14',
                '15' => '15',
                '16' => '16',
                '17' => '17',
                '18' => '18',
                '19' => '19',
                '20' => '20',
                '21' => '21',
                '22' => '22',
                '23' => '23',
                '24' => '24',
                '25' => '25',
                '26' => '26',
                '27' => '27',
                '28' => '28',
                '29' => '29',
                '30' => '30',
                '31' => '31',
                '32' => '32',
                '33' => '33',
                '34' => '34',
                '35' => '35',
                '36' => '36',
                '37' => '37',
                '38' => '38',
                '39' => '39',
                '40' => '40',
                '41' => '41',
                '42' => '42',
                '43' => '43',
                '44' => '44',
                '45' => '45',
                '46' => '46',
                '47' => '47',
                '48' => '48',
                '49' => '49',
                '50' => '50',
                '51' => '51',
                '52' => '52',
                '53' => '53',
                '54' => '54',
                '55' => '55',
                '56' => '56',
                '57' => '57',
                '58' => '58',
                '59' => '59',
			)
		);

    $form['refresh'] = array(
      '#title' => t('Global Refresh (every...)'),
      '#type' => 'select',
      '#attributes' => array('class' => array('col-md-3')),
      '#options' => $form['type_options']['#value'],
      '#default_value' => $slide['refresh'],
    );

    $form['refreshTimeLabel'] = array(
      '#type' => 'textfield',
      '#attributes' => array('class' => array('refreshTimeClassLabel')),
      '#default_value' => 'Refresh specific time',
      '#disabled' => TRUE,
    );

    $form['refreshTimeHour'] = array(
      '#type' => 'select',
      '#attributes' => array('class' => array('refreshTimeClass', 'rHour')),
      '#options' => $form['type_options_Hour']['#value'],
      '#default_value' => $slide['refreshHours'],
    );

    $form['refreshTimeMinutes'] = array(
      '#type' => 'select',
      '#attributes' => array('class' => array('refreshTimeClass', 'rMinute')),
      '#options' => $form['type_options_Minutes']['#value'],
      '#default_value' => $slide['refreshMinutes'],
    );

		$form['teamviewer'] = array(
			'#type' => 'hidden',
			'#title' => 'Serienummer Box',
			'#default_value' => $slide['teamviewer'],
			'#required' => TRUE,
		);


		$form['submit'] = array(
			'#type' => 'submit',
			'#value' => t('Save'),
            '#attributes' => array('class' => array('streamSettings')),
		);
		return $form;
	}

	function art_revolution_form_validate(&$form, &$form_state)
	{

		if ($form['locker']['#value']) {
        // CHECK UPDATE KLANT GEGEVENS
		} else {
			// CHECK AANMAKEN KLANT

		}
	}

	function art_revolution_form_submit(&$form, &$form_state)
	{

		// Updates reclame


		if ($form['locker']['#value']) {
			global $user;
			$checkrolreclame = array_intersect(array('administrator', 'mod'), array_values($user->roles));

			$username = $form['username']['#value'];
			$usern = user_load_by_name($username);
			$user_id = $usern->uid;

			$company_subdivision = $form['company_subdivision']['#value'];
			$special_group = $form['special_group']['#value'];
			$special_editor = $form['special_editor']['#value'];
			$user_roles_add = $form['role']['#value'];

            $refreshHour = $form['refreshTimeHour']['#value'];
            $refreshMinute = $form['refreshTimeMinutes']['#value'];

			// on change add special role
			$uid = user_load($user_id);

			if (!empty($user_roles_add)) {
				$role = user_role_load_by_name($form['role']['#value']);
				$usern->roles = $user->roles + array($role->rid => $role->name);
			}
            try {
                user_save($uid);
            } catch (Exception $e) {
            }


            db_update("art_revolution")
				->fields(array(
					'name' => $form['name']['#value'],
					'company_subdivision' => $form['company_subdivision']['#value'],
					'special_group' => $form['special_group']['#value'],
					'special_editor' => $form['special_editor']['#value'],
					'role' => $form['role']['#value'],
					'klantnaam' => $form['klantnaam']['#value'],
					'mail' => $form['mail']['#value'],
					'password' => $form['password']['#value'],
					'uid' => $user_id,
					'refresh' => $form['refresh']['#value'],
					'refreshHours' => $form['refreshTimeHour']['#value'],
					'refreshMinutes' => $form['refreshTimeMinutes']['#value'],
					'teamviewer' => $form['teamviewer']['#value'],
					'plaatsing' => $form['plaatsing']['#value']

				))
				->condition('uid', $user_id)
				->execute();

			db_update('users')
				->fields(array(
					'mail' => $form['mail']['#value'],
				))
				->condition('uid', $user_id)
				->execute();

//			if ($company_subdivision) {
//				db_insert('users_roles')
//					->fields(array(
//						'mail' => $form['role']['#value'],
//						'uid' => $user_id,
//					))
//					->execute();
//			}

			db_update("field_data_field_klantnaam")
				->fields(array(
					'field_klantnaam_value' => $form['klantnaam']['#value'],
				))
				->condition('entity_id', $user_id)
				->execute();


			db_update("field_data_field_bedrijfsnaam")
				->fields(array(
					'field_bedrijfsnaam_value' => $form['name']['#value'],
				))
				->condition('entity_id', $user_id)
				->execute();


			if (empty($company_subdivision)) {
				db_update("field_data_field_company_subdivision")
					->fields(array(
						'field_company_subdivision_value' => 'none',
					))
					->condition('entity_id', $user_id)
					->execute();
			}
			else {
				db_update("field_data_field_company_subdivision")
					->fields(array(
						'field_company_subdivision_value' => $form['company_subdivision']['#value'],
					))
					->condition('entity_id', $user_id)
					->execute();
			}

			if (empty($special_group)) {
				db_update("field_data_field_special_group")
					->fields(array(
						'field_special_group_value' => 'none',
					))
					->condition('entity_id', $user_id)
					->execute();
			}
			else {
				db_update("field_data_field_special_group")
					->fields(array(
						'field_special_group_value' => $form['special_group']['#value'],
					))
					->condition('entity_id', $user_id)
					->execute();
			}

			if (empty($special_editor)) {
				db_update("field_data_field_special_editor")
					->fields(array(
						'field_special_editor_value' => 'none',
					))
					->condition('entity_id', $user_id)
					->execute();
			}
			else {
				db_update("field_data_field_special_editor")
					->fields(array(
						'field_special_editor_value' => $form['special_editor']['#value'],
					))
					->condition('entity_id', $user_id)
					->execute();
			}

			db_update("field_data_field_pagina_reload_snelheid")
				->fields(array(
					'field_pagina_reload_snelheid_value' => $form['refresh']['#value'],
				))
				->condition('entity_id', $user_id)
				->execute();

      if ($refreshHour === 'none' ){
        db_update("field_data_field_refreshtime")
          ->fields(array(
            'field_refreshtime_value' => 'none',
          ))
          ->condition('entity_id', $user_id)
          ->execute();
      } else {
        db_update("field_data_field_refreshtime")
          ->fields(array(
            'field_refreshtime_value' => $refreshHour . ',' . $refreshMinute,
          ))
          ->condition('entity_id', $user_id)
          ->execute();
      }


        db_update("field_data_field_force_refresh_page")
        ->fields(array(
            'field_force_refresh_page_value' => 2,
        ))
        ->condition('entity_id', $user_id)
        ->execute();

        cache_clear_all();

        drupal_set_message(t("Settings saved for stream:") . " " . $form['id']['#value']);
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;
		}
	}