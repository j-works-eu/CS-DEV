/**
 * Contains javascript to refresh alert div contents.
 *
 * @file site_alert.js
 */

(function ($) {

var basePath;

  Drupal.behaviors.site_alert_defensie_dhc = {
    attach: function(context, settings) {
      basePath = settings.basePath;
      loadAlert($('.site-alertDefensie', context));
    }
  };

  // Function to update alert text.
  var loadAlert = function (site_alert_defensie_dhc) {
    var callback = basePath + 'ajax/site_alert_defensie_dhc';

    // Object contains information about the currently loaded theme for
    // processing by our theme callback. Without it the default theme is always
    // assumed.
    var options = {
      ajax_page_state: Drupal.settings.ajaxPageState
    };
    site_alert_defensie_dhc.load(callback, options);

    // Update content at configured interval.
    if (Drupal.settings.site_alert_defensie_dhc.timeout > 0) {
      setTimeout(function() { loadAlert(site_alert_defensie_dhc); }, Drupal.settings.site_alert_defensie_dhc.timeout * 1000);
    }

  };

})(jQuery);
