jQuery(function() {

  jQuery('#switch-me').switchy();

  jQuery('.gender').on('click', function(){
    jQuery('#switch-me').val($(this).attr('gender')).change();
  });

  jQuery('#switch-me').on('change', function(){

    // Animate Switchy Bar background color
    var bgColor = '#ccb3dc';

    if (jQuery(this).val() == 'female'){
      bgColor = '#ed7ab0';
    } else if (jQuery(this).val() == 'male'){
      bgColor = '#7fcbea';
    }

    jQuery('.switchy-bar').animate({
      backgroundColor: bgColor
    });

    // Display action in console
    var log =  ''+jQuery(this).val()+'';
    jQuery('#console').html(log).hide().fadeIn();
  });
});
