
<?php
global $user;
$storing = homemade_storing();
$email = homemade_storing_email();
$background = homemade_background_login();
$form = drupal_get_form('user_login_block');
$formoutput = drupal_render($form);
?>

<?php if (user_is_logged_in() == TRUE) { ?>
  <div class="lockdiv">
    <div class="lockage"><i class="fas fa-lock"></i></div>
    <div class="message">
      <h1>Page not found</h1>
      <p>Please check with the site admin if you believe this is a mistake.</p>
    </div>
  </div>
  <?php

} else {
if (user_is_logged_in() == FALSE) {
?>


<?php

$imgExts = array("gif", "jpg", "jpeg", "png", "tiff", "tif");
$url = $background;
$urlExt = pathinfo($url, PATHINFO_EXTENSION);


if (in_array($urlExt, $imgExts)) {
?>
<div style="background: url(<?php print $background; ?>" class="notloggedin">
  <?php
  } else {
  ?>
  <div class="notloggedin">
    <video class="videofront" autoplay loop muted playsinline><source src='<?php print $background; ?>'></video>
    <?php
    }
    ?>

  <div class="loginfront">
    <div class="heartbeat logologin"><img src="/sites/all/themes/fiora/images/logo700px-wit.png"></div>
    <?php
    print $formoutput;
    ?>
  </div>
  <?php
  }
  }
  ?>
