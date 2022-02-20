<?php
require_once 'check.inc';


function art_revolution_export($sid) {
    $slideshow = art_revolution_load($sid);
    $date = date("[Y-m-d H:i]");

    for ($i = 0; $i < count($slideshow->slides); $i++) {
    if (!empty($slideshow->slides[$i]->background_image_uri)) {
      $slideshow->slides[$i]->image_content = art_revolution_imagetobase64($slideshow->slides[$i]->background_image_uri);
    }
    for ($j = 0; $j < count($slideshow->slides[$i]->layers); $j++) {
      if ($slideshow->slides[$i]->layers[$j]->type == 'image' && !empty($slideshow->slides[$i]->layers[$j]->image_uri)) {
        $slideshow->slides[$i]->layers[$j]->image_content = art_revolution_imagetobase64($slideshow->slides[$i]->layers[$j]->image_uri);
      }
    }
    }

    $data = json_encode($slideshow);
    $data = base64_encode($data);
    header("Content-Type: text/txt");
    header("Content-Disposition: attachment; filename=CS-backup-[{$sid}]-[{$date}].txt");
    header("Content-Length: " . strlen($data));

    echo $data;
    die;
}

/**
 * Helper: convert image to string as base64 encode
 * @param type $fid
 * @return string
 */
function art_revolution_imagetobase64($uri) {
  $path = drupal_realpath($uri);
  if (!$data = file_get_contents($path)) {
    $path = file_create_url($uri);
    $data = file_get_contents($path);
  }
  return base64_encode($data);
}
?>