<script src="/sites/all/modules/art_revolution/js/bootstrap.min.js">
 jQuery(document).ready(function ($) {
        $('[data-toggle="tooltip"]').tooltip({
            trigger : 'hover'
        });
    })

</script>



<?php
	global $user;
	$administrator = array_intersect(array('administrator', 'mod'), array_values($user->roles));
?>


<div id="page-wrapper" class="<?php if (!$administrator) { print 'hiddenclass'; } ?>">
	<div id="page">


		<?php if ($main_menu || $secondary_menu): ?>
			<div id="navigation"><div class="section">
					<?php print theme('links__system_main_menu', array('links' => $main_menu, 'attributes' => array('id' => 'main-menu', 'class' => array('links', 'inline', 'clearfix')), 'heading' => t('Main menu'))); ?>
					<?php print theme('links__system_secondary_menu', array('links' => $secondary_menu, 'attributes' => array('id' => 'secondary-menu', 'class' => array('links', 'inline', 'clearfix')), 'heading' => t('Secondary menu'))); ?>
				</div></div> <!-- /.section, /#navigation -->
		<?php endif; ?>

		<?php if ($breadcrumb && $user->uid == 1): ?>
			<div id="breadcrumb"><?php print $breadcrumb; ?></div>
		<?php endif; ?>

		<?php print $messages; ?>

		<div id="main-wrapper"><div id="main" class="clearfix">

				<div id="content" class="column"><div class="section">
						<?php if ($page['highlighted']): ?><div id="highlighted"><?php print render($page['highlighted']); ?></div><?php endif; ?>
						<a id="main-content"></a>
						<?php print render($title_prefix); ?>
						<?php if ($title ): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
						<?php print render($title_suffix); ?>
						<?php if ($tabcontent = render($tabs)): ?><div class="tabs"><?php print $tabcontent; ?></div><?php endif; ?>
						<?php print render($page['help']); ?>
						<?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>

						<form method="post">
							<br class="hidden-lg">
							<select id="Serve_by_Year" name="Serve_by_Year" value="<?php echo htmlspecialchars($_POST['Serve_by_Year']); ?>">
								<option value=""><?php echo t('Choose a Year'); ?></option>
								<?php
									for($i = date('Y'); $i >= date('Y')-10; $i--){?>
										<option value="<?=$i?>"><?=$i?></option>
									<?php }
								?>
							</select>
							<input type="submit" name="submit-form"/>
						</form>

						<?php


							$this_year = $_POST['Serve_by_Year'];
							// Add 1 to the variable
							$next_year = $this_year + 1;


