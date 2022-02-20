<?php

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
				'refresh' => '21600',
        'refreshHours' => '',
        'refreshMinutes' => '',
				'teamviewer' => '1',
				'plaatsing' => ''
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
			'#title' => t('Company'),
			'#default_value' => $slide['name'],
			'#required' => TRUE,
			'#autocomplete_path' => 'bedrijfsnaam/autocomplete',
		);


		$form['klantnaam'] = array(
			'#type' => 'textfield',
			'#title' => t('Name client'),
			'#default_value' => $slide['klantnaam'],
			'#required' => TRUE,
			'#autocomplete_path' => 'naamklant/autocomplete',
		);

		$form['company_subdivision'] = array(
			'#type' => 'textfield',
			'#default_value' => $slide['company_subdivision'],
			'#title' => t('Company subdivision'),
			'#autocomplete_path' => 'companysubdivision/autocomplete',
		);

		$form['special_group'] = array(
			'#type' => 'textfield',
			'#default_value' => $slide['special_group'],
			'#title' => t('Special group'),
			'#autocomplete_path' => 'specialgroup/autocomplete',
		);

		$form['special_editor'] = array(
			'#type' => 'textfield',
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
			'#type' => 'textfield',
			'#title' => 'E-mail',
			//'#description' => 'E-mail van de klant',
			'#required' => TRUE,
			'#default_value' => $slide['mail'],
			'#autocomplete_path' => 'usermailadres/autocomplete',
		);

		$form['role'] = array(
			'#type' => 'textfield',
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
				'600' => '10 ' . t('minutes'),
				'900' => '15 ' . t('minutes'),
				'1200' => '20 ' . t('minutes'),
				'1800' => '30 ' . t('minutes'),
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
			'#title' => t('Page refresh'),
			'#type' => 'select',
			'#options' => $form['type_options']['#value'],
			'#default_value' => $slide['refresh'],
		);

    $form['refreshTimeLabel'] = array(
      '#type' => 'textfield',
      '#attributes' => array('class' => array('refreshTimeClassLabel')),
      '#default_value' => 'Refresh on fixed time',
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
			'#type' => 'textfield',
			'#title' => 'Serienummer Box',
			'#default_value' => $slide['teamviewer'],
			'#required' => FALSE,
		);

		$form['plaatsing'] = array(
			'#type' => 'textfield',
			'#title' => 'Plaatsing box',
			'#default_value' => $slide['plaatsing'],
			'#required' => FALSE,
		);


		$form['submit'] = array(
			'#type' => 'submit',
			'#value' => 'Opslaan'
		);
		return $form;
	}

	function art_revolution_form_submit(&$form, &$form_state)
	{

		// Updates reclame


		if ($form['locker']['#value']) {

			$company_subdivision = $form['company_subdivision']['#value'];
			$special_group = $form['special_group']['#value'];
			$special_editor = $form['special_editor']['#value'];
			$user_roles_add = $form['role']['#value'];

      $refreshHour = $form['refreshTimeHour']['#value'];
      $refreshMinute = $form['refreshTimeMinutes']['#value'];

			$username = $form['username']['#value'];
			$user = user_load_by_name($username);
			$user_id = $user->uid;


			// on change add special role
			$uid = user_load($user_id);

			if (!empty($user_roles_add)) {
				$role = user_role_load_by_name($form['role']['#value']);
				$user->roles = $user->roles + array($role->rid => $role->name);
			}
			user_save($uid);


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

      if ($refreshHour == 'none' ){
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


			// Clear cache on field to display field's updated value on front end
//			$cidUser = 'field:user:' . $user_id;
//			$cidUser = 'field:user:' . $user_id;
//			cache_clear_all($cidUser, 'cache_field', TRUE);
//			cache_clear_all($cidUser, 'cache_field', TRUE);
      cache_clear_all();

			drupal_set_message("Gebruiker gegevens voor '{$form['id']['#value']} - {$form['name']['#value']}' zijn aangepast");
			drupal_goto('database');


		} else {

			$basepath = 'https://play.cloudscreen.nl/sites/all/modules/art_revolution/themes/';
			$file = $basepath.'demo.txt';

			$fileupload = fopen($file,"r");
			$contentread = fgets($fileupload);

			$data = $contentread;

			$json = base64_decode($data);
			$slideshow = json_decode($json);
			for ($i = 0; $i < count($slideshow->slides); $i++) {
				if (!empty($slideshow->slides[$i]->background_image_uri)) {
					if (isset($slideshow->slides[$i]->image_content)) {
						art_revolution_base64toimage($slideshow->slides[$i]->image_content, $slideshow->slides[$i]->background_image_uri);
						unset($slideshow->slides[$i]->image_content);
					}
				}
				for ($j = 0; $j < count($slideshow->slides[$i]->layers); $j++) {
					if ($slideshow->slides[$i]->layers[$j]->type == 'image' && !empty($slideshow->slides[$i]->layers[$j]->image_uri)) {
						if (isset($slideshow->slides[$i]->layers[$j]->image_content)) {
							art_revolution_base64toimage($slideshow->slides[$i]->layers[$j]->image_content, $slideshow->slides[$i]->layers[$j]->image_uri);
							unset($slideshow->slides[$i]->layers[$j]->image_content);
						}
					}
				}
			}


			$company_subdivision = $form['company_subdivision']['#value'];
			$special_group = $form['special_group']['#value'];
			$special_editor = $form['special_editor']['#value'];
			$user_roles_add = $form['role']['#value'];
      $refreshHour = $form['refreshTimeHour']['#value'];
      $refreshMinute = $form['refreshTimeMinutes']['#value'];

			// Add reclame
			$form_state = array();
			$form_state['values']['name'] = $form['username']['#value'];
			$form_state['values']['mail'] = $form['mail']['#value'];
			$form_state['values']['pass']['pass1'] = $form['password']['#value'];
			$form_state['values']['pass']['pass2'] = $form['password']['#value'];
			drupal_form_submit('user_register_form', $form_state);

			$username = $form['username']['#value'];
			$user = user_load_by_name($username);
			$user_id = $user->uid;


			// Add Reclame role
			$uid = user_load($user_id);
			$role = user_role_load_by_name("reclame");
			$user->roles = $user->roles + array($role->rid => $role->name);

			if (!empty($user_roles_add)) {
				$role = user_role_load_by_name($form['role']['#value']);
				$user->roles = $user->roles + array($role->rid => $role->name);
			}
			user_save($uid);


			db_insert("art_revolution")
				->fields(array(
					'id' => $form['id']['#value'],
					'name' => $form['name']['#value'],
          'settings' => base64_encode(json_encode($slideshow->settings)),
          'data' => base64_encode(json_encode($slideshow->slides)),
					'company_subdivision' => $form['company_subdivision']['#value'],
					'special_group' => $form['special_group']['#value'],
					'special_editor' => $form['special_editor']['#value'],
					'role' => $form['role']['#value'],
					'klantnaam' => $form['klantnaam']['#value'],
					'username' => $form['username']['#value'],
					'mail' => $form['mail']['#value'],
					'password' => $form['password']['#value'],
					'uid' => $user_id,
					'teamviewer' => $form['teamviewer']['#value'],
					'plaatsing' => $form['plaatsing']['#value'],
					'refresh' => $form['refresh']['#value'],
          'refreshHours' => 'none',
          'refreshMinutes' => 'none',
					'offline_status' => 1,
					'locker' => 1,

				))
				->execute();

			db_update("field_data_field_klantnaam")
				->fields(array(
					'field_klantnaam_value' => $form['klantnaam']['#value'],
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

			db_update("field_data_field_bedrijfsnaam")
				->fields(array(
					'field_bedrijfsnaam_value' => $form['name']['#value'],
				))
				->condition('entity_id', $user_id)
				->execute();

			db_update("field_data_field_mail_offline")
				->fields(array(
					'field_mail_offline_value' => 1,
				))
				->condition('entity_id', $user_id)
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

      if ($refreshHour == 'none' ){
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



        // Remove roles created by atomatic role creation module.
        // role klant is [5]
        // role quota250 is [8]

        unset($user->roles[5]);
        unset($user->roles[10]);
        $edit = array('roles' => $user->roles);

        user_save($user, $edit);



			// Clear cache on field to display field's updated value on front end
//			$cid = 'field:user:' . $user_id;
//			cache_clear_all($cid, 'cache_field', TRUE);
        cache_clear_all();

        drupal_set_message("Gebruiker gegevens voor '{$form['id']['#value']} - {$form['name']['#value']}' zijn aangemaakt");
        drupal_goto('database');
    }
}