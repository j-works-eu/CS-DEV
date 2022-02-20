<?php
	require_once 'check.inc';


	function art_revolution_import_theme_form() {
		$slideid = arg(2);
		$all_users = entity_load('user');
		foreach ($all_users as $value) {
			$user_list = (array)$value;
			$users[$user_list['uid']] = $user_list['name'];
		}



		// THEMES ---------------------------------------------


		$theme1 = 'demo-data.txt';
		$theme2 = 'demo2.txt';
		$theme3 = 'demo3.txt';
		$theme4 = 'demo4.txt';
		$theme5 = 'demo5.txt';
		$theme6 = 'demo6.txt';
		$theme7 = 'demo7.txt';
		$theme8 = 'demo8.txt';
		$theme9 = 'demo9.txt';

		$values = array(
			$theme1 => '<img id="themestyle" class="theme enkelscherm eten" src="https://venngage-wordpress.s3.amazonaws.com/uploads/2018/05/youtube-banner-template-1.png" />',
//			$theme2 => '<img id="themestyle" class="theme tweescherm eten" src="http://louie.land/wallpapers/thumbs/plutonium.jpg" />',
			$theme3 => '<img id="themestyle" class="theme tweescherm algemeen" src="https://venngage-wordpress.s3.amazonaws.com/uploads/2018/05/youtube-banner-template-3.png" />',
//			$theme4 => '<img id="themestyle" class="theme enkelscherm algemeen" src="http://louie.land/wallpapers/thumbs/mrfusion.jpg" />',
//			$theme5 => '<img id="themestyle" class="theme enkelscherm eten" src="http://louie.land/wallpapers/thumbs/plutonium.jpg" />',
			$theme6 => '<img id="themestyle" class="theme tweescherm menukaart" src="https://venngage-wordpress.s3.amazonaws.com/uploads/2018/05/youtube-banner-template-6.png" />',
//			$theme7 => '<img id="themestyle" class="theme enkelscherm eten" src="http://louie.land/wallpapers/thumbs/mrfusion.jpg" />',
//			$theme8 => '<img id="themestyle" class="theme tweescherm drinken" src="http://louie.land/wallpapers/thumbs/plutonium.jpg" />',
			$theme9 => '<img id="themestyle" class="theme enkelscherm algemeen" src="https://venngage-wordpress.s3.amazonaws.com/uploads/2018/05/youtube-banner-template-7.png" />',
		);

		$form['data'] = array(
			'#type' => 'radios',
			'#options' => $values,
			'#required' => TRUE,
		);

		$form['username'] = array(
			'#type' => 'hidden',
			'#title' => 'Stream ID',
			'#default_value' => $slideid,
			'#autocomplete_path' => 'user/autocomplete'
		);

		$form['submit'] = array(
			'#type' => 'submit',
			'#value' => 'Dit template Installeren >>'
		);

		return $form;

	}


	function art_revolution_import_theme_form_submit(&$form) {
		$slideid = arg(2);
		$basepath = 'https://play.cloudscreen.nl/sites/all/modules/art_revolution/themes/';
		$file = $basepath.$form['data']['#value'];

		$fileupload = fopen($file,"r");
		$contentread = fgets($fileupload);


		$title = $form['username']['#value'];
		$data = $contentread;
		
		$val = db_select('art_revolution', 'a')
		  ->fields('a', array('data'))
		  ->condition('id', $title)
		  ->execute()
		  ->fetchField();
		  
		$dataDecode = base64_decode($data); 
		$valDecode = base64_decode($val);
		
		
		// Decode user slides and append chosen slide to slideshow
		
		$str = "[";
		$str .= trim($valDecode,"[]");
		$str .= trim(",");
		$str .= trim($dataDecode,"[]");
		$str .= "]";
		
		
		$slideshow = json_decode($str);
		
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
		

		db_update('art_revolution')
			  ->fields(array(
				'data' => base64_encode($str),
			  ))
			  ->condition('id', $title)
			  ->execute();

		
		drupal_set_message('Het thema is geinstalleerd voor'. ' ' . $title);
		drupal_goto('/admin/art_revolution/'.$slideid.'/editslides');

	}

	function art_revolution_base64toimage($str, $file) {
		$str = base64_decode($str);
		file_unmanaged_save_data($str, $file, FILE_EXISTS_REPLACE);
		return $file;
	}
?>