//							$verkoop = db_select('uc_orders','n')
//								->fields('n',array('order_total'))
//								->condition('modified', array(strtotime($this_year.'-01-01'), strtotime($next_year.'-01-01')), 'BETWEEN');
//							$alias = $verkoop->addExpression('sum(order_total)', 'totalverkoop');
//							$points = $verkoop->execute()->fetchAssoc();
//							$verkoopvalue = $points['totalverkoop'];

							$verkoop = db_select('field_data_field_v_prijs_inclusief','n')
								->fields('n',array('field_v_prijs_inclusief_value'))
								->condition('date', array(date($this_year.'-01-01'), date($next_year.'-01-01')), 'BETWEEN');
							$alias = $verkoop->addExpression('sum(field_v_prijs_inclusief_value)', 'totalverkoop');
							$points = $verkoop->execute()->fetchAssoc();
              $verkoopvalue = $points['totalverkoop'];
              //print_r($verkoopvalue);

							$inkoop = db_select('field_data_field_prijs_inclusief','i')
								->fields('i',array('field_prijs_inclusief_value'))
								->condition('datum', array(date($this_year.'-01-01'), date($next_year.'-01-01')), 'BETWEEN');
							$alias1 = $inkoop->addExpression('sum(field_prijs_inclusief_value)', 'totalinkoop');
							$points1 = $inkoop->execute()->fetchAssoc();
							$inkoopvalue = $points1['totalinkoop'];


							$percentage75 = 75;
							$percentage10 = 10;
							$percentage5 = 5;

							$totalprofit = $verkoopvalue - $inkoopvalue;

							$new_total75 = ($percentage75 / 100) * $totalprofit;
							$new_total10 = ($percentage10 / 100) * $totalprofit;
							$new_total5 = ($percentage5 / 100) * $totalprofit;

							$btw = 21;
							$vatDivisor = 1 + ($btw / 100);

							$pricetotal = $totalprofit;
							$priceBeforeVattotal = $pricetotal / $vatDivisor;
							$vatAmounttotal = $pricetotal - $priceBeforeVattotal;

							$price75 = $new_total75;
							$priceBeforeVat75 = $price75 / $vatDivisor;
							$vatAmount75 = $price75 - $priceBeforeVat75;

							$price10 = $new_total10;
							$priceBeforeVat10 = $price10 / $vatDivisor;
							$vatAmount10 = $price10 - $priceBeforeVat10;

							$price5 = $new_total5;
							$priceBeforeVat5 = $price5 / $vatDivisor;
							$vatAmount5 = $price5 - $priceBeforeVat5;



							?>


						<?php print '<h1>' . $this_year . '</h1>'; ?>
						<table style="width: 100%;" border="1">
							<tbody>
							<tr>
								<td class="tdred">Verkoop</td>
								<td class="tdgreen">Inkoop</td>
								<td class="tdblue">Winst excl. BTW</td>
								<td class="tdorange">Winst Inclusief BTW</td>
								<td class="tdyello">Btw (21%)</td>
							</tr>
							<tr>
								<td class="tdred"><?php print '<h3><span class="green">€' . number_format((float)$verkoopvalue, 2, '.', '') . '</span></h3>'; ?></td>
								<td class="tdgreen"><?php print '<h3><span class="red">€' . number_format((float)$inkoopvalue, 2, '.', '') . '</span></h3>'; ?></td>
								<td class="tdblue"><?php print '<h3>€' . number_format((float)$pricetotal, 2, '.', '') . '</h3>'; ?></td>
								<td class="tdorange"><?php print '<h3>€' . number_format((float)$priceBeforeVattotal, 2, '.', '') . '</h3>'; ?></td>
								<td class="tdyello"><?php print '<h3>€' . number_format((float)$vatAmounttotal, 2, '.', '') . '</h3>'; ?></td>
							</tr>
							</tbody>
						</table>


						<table style="width: 100%;" border="1">
							<tbody>
							<tr>
								<td></td>
								<td>Jeroen</td>
								<td>Erwin</td>
								<td>Jordy</td>
								<td>Overig</td>
							</tr>
							<tr>
								<td>Winst Inclusief BTW</td>
								<td>€<?php print number_format((float)$new_total75, 2, '.', ''); ?></td>
								<td>€<?php print number_format((float)$new_total10, 2, '.', ''); ?></td>
								<td>€<?php print number_format((float)$new_total10, 2, '.', ''); ?></td>
								<td>€<?php print number_format((float)$new_total5, 2, '.', ''); ?></td>
							</tr>
							<tr>
								<td>Winst Exclusief BTW</td>
								<td>€<?php print number_format((float)$priceBeforeVat75, 2, '.', ''); ?></td>
								<td>€<?php print number_format((float)$priceBeforeVat10, 2, '.', ''); ?></td>
								<td>€<?php print number_format((float)$priceBeforeVat10, 2, '.', ''); ?></td>
								<td>€<?php print number_format((float)$priceBeforeVat5, 2, '.', ''); ?></td>
							</tr>
							<tr>
								<td>BTW (21%)</td>
								<td>€<?php print number_format((float)$vatAmount75, 2, '.', ''); ?></td>
								<td>€<?php print number_format((float)$vatAmount10, 2, '.', ''); ?></td>
								<td>€<?php print number_format((float)$vatAmount10, 2, '.', ''); ?></td>
								<td>€<?php print number_format((float)$vatAmount5, 2, '.', ''); ?></td>
							</tr>
							</tbody>
						</table>


						<?php print $feed_icons; ?>
					</div></div> <!-- /.section, /#content -->

				<?php if ($page['sidebar_first']): ?>
					<div id="sidebar-first" class="column sidebar"><div class="section">
							<?php print render($page['sidebar_first']); ?>
						</div></div> <!-- /.section, /#sidebar-first -->
				<?php endif; ?>

				<?php if ($page['sidebar_second']): ?>
					<div id="sidebar-second" class="column sidebar"><div class="section">
							<?php print render($page['sidebar_second']); ?>
						</div></div> <!-- /.section, /#sidebar-second -->
				<?php endif; ?>

			</div></div> <!-- /#main, /#main-wrapper -->

		<div id="footer"><div class="section">
				<?php print render($page['footer']); ?>
			</div></div> <!-- /.section, /#footer -->

	</div></div> <!-- /#page, /#page-wrapper -->
