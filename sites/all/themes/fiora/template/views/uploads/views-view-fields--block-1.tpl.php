<?php
	$total = $fields["quota_limit"]->content;
	$used =  $fields["quota_used"]->content;
	$free = ($total - $used);
	$totalnice = $fields["quota_limit_1"]->content;
	$usednice =  $fields["quota_used_1"]->content;
	$usedpercentage =  number_format(($used/$total),4)*100;
	$freepercentage =  number_format((100 - $usedpercentage),2);

	function formatBytes($size, $precision = 2)
	{
		$base = log($size, 1024);
		$suffixes = array('', 'Kb', 'MB', 'GB', 'TB');

		return round(pow(1024, $base - floor($base)), $precision) . ' '. $suffixes[floor($base)];
	}

?>

<div class="container">
	<div class="spacetab">
		<?php
			print  '<div class="sizeblockdivo">';
			print  '<span class="textsizeinfo">';
			print t("Totale space:");
			print "</span>";
			print  '<span class="spacetotalcolor">';
			print $totalnice;
			print "</span>";
			print "</div>";
		?>

		<?php
			print  '<div class="sizeblockdivo">';
			print  '<span class="textsizeinfo">';
			print t("Used space:");
			print "</span>";
			print  '<span class="spaceusedcolor">';
			print $usednice;
			print "</span>";
			print "</div>";
		?>

		<?php
			print  '<div class="sizeblockdivo">';
			print  '<span class="textsizeinfo">';
			print t("Free space:");
			print "</span>";
			print  '<span class="spaceovercolor">';
			if ($free <= 0) {
				print '0';
			}
			else {
				print formatBytes($free);
			}
			print "</span>";
			print "</div>";
		?>

	</div>
</div>
