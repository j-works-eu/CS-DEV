<?php global $theme_root; ?>
<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="author" content="">
        <title><?php print $head_title; ?></title>
        <!-- Favicons
        ================================================== -->
        <link rel="shortcut icon" href="images/favicon.ico">
        <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
        <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">
        <?php print $styles; ?>
        <script src="<?php echo $theme_root; ?>/js/jquery.js"></script>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <div class="wrapper maintainance">
            <header class="header">
                <div class="menu-wrapper">
                    <nav class="navbar navbar-default" role="navigation">
                        <div class="container">
                            <div class="navbar-header">
                                <a class="navbar-brand" href="#"><?php echo $site_name; ?></a>
                            </div>
                        </div><!--/.container-fluid -->
                    </nav>
                </div><!-- end menu-wrapper -->
            </header><!-- end header -->
            <div class="white-wrapper">
                <div class="container">
                    <div class="message-text">
                        <?php print $content; ?>
                    </div>
                </div>
            </div>
            <?php
            $footer = block_get_blocks_by_region('footer');
            print render($footer);
            ?>
        </div>
        <?php print $scripts; ?>
    </body>
</html>