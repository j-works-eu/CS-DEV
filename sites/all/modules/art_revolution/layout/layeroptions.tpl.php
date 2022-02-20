<!---->
<!--LAYERS OPTIONS-->
<!---->

<div class="vertical-tabs-panes vertical-tabs-processed hiddenlayers" id="layeroptions" style="display: none;">
  <div id="content-type">

    <ul id="ui-tab-layer" style="visibility: hidden">
      <li class="menutext" data-toggle="toolTip" data-placement="right" title="<?php print t("Add some text"); ?>"
          data-type="text"><a href="#content-text"><i class="fas fa-text-height"></i></a></li>
      <li class="menuimage" data-toggle="toolTip" data-placement="right"
          title="<?php print t("Add a picture"); ?>" data-type="image"><a
          href="#content-image"><i class="fas fa-image"></i></a></li>
      <li class="menuvideo" data-toggle="toolTip" data-placement="right"
          title="<?php print t("Add a Video"); ?>" data-type="video"><a
          href="#content-video"><i class="fas fa-video"></i></a></li>
      <li class="menuclock" data-toggle="toolTip" data-placement="right"
          title="<?php print t("Add  Date / Time"); ?>" data-type="clock"><a
          href="#content-clock"><i class="fas fa-clock"></i></a></li>
      <li class="menunews" data-toggle="ToolTip" data-placement="right" title="<?php print t("Add some news feeds"); ?>"
          data-type="news"><a href="#content-news"><i class="fas fa-globe"></i></a></li>
      <li class="menuwidgets" data-toggle="toolTip" data-placement="right"
          title="<?php print t("Add a Elfsign Widgets"); ?>" data-type="widgets"><a
          href="#content-widgets"><i class="fas fa-share-alt-square"></i></a></li>
      <li class="menuiframe " data-toggle="toolTip" data-placement="right"
          title="<?php print t("Add an Iframe"); ?>" data-type="iframe"><a
          href="#content-iframe"><i class="far fa-window-maximize"></i></a></li>
      <li class="menuanimatie" data-toggle="toolTip" data-placement="right"
          title="<?php print t("Full Screen Animation"); ?>" data-type="animatie"><a
          href="#content-animatie"><i class="fab fa-react"></i></a></li>
      <li class="menuweather" data-toggle="toolTip" data-placement="right"
          title="<?php print t("Weather widget"); ?>" data-type="weather"><a
          href="#content-weather"><i class="fas fa-cloud-sun-rain"></i></a></li>
      <li class="menugooglereview" data-toggle="toolTip" data-placement="right"
          title="<?php print t("google reviews widget"); ?>" data-type="googlereview"><a
          href="#content-googlereview"><i class="fab fa-google"></i></a></li>
    </ul>

    <div class="layertitle col-md-12">
      <input data-toggle="tooltip" data-placement="bottom" title='<?php print t('Change the title of this layer'); ?>' type="text" name="title"
             class="form-text layer-option" placeholder="<?php print 'Change title';?>" id="layer-text-options" maxlength="31"/>
      <input type="hidden" class="layer-option" name="content" value=""/>
    </div>


    <div id="content-wrap" class="col-md-12 right">

      <!--============================== BEGIN TEXT TAB ============================-->

      <div id="content-text" class="col-md-12 divvie right">

        <div class="col-md-3">
										<span style="" class="pointerCursor" data-toggle="modal" data-target=".fonts-text-modal">
											<span style="pointer-events: none;">
												<?php print art_revolution_select('text_style_text', $captionclasses, 'text-select-text layer-option'); ?>
											</span>
										</span>

        </div>

        <div class="col-md-3">
          <input data-toggle="tooltip" data-placement="bottom"
                 title="<?php print t("Change the font color"); ?>"
                 name="font_color_text" class="form-text layer-option jscolor {required:true, hash:true, width:243, height:150, position:'right',
		borderColor:'#FFF', insetColor:'#FFF', backgroundColor:'#666'}" onchange="setString('fgcolortext', this.value)"
                 value="" id="fgcolortext">
          <div style="visibility: hidden" class="panel fgcolortext posabso"
               id="fgcolortext-button"></div>
        </div>
        <div class="col-md-3">
          <?php print art_revolution_select('font_size', $fontsize, 'layer-option', 'Change the font size'); ?>
        </div>

        <div class="col-md-3">
          <?php print art_revolution_select('font_uitlijning_v1', $tekstuitlijning, 'layer-option', 'Change the text alignment'); ?>
        </div>


        <div class="col-md-3 blockrotate">
          <input data-toggle="tooltip" data-placement="bottom"
                 title="<?php print t("Rotate the text to the angle you want. Just fill in the degrees and your done."); ?>" type="hidden" placeholder="360°" name="text_rotate"
                 class="form-text layer-option" id="layer-text-options" maxlength="4"/>
        </div>

        <div class="textfield col-md-12 right">
          <textarea class="layer-option form-textarea" name="text" id="layer-text" placeholder="<?php print t('Add some text here...'); ?>"></textarea>
        </div>
      </div>

      <!--============================== END TEXT TAB ============================-->


      <!--============================== BEGIN PICTURE TAB ============================-->

      <div id="content-image" class="col-md-12 divvie">

        <div style="display: none;" class="namepic" data-name="picture"></div>

        <span title="<?php print t("Hier kan je een afbeelding uploaden."); ?>" class="field_bg_img">
									<input name="image" placeholder="<?php print t("Upload afbeelding"); ?>"
                         data-uri="[name=image_uri]" size="100" class="layer-option file-imce form-text"
                         id="imagelayer" onchange="insertImageToLayer(this.value)"/>
									<button type="button" data-toggle="nonoToolTip" data-placement="top"
                          title="<?php print t("Reset"); ?>" class="clearfield" onclick="Clearimage(this);">
										<i class="fas fa-sync"></i>
									</button>
									<input type="hidden" name="image_uri" id="idsubmitimage" class="layer-option"/>
				</span>


        <div class="col-md-3 blockrotate">
          <input type="hidden" placeholder="360" name="image_rotate"
                 class="form-text layer-option" id="layer-text-options" maxlength="4"/>
        </div>
      </div>


      <!--============================== END PICTURE TAB ==============================-->


      <!--============================== BEGIN VIDEO TAB ==============================-->



      <div id="content-video" class="col-md-12 divvie">

        <!--                  <div class="col-md-4">-->
        <!--                    --><?php //print art_revolution_select('videosize', $videosize, 'layer-option', 'Kies hier het formaat van de video'); ?>
        <!--                  </div>-->
        <div class="col-md-12">
								<span class="field_bg_img">
									<input title="<?php print t("Hier kunt u uw video bestand uploaden."); ?>"
                         name="video" placeholder="<?php print t("Video bestand"); ?>"
                         data-uri="[name=video_uri]" size="100"
                         class="layer-option file-imce form-text" id="videolayer"
                         onchange="insertVideoToLayer(this.value)"/>
									<button type="button" data-toggle="tooltip" data-placement="top"
                          title="<?php print t("Reset"); ?>" class="clearfield" onclick="Clearvideo(this);">
										<i class="fas fa-sync"></i>
									</button>

									<input type="hidden" name="video_uri" id="idsubmitvideo" class="layer-option"/>

								</span>
        </div>
        <div class="col-md-12">
          <div  data-toggle="tooltip" data-placement="bottom" title="<?php print t("Wanneer u deze functie aanzet zal de video in een loop worden afgespeeld. U kunt dan bij de tijdsduur (bovenin) de tijd instellen hoelang de slide zal worden weergegeven."); ?>" class="col-md-12 layer-dis-ena- selectbuttonloop">
            <?php print art_revolution_select('videoloop', $videoloop, 'layer-option hidden pointernone onoff dis-ena-', 'Zet het nieuws aan of uit'); ?>


          </div>
        </div>

        <div class="col-md-3 blockrotate">
          <input data-toggle="tooltip" data-placement="bottom"
                 title="<?php print t("Rotate the text to the angle you want. Just fill in the degrees and your done."); ?>" type="hidden" placeholder="360°" name="movie_rotate"
                 class="form-text layer-option" id="layer-text-options" maxlength="4"/>
        </div>



      </div>
      <!--							</div>-->

      <!--============================== END VIDEO TAB ==============================-->


      <!--============================== BEGIN CLOCK TAB ==============================-->


      <div id="content-clock" class="col-md-12 divvie">


        <div class="col-md-12">
          <?php print art_revolution_select('clockoptions', $clockoptions, 'layer-option', 'Kies hier uw klok type'); ?>
        </div>

        <!--                  <div class="col-md-12 layer-dis-ena- selectbuttonclock">-->
        <!--                    --><?php //print art_revolution_select('clockblock', $clockblock1, 'layer-option hidden pointernone onoff dis-ena-', 'Zet de klok aan of uit'); ?>
        <!--                  </div>-->


        <div class="col-md-12 field_bg_img">


									<span style="" class="" data-toggle="modal" data-target=".fonts-clock-modal">
										<span style="pointer-events: none;">
											<?php print art_revolution_select('text_style_clock', $captionclasses, 'layer-option text-select-clock', null, 'clock'); ?>
										</span>
									</span>

        </div>

        <div class="col-md-4 field_bg_img">
          <input data-toggle="tooltip" data-placement="top"
                 title="<?php print t("Kies een kleur voor de klok"); ?>"
                 name="font_color_clock" class="form-text layer-option jscolor {required:true, hash:true, width:243, height:150, position:'right',
		borderColor:'#FFF', insetColor:'#FFF', backgroundColor:'#666'}" onchange="setString('fgcolorclock', this.value)"
                 value="">

        </div>

        <div class="col-md-4 clockzoomselect">
          <?php print art_revolution_select('clockzoom', $clockzoom, 'layer-option', 'Verklein of vergroot de klok'); ?>
        </div>

        <div class="col-md-4">
          <?php print art_revolution_select('font_uitlijning_clock', $tekstuitlijning, 'layer-option', 'Kies hier de uitlijning van de tekst'); ?>
        </div>




        <div style="visibility: hidden" class="panel fgcolorclock"
             id="fgcolorclock-button">

        </div>

      </div>

      <!--==============================END CLOCK TAB =================================-->


      <!--============================== BEGIN NEWS TAB ==============================-->

      <div id="content-news" class="col-md-12 divvie">

        <!--                  <div class="col-md-12 layer-dis-ena- selectbuttonnews">-->
        <!--                    --><?php //print art_revolution_select('newsblock', $newsactivate, 'layer-option hidden pointernone onoff dis-ena-', 'Zet het nieuws aan of uit'); ?>
        <!--                  </div>-->

        <div class="col-md-12 newsblockfeed">
          <?php print art_revolution_select('newsblockfeed', $newsfeed, 'layer-option', 'Kies hier wat voor nieuws u wilt laten zien'); ?>
        </div>

        <div class="col-md-6 field_bg_img">

									<span data-toggle="modal" data-target=".fonts-news-modal">
										<span style="pointer-events: none;">
											<?php print art_revolution_select('text_style_news', $captionclasses, 'selectpicker layer-option text-select-news', null, 'news'); ?>
										</span>
									</span>

          <div class="fonts-news-modal modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modaltext modal-dialog modal-sm">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="body-message">
                    <?php
                    foreach ($captionclasses as $key => $value):
                      echo '<a data-role="button" data-dismiss="modal" data-val="' . $value . '" class="select-change-news ' . $value . '"  id="' . $value . '">' . $value . "</a>" . "<br>";
                    endforeach;
                    ?>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 field_bg_img">
          <input data-toggle="tooltip" data-placement="top"
                 title="<?php print t("Kies een kleur voor de tekst"); ?>"
                 name="font_color_news"
                 class="form-text layer-option jscolor {required:true, hash:true, width:243, height:150, position:'right',borderColor:'#FFF', insetColor:'#FFF', backgroundColor:'#666'}"
                 onchange="setString('fgcolornews', this.value)" value="">

        </div>

        <div class="panel fgcolornews" id="fgcolornews-button"></div>
      </div>


      <!--============================== END NEWS TAB ================================-->


      <!--============================== BEGIN SOCIAL TAB ============================-->

      <div id="content-widgets" class="col-md-12 divvie">

        <!--                  <div class="col-md-12 layer-dis-ena- selectbuttonsocial">-->
        <!--                    --><?php //print art_revolution_select('facebookblock', $addFBblock, 'layer-option hidden pointernone onoff dis-ena-', 'Zet de Elfsight widget aan of uit'); ?>
        <!--                  </div>-->


        <div class="col-md-6 widgetselect">
          <?php print art_revolution_select('widgetpos', $widgetposition, 'layer-option', 'Sommige Elfsight widgets kun je het beste gebruiken in originele grote. Maar je hebt ook schermvullende widgets (zoals facebook post, instagram feed) kies dan de optie schermvullend '); ?>
        </div>
        <div class="col-md-6 widgetzoomselect">
          <?php print art_revolution_select('widgetzoom', $widgetzoom, 'layer-option', 'Hiermee kunt je de Elfsight widgets vergroten of verkleinen (Dit werk alleen wanneer u gekozen hebt voor Origineel (versleepbaar)'); ?>
        </div>


        <div class="col-md-12 divvie">
          <input name="elfsightFB" size="80" class="form-text layer-option"
                 id="facebookblock1_id" data-toggle="tooltip" data-placement="bottom"
                 title="<?php print t("Plaats hier de Elfsight app id"); ?>"
                 placeholder="<?php print t("ID start met -> elfsight-app-"); ?>"/>
        </div>
        <div class="wrap">
          <button type="button" class="btn btn-primary" data-toggle="modal"
                  data-target=".bs-example-modal-new">
            <?php print t("More information"); ?>
          </button>
        </div>

        <div class="modal fade bs-example-modal-new" tabindex="-1" role="dialog"
             aria-labelledby="myLargeModalLabel" aria-hidden="true">

          <div class="modal-dialog">

            <!-- Modal Content: begins -->
            <div class="modal-content">

              <!-- Modal Header -->
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title"
                    id="gridSystemModalLabel"><?php print t("Elfsight Informatie"); ?></h4>
              </div>

              <!-- Modal Body -->
              <div class="modal-body">
                <div class="body-message">
                  <p><img src="/sites/default/files/elfsight.png"
                          alt="ElfSight [https://elfsight.com]">
                    <br/><br/>
                  <p><?php print t("Elfsight widgets helps you to create beautiful widgets out of the box. They provide free (lite plan) use of their widgets. "); ?></p>
                  <p><?php print t("Check  their site to create an account and create some widgets"); ?>
                    <a href="https://elfsight.com" target="_blank">https://elfsight.com</a>
                  </p>
                  <p><?php print t("After you have created a widget for below you only need to put the ElfSign ID in the field for the correct widget and enable it"); ?></p></p>
                </div>
              </div>

              <!-- Modal Footer -->


            </div>
            <!-- Modal Content: ends -->
          </div>
        </div>


      </div>


      <!--============================== END SOCIAL TAB ==============================-->



      <!--============================== BEGIN IFRAME TAB ============================-->

      <div id="content-iframe" class="col-md-12 divvie">

        <div class="col-md-12 divvie">
          <input name="iframeURL" size="80" class="layer-option form-text"
                 id="iframeURL" data-toggle="tooltip" data-placement="bottom"
                 title="<?php print t("Place you Iframe URL here"); ?>"
                 placeholder="<?php print t("Place you Iframe URL here"); ?>"/>
        </div>


      </div>


      <!--============================== END IFRAME TAB ==============================-->





      <!--============================== BEGIN animatie TAB ============================-->

      <div id="content-animatie" class="col-md-12 divvie">


        <div class="col-md-12">
          <?php print art_revolution_select('extrafanimation', $extrafullscreenanimation, 'text-select-fullscreen-animation layer-option hide'); ?>
        </div>

        <div class="col-md-12 div-animation">
          <img rel="fsa-rain" id="aniclickrain" class="anibutton" data-toggle="tooltip" data-placement="bottom" title="<?php print t("It's a RAINY day..."); ?>" src="/sites/all/modules/art_revolution/images/rain.png">
          <img rel="fsa-snow" id="aniclicksnow" class="anibutton" data-toggle="tooltip" data-placement="bottom" title="<?php print t("Let it SNOW, let it SNOW.."); ?>" src="/sites/all/modules/art_revolution/images/snow.png">
          <img rel="fsa-stars" id="aniclickstars" class="anibutton" data-toggle="tooltip" data-placement="bottom" title="<?php print t("STARS in the sky..."); ?>" src="/sites/all/modules/art_revolution/images/stars.png">
          <img rel="fsa-blocks" id="aniclickblocks" class="anibutton" data-toggle="tooltip" data-placement="bottom" title="<?php print t("Floating BLOCKS.."); ?>" src="/sites/all/modules/art_revolution/images/blocks.png">
          <img rel="fsa-confetti" id="aniclickconfetti" class="anibutton" data-toggle="tooltip" data-placement="bottom" title="<?php print t("Party time here is some CONFETTI..."); ?>" src="/sites/all/modules/art_revolution/images/confetti.png">
          <img rel="fsa-balloons" id="aniclickballoons" class="anibutton" data-toggle="tooltip" data-placement="bottom" title="<?php print t("Some BALLOONS to celibrate..."); ?>" src="/sites/all/modules/art_revolution/images/balloon.png">
          <img rel="fsa-balls" id="aniclickballs" class="anibutton" data-toggle="tooltip" data-placement="bottom" title="<?php print t("Randome multi color BALLS..."); ?>" src="/sites/all/modules/art_revolution/images/balls.png">
