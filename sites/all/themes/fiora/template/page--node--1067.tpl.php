<?php
	global $user;
	global $theme_root;
	$storing = homemade_storing();
	$email = homemade_storing_email();


	/**
	 * Created by PhpStorm.
	 * User: jeroen
	 * Date: 17-09-17
	 * Time: 13:29
	 * PREVIEW PAGE
	 */

	include '/sites/all/modules/art_revolution/rs-plugin/css/extra_styles.php';
	$module_path = drupal_get_path('module', 'art_revolution');
	drupal_add_js($module_path . '/rs-plugin/js/jquery.themepunch.plugins.min.js');
	drupal_add_js($module_path . '/rs-plugin/js/jquery.themepunch.revolution.js');
	drupal_add_css($module_path . '/rs-plugin/css/settings.css');
	drupal_add_css($module_path . '/css/revolution.css');

	$reclame_id = $name = $_GET["id"];
	$slideshow = art_revolution_preview_slide_load($reclame_id);

	$startwidth =  $slideshow->settings->startwidth;
	$startheight =   $slideshow->settings->startheight;
  $startposition =   $slideshow->settings->startposition;

?>




<?php if (user_is_logged_in() == TRUE) { ?>
	<div class="wrapper <?php print $startposition; ?>">
				<div id="content">
								<div style='width: <?php print $startwidth ?>px !important; height: <?php print $startheight ?>px !important; transform: scale(0.6);' id="monitorscreen">
									<?php
										{

											function ToObject($Array) {

												// Create new stdClass object
												$object = new stdClass();

												// Use loop to convert array into
												// stdClass object
												foreach ($Array as $key => $value) {
													if (is_array($value)) {
														$value = ToObject($value);
													}
													$object->$key = $value;
												}
												return $object;
											}

											if (isset($slideshow->slides[$_GET["slide"]])) {
												$slide = $_GET["slide"];
											} else {
												$slide = 0;
											}

											print theme('art_revolution_slides', array(
												'slides' => array(0 => ToObject($slideshow->slides[$slide])),
												'settings' => $slideshow->settings
											));
										}

										//var_export ($slideshow->slides);
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
