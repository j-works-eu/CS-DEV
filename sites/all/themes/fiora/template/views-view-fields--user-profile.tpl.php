<?php
	  drupal_goto("<front>");
//	global $user;
//	$user_fields = user_load($user->uid);
//
//	//This are the Custom User fields
//	$name = $user_fields->field_klantnaam['und'][0]['safe_value'];
//
//	$storing = homemade_storing();
//	$email = homemade_storing_email();
//	$total_reclame_count = homemade_total_reclame_count();
//	$usermail = $user->mail;
//
//?>
<!--<main>-->
<!---->
<!---->
<!--		-->
<!---->
<!--		<div class="user_profile">-->
<!--			<h1 class="colorh1orange">--><?php //print t("Your Account") ?><!--    </h1>-->
<!--			<br/>-->
<!---->
<!--			<div class="up_user">Hi-->
<!--				<span>  --><?php
//						print    $name;
//					?><!--</span></div>-->
<!--			<div class="user_text">--><?php //print t("Total Displays: ") ?>
<!--				<span>--><?php //print $total_reclame_count; ?><!--</span>-->
<!--			</div>-->
<!--			<div class="totalreclame">-->
<!--				--><?php
//
//					$count = db_query('SELECT * FROM {art_revolution} WHERE mail = :mail',
//						array(':mail' => $user->mail))->fetchAll(PDO::FETCH_ASSOC);
//
//					print "<table class='table'>";
//					print "<thead>";
//					print "<tr>";
//					print ('<th>' . t('Display ID') . '</th>');
//					print ('<th>' . t('Business Name') . '</th>');
//					print ('<th>' . t('User ID') . '</th>');
//					print ('<th>' . t('Status') . '</th>');
//					print ('<th>' . t('Preview') . '</th>');
//					print "</tr>";
//					print "</thead>";
//					print "<tbody>";
//					foreach ($count as $result) {
//						print "<tr>";
//						print ("\n" . '<td>' . $result["id"] . '</td>');
//						print ("\n" . '<td>' . $result["name"] . '</td>');
//						print ("\n" . '<td>' . $result["uid"] . '</td>');
//						$status = $result["offline_status"];
//						$account_is_logged_in = (bool)db_query_range
//						(
//							'SELECT 1 FROM {sessions} WHERE uid = :uid AND timestamp > :timestamp',
//							0,
//							1,
//							array
//							(
//								':uid' => $result["uid"],
//								':timestamp' => REQUEST_TIME - (60 * 5),
//							)
//						)->fetchField();
//						if ($account_is_logged_in) {
//							print ("\n" . '<td>' . '<img src="/sites/all/themes/fiora/images/online.png" border=0>' . '</td>');
//						} else if ($status == 1 && $account_is_logged_in == FALSE) {
//							print ("\n" . '<td>' . '<img src="/sites/all/themes/fiora/images/offline.png" border=0>' . '</td>');
//						} else if ($status == 4 && $account_is_logged_in) {
//							print ("\n" . '<td>' . '<img src="/sites/all/themes/fiora/images/offline.png" border=0>' . '</td>');
//						} else {
//							print ("\n" . '<td>' . '<img src="/sites/all/themes/fiora/images/offline.png" border=0>' . '</td>');
//						}
//						print ("\n" . '<td>' . '<a href="/klant/preview?id='.$result["id"].'"><i class="fa fa-search-plus" aria-hidden="true"></i>
//</a>' .'</td>');
//					}
//					print "</tr>";
//					print "</tbody>";
//					print "</table>";
//				?>
<!--			</div>-->
<!--			--><?php //print views_embed_view('upload_space', $display_id = 'block_2') ?>
<!--			<br />-->
<!--		</div>-->
<!---->
<!--		<div class="credits">-->
<!--			<h1 class="colorh1blue">--><?php //print t("Payments") ?><!--</h1><br/>-->
<!---->
<!--			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">-->
<!--				<h3>--><?php //print t("Yearly returning orders") ?><!--</h3>-->
<!--				<p>-->
<!--					--><?php //print t("With the link below you can pay for your yearly returning order") ?><!--<br>-->
<!--					--><?php //print t("We will send 2 mails to remember you about the payment.") ?>
<!--				</p>-->
<!--				<div class="jfactuur">--><?php //echo views_embed_view('klant_betaallinks', $display_id = 'block') ?><!--</div>-->
<!--			</div>-->
<!---->
<!--			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">-->
<!--				<h3>--><?php //print t("Open Orders") ?><!--</h3>-->
<!--				<p>--><?php //print t("These are the order still open for payment") ?><!--</p>-->
<!--				<div class="nbfacturen">--><?php //echo views_embed_view('klant_betaallinks', $display_id = 'block_1') ?><!--</div>-->
<!--			</div>-->
<!---->
<!--			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">-->
<!--				<h3>--><?php //print t("Paid Orders") ?><!--</h3>-->
<!--				<p>--><?php //print t("These are the order paid by you") ?><!--</p>-->
<!--				<div class="nbfacturen">--><?php //echo views_embed_view('betaald', $display_id = 'block') ?><!--</div>-->
<!--			</div>-->
<!---->
<!--		</div>-->
<!--		-->
<!--		-->
<!--		-->
<!---->
<!---->
<!--<!--	<section id="content2">-->-->
<!--<!--		<p>-->-->
<!--<!--			<div class="credits">-->-->
<!--<!--				<h1>-->--><?php ////print t("Payments") ?><!--<!--</h1><br/>-->-->
<!--<!--				-->-->
<!--<!--				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">-->-->
<!--<!--					<h3>-->--><?php ////print t("Yearly returning orders") ?><!--<!--</h3>-->-->
<!--<!--						<p>-->-->
<!--<!--							-->--><?php ////print t("With the link below you can pay for your yearly returning order") ?><!--<!--<br>-->-->
<!--<!--							-->--><?php ////print t("We will send 2 mails to remember you about the payment.") ?>
<!--<!--						</p>-->-->
<!--<!--							<div class="jfactuur">-->--><?php ////echo views_embed_view('klant_betaallinks', $display_id = 'block') ?><!--<!--</div>-->-->
<!--<!--				</div>-->-->
<!--<!--				-->-->
<!--<!--				<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">-->-->
<!--<!--					<h3>-->--><?php ////print t("Open Orders") ?><!--<!--</h3>-->-->
<!--<!--					<p>-->--><?php ////print t("These are the order still open for payment") ?><!--<!--</p>-->-->
<!--<!--				<div class="nbfacturen">-->--><?php ////echo views_embed_view('klant_betaallinks', $display_id = 'block_1') ?><!--<!--</div>-->-->
<!--<!--				</div>-->-->
<!--<!--				-->-->
<!--<!--				<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">-->-->
<!--<!--					<h3>-->--><?php ////print t("Paid Orders") ?><!--<!--</h3>-->-->
<!--<!--					<p>-->--><?php ////print t("These are the order paid by you") ?><!--<!--</p>-->-->
<!--<!--					<div class="nbfacturen">-->--><?php ////echo views_embed_view('betaald', $display_id = 'block') ?><!--<!--</div>-->-->
<!--<!--				</div>-->-->
<!--<!--		-->-->
<!--<!--			</div>-->-->
<!--<!--		</p>-->-->
<!--<!--	</section>-->-->
<!--<!---->-->
<!--<!---->-->
<!--<!--	<section id="content3">-->-->
<!--<!--		<p>-->-->
<!--<!---->-->
<!--<!--			<div class="credits">-->-->
<!--<!--				<h1>-->--><?php ////print t("Your Tools") ?><!--<!--</h1>-->-->
<!--<!--				<br>-->-->
<!--<!---->-->
<!--<!--				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">-->-->
<!--<!--		<p>-->-->
<!--<!--			Jerky jowl pork chop tongue, kielbasa shank venison. Capicola shank-->-->
<!--<!--			pig ribeye leberkas filet mignon-->-->
<!--<!--			brisket beef kevin tenderloin porchetta. Capicola fatback venison-->-->
<!--<!--			shank kielbasa, drumstick ribeye-->-->
<!--<!--			landjaeger beef kevin tail meatball pastrami prosciutto pancetta. Tail-->-->
<!--<!--			kevin spare ribs ground round-->-->
<!--<!--			ham ham hock brisket shoulder. Corned beef tri-tip leberkas flank-->-->
<!--<!--			sausage ham hock filet mignon beef-->-->
<!--<!--			ribs pancetta turkey. </p>-->-->
<!--<!--		</div>-->-->
<!--<!--		</div>-->-->
<!--<!--		</p>-->-->
<!--<!--	</section>-->-->
<!--</main>-->
<!---->
<!--<script>-->
<!--   -->
<!--    jQuery('#menu-action').click(function() {-->
<!--        jQuery('.sidebar').toggleClass('active');-->
<!--        jQuery('.main').toggleClass('active');-->
<!--        jQuery(this).toggleClass('active');-->
<!---->
<!--        if (jQuery('.sidebar').hasClass('active')) {-->
<!--            jQuery(this).find('i').addClass('fa-close');-->
<!--            jQuery(this).find('i').removeClass('fa-bars');-->
<!--        } else {-->
<!--            jQuery(this).find('i').addClass('fa-bars');-->
<!--            jQuery(this).find('i').removeClass('fa-close');-->
<!--        }-->
<!--    });-->
<!---->
<!--    // Add hover feedback on menu-->
<!--    jQuery('#menu-action').hover(function() {-->
<!--        jQuery('.sidebar').toggleClass('hovered');-->
<!--    });-->
<!--</script>-->