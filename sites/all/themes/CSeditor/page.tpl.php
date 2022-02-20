<div id="page">
    <div id="content" class="clearfix">
      <div class="element-invisible"><a id="main-content"></a></div>
        <div id="messages">
            <div class="section clearfix">
                <?php print $messages; ?>
            </div>
        </div>
        <?php print render($page['content']); ?>
    </div>
    <div id="footer">
      <?php print $feed_icons; ?>
        <script>
            // API KEYS
            let apiKeys = {
                openWeatherAPI  : '<?php echo homemade_api_openWeather(); ?>',
                IPinfo : '<?php echo homemade_api_IPinfo(); ?>',
            }
        </script>
    </div>
</div>
