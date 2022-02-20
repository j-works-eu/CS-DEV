<input type="hidden" name="sid" value="<?php print arg(2); ?>"/>
<div id="art_revolution">
    <div id="globalsettings">
        <fieldset id="global-settings" class="form-wrapper">
			<legend><span class="fieldset-legend"><div class="minus"></div><h3 class="options_heading">Global Settings</h3></span></legend>
            <div class="fieldset-wrapper">
				<div class="form-global-setting-item">
					<label>delay</label>
					<input name="delay" class="form-text global-settings" value="9000"/>
					<div class="description">The time one slide stays on the screen in Milliseconds. Global Setting. You can set per Slide extra local delay time via the data-delay in the "li" element (Default: 9000)</div>
				</div>

        <div class="form-global-setting-item">
                <label>Screen angle</label>
                <select name="startposition" class="form-select global-settings">
                  <option value="horizontal">Horizontaal</option>
                  <option value="vertical">Verticaal</option>
                </select>
        </div>

				<div class="form-global-setting-item">
					<label>Scherm width</label>
          <input name="startwidth" class="form-text global-settings"/>
				</div>

				<div class="form-global-setting-item">
					<label>Scherm height</label>
					<input name="startheight" class="form-text global-settings"/>
					<div class="description">This Height of the Grid where the Captions are displayed in Pixel. This Height is the Max height of Slider in Fullwidth Layout and in Responsive Layout.  In Fullscreen Layout the Gird will be centered Vertically in case the Slider is higher then this value.</div>
				</div>


				<div class="form-global-setting-item">
					<label>TV resolutie width</label>
					<input name="schermwidth" class="form-text global-settings"/>
					<div class="description">This Height of the Grid where the Captions are displayed in Pixel. This Height is the Max height of Slider in Fullwidth Layout and in Responsive Layout.  In Fullscreen Layout the Gird will be centered Vertically in case the Slider is higher then this value.</div>
				</div>

				<div class="form-global-setting-item">
					<label>TV resolutie height</label>
					<input name="schermheight" class="form-text global-settings"/>
					<div class="description">This Height of the Grid where the Captions are displayed in Pixel. This Height is the Max height of Slider in Fullwidth Layout and in Responsive Layout.  In Fullscreen Layout the Gird will be centered Vertically in case the Slider is higher then this value.</div>
				</div>


            </div>
        </fieldset>
        <fieldset id="navigation-settings" class="form-wrapper">
			<legend><span class="fieldset-legend"><div class="plus"></div><h3 class="options_heading">Navigation Settings</h3></span></legend>
            <div class="fieldset-wrapper">
				<div class="form-global-setting-item">
					<label>keyboardNavigation</label>
					<select name="keyboardNavigation" class="form-select global-settings">
						<option value="on">On</option>
						<option value="off">Off</option>
					</select>
					<div class="description">Possible Values: "on", "off" - Allows to use the Left/Right Arrow for Keyboard navigation when Slider is in Focus.</div>
				</div>
				<div class="form-global-setting-item">
					<label>onHoverStop</label>
					<select name="onHoverStop" class="form-select global-settings">
						<option value="on">On</option>
						<option value="off">Off</option>
					</select>
					<div class="description">Possible Values: "on", "off" - Stop the Timer if mouse is hovering the Slider.  Caption animations are not stopped !! They will just play to the end.</div>
				</div>
				<div class="form-global-setting-item">
					<div class="item">
						<label>thumbWidth</label>
						<input name="thumbWidth" class="form-text global-settings"/>
					</div>

					<div class="item">
						<label>thumbHeight</label>
						<input name="thumbHeight" class="form-text global-settings"/>
					</div>
					<div class="description">The width and height of the thumbs in pixel. Thumbs are not responsive from basic. For Responsive Thumbs you will need to create media qury based thumb sizes.</div>
				</div>
				<div class="form-global-setting-item">
					<label>thumbAmount</label>
					<input name="thumbAmount" class="form-text global-settings"/>
					<div class="description">The Amount of visible Thumbs in the same time.  The rest of the thumbs are only visible on hover, or at slide change.</div>
				</div>
				<div class="form-global-setting-item">
					<label>hideThumbs</label>
					<input name="hideThumbs" class="form-text global-settings"/>
					<div class="description">0 - Never hide Thumbs.  1000- 100000 (ms) hide thumbs and navigation arrows, bullets after the predefined ms  (1000ms == 1 sec,  1500 == 1,5 sec etc..)</div>
				</div>
				<div class="form-global-setting-item">
					<label>navigationType</label>
					<select name="navigationType" class="form-select global-settings">
						<option value="none">none</option>
						<option value="bullet">bullet</option>
						<option value="thumb">thumb</option>
					</select>
					<div class="description">Display type of the navigation bar (Default:"none"). Possible values are: "bullet", "thumb", "none".</div>
				</div>
				<div class="form-global-setting-item">
					<label>navigationArrows</label>
					<select name="navigationArrows" class="form-select global-settings">
						<option value="verticalcentered">verticalcentered</option>
						<option value="nexttobullets">nexttobullets</option>
						<option value="solo">solo</option>
					</select>
					<div class="description">Display position of the Navigation Arrows (Default: "nexttobullets"): Nexttobullets - arrows added next to the bullets left and right. Solo - arrows can be independent positioned, see further options</div>
				</div>
				<div class="form-global-setting-item">
					<label>navigationStyle</label>
					<select name="navigationStyle" class="form-select global-settings">
						<option value="round">round</option>
						<option value="square">square</option>
						<option value="round-old">round-old</option>
						<option value="square-old">square-old</option>
						<option value="navbar-old">navbar-old</option>
					</select>
					<div class="description">Look of the navigation bullets if navigationType "bullet" selected. Possible values: "round", "square", "round-old", "square-old", "navbar-old"</div>
				</div>
				<div class="form-global-setting-item">
					<div class="item">
						<label>navigationHAlign</label>
						<select name="navigationHAlign" class="form-select global-settings">
							<option value="left">Left</option>
							<option value="center">Center</option>
							<option value="right">Right</option>
						</select>
					</div>

					<div class="item">
						<label>navigationVAlign</label>
						<select name="navigationVAlign" class="form-select global-settings">
							<option value="top">Top</option>
							<option value="center">Center</option>
							<option value="bottom">Bottom</option>
						</select>
					</div>
					<div class="description">Vertical and Horizontal Align of the Navigation bullets / thumbs (depending on which Style has been selected).  Possible values navigationHAlign: "left","center","right"  and naigationVAlign: "top","center","bottom"</div>
				</div>
				<div class="form-global-setting-item">
					<div class="item">
						<label>navigationHOffset</label>
						<input name="navigationHOffset" class="form-text global-settings"/>
					</div>

					<div class="item">
						<label>navigationVOffset</label>
						<input name="navigationVOffset" class="form-text global-settings"/>
					</div>
					<div class="description">The Offset position of the navigation depending on the aligned position.  from -1000 to +1000 any value in px.   i.e. -30 </div>
				</div>
				<div class="form-global-setting-item">
					<label>touchenabled</label>
					<select name="touchenabled" class="form-select global-settings">
						<option value="on">On</option>
						<option value="off">Off</option>
					</select>
					<div class="description">Enable Swipe Function on touch devices (Default: "on"). Possible values: "on", "off".</div>
				</div>
				<div class="form-global-setting-item">
					<label>swipe_velocity</label>
					<input name="swipe_velocity" class="form-text global-settings" value="0.7"/>
					<div class="description">The Sensibility of Swipe Gesture (lower is more sensible) (Default: 0.7). Possible values: 0 - 1</div>
				</div>
				<div class="form-global-setting-item">
					<label>swipe_max_touches</label>
					<input name="swipe_max_touches" class="form-text global-settings" value="1"/>
					<div class="description">Max Amount of Fingers to touch (Default: 1). Possible values: 1 - 5 </div>
				</div>
				<div class="form-global-setting-item">
					<label>swipe_min_touches</label>
					<input name="swipe_min_touches" class="form-text global-settings" value="1"/>
					<div class="description">Min Amount of Fingers to touch (Default: 1). Possible values: 1 - 5</div>
				</div>
				<div class="form-global-setting-item">
					<label>drag_block_vertical</label>
					<select name="drag_block_vertical" class="form-select global-settings">
						<option value="false">false</option>
						<option value="true">true</option>
					</select>
					<div class="description">Prevent Vertical Scroll on Drag (Default: false). Possible values: true, false</div>
				</div>
			</div>
        </fieldset>
		<fieldset id="loops" class="form-wrapper">
			<legend><span class="fieldset-legend"><div class="plus"></div><h3 class="options_heading">Loops</h3></span></legend>
            <div class="fieldset-wrapper">
				<div class="form-global-setting-item">
					<label>stopAtSlide</label>
					<input name="stopAtSlide" class="form-text global-settings" value="1"/>
					<div class="description">Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.</div>
				</div>
				<div class="form-global-setting-item">
					<label>stopAfterLoops</label>
					<input name="stopAfterLoops" class="form-text global-settings" value="1"/>
					<div class="description">Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic</div>
				</div>
            </div>
		</fieldset>
		<fieldset id="mobile-visibility" class="form-wrapper">
			<legend><span class="fieldset-legend"><div class="plus"></div><h3 class="options_heading">Mobile Visibility</h3></span></legend>
            <div class="fieldset-wrapper">
				<div class="form-global-setting-item">
					<label>hideCaptionAtLimit</label>
					<input name="hideCaptionAtLimit" class="form-text global-settings" value="1"/>
					<div class="description">It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)</div>
				</div>
				<div class="form-global-setting-item">
					<label>hideAllCaptionAtLimit</label>
					<input name="hideAllCaptionAtLimit" class="form-text global-settings" value="1"/>
					<div class="description">Hide all The Captions if Width of Browser is less then this value</div>
				</div>
				<div class="form-global-setting-item">
					<label>hideSliderAtLimit</label>
					<input name="hideSliderAtLimit" class="form-text global-settings" value="1"/>
					<div class="description">Hide the whole slider, and stop also functions if Width of Browser is less than this value</div>
				</div>
				<div class="form-global-setting-item">
					<label>hideNavDelayOnMobile</label>
					<input name="hideNavDelayOnMobile" class="form-text global-settings" value="1"/>
					<div class="description">Hide all navigation after a while on Mobile (touch and release events based)</div>
				</div>
				<div class="form-global-setting-item">
					<label>hideThumbsOnMobile</label>
					<select name="hideThumbsOnMobile" class="form-select global-settings">
						<option value="on">On</option>
						<option value="off">Off</option>
					</select>
					<div class="description">Possible Values: "on", "off"  - if set to "on", Thumbs are not shown on Mobile Devices</div>
				</div>
				<div class="form-global-setting-item">
					<label>hideBulletsOnMobile</label>
					<select name="hideBulletsOnMobile" class="form-select global-settings">
						<option value="on">On</option>
						<option value="off">Off</option>
					</select>
					<div class="description">Possible Values: "on", "off"  - if set to "on", Bullets are not shown on Mobile Devices</div>
				</div>
				<div class="form-global-setting-item">
					<label>hideArrowsOnMobile</label>
					<select name="hideArrowsOnMobile" class="form-select global-settings">
						<option value="on">On</option>
						<option value="off">Off</option>
					</select>
					<div class="description">Possible Values: "on", "off"  - if set to "on", Arrows are not shown on Mobile Devices</div>
				</div>
				<div class="form-global-setting-item">
					<label>hideThumbsUnderResoluition</label>
					<input name="hideThumbsUnderResoluition" class="form-text global-settings" value="1"/>
					<div class="description">Possible Values: 0 - 1900 - defines under which resolution the Thumbs should be hidden. (only if hideThumbonMobile set to off)</div>
				</div>
            </div>
		</fieldset>
        <fieldset id="layout-styles" class="form-wrapper">
			<legend><span class="fieldset-legend"><div class="plus"></div><h3 class="options_heading">Layout Styles</h3></span></legend>
            <div class="fieldset-wrapper">
				<div class="form-global-setting-item">
					<label>hideTimerBar</label>
					<select name="hideTimerBar" class="form-select global-settings">
						<option value="on">On</option>
						<option value="off">Off</option>
					</select>
					<div class="description">Possible Values: "on" , "off" - it will hide or show the banner timer</div>
				</div>
				<div class="form-global-setting-item">
					<label>fullWidth</label>
					<select name="fullWidth" class="form-select global-settings">
						<option value="on">On</option>
						<option value="off">Off</option>
					</select>
					<div class="description">Possible Values: "on", "off"  - defines if the fullwidth/autoresponsive mode is activated</div>
				</div>
				<div class="form-global-setting-item">
					<label>autoHeight</label>
					<select name="autoHeight" class="form-select global-settings">
						<option value="on">On</option>
						<option value="off">Off</option>
					</select>
					<div class="description">Possible Values: "on", "off"  - defines if in fullwidth mode the height of the Slider proportional always can grow. If it is set to "off" the max height is == startheight</div>
				</div>
				<div class="form-global-setting-item">
					<label>fullScreenAlignForce</label>
					<select name="fullScreenAlignForce" class="form-select global-settings">
						<option value="on">On</option>
						<option value="off">Off</option>
					</select>
					<div class="description">Possible Values: "on", "off"  - Allowed only in FullScreen Mode. It lets the Caption Grid to be the full screen, means all position should happen with aligns and offsets. This allow you to use the faresst corner of the slider to present any caption there.</div>
				</div>
				<div class="form-global-setting-item">
					<label>forceFullWidth</label>
					<select name="forceFullWidth" class="form-select global-settings">
						<option value="on">On</option>
						<option value="off">Off</option>
					</select>
					<div class="description">Possible Values: "on", "off"  - Force the FullWidth Size even if the slider embeded in a boxed container. It can provide higher Performance usage on CPU. Try first set it to "off" and use fullwidth container instead of using this option.</div>
				</div>
				<div class="form-global-setting-item">
					<label>fullScreen</label>
					<select name="fullScreen" class="form-select global-settings">
						<option value="on">On</option>
						<option value="off">Off</option>
					</select>
					<div class="description">Possible Values: "on", "off"  - defines if the fullscreen mode is activated</div>
				</div>
				<div class="form-global-setting-item">
					<label>fullScreenOffsetContainer</label>
					<input name="fullScreenOffsetContainer" class="form-text global-settings"/>
					<div class="description">The value is a Container ID or Class i.e. "#topheader"  - The Height of Fullheight will be increased with this Container height !</div>
				</div>
				<div class="form-global-setting-item">
					<label>shadow</label>
					<input name="shadow" class="form-text global-settings"/>
					<div class="description">Possible values: 0,1,2,3  (0 == no Shadow, 1,2,3 - Different Shadow Types)</div>
				</div>
				<div class="form-global-setting-item">
					<label>dottedOverlay</label>
					<select name="dottedOverlay" class="form-select global-settings">
						<option value="none">none</option>
						<option value="twoxtwo">twoxtwo</option>
						<option value="threexthree">threexthree</option>
						<option value="twoxtwowhite">twoxtwowhite</option>
						<option value="threexthreewhite">threexthreewhite</option>
					</select>
					<div class="description">Possible Values: "none", "twoxtwo", "threexthree", "twoxtwowhite", "threexthreewhite" - Creates a Dotted Overlay for the Background images extra. Best use for FullScreen / fullwidth sliders, where images are too pixaleted.</div>
				</div>
			</div>
        </fieldset>
    </div>
