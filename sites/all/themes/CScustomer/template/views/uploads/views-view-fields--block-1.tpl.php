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


<div class="progress">
    <div class="progress-bar progress-bar-danger" style="width: <?php print $usedpercentage;?>%;"></div>
    <div class="progress-bar progress-bar-success" style="width: <?php	print $freepercentage; ?>%;"></div>
</div>

<div class="totalUsage">
    <?php
        print $usednice.'/'.$totalnice . t(" used from your cloud space");
    ?>
</div>