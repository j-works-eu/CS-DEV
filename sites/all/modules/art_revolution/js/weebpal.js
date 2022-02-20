

(function ($) {
  $(document).ready(function () {
    $('.wifi').click(function() {
      console.log('hi');
      $('form#converter-wifi-node-form').toggle();
    });
  });
});
