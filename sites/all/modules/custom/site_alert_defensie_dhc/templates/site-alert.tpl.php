<?php
/**
 * @file
 * site-alert.tpl.php
 */
?>
<div class="<?php print $level; ?>">
  <div class="text">
	  
	  <div class="heartbeat <?php print $level; ?>iconstatus">
		  <i class="fas fa-exclamation-triangle"></i>
	  </div>

	  <div class="title">
	  <?php print $alerttitle; ?>
	  </div>
	  
	  <div class="message">
    <?php print $alert;?>
	  </div>
	  
  </div>
</div>