<!--          <img rel="fsa-fireflies" id="aniclickfireflies" class="anibutton" data-toggle="tooltip" data-placement="bottom" title="--><?php //print t("Here comes the fireflies..."); ?><!--" src="/sites/all/modules/art_revolution/images/fireflies.png">-->
          <img rel="fsa-fireworks" id="aniclickfireworks" class="anibutton" data-toggle="tooltip" data-placement="bottom" title="<?php print t("Light up the sky with some fireworks..."); ?>" src="/sites/all/modules/art_revolution/images/fireworks.png">
        </div>

      </div>



      <!--============================== END animatie TAB ==============================-->




      <!--============================== BEGIN weather TAB ============================-->

      <div id="content-weather" class="col-md-12 divvie">

        <div class="col-md-8 divvie">
          <input name="weercity" size="80" class="form-text layer-option"
                 id="weather_city" data-toggle="tooltip" data-placement="bottom"
                 title="<?php print t("Please enter the city name"); ?>"
                 placeholder="<?php print t("City name"); ?>"/>
        </div>

        <div class="col-md-4">
          <?php print art_revolution_select('weercountry', $weathercountry, 'text-select-wether-widget-country layer-option'); ?>
        </div>

        <div class="col-md-12">
          <?php print art_revolution_select('weatherwidgets', $weatherwidgets, 'layer-option', 'Choose a weather widget'); ?>
        </div>

        <!--Disable random backgrounds-->

        <div class="col-md-12 div-animation-options">
          <div class="layeroptions">
            <h3><?php print t('Weather animation options'); ?></h3>
