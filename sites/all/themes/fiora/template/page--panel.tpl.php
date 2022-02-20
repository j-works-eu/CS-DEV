
<?php
	global $user;
	$storing = homemade_storing();
	$email = homemade_storing_email();
	$background = homemade_background_login();
	$form = drupal_get_form('user_login_block');
	$formoutput = drupal_render($form);
?>

<?php if (user_is_logged_in() == TRUE) { ?>

	<?php
	$checkklant = array_intersect(array('klant'), array_values($user->roles));
	$reclame = array_intersect(array('reclame'), array_values($user->roles));
	$defensie = array_intersect(array('defensie'), array_values($user->roles));
	$defensiemanager = array_intersect(array('defensie-manager'), array_values($user->roles));
	$defensieeditor = array_intersect(array('defensie-editor'), array_values($user->roles));
	$check = array_intersect(array('mod', 'administrator'), array_values($user->roles));
	$username = $user->name;

	if (count($check) >= 1) {
		drupal_goto("database");
	}
	if ($defensie) {
		drupal_goto("defensie");
	}
	if ($defensiemanager) {
		drupal_goto("defensie/manager");
	}
	if ($defensieeditor) {
		drupal_goto("defensie/editor");
	}
	if ($checkklant) {
		drupal_goto("client");
	}
	if ($reclame) {
		drupal_goto("display/$username");
	}
	?>

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
}
?>
