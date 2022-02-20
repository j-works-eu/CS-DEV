<?php

	global $theme_root;
	global $user;

//	$nodeID = arg(1);
//	$pageisdisplay = arg(0);
//    $isStreamOnline = $pageisdisplay.arg(1);

//	$checkklant = array_intersect(array('klant'), array_values($user->roles));
//	$checkrolreclame = array_intersect(array('reclame'), array_values($user->roles));
//	$check = array_intersect(array('mod', 'administrator'), array_values($user->roles));


	?>

<!DOCTYPE html>
<head>

    <style>
    .pace.pace-active:before {
        position: absolute;
        top: 42%;
        background-image: url(/sites/all/themes/CSeditor/images/pace-logo.png);
        font-family: 'Open Sans Condensed', sans-serif !important;
        content: "";
        background-repeat: no-repeat;
        height: 75px;
        transform: scale(1.1);
        width: 400px;
        left: calc(50% - 140px);
      }
    </style>

    <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;577;600;700;800;900&display=swap" rel="stylesheet">
    <link href="<?php echo $theme_root; ?>/css/pace.min.css" rel="stylesheet" />

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

    <script src="<?php echo $theme_root; ?>/js/pace.min.js" data-pace-options='{ "elements": false, "startOnPageLoad": true, "ajax": false, "restartOnRequestAfter": false }'></script>

    <script src="<?php echo $theme_root; ?>/js/jquery.js"></script>

    <script>

        var suplayer = $(".super-container-layer");
        var burgerlayer = $(".hamburger-box-layer");

        burgerlayer.on("click", function (e) {
            $(this).toggleClass("active");
            suplayer.toggleClass("menu-on-layer");
        });
        $('.js-nav-layer').click(function(){
            $(this).parent().find('.menuright-layer').toggleClass('active');
        });
    </script>
    <?php print $styles; ?>

    <?php print $head; ?>
    <title><?php print $head_title; ?></title>
    </head>
    <body class="<?php print $classes; ?>" <?php print $attributes; ?>>

    <?php print $page_top; ?>

    <div id="messages">
        <div class="section clearfix">
            <?php print $messages; ?>
        </div>
    </div>

    <div class="container clientTOP">
        <div class="row">
            <div class="col-sm-4">
                <div class="bigtitle">
                <?php print t('CLIENT PORTAL');?>
                </div>
            </div>

            <div class="col-sm-4">
                <div class="storagedivcontainer">
                    <?php print views_embed_view('upload_space', $display_id = 'block_1') ?>
                </div>
            </div>

            <div class="col-sm-4">
                <div class="menuDIV">
        NEW MENU
                </div>
            </div>


        </div>
    </div>
    <?php print $page; ?>

    <?php print $page_bottom; ?>
    <?php print $scripts; ?>
</body>
</html>


