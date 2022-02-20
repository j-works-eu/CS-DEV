
/** #07 - CANCEL THE LIMIT @ELFSIGHT **/
function setIntervalX(callback, delay, repetitions) {
  var x = 0;
  var intervalID = window.setInterval(function () {

    callback();

    if (++x === repetitions) {
      window.clearInterval(intervalID);
    }

  }, delay);
}

// @Elfsight remove overlay disabled

$(function(){
  setIntervalX(function () {
    jQuery('a[href*="utm_source="]').attr('style', 'display: none !important');

  }, 1000, 5);

  setIntervalX(function () {
    /** #07A - Click event more buttons **/
    $('.eapps-facebook-feed-load-more-label').trigger( "click" );
    $('.eapps-facebook-feed-load-more-label').remove();
  }, 4000, 1);

});


    //
    // Adds tooltips on attribute [data-toggle] bootstrap
    //
    jQuery('[data-toggle="tooltip"]').tooltip({
        trigger : "hover"
    });


function gjCountAndRedirect(secounds) {

  $('#gj-counter-num').text(secounds);
  $('#gj-counter-box').show();

  var interval = setInterval(function() {
    secounds = secounds - 1;
    $('#gj-counter-num').text(secounds);

    if (secounds == 0) {
      clearInterval(interval);
      $('#gj-counter-box').hide();
      window.location.replace("/force-page-refresh");
    }
  }, 1000);

}


// Disable slides --------------------------------------------- //

$('.slideitem:not(:nth-child(1))').removeClass("current");


// Themes knoppen widget --------------------------------------------- //


// Save button show after click theme --------------------- //

$('.form-item').click('click', function() {
    $("#art-revolution-import-theme-form input").fadeIn();
});


// Start themes  ---------------------------- //


$("#alles").click(function(){

    $(".notemplate").hide();

        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".theme" ).each(function() {
            $(this).parents().show();
        });
});


// ----------------------------------------------------- //

// Start enkel scherm themes  ---------------------------- //

$("#een_s").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.enkelscherm') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".enkelscherm" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#een_s_algemeen").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.enkelscherm.algemeen') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".enkelscherm.algemeen" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#een_s_eten").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.enkelscherm.eten') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".enkelscherm.eten" ).each(function() {
            $(this).parents().show();
        });
    }  else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#een_s_drinken").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.enkelscherm.drinken') ) {
        $(".notemplate").hide();
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".enkelscherm.drinken" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#een_s_menukaart").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.enkelscherm.menukaart') ) {
        $(".theme").each(function () {
            $(this).parents().hide();
        });
        $(".enkelscherm.menukaart").each(function () {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});


// End enkel scherm themes  ---------------------------- //


// ----------------------------------------------------- //


// Start multi scherm (2) themes  ---------------------- //


$("#multi_2").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.tweescherm') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_2_algemeen").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.tweescherm.algemeen') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm.algemeen" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_2_eten").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.tweescherm.eten') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm.eten" ).each(function() {
            $(this).parents().show();
        });
    }  else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_2_drinken").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.tweescherm.drinken') ) {
        $(".notemplate").hide();
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm.drinken" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_2_menukaart").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.tweescherm.menukaart') ) {
        $(".theme").each(function () {
            $(this).parents().hide();
        });
        $(".tweescherm.menukaart").each(function () {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});


// End multi scherm (2) themes  ------------------------ //

// ----------------------------------------------------- //

// Start multi scherm (3) themes  --------------------- //


$("#multi_3").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.driescherm') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_3_algemeen").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.driescherm.algemeen') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm.algemeen" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_3_eten").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.driescherm.eten') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm.eten" ).each(function() {
            $(this).parents().show();
        });
    }  else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_3_drinken").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.driescherm.drinken') ) {
        $(".notemplate").hide();
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm.drinken" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_3_menukaart").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.driescherm.menukaart') ) {
        $(".theme").each(function () {
            $(this).parents().hide();
        });
        $(".tweescherm.menukaart").each(function () {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

// End multi scherm (3) themes  ------------------------ //

// ----------------------------------------------------- //

// Start multi scherm (4) themes  --------------------- //


$("#multi_4").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.vierscherm') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_4_algemeen").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.vierscherm.algemeen') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm.algemeen" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_4_eten").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.vierscherm.eten') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm.eten" ).each(function() {
            $(this).parents().show();
        });
    }  else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_4_drinken").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.vierscherm.drinken') ) {
        $(".notemplate").hide();
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm.drinken" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_4_menukaart").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.vierscherm.menukaart') ) {
        $(".theme").each(function () {
            $(this).parents().hide();
        });
        $(".tweescherm.menukaart").each(function () {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});


// End multi scherm (4) themes  ------------------------ //

// ----------------------------------------------------- //

// Start multi scherm (5) themes  --------------------- //


$("#multi_5").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.vijfscherm') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_5_algemeen").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.vijfscherm.algemeen') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm.algemeen" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_5_eten").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.vijfscherm.eten') ) {
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm.eten" ).each(function() {
            $(this).parents().show();
        });
    }  else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_5_drinken").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.vijfscherm.drinken') ) {
        $(".notemplate").hide();
        $( ".theme" ).each(function() {
            $(this).parents().hide();
        });
        $( ".tweescherm.drinken" ).each(function() {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

$("#multi_5_menukaart").click(function(){

    $(".notemplate").hide();

    if ( $('img').is('.vijfscherm.menukaart') ) {
        $(".theme").each(function () {
            $(this).parents().hide();
        });
        $(".tweescherm.menukaart").each(function () {
            $(this).parents().show();
        });
    } else {
        $( ".theme" ).each(function() {
            $(this).parents('.form-item').hide();
        });
        $(".notemplate").fadeIn();
    }
});

// End multi scherm (5) themes  ------------------------ //

// ----------------------------------------------------- //



