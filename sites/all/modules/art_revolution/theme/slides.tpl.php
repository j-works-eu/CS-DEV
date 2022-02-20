<div<?php print $attributes;?>>
<div class="tp-banner" style="display:none; max-height:<?php print $settings->startheight;?>px; height:<?php print $settings->startheight;?>px;">
<ul>
<?php print $content;?>
</ul>
<?php if($settings->timer):?>
<div class="tp-bannertimer tp-<?php print $settings->timer;?>"></div>
<?php endif;?>
</div>
</div>
<?php
$slidesetting = new stdClass();

//Global Settings
if(isset($settings->delay) && !empty($settings->delay)) {
	$slidesetting->delay = $settings->delay;
}
if(isset($settings->startheight) && !empty($settings->startheight)) {
	$slidesetting->startheight = $settings->startheight;
}
if(isset($settings->startwidth) && !empty($settings->startwidth)) {
	$slidesetting->startwidth = $settings->startwidth;
}

//Navigation Settings
if(isset($settings->keyboardNavigation) && !empty($settings->keyboardNavigation)) {
	$slidesetting->keyboardNavigation = $settings->keyboardNavigation;
}
if(isset($settings->onHoverStop) && !empty($settings->onHoverStop)) {
	$slidesetting->onHoverStop = $settings->onHoverStop;
}
if(isset($settings->thumbWidth) && !empty($settings->thumbWidth)) {
	$slidesetting->thumbWidth = $settings->thumbWidth;
}
if(isset($settings->thumbHeight) && !empty($settings->thumbHeight)) {
	$slidesetting->thumbHeight = $settings->thumbHeight;
}
if(isset($settings->thumbAmount) && !empty($settings->thumbAmount)) {
	$slidesetting->thumbAmount = $settings->thumbAmount;
}
if(isset($settings->hideThumbs) && !empty($settings->hideThumbs)) {
	$slidesetting->hideThumbs = $settings->hideThumbs;
}
if(isset($settings->navigationType) && !empty($settings->navigationType)) {
	$slidesetting->navigationType = $settings->navigationType;
}
if(isset($settings->navigationArrows) && !empty($settings->navigationArrows)) {
	$slidesetting->navigationArrows = $settings->navigationArrows;
}
if(isset($settings->navigationStyle) && !empty($settings->navigationStyle)) {
	$slidesetting->navigationStyle = $settings->navigationStyle;
}
if(isset($settings->navigationHAlign) && !empty($settings->navigationHAlign)) {
	$slidesetting->navigationHAlign = $settings->navigationHAlign;
}
if(isset($settings->navigationVAlign) && !empty($settings->navigationVAlign)) {
	$slidesetting->navigationVAlign = $settings->navigationVAlign;
}
if(isset($settings->navigationHOffset) && !empty($settings->navigationHOffset)) {
	$slidesetting->navigationHOffset = $settings->navigationHOffset;
}
if(isset($settings->navigationVOffset) && !empty($settings->navigationVOffset)) {
	$slidesetting->navigationVOffset = $settings->navigationVOffset;
}
if(isset($settings->touchenabled) && !empty($settings->touchenabled)) {
	$slidesetting->touchenabled = $settings->touchenabled;
}
if(isset($settings->swipe_velocity) && !empty($settings->swipe_velocity)) {
	$slidesetting->swipe_velocity = $settings->swipe_velocity;
}
if(isset($settings->swipe_max_touches) && !empty($settings->swipe_max_touches)) {
	$slidesetting->swipe_max_touches = $settings->swipe_max_touches;
}
if(isset($settings->swipe_min_touches) && !empty($settings->swipe_min_touches)) {
	$slidesetting->swipe_min_touches = $settings->swipe_min_touches;
}
if(isset($settings->drag_block_vertical) && !empty($settings->drag_block_vertical)) {
	$slidesetting->drag_block_vertical = $settings->drag_block_vertical;
}

// Loops
if(isset($settings->stopAtSlide) && !empty($settings->stopAtSlide)) {
	$slidesetting->stopAtSlide = $settings->stopAtSlide;
}
if(isset($settings->stopAfterLoops) && !empty($settings->stopAfterLoops)) {
	$slidesetting->stopAfterLoops = $settings->stopAfterLoops;
}

