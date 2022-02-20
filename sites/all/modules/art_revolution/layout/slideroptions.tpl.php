<div class="slideroptions">

  <div class="divvie slidetextOptions">

    <div id="date-disable-enable" class="buttonEnableSlide">
      <div class="onoff dis-ena- enabledisableclass" data-toggle="tooltip" data-placement="bottom"
           title="<?php print t("Here you can enable or disable the slide, useful if you don't want to show this slide for a while"); ?>">
        <?php print art_revolution_select('disableslide', $datadisableslide, 'slide-option disable-enabled sid-', 'Here you can enable or disable the slide, useful if you don\'t want to show this slide for a while'); ?>
      </div>
    </div>
  </div>

  <div class="divvie inputTitleField">
    <input name="title" class="slide-option form-text" id="slide-text-options" data-toggle="tooltip"
           data-placement="bottom"
           title="<?php print t("Change the title of this slide"); ?>"
           placeholder="<?php print t("Change slide title"); ?>" maxlength="32"/>
    <br>
    <div class="divvie inputSmallField"><?php print art_revolution_select('data_delay', $slidetimer, 'slide-option', 'Slide timer - Time of slide on screen.'); ?></div>
    <div class="divvie inputSmallField"><?php print art_revolution_select('data_transition', $datatransition, 'slide-option', 'Background image Animation on slide load'); ?></div>
    <div class="divvie inputSmallField"> <?php print art_revolution_select('data_masterspeed', $data_trans_speed, 'slide-option', 'Background image animation time on slide load.'); ?></div>

  </div>

  <div class="divvie imgButtonImg">
                  <span class="field_bg_img">
                        <span class="bguploadbutton"><?php print t('Choose background image'); ?></span>
                  <input name="background_image" data-toggle="tooltip"
                         data-placement="bottom"
                         title="<?php print t("Upload a full screen background image here"); ?>"
                         id="background-image"
                         data-uri="[name=background_image_uri]"
                         class="file-imce slide-option form-text"
                         onchange="setSlideBackground(this.value)"/>

                  <button type="button" data-toggle="tooltip" data-placement="bottom"
                          title="<?php print t("Reset background image"); ?>" class="clearfield"
                          onclick="ClearimageBackground(this);"><i class="fas fa-sync"></i></button>

                  <img name='background_image_preview' id='plaatjelink' class="slide-option" src="#" width="100">

                  <input id='imagelinkie' type="hidden" name="background_image_uri" class="slide-option"/>
                </span>
  </div>

  <div class="divvie colorBGColor">
      <span class="field_bg_color">
						<input data-toggle="tooltip" data-placement="bottom"
                   title="<?php print t("Change the background color"); ?>"
                   name="backgroundcolormain" placeholder="<?php print t("BG Color"); ?>" class="backgroundchanger slide-option form-text jscolor {required:false, hash:true, width:243, height:150, position:'right',
		borderColor:'#FFF', insetColor:'#FFF', backgroundColor:'#666'}" onchange="setString('bgcolor', this.value)"
                   value="" id="backgroundcolormain">
							<button type="button" data-toggle="tooltip" data-placement="bottom" title="<?php print t("Reset background color"); ?>"
                      class="clearfield " onclick="ClearBackgroundColor(this);"><i class="fas fa-sync"></i></button>
							<div style="visibility: hidden" class="panel bgcolor" id="bgcolor-button"></div>
                </span>
  </div>

  <div class="divvie tekstEnableonDate">
      <span class="enableTextcss"><?php print t('Enable on date');?></span>
  </div>

  <div class="divvie selectEnableonDate">

    <button type="button" onclick="ClearDates();" data-toggle="tooltip" data-placement="bottom" title="<?php print t("Reset dates..."); ?>"
            class="form-submit ico-remove form-reset my-views-filter-reset datereset"><i class="fas fa-sync"></i>
    </button>

    <input type="text" data-toggle="tooltip" data-placement="bottom"
           title="<?php print t("Choose the start date when slide needs to appear"); ?>" name="datevan"
           placeholder="<?php print t("Start date"); ?>" class="slide-option form-text" id="date-from"/>

    <div class="datevanTijdHour"><?php print art_revolution_select('dateSTART_TijdHour', $datestartTimeHours, 'slide-option', 'Choose the start time this slide needs to appear'); ?></div>
    <div class="datevanTijdHour"><?php print art_revolution_select('dateSTART_TijdMinutes', $datestartTimeMinutes, 'slide-option', 'Choose the start time this slide needs to appear'); ?></div>

    <input type="text" data-toggle="tooltip" data-placement="bottom"
           title="<?php print t("Choose the end date when slide needs to disappear"); ?>" name="datenaar"
           placeholder="<?php print t("End date"); ?>" class="slide-option form-text" id="date-to"/>
    <div class="datevanTijdHour"><?php print art_revolution_select('dateEND_TijdHour', $dateendTimeHours, 'slide-option', 'Choose the start time this slide needs to appear'); ?></div>
    <div class="datevanTijdHour"><?php print art_revolution_select('dateEND_TijdMinutes', $dateendTimeMinutes, 'slide-option', 'Choose the start time this slide needs to appear'); ?></div>


  </div>
</div>
