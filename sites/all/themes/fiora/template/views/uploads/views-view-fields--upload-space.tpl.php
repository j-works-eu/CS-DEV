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
	
	function theme_imce_user_page($variables) {
		$options = array();
		return '<iframe src="' . url('imce', $options) . '" frameborder="0" style="width: 100%; height: 820px" class="imce-frame"></iframe>';
	}

?>

<div class="container">
	<h1 id="responsive-utilities" class="page-header"><?php print t("File Manager "); ?></h1>
	
	
	
<!--	<div class="progress">-->
<!--		<div class="progress-bar progress-bar-danger" style="width: --><?php //print $usedpercentage;?>
	<!--		<span ><?php //print $usedpercentage . "% ";?><!----><?php //print t("used"); ?><!--</span>-->
<!--		</div>-->
<!--		<div class="progress-bar progress-bar-success" style="width: --><?php	//print $freepercentage; ?>
	<!--		<span ><?php	//print $freepercentage. "% "; ?><!----><?php //print t("free"); ?><!--</span>-->
<!--		</div>-->
<!--	</div>-->
	<div class="spacetab">
		<?php
			print t("Total Space: ");
			print  '<span class="spacetotalcolor">';
			print $totalnice;
			print "</span>";
		?> |
		
		<?php
			print t("Used Space: ");
			print  '<span class="spaceusedcolor">';
			print $usednice;
			print "</span>";
		?> |
		
		<?php print t("Space Left: ");
			print  '<span class="spaceovercolor">';
			print formatBytes($free);
			print "</span>";
		?>
		
	</div>

	<div><?php print theme_imce_user_page($variables); ?></div>
</div>
	