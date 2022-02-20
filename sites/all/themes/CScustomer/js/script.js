(function($) {
 "use strict";

  var entercode = Drupal.t("Enter your code");
  var enterusername = Drupal.t("Username");
  var enterPassword = Drupal.t("Password");

  if (window.location.href.indexOf("play.") > -1) {

    if ($('body').hasClass('not-logged-in')) {

      $("#edit-name").attr("placeholder", entercode);
      $(".form-item.form-type-textfield.form-item-name label").css("display", "none");
      $(".form-item.form-type-password.form-item-pass").css("display", "none");

      $("#edit-name").bind('input', function () {
        var stt = $(this).val();
        $("#edit-pass").val(stt);
      });

      $(function() {
        Pace.on("done", function(){
          $("#edit-name").focus();
        });
      });
    }
  }

  if (window.location.href.indexOf("login.") > -1) {

    if ($('body').hasClass('not-logged-in')) {
      $("#edit-name").attr("placeholder", enterusername);
      $("#edit-pass").attr("placeholder", enterPassword);
      $(".form-item.form-type-textfield.form-item-name label").css("display", "none");
      $(".form-item.form-type-password.form-item-pass label").css("display", "none");
    }
  }

  /* ==============================================
  TOOLTIP
  =============================================== */

   $('[rel="tooltip"]').tooltip();



    // setInterval(function(){
    //     $(".views-field-php-7").load(location.href + " .views-field-php-7>*", "", function() {
    //
    //     });
    // }, 10000); // REFRESH serverSpecs EVERY 15 SECONDS

})(jQuery);
