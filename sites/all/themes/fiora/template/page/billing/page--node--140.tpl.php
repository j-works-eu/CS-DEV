<div class="billing">
	<h1 class="colorh1blue"><?php print t("Billing") ?></h1><br/>

	<div class="col-md-4">
		<div class="jfactuurmain">
		<h3><?php print t("Yearly returning orders") ?></h3>
		<p class="pcolor">
			<?php print t("With the link below you can pay for your yearly returning order") ?><br>
<!--			--><?php //print t("We will send 2 mails to remember you about the payment.") ?>
		</p>
		<div class="jfactuur"><?php echo views_embed_view('klant_betaallinks', $display_id = 'block') ?></div>
		</div>
	</div>

	<div class="col-md-4">
		<div class="nbfacturenmain">
		<h3><?php print t("Open Orders") ?></h3>
			<p class="pcolor"><?php print t("These are the order still open for payment") ?></p>
			<div class="nbfactuur"><?php echo views_embed_view('klant_betaallinks', $display_id = 'block_2') ?></div>
		</div>
	</div>

	<div class="col-md-4">
		<div class="nbfacturenmain">
		<h3><?php print t("Paid Orders") ?></h3>
			<p class="pcolor"><?php print t("These are the order paid by you") ?></p>
		<div class="nbfacturen"><?php echo views_embed_view('betaald', $display_id = 'block') ?></div>
		</div>
	</div>

</div>

