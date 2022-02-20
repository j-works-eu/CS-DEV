<!-- START Modal POPUP LAYER ITEMS -->

<!-- Modal -->
<div class="modal fade right layerOptionsModal" id="exampleModalPreview" tabindex="-1" role="dialog" aria-labelledby="exampleModalPreviewLabel" aria-hidden="true">
  <div class="modal-dialog-full-width modal-dialog momodel modal-fluid" role="document">
    <div class="modal-content-full-width modal-content ">
      <div class=" modal-header-full-width   modal-header text-center">
        <button type="button" class="close " data-dismiss="modal" aria-label="Close">
          <span style="font-size: 1.3em;" aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <h1 class="section-heading text-center wow fadeIn my-5 pt-3"><?php print t('CHOOSE TYPE OF LAYER'); ?></h1>

        <div class="layeroptions">


          <i value="text" data-role="button" data-dismiss="modal" data-val="text" class="fas fa-text-height text-select-menu" id="text"></i>
          <i value="image" data-role="button" data-dismiss="modal" data-val="image" class="text-select-menu fas fa-image" id="image"></i>
          <i value="video" data-role="button" data-dismiss="modal" data-val="video" class="text-select-menu fas fa-video" id="video"></i>
          <span id="video-disabled" data-val="video-disabled" class="text-select-menu fas fa-video""><i value="#disabled" style="pointer-events: none; color: #c3c3c3;" data-role="button" data-dismiss="modal" data-val="video-disabled" class="text-select-menu" id="video-disabled"></i></span>
          <i value="clock" data-role="button" data-dismiss="modal" data-val="clock" class="text-select-menu fas fa-clock" id="clock"></i>
          <i value="news" data-role="button" data-dismiss="modal" data-val="news" class="text-select-menu fas fa-globe" id="news"></i>
          <i value="animatie" data-role="button" data-dismiss="modal" data-val="animatie" class="text-select-menu fas fa-border-none" id="animatie"></i>
          <i value="weather" data-role="button" data-dismiss="modal" data-val="weather" class="text-select-menu fas fa-cloud-sun-rain" id="weather"></i>
          <i value="iframe" data-role="button" data-dismiss="modal" data-val="iframe" class="text-select-menu fas fa-window-maximize" id="iframe"></i>
          <i value="widgets" data-role="button" data-dismiss="modal" data-val="widgets" class="text-select-menu" id="widgets"></i>


          <div class="hiddenelements">
            <div style="display: none;" class="hover-text hiddenelement"></h1><?php print t("TEXT"); ?></h1></div>
            <div style="display: none;" class="hover-image hiddenelement"></h1><?php print t("IMAGE"); ?></h1></div>
            <div style="display: none;" class="hover-video hiddenelement"></h1><?php print t("MOVIE"); ?></h1></div>
            <div style="display: none;" class="hover-video-disabled hiddenelement"></h1><?php print t("MOVIE(DISABLED)<br /> <small>You can not have more than 2 movies in a layer</small>"); ?></h1></div>
            <div style="display: none;" class="hover-clock hiddenelement"></h1><?php print t("CLOCK"); ?></h1></div>
            <div style="display: none;" class="hover-news hiddenelement"></h1><?php print t("NEWS"); ?></h1></div>
            <div style="display: none;" class="hover-animatie hiddenelement"></h1><?php print t("FULL SCREEN ANIMATIONS"); ?></h1></div>
            <div style="display: none;" class="hover-weather hiddenelement"></h1><?php print t("WEATHER"); ?></h1></div>
            <div style="display: none;" class="hover-iframe hiddenelement"></h1><?php print t("IFRAME"); ?></h1></div>

            <div style="display: none;" class="hover-widgets hiddenelement">
              </h1><?php print t("ELFSIGHT WIDGETS"); ?></h1>
              <div class="moreinfo">
                <p><?php print t('Elfsight lets you build your perfect display, without the stress of coding and developing.
                    Get access to a collection of 60+ widgets and templates designed to increase user engagement, gather leads, and grow your sales.
                    With premium layouts and endless ways to customize, your business goals are just a few clicks away.'); ?></p><br />
                <p> <?php print t('Elfsight provides a free lite plan that can be used in Cloud Screen.
                  Check out the website and create an account to start working on your widget.
                  When finished copy the elfsight id en past it in the field. The elfsight id of the widget begins with "elfsight-app-"'); ?></p><br />
                <p><a href="https://elfsight.com/" target="_blank">https://elfsight.com</a></p><br />

                <p class="menu-kleurtje-letop"><?php print t('We provide this option under best effort. Most widgets will work, although you will sometimes need to be creative.'); ?></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

<div class="fonts-text-modal modal fade right" id="exampleModalPreview" tabindex="-1" role="dialog" aria-labelledby="exampleModalPreviewLabel" aria-hidden="true">
  <div class="modal-dialog-full-width modal-dialog momodel modal-fluid" role="document">
    <div class="modal-content-full-width modal-content ">
      <div class=" modal-header-full-width   modal-header text-center">
        <button type="button" class="close " data-dismiss="modal" aria-label="Close">
          <span style="font-size: 1.3em;" aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h1 class="section-heading text-center wow fadeIn my-5 pt-3"><?php print t("CHOOSE A FONT FOR YOU TEXT LAYER"); ?></h1>

        <div class="body-message">
          <?php
          foreach ($captionclasses as $key => $value):
            echo '	<a data-role="button" data-dismiss="modal" data-val="' . $value . '" class="select-change-text ' . $value . '"  id="' . $value . '">' . $value . "</a>" . "<br>";
          endforeach;
          ?>
        </div>

      </div>
    </div>
  </div>
</div>


<div class="fonts-clock-modal modal fade right" id="exampleModalPreview" tabindex="-1" role="dialog" aria-labelledby="exampleModalPreviewLabel" aria-hidden="true">
  <div class="modal-dialog-full-width modal-dialog momodel modal-fluid" role="document">
    <div class="modal-content-full-width modal-content ">
      <div class=" modal-header-full-width   modal-header text-center">
        <button type="button" class="close " data-dismiss="modal" aria-label="Close">
          <span style="font-size: 1.3em;" aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h1 class="section-heading text-center wow fadeIn my-5 pt-3"><?php print t("CHOOSE A FONT FOR YOU TEXT LAYER"); ?></h1>

        <div class="body-message">
          <?php
          foreach ($captionclasses as $key => $value):
            echo '<a data-role="button" data-dismiss="modal" data-val="' . $value . '" class="select-change-clock ' . $value . '"  id="' . $value . '">' . $value . "</a>" . "<br>";
          endforeach;
          ?>
        </div>

      </div>
    </div>
  </div>
</div>

<div class="fonts-animation-modal modal fade right" id="exampleModalPreview" tabindex="-1" role="dialog" aria-labelledby="exampleModalPreviewLabel" aria-hidden="true">
  <div class="modal-dialog-full-width modal-dialog momodel modal-fluid" role="document">
    <div class="modal-content-full-width modal-content ">
      <div class=" modal-header-full-width   modal-header text-center">
        <button type="button" class="close " data-dismiss="modal" aria-label="Close">
          <span style="font-size: 1.3em;" aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h1 class="section-heading text-center wow fadeIn my-5 pt-3"><?php print t("CHOOSE THE EXTRA ANIMATION FOR THIS LAYER"); ?></h1>
        <div class="body-message">
          <?php
          foreach ($extraanimation as $key => $value):
            echo '<div class="'.$key.'"><a data-role="button" data-dismiss="modal" data-val="' . $key . '" class="select-change-animation ' . $key. '"  id="' . $value . '">' . $value . "</a></div>";
          endforeach;
          ?>
        </div>

      </div>
    </div>
  </div>
</div>

<!--<div class="layer-options-modal modal fade right" id="exampleModalPreview" tabindex="-1" role="dialog" aria-labelledby="exampleModalPreviewLabel" aria-hidden="true">-->
<!--  <div class="modal-dialog-full-width modal-dialog momodel modal-fluid" role="document">-->
<!--    <div class="modal-content-full-width modal-content ">-->
<!---->
<!--      <div class="modal-body">-->
<!--        <h1 style="color: #ffffff !important;" class="section-heading text-center wow fadeIn my-5 pt-3">--><?php //print t("LAYER OPTIONS MENU"); ?><!--</h1>-->
<!--        <div class="body-message">-->
<!--          <div class="layer-Options">-->
<!--            --><?php //include "layeroptions.tpl.php"; ?>
<!--          </div>-->
<!--        </div>-->
<!---->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->





