<?php
require_once 'check.inc';

function art_revolution_import_form() {
  $slideID = arg(2);
  $dir = variable_get('home_streams_folder_location');
  $files = glob("$dir/$slideID/*.txt", GLOB_BRACE);

	$all_users = entity_load('user');
	foreach ($all_users as $value) {
		$user_list = (array)$value;
		$users[$user_list['uid']] = $user_list['name'];
	}

  $allFiles = array();
  array_push($allFiles,  'Choose a backup from the list');
  foreach ($files as $value) {
    $allFiles[basename($value)] = basename($value);
  }

  //SORT LIST DESC (LAST BACKUPS FIRST)
  array_multisort($allFiles, SORT_DESC);

  $form['BackupFiles'] = array(
    '#type' => 'select',
    '#options' => $allFiles,
    '#title' => "<div id='sliderHeadersTitle'><h1>" . t("STREAM IMPORTER" . "</h1></div>"),
    '#prefix' => "<div id='sliderHeaders'>" . t("Automated backups List" . "</div>"),
    '#suffix' => "<div id='sliderFooter'>" . t("Or add your own backup file" . "</div>"),
    '#default_value' => 0,
    '#required' => FALSE,
  );

	$form['data'] = array(
		'#type' => 'managed_file',
		'#upload_validators' => array('file_validate_extensions' => array('txt')),
		'#upload_location' => 'public://cs_backups/',
		'#required' => FALSE,
	);

	$form['username'] = array(
		'#type' => 'hidden',
		'#title' => 'Stream ID',
		'#default_value' => $slideID,
		'#autocomplete_path' => 'user/autocomplete'
	);

	$form['submit'] = array(
		'#type' => 'submit',
		'#value' => 'Import'
	);

	return $form;
}

function art_revolution_import_form_submit(&$form, $form_state) {

    global $user;
    $checkrolreclame = array_intersect(array('administrator', 'mod'), array_values($user->roles));


    if($form['BackupFiles']['#value'] > 0){
        $slideID = arg(2);
        $dir = variable_get('home_streams_folder_location');
        $basepath = $dir.'/'.$slideID.'/';
        $file = $basepath.$form['BackupFiles']['#value'];
        $fileupload = fopen($file,"r");
    }

    else if($form['data']->fid > 0) {
        $file = file_save_upload('data', array(
            'file_validate_extensions' => array('txt'),
        ));
        $fileupload = fopen($file->uri,"r");
    } else {
        drupal_set_message(t('Please provide a backup <b>file</b> or choose a file from the <b>Automated Backups List</b>!'), $type = 'error');
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;
    }

    $contentread = fgets($fileupload);

    $title =$form['username']['#value'];
    $data = $contentread;
    //	$data = $form['data']['#value'];
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

    db_update('art_revolution')
        ->fields(array(
            'settings' => base64_encode(json_encode($slideshow->settings)),
            'data' => base64_encode(json_encode($slideshow->slides)),
        ))
        ->condition('id', $title)
        ->execute();

    drupal_set_message(t('Backup restored'));
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    exit;

}

function art_revolution_base64toimage($str, $file) {
	$str = base64_decode($str);
	file_unmanaged_save_data($str, $file, FILE_EXISTS_REPLACE);
	return $file;
}