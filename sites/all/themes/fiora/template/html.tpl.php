<?php

	global $theme_root;
	global $user;

	$nodeID = arg(1);
	$pageisdisplay = arg(0);
    $isStreamOnline = $pageisdisplay.arg(1);

	$checkklant = array_intersect(array('klant'), array_values($user->roles));
	$checkrolreclame = array_intersect(array('reclame'), array_values($user->roles));
	$check = array_intersect(array('mod', 'administrator'), array_values($user->roles));
	$username = $user->name;

	$account = user_load($user->uid);
	$reclame_id = $account->name;
	$slideshow = art_revolution_load($reclame_id);
	$slideshow2 = art_revolution_load($pageisdisplay);

	$startwidth =  $slideshow->settings->schermwidth ??= null;
	$startw =  $slideshow2->settings->width ??= null;
	$startheight =   $slideshow->settings->schermheight ??= null;
	$starth =   $slideshow2->settings->height ??= null;

    $IPinfo = homemade_api_IPinfo();
    $refresh = homemade_refresh_page();
    $refreshTime = homemade_refreshTime();
    $artRevolutionFields = art_revolution_selectFields($reclame_id);
        $artREV_FRP = $artRevolutionFields->field_force_refresh_page_value ??= null;
        $artREV_UID = $artRevolutionFields->uid ??= null;

?>

  <?php  if ($nodeID == 5) {
      if (!empty($page)) {
          echo $page;
      }
    die;
  }
   if ($nodeID == 2035) {
       if (!empty($page)) {
           echo $page;
       }
       die;
  }
   if ($nodeID == 2036) {
       if (!empty($page)) {
           echo $page;
       }
       die;
  }
   if ($pageisdisplay == 'refreshdateminutes.php') {
       if (!empty($page)) {
           echo $page;
       }
       die;
  }
  else { ?>

    <!DOCTYPE html>
    <head>

      <?php

      // COOKIE SESSION DISPLAY
      $output = array_slice($_COOKIE, 2);
      $SID = '';
      foreach($output as $key => $value) {
        $SID =  $value;
      }

//      echo '<pre>';
//      print_r($SID);
//      echo '</pre>';

      // STREAM DISPLAY HEADER SETTINGS

      if (user_is_logged_in() == TRUE && $isStreamOnline == 'display' . $reclame_id) {

        // REFRESH PAGE ON X HOURS
        echo "<meta http-equiv='refresh' content=" . $refresh . ">";

        //REFRESH PAGE ON SPECIFIC TIME
        if ($refreshTime !== 'none') { ?>
          <script src="<?php echo $theme_root; ?>/js/custom/timeRefresh.js"></script>
          <script>refreshAt(<?php echo $refreshTime; ?>,0);</script>
        <?php }

        // FIXED WIDTH AND HEIGHT BASED ON SETTINGS
        if (!empty($startheight)) {
          echo "<meta name='viewport' content='width=$startwidth, height=$startheight, user-scalable=no' />";
        }


        // REFRESH EVERY 10 SEC.
        ?>
              <script>
                setInterval(function(){
                  // FORCE PAGE REFRESH
                  $('#forcepageRefresh').load('/force-page-refresh.php');
                }, 10000);
              </script>
        <?php
      }

      // WHEN USER IS NOT LOGGED IN HEADER EXTRA SETTINGS

      if (user_is_logged_in() == FALSE) { ?>

        <!-- ACE OVERLAY LOADER -->
        <link href="<?php echo $theme_root; ?>/css/pace.min.css" rel="stylesheet" />
        <script src="<?php echo $theme_root; ?>/js/pace.min.js" data-pace-options='{ "elements": false, "startOnPageLoad": true, "ajax": false, "restartOnRequestAfter": false }'></script>
      <?php }

      ?>
      <script>
        // API KEYS
        let apiKeys = {
          openWeatherAPI  : '<?php echo homemade_api_openWeather(); ?>',
          IPinfo : '<?php echo homemade_api_IPinfo(); ?>',
        }
      </script>

      <?php if (!empty($head)) {
          print $head;
      } ?>

      <title><?php if (!empty($head_title)) {
              print $head_title;
          } ?></title>

      <?php if (!empty($styles)) {
          print $styles;
      } ?>

      <script src="<?php echo $theme_root; ?>/js/jquery.js"></script>
      <!-- ELFSIGN SCRIPT -->
      <script src="https://apps.elfsight.com/p/platform.js" defer></script>
      <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;577;600;700;800;900&display=swap" rel="stylesheet">
    </head>
    <body class="<?php if (!empty($classes)) {
        print $classes;
    } ?>" <?php if (!empty($attributes)) {
        print $attributes;
    } ?>>

    <!-- PAGE REFRESH SCRIPT -->
    <span style="visibility: hidden; position:absolute; right;" id="forcepageRefresh"></span>

    <!-- RUN THAT CRON BABY... -->
    <span style="visibility: hidden; position:absolute; right;" id="runTHAcron"></span>

    <?php if (!empty($page_top)) {
        print $page_top;
    } ?>
    <?php if (!empty($page)) {
        print $page;
    } ?>
    <?php if (!empty($page_bottom)) {
        print $page_bottom;
    } ?>
    <?php if (isset($scripts)) {
        print $scripts;
    } ?>


    <script>

      /** //-----START RIGHT MENU---------------------- **/

      var sup = $(".super-container");
      var burger = $(".hamburger-box");

      burger.on("click", function (e) {
        $(this).toggleClass("active");
        sup.toggleClass("menu-on");
      });
      $('.js-nav').click(function(){
        $(this).parent().find('.menuright').toggleClass('active');
      });

      /** //-----END RIGHT MENU---------------------- **/

    </script>

    </body>
    </html>

    <span style="visibility: hidden; position: absolute; float: right;" id="forcepageRefresh"></span>
  <?php } ?>