</div>
<div>
    <input type="button" id="save" class="form-submit" value="Save"/>
<!--    <input type="button" id="save2" class="form-submit" value="Save & Continue"/>-->

</div>
<script>
//jQuery(document).ready(function ($) {
//	$("#global-settings .fieldset-wrapper").show();
//	$("#global-settings .fieldset-legend").click(function(){
//		$("#global-settings .fieldset-wrapper").slideToggle("slow");
//		$(this).toggleClass("active");
//		$('#global-settings .minus').toggleClass('plus hide');
//	});
//
//	$("#navigation-settings .fieldset-wrapper").hide();
//	$("#navigation-settings .fieldset-legend").click(function(){
//		$("#navigation-settings .fieldset-wrapper").slideToggle("slow");
//		$(this).toggleClass("active");
//		$('#navigation-settings .plus').toggleClass('minus');
//	});
//
//	$("#loops .fieldset-wrapper").hide();
//	$("#loops .fieldset-legend").click(function(){
//		$("#loops .fieldset-wrapper").slideToggle("slow");
//		$(this).toggleClass("active");
//		$('#loops .plus').toggleClass('minus');
//	});
//
//	$("#mobile-visibility .fieldset-wrapper").hide();
//	$("#mobile-visibility .fieldset-legend").click(function(){
//		$("#mobile-visibility .fieldset-wrapper").slideToggle("slow");
//		$(this).toggleClass("active");
//		$('#mobile-visibility .plus').toggleClass('minus');
//	});
//
//	$("#layout-styles .fieldset-wrapper").hide();
//	$("#layout-styles .fieldset-legend").click(function(){
//		$("#layout-styles .fieldset-wrapper").slideToggle("slow");
//		$(this).toggleClass("active");
//		$('#layout-styles .plus').toggleClass('minus');
//	});
//});
//</script>
