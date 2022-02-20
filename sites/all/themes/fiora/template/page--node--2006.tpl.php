<?php
	global $user;
	global $theme_root;
	$storing = homemade_storing();
	$email = homemade_storing_email();


	/**
	 * Created by PhpStorm.
	 * User: jeroen
	 * Date: 26-11-2021
	 * Time: 09:00
	 * MasterScreen
	 */
//
//	include '/sites/all/modules/art_revolution/rs-plugin/css/extra_styles.php';
	$module_path = drupal_get_path('module', 'art_revolution');
	drupal_add_js($module_path . '/rs-plugin/js/jquery.themepunch.plugins.min.js');
	drupal_add_js($module_path . '/rs-plugin/js/jquery.themepunch.revolution.js');
	drupal_add_css($module_path . '/rs-plugin/css/settings.css');
	drupal_add_css($module_path . '/css/revolution.css');

	$reclame_id = $name = $_GET["id"];
	$slideshow = art_revolution_preview_load($reclame_id);

	$startwidth =  $slideshow->settings->startwidth;
	$startheight =   $slideshow->settings->startheight;


?>


<?php if (user_is_logged_in() == TRUE) { ?>
	<div class="wrapper">
<div id="content">
								<div style='width: <?php print $startwidth ?>px !important; height: <?php print $startheight ?>px !important;' id="masterScreen">
									<?php
										{
											print theme('art_revolution_slides', array(
												'slides' => $slideshow->slides,
												'settings' => $slideshow->settings
											));
										}
									?>
					</div>
				</div>
		</div>
<?php

} else {
	if (user_is_logged_in() == FALSE) {
		?>
		<div class="notloggedin">

			<div class="loginfront">
				<?php
					$elements = drupal_get_form("user_login");
					$form = drupal_render($elements);
					echo $form;
				?>
			</div>
		</div>
		<?php
	}
} ?>
