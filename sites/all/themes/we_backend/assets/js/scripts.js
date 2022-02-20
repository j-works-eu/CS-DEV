(function ($) {

Drupal.WeebPalBackend = Drupal.WeebPalBackend || {};

Drupal.behaviors.actionWeebPalBackend = {
  attach: function (context) {
    Drupal.WeebPalBackend.tab();
  }
};

Drupal.WeebPalBackend.tab = function() {
  $tabs = $("#content .section .tabs");
  if ($tabs.find("ul.secondary").length) {
    $tabs.addClass("tab-secondary");
  }
};


$(document).ready(function () {

  $(".wifi").click(function() {
    $("#converter-wifi-node-form").fadeIn();
    $(".wifidescription").fadeIn();
    $("#converter-node-form").hide();
    $(".cabledescription").hide();
  });

  $(".cable").click(function() {
    $("#converter-node-form").fadeIn();
    $(".cabledescription").fadeIn();
    $("#converter-wifi-node-form").hide();
    $(".wifidescription").hide();
  });

  $(".page-node-248 #edit-next").prop('value', 'Upload');

});


})(jQuery);
