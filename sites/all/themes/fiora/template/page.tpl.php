<?php
global $user;
global $theme_root;
$path_args = arg();

$storing = homemade_storing();
$email = homemade_storing_email();
$background = homemade_background_login();
$form = drupal_get_form('user_login_block');
$formoutput = drupal_render($form);
$checkrolreclame = array_intersect(array('administrator', 'mod', 'klant'), array_values($user->roles));
$checkifthemes = arg(3);


// FORCE REFRESH PAGE
if (user_is_logged_in() == TRUE) {
    if (arg(0) == 'force-page-refresh.php') {
        render($page['content']);
    }
} else {
  ?>

  <div class="wrapper">
    <div class="loggedin">
      <?php if (user_is_logged_in() == TRUE) { ?>

      <?php if ($checkifthemes == 'themes') { ?>

        <?php  $StreamId = arg(2);  ?>

        <div class="themeselect">
          <div class="nav-side-menu">
            <div class="brand">Slides & Templates</div>

            <div class="menu-list">

              <ul id="menu-content" class="menu-content collapse out">
                <li>
                  <a id="alles" href="#"><i class="fa fa-television"></i><?php print t('All items'); ?></a>
                </li>

                <li  data-toggle="collapse" data-target="#slides" class="collapsed">
                  <a href="#"><i class="fa fa-television"></i>Slides<span class="arrow"></span></a>
                </li>
                <ul class="sub-menu collapse" id="slides">
                  <div class="infosub">Losse slides om aan e huidige project toe te voegen.</div>
                  <li id="een_s">Alles</a></li>
                  <li id="een_s_algemeen">Algemeen</a></li>
                  <li id="een_s_eten">Eten</a></li>
                  <li id="een_s_drinken">Drinken</></li>
                  <li id="een_s_menukaart">Menukaart</></li>
                </ul>


                <li  data-toggle="collapse" data-target="#enkel_scherm" class="collapsed">
                  <a href="#"><i class="fa fa-television"></i>Enkel scherm templates<span class="arrow"></span></a>
                </li>
                <ul class="sub-menu collapse" id="enkel_scherm">
                  <div class="infosub">Deze thema's zijn geschikt voor enkele schermen.</div>
                  <li id="een_s">Alles</a></li>
                  <li id="een_s_algemeen">Algemeen</a></li>
                  <li id="een_s_eten">Eten</a></li>
                  <li id="een_s_drinken">Drinken</></li>
                  <li id="een_s_menukaart">Menukaart</></li>
                </ul>

                <li data-toggle="collapse" data-target="#multischerm" class="collapsed">
                  <a href="#"><i class="fa fa-television"></i>Multi scherm templates<span class="arrow"></span></a>
                </li>
                <ul class="sub-menu collapse" id="multischerm">
                  <div class="infosub">Deze thema's zijn geschikt voor 2 of meer schermen.</div>
                  <li  data-toggle="collapse" data-target="#multi_twee" class="collapsed">
                    <a href="#"><i class="fa fa-television"></i> 2 schermen<span class="arrow"></span></a>
                  </li>

                  <ul class="sub-menu collapse" id="multi_twee">
                    <li id="multi_2">Alles</a></li>
                    <li id="multi_2_algemeen">Algemeen</a></li>
                    <li id="multi_2_eten">Eten</a></li>
                    <li id="multi_2_drinken">Drinken</></li>
                    <li id="multi_2_menukaart">Menukaart</></li>
                  </ul>

                  <li  data-toggle="collapse" data-target="#multi_drie" class="collapsed">
                    <a href="#"><i class="fa fa-television"></i> 3 schermen<span class="arrow"></span></a>
                  </li>

                  <ul class="sub-menu collapse" id="multi_drie">
                    <li id="multi_3">Alles</a></li>
                    <li id="multi_3_algemeen">Algemeen</a></li>
                    <li id="multi_3_eten">Eten</a></li>
                    <li id="multi_3_drinken">Drinken</></li>
                    <li id="multi_3_menukaart">Menukaart</></li>
                  </ul>

                  <li  data-toggle="collapse" data-target="#multi_vier" class="collapsed">
                    <a href="#"><i class="fa fa-television"></i> 4 schermen<span class="arrow"></span></a>
                  </li>

                  <ul class="sub-menu collapse" id="multi_vier">
                    <li id="multi_4">Alles</a></li>
                    <li id="multi_4_algemeen">Algemeen</a></li>
                    <li id="multi_4_eten">Eten</a></li>
                    <li id="multi_4_drinken">Drinken</></li>
                    <li id="multi_4_menukaart">Menukaart</></li>
                  </ul>

                  <li  data-toggle="collapse" data-target="#multi_vijf" class="collapsed">
                    <a href="#"><i class="fa fa-television"></i> 5 schermen<span class="arrow"></span></a>
                  </li>

                  <ul class="sub-menu collapse" id="multi_vijf">
                    <li id="multi_5">Alles</a></li>
                    <li id="multi_5_algemeen">Algemeen</a></li>
                    <li id="multi_5_eten">Eten</a></li>
                    <li id="multi_5_drinken">Drinken</></li>
                    <li id="multi_5_menukaart">Menukaart</></li>
                  </ul>
                </ul>
            </div>
            <div class="infosub bottom"><span class="error">Let op:</span><br />wanneer u een thema importeert wordt de oude gegevens overschreven. Hieronder vind u de link om een backup te maken van u huidige gegevens. <br /><br />
            </div>
            <div class="exportcurrent">Backup huidige stream<br /><a href="/admin/art_revolution/<?php print $StreamId;?>/export" class="ownbutton" data-toggle="tooltip" data-placement="bottom" title="Export de stream">CS-backup-[<?php print $StreamId;?>]</a>
            </div>

          </div>


        </div>

        <div id="content" class="themelist">
          <div class="notemplate">Geen templates gevonden...</div>
          <?php if ($page['content']) : ?>
            <?php print render($page['content']); ?>
          <?php endif; ?>
          <?php if ($page['after_content']) : ?>
            <?php print render($page['after_content']); ?>
          <?php endif; ?>
        </div>
        <?php

      } else {
        ?>
        <div id="content" class="maincontent col-md-12 col-sm-12 col-xs-12">
          <?php if ($page['content']) : ?>
            <?php print render($page['content']); ?>
          <?php endif; ?>
          <?php if ($page['after_content']) : ?>
            <?php print render($page['after_content']); ?>
          <?php endif; ?>
        </div>
        <?php
      } ?>




      <?php if ($page['footer']) : ?>
        <?php print render($page['footer']); ?>
      <?php endif; ?>
    </div>

    <?php

    } else {
        if (user_is_logged_in() == FALSE) {
        ?>


        <?php

        $imgExts = array("gif", "jpg", "jpeg", "png", "tiff", "tif");
        $url = $background;
        $urlExt = pathinfo($url, PATHINFO_EXTENSION);


        if (in_array($urlExt, $imgExts)) {
        ?>
        <div style="background: url(<?php print $background; ?>" class="notloggedin">
          <?php
          } else {
          ?>
          <div class="notloggedin">
            <video class="videofront" autoplay loop muted playsinline><source src='<?php print $background; ?>'></video>
            <?php
            }
            ?>

            <div class="loginfront">
              <div class="logologin"><img src="/sites/all/themes/fiora/images/logo700px-wit.png"></div>
              <?php
              print $formoutput;
              ?>
              <div class="meerinformatie">

              </div>
            </div>
          </div>

          <?php
          }
      }
      ?>
    <?php
}  ?>