//Mobile Visibility
if(isset($settings->hideCaptionAtLimit) && !empty($settings->hideCaptionAtLimit)) {
	$slidesetting->hideCaptionAtLimit = $settings->hideCaptionAtLimit;
}
if(isset($settings->hideAllCaptionAtLimit) && !empty($settings->hideAllCaptionAtLimit)) {
	$slidesetting->hideAllCaptionAtLimit = $settings->hideAllCaptionAtLimit;
}
if(isset($settings->hideSliderAtLimit) && !empty($settings->hideSliderAtLimit)) {
	$slidesetting->hideSliderAtLimit = $settings->hideSliderAtLimit;
}
if(isset($settings->hideNavDelayOnMobile) && !empty($settings->hideNavDelayOnMobile)) {
	$slidesetting->hideNavDelayOnMobile = $settings->hideNavDelayOnMobile;
}
if(isset($settings->hideThumbsOnMobile) && !empty($settings->hideThumbsOnMobile)) {
	$slidesetting->hideThumbsOnMobile = $settings->hideThumbsOnMobile;
}
if(isset($settings->hideBulletsOnMobile) && !empty($settings->hideBulletsOnMobile)) {
	$slidesetting->hideBulletsOnMobile = $settings->hideBulletsOnMobile;
}
if(isset($settings->hideArrowsOnMobile) && !empty($settings->hideArrowsOnMobile)) {
	$slidesetting->hideArrowsOnMobile = $settings->hideArrowsOnMobile;
}
if(isset($settings->hideThumbsUnderResoluition) && !empty($settings->hideThumbsUnderResoluition)) {
	$slidesetting->hideThumbsUnderResoluition = $settings->hideThumbsUnderResoluition;
}


//Layout Styles
if(isset($settings->hideTimerBar) && !empty($settings->hideTimerBar)) {
	$slidesetting->hideTimerBar = $settings->hideTimerBar;
}
if(isset($settings->fullWidth) && !empty($settings->fullWidth)) {
	$slidesetting->fullWidth = $settings->fullWidth;
}
if(isset($settings->autoHeight) && !empty($settings->autoHeight)) {
	$slidesetting->autoHeight = $settings->autoHeight;
}
if(isset($settings->fullScreenAlignForce) && !empty($settings->fullScreenAlignForce)) {
	$slidesetting->fullScreenAlignForce = $settings->fullScreenAlignForce;
}
if(isset($settings->forceFullWidth) && !empty($settings->forceFullWidth)) {
	$slidesetting->forceFullWidth = $settings->forceFullWidth;
}
if(isset($settings->fullScreen) && !empty($settings->fullScreen)) {
	$slidesetting->fullScreen = $settings->fullScreen;
}
if(isset($settings->fullScreenOffsetContainer) && !empty($settings->fullScreenOffsetContainer)) {
	$slidesetting->fullScreenOffsetContainer = $settings->fullScreenOffsetContainer;
}
if(isset($settings->shadow) && !empty($settings->shadow)) {
	$slidesetting->shadow = $settings->shadow;
}
if(isset($settings->dottedOverlay) && !empty($settings->dottedOverlay)) {
	$slidesetting->dottedOverlay = $settings->dottedOverlay;
}

$slidesetting->soloArrowLeftHalign = "left"; //not done
$slidesetting->soloArrowLeftValign = "center"; //not done
$slidesetting->soloArrowLeftHOffset = 0; //not done
$slidesetting->soloArrowLeftVOffset = 0; //not done
$slidesetting->soloArrowRightHalign = "right"; //not done
$slidesetting->soloArrowRightValign = "center"; //not done
$slidesetting->soloArrowRightHOffset = 0; //not done
$slidesetting->soloArrowRightVOffset = 0; //not done
$slidesetting->lazyLoad = 'on';
if($settings->timer) {
	$slidesetting->timer =$settings->timer;
}
$slidesetting->shuffle = 'off';
if($settings->dottedOverlay) {
	$slidesetting->dottedOverlay = $settings->dottedOverlay;
}
$slidesetting = json_encode($slidesetting);
$js = "jQuery(document).ready(function($){if($.fn.cssOriginal!=undefined)$.fn.css = $.fn.cssOriginal;jQuery('#{$id} .tp-banner').show().revolution({$slidesetting});})";
?>
<script type="text/javascript">
// <!--//--><![CDATA[//><!--
<?php print $js; ?>
//--><!]]>
</script>
