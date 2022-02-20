<?php

function art_revolution_load($sid) {
  $result = db_select('{art_revolution}', 'd')
          ->fields('d')
          ->condition('id', $sid, '=')
          ->execute()
          ->fetchObject();

  $slideshow = new stdClass();

  if (!empty($result)) {
    $json = base64_decode($result->settings);
    $slideshow->settings = json_decode($json);
    $json = base64_decode($result->data);
    $slideshow->slides = json_decode($json);
  }

  if (!empty($slideshow)) {
    if (is_array($slideshow) && count($slideshow)) {
      for ($i = 0; $i < count($slideshow->slides); $i++) {
        if (!empty($slideshow->slides[$i]->background_image_uri)) {
          $slideshow->slides[$i]->background_image = file_create_url($slideshow->slides[$i]->background_image_uri);
        }
        for ($j = 0; $j < count($slideshow->slides[$i]->layers); $j++) {
          if ($slideshow->slides[$i]->layers[$j]->type == 'image' && !empty($slideshow->slides[$i]->layers[$j]->image_uri)) {
            $slideshow->slides[$i]->layers[$j]->image = file_create_url($slideshow->slides[$i]->layers[$j]->image_uri);
          }
        }
      }
    }
  }
  return $slideshow;
}

	function art_revolution_preview_load($sid) {
    $result = db_select('{art_revolution}', 'd')
      ->fields('d')
      ->condition('id', $sid, '=')
      ->execute()
      ->fetchObject();

    $slideshow = new stdClass();

    if (!empty($result)) {
      $json = base64_decode($result->settings);
      $slideshow->settings = json_decode($json);
      $json = base64_decode($result->data);
      $slideshow->slides = json_decode($json);
    }

    if (!empty($slideshow)) {
      if (is_array($slideshow) && count($slideshow)) {
        for ($i = 0; $i < count($slideshow->slides); $i++) {
          if (!empty($slideshow->slides[$i]->background_image_uri)) {
            $slideshow->slides[$i]->background_image = file_create_url($slideshow->slides[$i]->background_image_uri);
          }
          for ($j = 0; $j < count($slideshow->slides[$i]->layers); $j++) {
            if ($slideshow->slides[$i]->layers[$j]->type == 'image' && !empty($slideshow->slides[$i]->layers[$j]->image_uri)) {
              $slideshow->slides[$i]->layers[$j]->image = file_create_url($slideshow->slides[$i]->layers[$j]->image_uri);
            }
          }
        }
      }
    }
    return $slideshow;
	}

	function art_revolution_preview_slide_load($sid) {
    $result = db_select('{art_revolution}', 'd')
      ->fields('d')
      ->condition('id', $sid, '=')
      ->execute()
      ->fetchObject();

    $slideshow = new stdClass();

    if (!empty($result)) {
      $json = base64_decode($result->settings);
      $slideshow->settings = json_decode($json);
      $json = base64_decode($result->data);
      $slideshow->slides = json_decode($json);
    }

    if (!empty($slideshow)) {
      if (is_array($slideshow) && count($slideshow)) {
        for ($i = 0; $i < count($slideshow->slides); $i++) {
          if (!empty($slideshow->slides[$i]->background_image_uri)) {
            $slideshow->slides[$i]->background_image = file_create_url($slideshow->slides[$i]->background_image_uri);
          }
          for ($j = 0; $j < count($slideshow->slides[$i]->layers); $j++) {
            if ($slideshow->slides[$i]->layers[$j]->type == 'image' && !empty($slideshow->slides[$i]->layers[$j]->image_uri)) {
              $slideshow->slides[$i]->layers[$j]->image = file_create_url($slideshow->slides[$i]->layers[$j]->image_uri);
            }
          }
        }
      }
    }
    return $slideshow;
	}
?>