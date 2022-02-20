<?php
global $user;
$nopayment = array_intersect(array('nopayment'), array_values($user->roles));


$module_path = drupal_get_path('module', 'art_revolution');
drupal_add_js($module_path . '/rs-plugin/js/jquery.themepunch.plugins.min.js');
drupal_add_js($module_path . '/rs-plugin/js/jquery.themepunch.revolution.js');
drupal_add_css($module_path . '/rs-plugin/css/settings.css');
drupal_add_css($module_path . '/css/revolution.css');

$account = user_load($user->uid);
$reclame_id = $account->name;
//   echo '<pre>'; print_r($account->name); echo '</pre>';
//    exit;
$reclame_id_nopay = '705252919'; // No Paymant
$slideshow = art_revolution_load($reclame_id);
$slideshownopay = art_revolution_load($reclame_id_nopay);
$storing = homemade_storing();
?>

<?php if (in_array('nopayment', $user->roles)) { ?>


  <!--Reclame voor niet betalende klanten -->

  <?php

  print theme('art_revolution_slides', array(
    'id' => $reclame_id_nopay,
    'slides' => $slideshownopay->slides,
    'settings' => $slideshownopay->settings
  ));

} elseif (user_is_logged_in() == TRUE) { ?>

<?php
	include 'sites/all/modules/art_revolution/rs-plugin/css/extra_styles.php';
	print theme('art_revolution_slides', array(
	'id' => $reclame_id,
	'slides' => $slideshow->slides,
	'settings' => $slideshow->settings
));


} else {
  if (user_is_logged_in() == FALSE) { ?>
    <div class="notloggedin">
      <p>Welkom op het PUSH reclame systeem<br/>Door in te loggen wordt uw instore beeldreclame geladen</p>

      <div class="loginfront">
        <?php
        print(drupal_render(drupal_get_form('user_login_block')));
        ?>
      </div>

      <p>Wanneer u problemen ondervind neem dan contact met ons op <span class="storingsnummer"><?php print $storing; ?></span></p>

    </div>

  <?php
  }
}
?>