<!--            <h5>--><?php //print t('Enable'); ?><!-- | --><?php //print t('Disable'); ?><!--</h5>-->
              <span class="w-Options-SPAN">
                <div class="W-options-BG"><span class="WBG-options-button"></span> <?php print t("Backgrounds"); ?></div>
                <span class="hide"> <?php print art_revolution_select('Wbgactive', $Wbgactive, 'layer-option', ''); ?></span>

                <div class="WA-options"><span class="WA-options-button"></span> <?php print t("Animations"); ?></div>
                <span class="hide"> <?php print art_revolution_select('Waactive', $Waactive, 'layer-option', ''); ?></span>

                <div class="WForecast-options"><span class="WForecast-options-button"></span> <?php print t("Forecast"); ?></div>
                <span class="hide"> <?php print art_revolution_select('WForecast', $Wforecast, 'layer-option', ''); ?></span>
            </span>
          </div>
        </div>


      </div>

      <!--============================== END weather TAB ==============================-->

      <!--============================== BEGIN googlereview TAB ============================-->


      <div id="content-googlereview" class="col-md-12 divvie">
        <div class="layeroptions">
          <h3><?php print t('Layer options'); ?></h3>
          <h5><?php print t('Please add your place id'); ?></h5>

          <div class="col-md-8 divvie">
            <input name="googleplaceid" size="80" class="form-text layer-option" id="google-place-id" data-toggle="tooltip" data-html="true" data-placement="bottom"
                   title="<?php print t("We need a place id to fetch the data needed for the reviews, press find place id to find your place ID"); ?>" placeholder="<?php print t("Google Place ID"); ?>"/>
          </div>

          <div class="col-md-4 divvie">
            <div class="wrap">
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".googlefindplaceid"><?php print t("Find Place ID"); ?></button>
            </div>
          </div>
        </div>
      </div>

      <!--MODAL POPUP GOOGLE MAPS FOR PLACE ID-->
      <div class="modal fade googlefindplaceid" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div style="width: 514px;" class="modal-content">
            <div class="modal-body">
              <div class="body-message">
                <html>
                <body>
                <div style="display: none">
                  <input id="pac-input" class="controls" type="text" placeholder="<?php print t('Enter a location') ;?>" />
                </div>
                <div id="map"></div>
                <div id="infowindow-content">
                  <span id="place-name" class="title"></span><br />
                  <strong>Place ID:</strong> <span class="classcopy" id="place-id"></span><br />
                  <span id="place-address"></span>
                </div>
                </body>
                </html>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--END MODAL POPUP GOOGLE MAPS FOR PLACE ID-->
      <!--============================== END googlereview TAB ============================-->


      <!--============================== START EFFECTEN & ANIMATIES  ==============================-->

      <div id="content-wrap-animations" class="col-md-12">

      <div class="col-md-12 effect-animation">


        <div class="col-md-3 divvie">
          <?php print art_revolution_select('data_start', $time_caption_in, 'layer-option', 'Kies een start tijd wanneer het effect in de stream zal verschijnen'); ?>
        </div>

        <div class="col-md-9 divvie">
          <?php print art_revolution_select('incomingclasses', $incomingclasse, 'layer-option', 'Kies een start effect'); ?>
        </div>

        <div class="col-md-3 divvie">
          <?php print art_revolution_select('data_end', $time_caption_out, 'layer-option', 'Kies een eind tijd wanneer het effect uit de stream zal verdwijnen'); ?>
        </div>

        <div class="col-md-9 divvie">
          <?php print art_revolution_select('outgoingclasses', $outgoingclasses, 'layer-option', 'Kies een eind effect'); ?>
        </div>


        <div class="col-md-12 extraanimation">
          <div class="col-md-12 extraani">
										<span data-toggle="tooltip" data-placement="bottom"
                          title="<?php print t("Kies een extra animatie die wordt toegepast op de laag. Je kan dit combineren met het start effect en start tijd."); ?>"><span style="" class="" data-toggle="modal" data-target=".fonts-animation-modal">
											<span style="pointer-events: none;">
												<?php print art_revolution_select('extra_animation', $extraanimation, 'text-select-animation layer-option'); ?>
											</span>
										</span>
										</span>
          </div>
          <div class="col-md-12 extraOptions">
            <div class="col-md-12 sliderOpacity">
              <div class="col-md-4 textleft">
                <?php print t("Transparancy"); ?>
              </div>

              <div class="col-md-8 sliderright">
                <div id="slider" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all sliderTS" aria-disabled="false">
                  <a class="ui-slider-handle ui-state-default ui-corner-all" id="handle" href="#" style="left: 100%"></a>
                </div>
                <input id="layerTrans" type="hidden" class="layer-option form-text" name="layertransparant">
              </div>
            </div>
          </div>

        </div>




        <!--============================== HIDDEN INPUTS  ==============================-->

        <input name="left" type="hidden" class="form-text layer-option">
        <input name="top" type="hidden" class="form-text layer-option">
        <input name="slidewidth" id="slidewidth" type="hidden" class="form-text layer-option">
        <input name="slideheight" id="slideheight" type="hidden" class="form-text layer-option">
        <input name="video_width" id="slide_width" type="hidden" class="form-text layer-option">
        <input name="video_height" id="slide_height" type="hidden" class="form-text layer-option">
        <input name="width" type="hidden" class="form-text layer-option">
        <input name="height" type="hidden" class="form-text layer-option">
        <input name="data_speed" type="hidden" class="layer-option form-text"/>

      </div>

      </div>

      <!--============================== EIND EFFECTEN & ANIMATIES ==============================-->
</div>
  </div>
</div>


  <!--        -->
  <!--        -->
  <!--END MENU-->
