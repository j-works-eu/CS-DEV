<?php
	global $user;
	global $base_url;
	global $theme_root;
	global $user;
	$checkrol = array_intersect(array('administrator', 'mod', 'Beta'), array_values($user->roles));
	
	//User access only own slide and is not admin
	
	$slideid = arg(2);
	
	$page_list = array();
	$query = db_select('art_revolution', 'a');
	$query->fields('a', array('id'));
	$query->fields('a', array('mail'));
	$query->condition('id', $slideid, '=');
	$result = $query->execute();
	
	if ($result) {
		foreach ($result as $row) {
			$sid = $page_list[] = $row->id;
			$mailuser = $page_list[] = $row->mail;
			
			//Checks if user can access page
			
			$mailcheck = $mailuser != $user->mail;
			
			
			if ($mailcheck) {
				if ($checkrol){
					break;
				}
				else {
					// TODO create a 403 page access denied
					drupal_goto("403");}
			}
		}
	}
?>