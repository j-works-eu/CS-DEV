<?php
	
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
				'klantnaam' => '',
				'username' => '',
				'disable' => '',
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

# the values for the dropdown box
		$form['type_options'] = array(
			'#type' => 'value',
			'#value' => array('2' => t('Display van de klant de-activeren'),
				'1' => t('Display van de klant activeren'))
		);
		$form['disable'] = array(
			'#title' => t("De display van de klant de-activeren of activeren"),
			'#type' => 'select',
			'#options' => $form['type_options']['#value'],
			'#default_value' => $slide['disable']
		);
		
		
		$form['submit'] = array(
			'#type' => 'submit',
			'#value' => 'Opslaan'
		);
		return $form;
	}
	
	
	function art_revolution_form_submit($form)
	{
		
		if ($form['locker']['#value']) {
			$username = $form['username']['#value'];
			$user = user_load_by_name($username);
			$user_mail = $user->mail;
			$user_id = $user->uid;
			
			
			if ($form['disable']['#value'] == 2) {
				// nopayment role toevoegen
				$userload = user_load($user_id);
				$role = user_role_load_by_name("nopayment");
				$userload->roles = $userload->roles + array($role->rid => $role->name);
				user_save($userload);
				
				// reclame role verwijderen en nopayment role toevoegen
				
				$user = user_load($user_id);
				
				//first we check if the user has the first role in question
				
				if (isset($user->roles[6])) {
					
					//if so, we unset the role
					unset($user->roles[6]);
					
					//now we check to see if they have the role we want to swap for
					if (!isset($user->roles[7])) {
						
						//if not we add this role
						$user->roles[7] = 'nopayment';
					}
					
					$edit = array('roles' => $user->roles);
					user_save($user, $edit);
				}
				
				db_update("field_data_field_force_refresh_page")
					->fields(array(
						'field_force_refresh_page_value' => 1,
					))
					->condition('entity_id', $user->uid)
					->execute();
				
				db_update("art_revolution")
					->fields(array(
						'field_force_refresh_page_value' => 1,
					))
					->condition('uid', $user->uid)
					->execute();
				
				// Alles disable based on mail client

//				db_update("art_revolution")
//					->fields(array(
//						'disable' => $form['disable']['#value'],
//					))
//					->condition('mail', $user_mail)
//					->execute();
				
				db_update("art_revolution")
					->fields(array(
						'disable' => $form['disable']['#value'],
					))
					->condition('uid', $user->uid)
					->execute();
				
				//Clear cache on field to display field's updated value on front end
				
				$cid = 'field:user:' . $user_id;
				cache_clear_all($cid, 'cache_field');
				
				drupal_set_message("Klant zijn display wordt nu uitgeschakeld");
			}
			
			if ($form['disable']['#value'] == 1) {
				
				// nopayment role verwijderen en reclame role toevoegen
				$user = user_load($user_id);
				
				//first we check if the user has the first role in question
				
				if (isset($user->roles[7])) {
					
					//if so, we unset the role
					unset($user->roles[7]);
					
					//now we check to see if they have the role we want to swap for
					if (!isset($user->roles[6])) {
						
						//if not we add this role
						$user->roles[6] = 'reclame';
					}
					
					$edit = array('roles' => $user->roles);
					user_save($user, $edit);
				}
				
				db_update("field_data_field_force_refresh_page")
					->fields(array(
						'field_force_refresh_page_value' => 1,
					))
					->condition('entity_id', $user->uid)
					->execute();
				
				db_update("art_revolution")
					->fields(array(
						'field_force_refresh_page_value' => 1,
					))
					->condition('uid', $user->uid)
					->execute();
				
				// Alles disable based on mail client

//				db_update("art_revolution")
//					->fields(array(
//						'disable' => $form['disable']['#value'],
//					))
//					->condition('mail', $user_mail)
//					->execute();
				
				db_update("art_revolution")
					->fields(array(
						'disable' => $form['disable']['#value'],
					))
					->condition('uid', $user->uid)
					->execute();
				
				//Clear cache on field to display field's updated value on front end
				
				$cid = 'field:user:' . $user_id;
				cache_clear_all($cid, 'cache_field');
				
				
				drupal_set_message("Klant zijn display wordt nu geactiveerd");
			}
			
			drupal_goto('<front>');
		}
	}