<?php
$storing = homemade_storing();
$email = homemade_storing_email();
$background = homemade_background_login();
$form = drupal_get_form('user_login_block');
$formoutput = drupal_render($form);

global $user;

?>

<?php if (user_is_logged_in() == TRUE) { ?>
  <?php
  global $theme_root;
  ?>
  <div class="wrapper">
    <header class="header">
      <?php if ($page['header_right']) : ?>
        <?php print render($page['header_right']); ?>
      <?php endif; ?>
    </header><!-- end header -->
    <div id="content" class="col-md-12 col-sm-12 col-xs-12">
      <?php if ($page['content']) : ?>
        <?php print render($page['content']); ?>
      <?php endif; ?>
	  <?php if ($page['after_content']) : ?>
		  <?php print render($page['after_content']); ?>
	  <?php endif; ?>
	  <?php if ($page['bottom_content']) : ?>
		  <?php print render($page['bottom_content']); ?>
	  <?php endif; ?>
    </div>
  </div>
<?php
} else {
	if (user_is_logged_in() == FALSE) {
		?>

<!--LOGIN FRONT PAGE-->


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
        <div class="logologin"><img src="/sites/all/themes/fiora/images/logo700px-wit.png"></div>
        <?php
        print $formoutput;
        ?>
        <div class="meerinformatie">

        </div>
      </div>
    </div>
		<?php
	}
} ?>

    <script
