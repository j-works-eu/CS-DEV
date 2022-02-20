/**
 *
 ******************************************************************************
 ***********************************************************************

 INDEX LIST:

 <script type="text/javascript">
 #00 - GOOGLE PLACE ID MAP LOOKUP (MODAL POPUP)


 jQuery(document).ready(function ($)
 #00 - NEW LAYER FUNCTIONS / ACTIONS / OPTIONS
 #01 - LOAD ALL SELECTED ELEMENTS ON CLICK EVENENT
 #02 - START WEATHER WIDGET CLICK EVENTS
 #03 - LOAD ALL SELECTED ELEMENTS ON SLIDE CLICK AND PAGE LOAD
 #04 - POPUP NOT SUPPORTED BROWSERS
 #05 - REMOVE ANNOYING TRANSPARENCY LAYER JQUERY UI DISABLED CLASS
 #06 - ADDS TOOLTIPS ON ATTRIBUTE [DATA-TOGGLE] BOOTSTRAP
 #07 - CANCEL THE LIMIT @ELFSIGHT
 #08 - STORE / REMEMBER (COOKIE) SLIDES LAST POSITION
 #09 - START CHANGE FONT STYLE
 #10 - GOOGLE PLACE ID CLICK FUNCTION (ADD PLACE ID TO INPUT FIELD)
 #11 - SLIDE DATE DISABLE FIELDS RESET

 ***********************************************************************
 ******************************************************************************
 *
 */



var filehandle = null;

/** +***************************************************************************** **/
/** #00 - GOOGLE PLACE ID MAP LOOKUP (MODAL POPUP)
 /** +***************************************************************************** **/

"use strict";
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 51.5854362,
      lng: 4.9799863,
    },
    zoom: 8,
  });
  var input = document.getElementById("pac-input");
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map); // Specify just the place data fields that you need.

  autocomplete.setFields(["place_id", "geometry", "name"]);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById("infowindow-content");
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
  });
  marker.addListener("click", function () {
    infowindow.open(map, marker);
  });
  autocomplete.addListener("place_changed", function () {
    infowindow.close();
    var place = autocomplete.getPlace();

    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    } // Set the position of the marker using the place ID and location.

    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location,
    });
    marker.setVisible(true);
    infowindowContent.children.namedItem("place-name").textContent =
      place.name;
    infowindowContent.children.namedItem("place-id").textContent =
      place.place_id;
    infowindowContent.children.namedItem("place-address").textContent =
      place.formatted_address;
    infowindow.open(map, marker);
  });
}


/** //-----END-----//\\//\\//\\//\\---------START-------// **/

jQuery(document).ready(function ($) {



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


  $('img#plaatjelink').on('click', function() {
    $('#background-image').trigger("click");
  });

  $('.bguploadbutton').on('click', function() {
    $('#background-image').trigger("click");
  });

  $('#addslide').on('click', function() {
    $('.close').on('click', function() {
      $('#slideslist li:first-child .titleslide').trigger( "click" );
      $('#slideslist li:last-child').remove();
    });
  });


  // var rows = $('.count').length;
  // $('#counter').html(rows);


  // FACEBOOK BUTTON (WORK IN PROGRESS)

  // window.fbAsyncInit = function() {
  //     FB.init({
  //         appId      : '376559563487184',
  //         cookie     : true,
  //         xfbml      : true,
  //         version    : 'v8.0'
  //     });
  //
  //     FB.AppEvents.logPageView();
  //
  // };
  //
  // (function(d, s, id){
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {return;}
  //     js = d.createElement(s); js.id = id;
  //     js.src = "https://connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  // }(document, 'script', 'facebook-jssdk'));
  //
  // function checkLoginState() {
  //     FB.getLoginStatus(function(response) {
  //         statusChangeCallback(response);
  //     });
  // }

  var $currentSlide = jQuery('#slideslist li.current.active').attr('index');
  var $currentLayer = jQuery('#layerslist li.active').attr('index');



  /** +***************************************************************************** **/
  /** #00 - NEW LAYER FUNCTIONS / ACTIONS / OPTIONS
   /** +***************************************************************************** **/


  /** +************************************************************ **/
  /** DISABLE VIDEO IF MORE THEN 2 ARE SELECTED ON LAYER
   /** +************************************************************ **/

  setTimeout(function () {

    if ($('.vertical-tabs-list').find("#layerslist > li .video").length > 1) {
      $('i#video').hide();
    }
    else {
      $("#video-disabled").hide();
    }
  }, 1000);


  /** //-----END-----//\\//\\//\\//\\---------START-------// **/



  /** +************************************************************ **/
  /** MODAL POPUP LAYER SELECT TYPE CLICK EVENTS
   /** +************************************************************ **/

  $('.layeroptions i').on('click', function() {

    let value = $(this).attr("data-val");
    $('#addLayer').trigger('click');

    if (value === 'text') {
      setTimeout(function () {
        $('li.menutext i').trigger("click");
      }, 500);
      $('li.menutext i').trigger("click");
    }
    if (value === 'image') {
      $('li.menuimage i').trigger("click");
      // $('.field_bg_img input').trigger("click");
      $('.selected').addClass('picture');
    }
    if (value ==='video') {
      $('li.menuvideo i').trigger("click");
      // $('.field_bg_img input').trigger("click");
      $('.selected').addClass('video');

    }
    if (value === 'clock') {
      $('li.menuclock i').trigger("click");
      $('.selected').addClass('clock');
    }
    if (value === 'news') {
      $('li.menunews i').trigger("click");
      $('.selected').addClass('news');
    }
    if (value === 'widgets') {
      $('li.menuwidgets i').trigger("click");
      $('.selected').addClass('widgets');
    }
    if (value === 'animatie') {
      setTimeout(function(){
        $('li.menuanimatie i').trigger("click");
      }, 500);
    }
    if (value === 'weather') {
      setTimeout(function(){
        $('li.menuweather i').trigger("click");
      }, 500);
    }
    if (value === 'instagram') {
      setTimeout(function(){
        $('li.menuinstagram i').trigger("click");
      }, 500);
    }
    if (value === 'facebook') {
      setTimeout(function(){
        $('li.menufacebook i').trigger("click");
      }, 500);
    }
    if (value === 'googlereview') {
      setTimeout(function(){
        $('li.menugooglereview i').trigger("click");
      }, 500);
    }
    // if ($('#slidestoggle').hasClass("")) {
    //   $('#slidestoggle').trigger('click');
    // }
  });


  /** //-----END-----//\\//\\//\\//\\---------START-------// **/




  /** +************************************************************ **/
  /** MODAL POPUP HOVER TYPES SHOW / HIDE TEXT
   /** +************************************************************ **/

  $('i#text').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-text").fadeIn();
  } , function() {
    // $(".hover-text").hide();
  });
  $('i#image').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-image").fadeIn();
  } , function() {
    // $(".hover-image").hide();
  });
  $('i#video').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-video").fadeIn();
  } , function() {
    //$(".hover-video").hide();
  });
  $('#video-disabled').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-video-disabled").fadeIn();
  } , function() {
    // $(".hover-video-disabled").hide();
  });
  $('i#clock').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-clock").fadeIn();
  } , function() {
    // $(".hover-clock").hide();
  });
  $('i#news').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-news").fadeIn();
  } , function() {
    //$(".hover-news").hide();
  });
  $('i#widgets').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-widgets").fadeIn();
  } , function() {
    //$(".hover-widgets").hide();
  });
  $('i#animatie').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-animatie").fadeIn();
  } , function() {
    //$(".hover-animatie").hide();
  });
  $('i#weather').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-weather").fadeIn();
  } , function() {
    //$(".hover-weather").hide();
  });
  $('i#iframe').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-iframe").fadeIn();
  } , function() {
    //$(".hover-weather").hide();
  });
  $('i#instagram').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-instagram").fadeIn();
  } , function() {
    //$(".hover-instagram").hide();
  });
  $('i#facebook').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-facebook").fadeIn();
  } , function() {
    //$(".hover-facebook").hide();
  });
  $('i#googlereview').hover( function() {
    $(".hiddenelement").hide();
    $(".hover-googlereview").fadeIn();
  } , function() {
    //$(".hover-googlereview").hide();
  });


  /** //-----END-----//\\//\\//\\//\\---------START-------// **/




  /** +************************************************************ **/
  /** TYPE ANIMATION CLICK FUNCTION
   /** +************************************************************ **/


  $('#aniclickrain').on('click', function(){
    $(".text-select-fullscreen-animation").val('fsa-rain');
    $(".text-select-fullscreen-animation").trigger('change');
  });
  $('#aniclicksnow').on('click', function(){
    $(".text-select-fullscreen-animation").val('fsa-snow');
    $(".text-select-fullscreen-animation").trigger('change');
  });
  $('#aniclickstars').on('click', function(){
    $(".text-select-fullscreen-animation").val('fsa-stars');
    $(".text-select-fullscreen-animation").trigger('change');
  });
  $('#aniclickblocks').on('click', function(){
    $(".text-select-fullscreen-animation").val('fsa-blocks');
    $(".text-select-fullscreen-animation").trigger('change');
  });
  $('#aniclickconfetti').on('click', function(){
    $(".text-select-fullscreen-animation").val('fsa-confetti');
    $(".text-select-fullscreen-animation").trigger('change');
  });
  $('#aniclickballoons').on('click', function(){
    $(".text-select-fullscreen-animation").val('fsa-balloons');
    $(".text-select-fullscreen-animation").trigger('change');
  });
  $('#aniclickballs').on('click', function(){
    $(".text-select-fullscreen-animation").val('fsa-balls');
    $(".text-select-fullscreen-animation").trigger('change');
  });
  $('#aniclickfireflies').on('click', function(){
    $(".text-select-fullscreen-animation").val('fsa-fireflies');
    $(".text-select-fullscreen-animation").trigger('change');
  });
  $('#aniclickfireworks').on('click', function(){
    $(".text-select-fullscreen-animation").val('fsa-fireworks');
    $(".text-select-fullscreen-animation").trigger('change');
  });

  /** //-----END-----//\\//\\//\\//\\---------START-------// **/




  /** +***************************************************************************** **/
  /** #01 - LOAD ALL SELECTED ELEMENTS ON CLICK EVENENT
   /** +***************************************************************************** **/

  /** +************************************************************ **/
  /** START ANIMATION WIDGET CLICK EVENTS
   /** +************************************************************ **/

  function animatedclassremove() { $('#' + $currentSlide + '-' + $currentLayer).find('#animatieframe').removeClass(); }

  $('#aniclickrain').click(function () {
    animatedclassremove();
    $('.anibutton').removeAttr('style');
    $('#aniclickrain').css({"filter": "invert(100%)"});
  });
  $('#aniclicksnow').click(function () {
    animatedclassremove();
    $('.anibutton').removeAttr('style');
    $('#aniclicksnow').css({"filter": "invert(100%)"});
  });
  $('#aniclickstars').click(function () {
    animatedclassremove();
    $('.anibutton').removeAttr('style');
    $('#aniclickstars').css({"filter": "invert(100%)"});
  });
  $('#aniclickblocks').click(function () {
    $('.anibutton').removeAttr('style');
    $('#aniclickblocks').css({"filter": "invert(100%)"});
  });
  $('#aniclickconfetti').click(function () {
    animatedclassremove();
    $('.anibutton').removeAttr('style');
    $('#aniclickconfetti').css({"filter": "invert(100%)"});
  });
  $('#aniclickballoons').click(function () {
    animatedclassremove();
    $('.anibutton').removeAttr('style');
    $('#aniclickballoons').css({"filter": "invert(100%)"});
  });
  $('#aniclickballs').click(function () {
    animatedclassremove();
    $('.anibutton').removeAttr('style');
    $('#aniclickballs').css({"filter": "invert(100%)"});
  });
  $('#aniclickfireflies').click(function () {
    animatedclassremove();
    $('.anibutton').removeAttr('style');
    $('#aniclickfireflies').css({"filter": "invert(100%)"});
  });
  $('#aniclickfireworks').click(function () {
    animatedclassremove();
    $('.anibutton').removeAttr('style');
    $('#aniclickfireworks').css({"filter": "invert(100%)"});
  });

  /** +************************************************************ **/
  /** END ANIMATION WIDGET CLICK EVENTS
   /** +************************************************************ **/




  /** //-----END-----//\\//\\//\\//\\---------START-------// **/




  /** +***************************************************************************** **/
  /** #02 - START WEATHER WIDGET CLICK EVENTS
   /** +***************************************************************************** **/

  /** WEATHER WIDGET FORECAST **/
  $('.WForecast-options-button').click(function () {
    let WForecast =  $currentSlide + '-' + $currentLayer + '-' + $("select[name=WForecast] option:selected").val();
    let sidvalueshort =  $currentSlide + '-' + $currentLayer + '-';

    /** WEATHER WIDGET FORECAST OFF **/
    if (WForecast === $currentSlide + '-' + $currentLayer + '-' + 'true') {
      sidvalueshort + $('select[name=WForecast]').val("false").change();
      sidvalueshort + $('.demo-forecaster').removeClass('bghide');
      sidvalueshort + $('.WForecast-options').removeClass('W-bg-uit');
      sidvalueshort + $('.WForecast-options').addClass('W-bg-aan');
    }
    /** WEATHER WIDGET FORECAST ON **/
    if (WForecast === $currentSlide + '-' + $currentLayer + '-' + 'false') {
      sidvalueshort + $('select[name=WForecast]').val("true").change();
      sidvalueshort + $('.demo-forecaster').addClass('bghide');
      sidvalueshort + $('.WForecast-options').removeClass('W-bg-aan');
      sidvalueshort + $('.WForecast-options').addClass('W-bg-uit');
    }
  });

  /** WEATHER WIDGET BACKGROUNDS **/
  $('.WBG-options-button').click(function () {
    let WBGvalue =  $currentSlide + '-' + $currentLayer + '-' + $("select[name=Wbgactive] option:selected").val();
    let sidvalueshort =  $currentSlide + '-' + $currentLayer + '-';

    /** WEATHER WIDGET BACKGROUNDS OFF **/
    if (WBGvalue === $currentSlide + '-' + $currentLayer + '-' + 'true') {
      sidvalueshort + $('select[name=Wbgactive]').val("false").change();
      sidvalueshort + $('.weatherwidgetImage').removeClass('bghide');
      sidvalueshort + $('.demo-weatherwidgetImage').removeClass('bghide');
      sidvalueshort + $('.W-options-BG').removeClass('W-bg-uit');
      sidvalueshort + $('.W-options-BG').addClass('W-bg-aan');
    }

    /** WEATHER WIDGET BACKGROUNDS OFF **/
    if (WBGvalue === $currentSlide + '-' + $currentLayer + '-' + 'false') {
      sidvalueshort + $('select[name=Wbgactive]').val("true").change();
      sidvalueshort + $('.weatherwidgetImage').addClass('bghide');
      sidvalueshort + $('.demo-weatherwidgetImage').addClass('bghide');
      sidvalueshort + $('.W-options-BG').removeClass('W-bg-aan');
      sidvalueshort + $('.W-options-BG').addClass('W-bg-uit');
    }
  });

  /** WEATHER ANIMATIONS BACKGROUNDS **/
  $('.WA-options-button').click(function () {
    let WAvalue =  $currentSlide + '-' + $currentLayer + '-' + $("select[name=Waactive] option:selected").val();
    let sidvalueshort =  $currentSlide + '-' + $currentLayer + '-';

    /** WEATHER WIDGET ANIMATION OFF **/
    if (WAvalue === $currentSlide + '-' + $currentLayer + '-' + 'true') {
      sidvalueshort + $('select[name=Waactive]').val("false").change();
      sidvalueshort + $('.weatherwidgetAnimated').removeClass('Whide');
      sidvalueshort + $('.demo-weatherwidgetAnimated').removeClass('Whide');
      sidvalueshort + $('.WA-options').removeClass('W-bg-uit');
      sidvalueshort + $('.WA-options').addClass('W-bg-aan');
      //console.log('Hij is uit');
    }

    /** WEATHER WIDGET ANIMATION ON **/
    if (WAvalue === $currentSlide + '-' + $currentLayer + '-' + 'false') {
      sidvalueshort + $('select[name=Waactive]').val("true").change();
      sidvalueshort + $('.weatherwidgetAnimated').addClass('Whide');
      sidvalueshort + $('.demo-weatherwidgetAnimated').addClass('Whide');
      sidvalueshort + $('.WA-options').removeClass('W-bg-aan');
      sidvalueshort + $('.WA-options').addClass('W-bg-uit');
      //console.log('Hij is aan');
    }
  });

  /** +************************************************************ **/
  /** END WEATHER WIDGET CLICK EVENTS
   /** +************************************************************ **/




  /** //-----END-----//\\//\\//\\//\\---------START-------// **/




  /** +***************************************************************************** **/
  /**  #03 - LOAD ALL SELECTED ELEMENTS ON SLIDE CLICK AND PAGE LOAD
   /** +***************************************************************************** **/

  /** CLICK FUNCTION ON SLIDE LIST **/
  $('#slideslist li').click(function(){

    /** +***************************************************************************** **/
    /**  START VALUES
     /** +***************************************************************************** **/
    let wbgvalue = $currentSlide + '-' + $currentLayer + '-' + $("select[name=Wbgactive] option:selected").val();    /** WEATHER WIDGET BACKGROUND **/
    let Waactive = $currentSlide + '-' + $currentLayer + '-' + $("select[name=Waactive] option:selected").val();    /** WEATHER WIDGET ANIMATION **/
    let wForecast = $currentSlide + '-' + $currentLayer + '-' + $("select[name=WForecast] option:selected").val();   /** WEATHER WIDGET FORECAST **/
    let animationselected = $currentSlide + '-' + $currentLayer + '-' + $("select[name=extrafanimation] option:selected").val();   /** ANIMATION WIDGET SELECT **/
    let sidvalueshort = $currentSlide + '-' + $currentLayer + '-';
    /** +***************************************************************************** **/
    /**  END VALUES
     /** +***************************************************************************** **/



    /** +************************************************************ **/
    /** START ANIMATION WIDGET
     /** +************************************************************ **/

    if (animationselected === sidvalueshort + 'fsa-rain') {
      $('#aniclickrain').css({"filter": "invert(100%)"});
    }
    if (animationselected === sidvalueshort + 'fsa-snow') {
      $('#aniclicksnow').css({"filter": "invert(100%)"});
    }
    if (animationselected === sidvalueshort + 'fsa-stars') {
      $('#aniclickstars').css({"filter": "invert(100%)"});
    }
    if (animationselected === sidvalueshort + 'fsa-blocks') {
      $('#aniclickblocks').css({"filter": "invert(100%)"});
    }
    if (animationselected === sidvalueshort + 'fsa-confetti') {
      $('#aniclickconfetti').css({"filter": "invert(100%)"});
    }
    if (animationselected === sidvalueshort + 'fsa-balloons') {
      $('#aniclickballoons').css({"filter": "invert(100%)"});
    }
    if (animationselected === sidvalueshort + 'fsa-balls') {
      $('#aniclickballs').css({"filter": "invert(100%)"});
    }
    if (animationselected === sidvalueshort + 'fsa-fireflies') {
      $('#aniclickfireflies').css({"filter": "invert(100%)"});
    }
    if (animationselected === sidvalueshort + 'fsa-fireworks') {
      $('#aniclickfireworks').css({"filter": "invert(100%)"});
    }

    /** +************************************************************ **/
    /** END ANIMATION WIDGET SELECT
     /** +************************************************************ **/




    /** +************************************************************ **/
    /** START WEATHER WIDGET
     /** +************************************************************ **/

    /** WEATHER WIDGET FORECAST OFF **/
    if (wForecast === $currentSlide + '-' + $currentLayer + '-' + 'true') {
      sidvalueshort + $('.demo-forecaster').addClass('bghide');
      sidvalueshort + $('.WForecast-options').removeClass('W-bg-aan');
      sidvalueshort + $('.WForecast-options').addClass('W-bg-uit');
    }

    /** WEATHER WIDGET FORECAST ON **/
    if (wForecast === $currentSlide + '-' + $currentLayer + '-' + 'false') {
      sidvalueshort + $('.demo-forecaster').removeClass('bghide');
      sidvalueshort + $('.WForecast-options').removeClass('W-bg-uit');
      sidvalueshort + $('.WForecast-options').addClass('W-bg-aan');
    }

    /** WEATHER WIDGET BACKGROUND OFF **/
    if (wbgvalue === $currentSlide + '-' + $currentLayer + '-' + 'true') {
      sidvalueshort + $('.demo-weatherwidgetImage').addClass('bghide');
      sidvalueshort + $('.weatherwidgetImage').addClass('bghide');
      sidvalueshort + $('.W-options-BG').removeClass('W-bg-aan');
      sidvalueshort + $('.W-options-BG').addClass('W-bg-uit');
    }

    /** WEATHER WIDGET BACKGROUND ON **/
    if (wbgvalue === $currentSlide + '-' + $currentLayer + '-' + 'false') {
      sidvalueshort + $('.demo-weatherwidgetImage').removeClass('bghide');
      sidvalueshort + $('.weatherwidgetImage').removeClass('bghide');
      sidvalueshort + $('.W-options-BG').removeClass('W-bg-uit');
      sidvalueshort + $('.W-options-BG').addClass('W-bg-aan');
    }

    /** WEATHER WIDGET ANIMATION OFF **/
    if (Waactive === $currentSlide + '-' + $currentLayer + '-' + 'true') {
      sidvalueshort + $('.demo-weatherwidgetAnimated').addClass('Whide');
      sidvalueshort + $('.WA-options').removeClass('W-bg-aan');
      sidvalueshort + $('.WA-options').addClass('W-bg-uit');
    }

    /** WEATHER WIDGET ANIMATION ON **/
    if (Waactive === $currentSlide + '-' + $currentLayer + '-' + 'false') {
      sidvalueshort + $('.demo-weatherwidgetAnimated').removeClass('Whide');
      sidvalueshort + $('.WA-options').removeClass('W-bg-uit');
      sidvalueshort + $('.WA-options').addClass('W-bg-aan');
    }

    /** +************************************************************ **/
    /** END WEATHER WIDGET
     /** +************************************************************ **/
  });




  /** //-----END-----//\\//\\//\\//\\---------START-------// **/



  /** +***************************************************************************** **/
  /**  #04 - POPUP NOT SUPPORTED BROWSERS
   /** +***************************************************************************** **/

  /** TRANSLATE SET **/
  var browsersupport = Drupal.t('This browser is not supported, please use Chrome, Microsoft Edge or Brave');
  var titlesupport = Drupal.t('No support for');
  var closesupport = Drupal.t('Close');

  /** +************************************************************ **/
  /** START NOT SUPPORTED BROWSERS
   /** +************************************************************ **/

  /** FIREFOX **/
  if(navigator.userAgent.indexOf("Firefox") != -1 ) {
    swal({
        title: titlesupport + ' ' + 'Firefox',
        text: browsersupport,
        type: "warning",
        confirmButtonClass: "btn-danger",
        confirmButtonText: closesupport,
        html: true,
        closeOnConfirm: true
      },
    );
  }

  /** IE **/
  if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
    swal({
        title: titlesupport + ' ' + 'Internet Explorer',
        text: browsersupport,
        type: "warning",
        confirmButtonClass: "btn-danger",
        confirmButtonText: closesupport,
        html: true,
        closeOnConfirm: true
      },
    );
  }

  /** SAFARI **/
  if(navigator.vendor.match(/apple/i)) {
    swal({
        title: titlesupport + ' ' + 'Safari',
        text: browsersupport,
        type: "warning",
        confirmButtonClass: "btn-danger",
        confirmButtonText: closesupport,
        html: true,
        closeOnConfirm: true
      },
    );
  }

  /** OPERA **/
  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
    swal({
        title: titlesupport + ' ' + 'Opera',
        text: browsersupport,
        type: "warning",
        confirmButtonClass: "btn-danger",
        confirmButtonText: closesupport,
        html: true,
        closeOnConfirm: true
      },
    );
  }

  /** +************************************************************ **/
  /** END NOT SUPPORTED BROWSERS
   /** +************************************************************ **/




  /** //-----END-----//\\//\\//\\//\\---------START-------// **/




  /** #05 - REMOVE ANNOYING TRANSPARENCY LAYER JQUERY UI DISABLED CLASS **/
  $('.ui-state-disabled').removeClass('ui-state-disabled');
  /** +************************************************************ **/


  /** #06 - ADDS TOOLTIPS ON ATTRIBUTE [DATA-TOGGLE] BOOTSTRAP **/
  $('[data-toggle="tooltip"]').tooltip({
    trigger : 'hover'
  });
  /** +************************************************************ **/


  /** ELFSIGHT AANPASSINGEN **/

  /** #07 - CANCEL THE LIMIT @ELFSIGHT **/
  $(function(){
    function delay() {
      //console.log('Remove Elfsight ;@');
      //jQuery("script[src='events-calendar.js']").remove()
      jQuery('a[href*="utm_source="]').attr('style', 'display: none !important');
      //jQuery('[id^=eapps-events-calendar-]').replaceWith( "<div class='notworking'>Het is niet mogelijk om deze widget te gebruiken.</div>");

      /** #07A - Click event more buttons **/
      $('.eapps-facebook-feed-load-more-label').trigger( "click" );
      $('.eapps-facebook-feed-load-more-label').remove();

    }
    window.setInterval( delay, 2000 );
  });



  /** +************************************************************ **/


  /** #08 - STORE / REMEMBER (COOKIE) SLIDES LAST POSITION **/
  $('#slideslist li').click(function(){

    setTimeout(function () {
      //console.log($('.vertical-tabs-list').find("#layerslist > .video").length);
      if ($('.vertical-tabs-list').find("#layerslist > .video").length > 1) {
        $('.layeroptions i#video').hide();
        $('.layeroptions span#video-disabled').show();
      } else {
        $('.layeroptions i#video').show();
        $('.layeroptions span#video-disabled').hide();
      }
    }, 100);

    $('#slideslist li').removeClass('current').removeClass('active');
    $(this).addClass('current').addClass('active');

     localStorage.selectedSlide = $(this).index();
  });

  if (localStorage.selectedSlide) {
    var tb = localStorage.selectedSlide;
    var slide = "#slideslist li[index='" + tb + "']";
    $('#slideslist li.active').removeClass('active').removeClass('current');
    $(slide).addClass('active').addClass('current');
    setTimeout(function() {
      $('#slideslist li.active.current').find('span').eq(0).trigger('click');
      //console.log(tab);
      // $('#slideslist').animate({
      //   scrollTop: $('.current:visible:first').offset().top - 0
      // }, 1000);
      $('#slideslist').scrollTo($('.current'))
    },300);
  }

  /** +************************************************************ **/
  (function ($) {
    $(document).ready (function () {
      // Here goes the selector of the button that starts the upload
      var startUploadButtonClass = '.filefield-source-plupload button[type=submit]';
      var checkForNewFilesInterval = 1000;
      // This line could go in your CSS
      $('head').append('<style>'+ startUploadButtonClass +'{ display:none } </style>');
      // Checking every checkForNewFilesInterval seconds
      setInterval (function () {
        var $pluploadFilelist = $('.plupload .plupload_filelist li');
        var filesToUpload = $pluploadFilelist.length;
        if (filesToUpload>0) {
          $(startUploadButtonClass).click();
        }
      },checkForNewFilesInterval);
    });
  }(jQuery));

  /** #09 - START CHANGE FONT STYLE **/
  var oldClass, newClass;
  jQuery(".selectpicker").bind('change', function () {
    var obj = ".font-" + jQuery(this).data('change');

    newClass = jQuery(this).val();

    /** ADD THE SELECTED CLASS **/
    jQuery(obj).removeClass().addClass(newClass).addClass(obj.substring(1));

    oldClass = newClass;
  });
  /** +************************************************************ **/



  /** //-----END-----//\\//\\//\\//\\---------START-------// **/




  /** +*********************************************************************** **/
  /** #10 - GOOGLE PLACE ID CLICK FUNCTION (ADD PLACE ID TO INPUT FIELD)
   /** +*********************************************************************** **/
  spans = document.querySelectorAll(".classcopy");
  for (const span of spans) {
    span.onclick = function() {
      document.execCommand("copy");
    }

    span.addEventListener("copy", function(event) {
      event.preventDefault();
      if (event.clipboardData) {
        event.clipboardData.setData("text/plain", span.textContent);
        console.log(event.clipboardData.getData("text"))
        $(".googlefindplaceid").modal('hide');
        $("input#google-place-id").val(event.clipboardData.getData("text"))
      }
    });
  }
  /** +*********************************************************************** **/
  /** END GOOGLE PLACE ID CLICK FUNCTION (ADD PLACE ID TO INPUT FIELD)
   /** +*********************************************************************** **/




  /** //-----END-----//\\//\\//\\//\\---------START-------// **/



  /** +*********************************************************************** **/
  /** #11 - SLIDE DATE DISABLE FIELDS RESET
   /** +*********************************************************************** **/


  $('#date-from').ejDateTimePicker({ dateFormat: 'dd-mm-yy hh-mm' });
  $('#date-to').ejDateTimePicker({ dateFormat: 'dd-mm-yy hh-mm' });

  $('#dateTime').ejDateTimePicker({
    dayHeaderFormat: "showHeaderShort",
    width: '200px',
  });

  $('.form-reset').on('click', function () {
    jQuery("input[type=text]" , "#date-disable-enable").each(function(){jQuery(this).val("")});

    // console.log('clean');
  });

  /** +*********************************************************************** **/
  /** END SLIDE DATE DISABLE FIELDS RESET
   /** +*********************************************************************** **/





  //
  // $('#slidestoggle').trigger('click');
  // $('#layerstoggle').trigger('click');

  $('#addLayerItem').click(function(){
    $('#exampleModalPreview').modal('show');
  });

  $(document).on('mousedown', '.inner', function() {
    // if ($('#layerstoggle').hasClass("collapsed")) {
    //   $('#layerstoggle').trigger('click');
    // }
    //
    // if ($('#slidestoggle').hasClass("")) {
    //   $('#slidestoggle').trigger('click');
    // }
  });


  $(document).on('click', '.titlelayerclass', function() {
    // if ($('#layerstoggle').hasClass("collapsed")) {
    //   $('#layerstoggle').trigger('click');
    // }
    //
    // if ($('#slidestoggle').hasClass("")) {
    //   $('#slidestoggle').trigger('click');
    // }
  });


  //
  // Button enabled / disable change color
  //
  //



  var layeridsocial = $('#' + $currentSlide + '-' + $currentLayer + ", .layer-dis-ena-").find("select[name=facebookblock] option:selected").val();
  var removeaddsocial = $('#' + $currentSlide + '-' + $currentLayer + ", .layer-dis-ena-").find("select[name=facebookblock]");
  var layeridclock = $('#' + $currentSlide + '-' + $currentLayer + ", .layer-dis-ena-").find("select[name=clockblock] option:selected").val();
  var removeaddclock = $('#' + $currentSlide + '-' + $currentLayer + ", .layer-dis-ena-").find("select[name=clockblock]");
  var layeridnews = $('#' + $currentSlide + '-' + $currentLayer + ", .layer-dis-ena-").find("select[name=newsblock] option:selected").val();
  var removeaddnews = $('#' + $currentSlide + '-' + $currentLayer + ", .layer-dis-ena-").find("select[name=newsblock]");
  var layeridanimatie = $('#' + $currentSlide + '-' + $currentLayer + ", .layer-dis-ena-").find("select[name=animatieblock] option:selected").val();
  var removeaddanimatie = $('#' + $currentSlide + '-' + $currentLayer + ", .layer-dis-ena-").find("select[name=animatieblock]");
  var layeridvideoloop = $('#' + $currentSlide + '-' + $currentLayer + ", .layer-dis-ena-").find("select[name=videoloop] option:selected").val();
  var removeaddvideoloop = $('#' + $currentSlide + '-' + $currentLayer + ", .layer-dis-ena-").find("select[name=videoloop]");


  if (layeridsocial === 'enable') {
    removeaddsocial.addClass("optionsenabled").removeClass("optiondisabled");
  }
  if (layeridsocial === 'disabled') {
    removeaddsocial.addClass("optiondisabled").removeClass("optionsenabled");;
  }
  if (layeridanimatie === 'enable') {
    removeaddanimatie.addClass("optionsenabled").removeClass("optiondisabled");
  }
  if (layeridanimatie === 'disabled') {
    removeaddanimatie.addClass("optiondisabled").removeClass("optionsenabled");;
  }
  if (layeridclock === 'enable') {
    removeaddclock.addClass("optionsenabled").removeClass("optiondisabled");
  }
  if (layeridclock === 'disabled') {
    removeaddclock.addClass("optiondisabled").removeClass("optionsenabled");;
  }
  if (layeridnews === 'enable') {
    removeaddnews.addClass("optionsenabled").removeClass("optiondisabled");
  }
  if (layeridnews === 'disabled') {
    removeaddnews.addClass("optiondisabled").removeClass("optionsenabled");;
  }
  if (layeridvideoloop === 'loop') {
    removeaddvideoloop.addClass("optionsenabled").removeClass("optiondisabled");
  }
  if (layeridvideoloop === '') {
    removeaddvideoloop.addClass("optiondisabled").removeClass("optionsenabled");
  }

  $('#layerstoggle').click(function () {

    var layeridvideoloop = $('#' + $currentSlide + '-' + $currentLayer + ", .layer-dis-ena-").find("select[name=videoloop] option:selected").val();
    var removeaddvideoloop = $('#' + $currentSlide + '-' + $currentLayer + ", .layer-dis-ena-").find("select[name=videoloop]");




    if (layeridvideoloop === 'loop') {
      removeaddvideoloop.addClass("optionsenabled").removeClass("optiondisabled");
    }
    if (layeridvideoloop === '') {
      removeaddvideoloop.addClass("optiondisabled").removeClass("optionsenabled");;
    }
  });


  $('.slideset').click(function () {

    var lockie =  $currentSlide + '-' + $currentLayer + '-' + $("select[name=lockslide] option:selected").val();
    var enabledisable =  $currentSlide + '-' + $currentLayer + '-' + $("select[name=disableslide] option:selected").val();

    if (lockie === $currentSlide + '-' + $currentLayer + '-' + 'true') {
      $('select[name=lockslide]').removeClass("lokkiedis");
      $('select[name=lockslide]').addClass("lokkie");
    }
    if (lockie === $currentSlide + '-' + $currentLayer + '-' + 'false') {
      $('select[name=lockslide]').removeClass("lokkie");
      $('select[name=lockslide]').addClass("lokkiedis");
    }

    if (enabledisable === $currentSlide + '-' + $currentLayer + '-' + 'true') {
      $('select[name=disableslide]').addClass("disabled");
      $('select[name=disableslide]').addClass("slideenabled");
      $('select[name=disableslide]').removeClass("slidedisabled");
    }
    if (enabledisable === $currentSlide + '-' + $currentLayer + '-' + 'false') {
      $('select[name=disableslide]').removeClass("disabled");
      $('select[name=disableslide]').removeClass("slideenabled");
      $('select[name=disableslide]').addClass("slidedisabled");
    }


    // if (enabledisable === $currentSlide + '-' + $currentLayer + '-' + 'true') {
    //     $('select[name=disableslide]').addClass("disabled");
    //     $('select[name=disableslide]').addClass("slideenabled");
    //     $('select[name=disableslide]').removeClass("slidedisabled");
    // }
    // if (enabledisable === $currentSlide + '-' + $currentLayer + '-' + 'false') {
    //     $('select[name=disableslide]').removeClass("disabled");
    //     $('select[name=disableslide]').removeClass("slideenabled");
    //     $('select[name=disableslide]').addClass("slidedisabled");
    // }

  });


  //
  // Start change select fields with popup Sweetalert (swal)
  //
  // Select disable/enable slide - Change with Sweetalert (swal)
  //

  $('.enabledisableclass').click(function () {
    var sidvalue =  $currentSlide + '-' + $currentLayer + '-' + $("select[name=disableslide] option:selected").val();

    if (sidvalue === $currentSlide + '-' + $currentLayer + '-' + 'true') {
      var savemessage = Drupal.t('Zet slide' + ' ' + '<span class="kleurtjegroen">' + $slides[$currentSlide].title + '</span>'+ ' aan');
      var confirm = Drupal.t('AAN');
      swal({
          title: savemessage,
          type: "success",
          showCancelButton: true,
          confirmButtonClass: "btn-success",
          confirmButtonText: confirm,
          html: true,
          closeOnConfirm: true
        },
        function () {
          $('select[name=disableslide]').val("false").change();
          $('.disable-enabled').css('background-color', '#7dcc93 !important');

        }
      );

      // alert('enable slide message');
    }
    if (sidvalue === $currentSlide + '-' + $currentLayer + '-' + 'false') {
      var savemessage = Drupal.t('Zet slide' + ' ' + '<span class="kleurtjegroen">' + $slides[$currentSlide].title + '</span>'+ ' uit');

      var savemessage2 = Drupal.t('Wanneer je de slide uitzet dan is deze niet meer zichtbaar in de live stream');
      var confirm = Drupal.t('UIT');

      swal({
          title: savemessage,
          text: savemessage2,
          type: "error",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: confirm,
          html: true,
          closeOnConfirm: true
        },
        function () {
          $('select[name=disableslide]').val("true").change();
          $('.disable-enabled').css(
            'background-color', '#dd6165 !important');
        }
      );

      // alert('disable slide message');
    }
  });



  //
  // Select Lock slide - Change with Sweetalert (swal)
  //lockslide lock-unlock


  $('.lockclass').click(function () {
    var sidvalue =  $currentSlide + '-' + $currentLayer + '-' + $("select[name=lockslide] option:selected").val();

    if (sidvalue === $currentSlide + '-' + $currentLayer + '-' + 'true') {
      var savemessage = Drupal.t('Unlock this slide');
      var confirm = Drupal.t('Unlock');

      swal({
          title: savemessage,
          text: '',
          type: "success",
          showCancelButton: true,
          confirmButtonClass: "btn-success",
          confirmButtonText: confirm,
          html: true,
          closeOnConfirm: true
        },
        function () {
          $('select[name=lockslide]').removeClass("lokkie").change();
          $('select[name=lockslide]').addClass("lokkiedis").change();
          $('select[name=lockslide]').val("false").change();
        }
      );

      // alert('enable slide message');
    }
    if (sidvalue === $currentSlide + '-' + $currentLayer + '-' + 'false') {
      var savemessage = Drupal.t('Lock this slide');
      var confirm = Drupal.t('Lock');

      swal({
          title: savemessage,
          text: '',
          type: "error",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: confirm,
          html: true,
          closeOnConfirm: true
        },
        function () {
          $('select[name=lockslide]').removeClass("lokkiedis").change();
          $('select[name=lockslide]').addClass("lokkie").change();
          $('select[name=lockslide]').val("true").change();
        }
      );

      // alert('disable slide message');
    }
  });







  //
  // Select disable/enable clock widget - Change with Sweetalert (swal)
  //


  var sidvalue =  $currentSlide + '-' + $currentLayer + '-' + $("select[name=lockslide] option:selected").val();
  var clockclassvalue = $("select[name=clockblock] option:selected").val();
  var facebookclassvalue = $("select[name=facebook] option:selected").val();
  var newsclassvalue = $("select[name=news] option:selected").val();
  var videoclassvalue = $("select[name=videoloop] option:selected").val();
  // var clockclassvalue = $("select[name=clockblock] option:selected").val();
  // var clockclassvalue = $("select[name=clockblock] option:selected").val();

  if (sidvalue === $currentSlide + '-' + $currentLayer + '-' + 'true') {
    $('select[name=lockslide]').removeClass("lokkiedis");
    $('select[name=lockslide]').addClass("lokkie");
  }
  if (sidvalue === $currentSlide + '-' + $currentLayer + '-' + 'false') {
    $('select[name=lockslide]').removeClass("lokkie");
    $('select[name=lockslide]').addClass("lokkiedis");
  }

  if (clockclassvalue === 'enable') {
    $('select[name=clockblock]').removeClass("optionsdisabled");
    $('select[name=clockblock]').addClass("optionsenabled");
    $('select[name=newsblock]').val("disabled").change();
    $('select[name=facebookblock]').val("disabled").change();

  }
  if (clockclassvalue === 'disabled') {
    $('select[name=clockblock]').addClass("optionsdisabled");
  }

  if (facebookclassvalue === 'enable') {
    $('select[name=facebookblock]').removeClass("optionsdisabled");
    $('select[name=facebookblock]').addClass("optionsenabled");
    $('select[name=newsblock]').val("disabled").change();
    $('select[name=clockblock]').val("disabled").change();

  }
  if (facebookclassvalue === 'disabled') {
    $('select[name=facebookblock]').addClass("optionsdisabled");
  }

  if (newsclassvalue === 'enable') {
    $('select[name=newsblock]').removeClass("optionsdisabled");
    $('select[name=newsblock]').addClass("optionsenabled");
    $('select[name=clockblock]').val("disabled").change();
    $('select[name=facebookblock]').val("disabled").change();

  }
  if (newsclassvalue === 'disabled') {
    $('select[name=newsblock]').addClass("optionsdisabled");
  }

  if (videoclassvalue === 'loop') {
    $('select[name=videoloop]').removeClass("optionsdisabled");
    $('select[name=videoloop]').addClass("optionsenabled");
    $('select[name=clockblock]').val("disabled").change();
    $('select[name=newsblock]').val("disabled").change();
    $('select[name=facebookblock]').val("disabled").change();
  }

  if (videoclassvalue === '') {
    $('select[name=videoloop]').addClass("optionsdisabled");
  }


  $('.selectbuttonclock').click(function () {
    var clockclassvalue = $("select[name=clockblock] option:selected").val();

    if (clockclassvalue === 'enable') {

      $('select[name=clockblock]').val("disabled").change();
      $('select[name=clockblock]').removeClass("optionsenabled").change();
      $('select[name=clockblock]').addClass("optionsdisabled").change();
    }

    if (clockclassvalue === 'disabled') {

      $('select[name=clockblock]').val("enable").change();
      $('select[name=clockblock]').addClass("optionsenabled").change();
      $('select[name=newsblock]').val("disabled").change();
      $('select[name=facebookblock]').val("disabled").change();
      $('select[name=animatieblock]').val("disabled").change();
    }

  });



  //
  // Select disable/enable news widget - Change with Sweetalert (swal)
  //

  $('.selectbuttonloop').click(function () {
    var videoclassvalue = $("select[name=videoloop] option:selected").val();

    if (videoclassvalue === 'loop') {
      $('select[name=videoloop]').val("").change();
      $('select[name=videoloop]').removeClass("optionsenabled").change();
      $('select[name=videoloop]').addClass("optionsdisabled").change();
    }

    else if (videoclassvalue === '') {

      $('select[name=videoloop]').val("loop").change();
      $('select[name=videoloop]').removeClass("optionsdisabled").change();
      $('select[name=videoloop]').addClass("optionsenabled").change();
    }
  });


  $('.selectbuttonnews').click(function () {
    var newsclassvalue = $("select[name=newsblock] option:selected").val();

    if (newsclassvalue === 'enable') {

      $('select[name=newsblock]').addClass("optionsdisabled").change();
      $('select[name=newsblock]').removeClass("optionsenabled").change();
      $('select[name=newsblock]').val("disabled").change();
    }

    if (newsclassvalue === 'disabled') {

      $('select[name=newsblock]').addClass("optionsenabled").change();
      $('select[name=newsblock]').removeClass("optionsdisabled").change();
      $('select[name=clockblock]').val("disabled").change();
      $('select[name=facebookblock]').val("disabled").change();
      $('select[name=animatieblock]').val("disabled").change();
      $('select[name=newsblock]').val("enable").change();
    }
  });



  //
  // Select disable/enable social widget - Change with Sweetalert (swal)
  //


  $('.selectbuttonsocial').click(function () {

    var socialclassvalue =  $("select[name=facebookblock] option:selected").val();
    if (socialclassvalue === 'enable') {

      $('select[name=facebookblock]').addClass("optionsdisabled").change();
      $('select[name=facebookblock]').removeClass("optionsenabled").change();
      $('select[name=facebookblock]').val("disabled").change();
    }

    if (socialclassvalue === 'disabled') {

      $('select[name=facebookblock]').addClass("optionsenabled").change();
      $('select[name=facebookblock]').removeClass("optionsdisabled").change();
      $('select[name=clockblock]').val("disabled").change();
      $('select[name=newsblock]').val("disabled").change();
      $('select[name=animatieblock]').val("disabled").change();
      $('select[name=facebookblock]').val("enable").change();
    }
  });


  //
  // Select disable/enable animatie widget - Change with Sweetalert (swal)
  //


  $('.selectbuttonanimatie').click(function () {

    var socialclassvalue =  $("select[name=animatieblock] option:selected").val();
    if (socialclassvalue === 'enable') {

      $('select[name=animatieblock]').addClass("optionsdisabled").change();
      $('select[name=animatieblock]').removeClass("optionsenabled").change();
      $('select[name=animatieblock]').val("disabled").change();
    }

    if (socialclassvalue === 'disabled') {

      $('select[name=animatieblock]').addClass("optionsenabled").change();
      $('select[name=animatieblock]').removeClass("optionsdisabled").change();
      $('select[name=clockblock]').val("disabled").change();
      $('select[name=newsblock]').val("disabled").change();
      $('select[name=facebookblock]').val("disable").change();
      $('select[name=animatieblock]').val("enable").change();
    }

  });


  //
  // END change select fields with popup Sweetalert (swal)
  //



  $('#art_revolution').tabs({
    selected: 1,
    active: 1,
    select: function (event, ui) {
      $('#slidedesign, #preview').width($settings.startwidth).height($settings.startheight);
      if ($('#slidedesign').width() > $('#art_revolution').width()) {
        var $scale = $('#art_revolution').width() / $('#slidedesign').width();
      }
    },
    activate: function (event, ui) {
      $('#slidedesign, #preview').width($settings.startwidth).height($settings.startheight);
      if ($('#slidedesign').width() > $('#art_revolution').width()) {
        var $scale = $('#art_revolution').width() / $('#slidedesign').width();
      }
    }
  });

  $('.file-imce').click(function () {
    filehandle = $(this);
    Drupal.media.popups.mediaBrowser(function (files) {
      var image = files[0];
      filehandle.val(image.url).trigger('onchange');
      $(filehandle.data('uri')).val(image.uri);
    });
  });

  jQuery('.select-change-animation').click(function(){
    jQuery('.text-select-animation').val(jQuery(this).data('val')).trigger('change');
  });

  jQuery('.select-change-text').click(function(){
    jQuery('.text-select-text').val(jQuery(this).data('val')).trigger('change');
  });

  jQuery('.select-change-clock').click(function(){
    jQuery('.text-select-clock').val(jQuery(this).data('val')).trigger('change');
  });

  jQuery('.select-change-news').click(function(){
    jQuery('.text-select-news').val(jQuery(this).data('val')).trigger('change');
  });


});

// End JQuery ready function











function send(fid) {
  //alert(fid);
}

function art_revolution_fileselect(file, win) {
  filehandle.val(file.url); //insert file url into the url field
  filehandle.trigger('onchange');
  win.close(); //close IMCE
}

function insertImageToLayer(url) {
  var layerid = $currentSlide + '-' + $currentLayer;
  if (url) {
    var img = jQuery('<img>').attr({'src': url});
    jQuery('#' + layerid).find('.inner').html(img);
    var image = new Image();
    image.onload = function () {
      jQuery('#' + layerid).width(this.width);
      jQuery('#' + layerid).height(this.height);
      jQuery('input[name=width]').val(this.width);
      jQuery('input[name=height]').val(this.height);
    }
    image.src = url;
  } else {
    jQuery("#" + layerid).find('.inner').html('');
  }
}

function insertVideoToLayer(url) {
  var layerid = $currentSlide + '-' + $currentLayer;
  if (url) {
    var vid = jQuery('<video muted class="videoadmin" controls>').attr({
      'src': url,
      'width': 1920,
      'height': 1080
    });
    jQuery('#' + layerid).find('.inner').html(vid);
    var video = new HTMLVideoElement();
    video.onload = function () {
      jQuery('#' + layerid).width(this.width);
      jQuery('#' + layerid).height(this.height);
      jQuery('input[name=width]').val(this.width);
      jQuery('input[name=height]').val(this.height);
    }
    video.src = url;
  } else {
    jQuery("#" + layerid).find('.inner').html('');
  }
}

function setSlideBackground(url) {
  jQuery('#plaatjelink').css({display: 'unset'});
  jQuery('#background-image').attr("type","hidden");
  jQuery('#plaatjelink').attr("src", url);
  jQuery('.field_bg_img button.clearfield').css({display: 'unset'});
  jQuery('.bguploadbutton').css({display: 'none'});

  jQuery('#slidedesign').css({
    backgroundImage: url ? 'url(' + url + ')' : 'none'
  });

}

function ClearBackgroundColor(elem) {
  jQuery(elem).parent().find("input[name=backgroundcolormain]").val("");
  jQuery('#slidedesign, .demo-preview, .backgroundchanger').css({
    backgroundColor: '#0c0c0c'
  });
}

function ClearimageBackground(elem) {
  jQuery("#background-image").val("");
  jQuery('#background-image').attr("type","text");
  jQuery('#plaatjelink').css({display: 'none'});
  jQuery('.field_bg_img button.clearfield').css({display: 'none'});
  jQuery('.bguploadbutton').css({display: 'unset'});

  jQuery(elem).parent().find("input[name=background_image_uri]").val("");
  jQuery('#slidedesign').css({
    backgroundImage: ''
  });
}

jQuery("#slide-options .fieldset-wrapper").show();
jQuery("#slide-options .fieldset-legend").click(function () {
  jQuery("#slide-options .fieldset-wrapper").slideToggle("slow");
  jQuery(this).toggleClass("active");
  jQuery('#slide-options .minus').toggleClass('plus hide');
});

jQuery("#layer-options .fieldset-wrapper").show();
jQuery("#layer-options .fieldset-legend").click(function () {
  jQuery("#layer-options .fieldset-wrapper").slideToggle("slow");
  jQuery(this).toggleClass("active");
  jQuery('#layer-options .plus').toggleClass('minus');
});


var options = {
  valueElement: null,
  width: 300,
  height: 120,
  sliderSize: 20,
  position: 'top',
  borderColor: '#CCC',
  insetColor: '#CCC',
  backgroundColor: '#202020'
};

var pickers = {};

pickers.bgcolor = new jscolor('bgcolor-button');
// pickers.bgcolor.onFineChange = "update('bgcolor')";
// pickers.bgcolor.fromString('383838');

pickers.fgcolortext = new jscolor('fgcolortext-button', options);
pickers.fgcolortext.onFineChange = "update('fgcolortext')";
pickers.fgcolortext.fromString('FFFFFF');

pickers.fgcolorclock = new jscolor('fgcolorclock-button');
pickers.fgcolorclock.onFineChange = "update('fgcolorclock')";
pickers.fgcolorclock.fromString('FFFFFF');

pickers.fgcolornews = new jscolor('fgcolornews-button');
pickers.fgcolornews.onFineChange = "update('fgcolornews')";
pickers.fgcolornews.fromString('FFFFFF');

function update(id) {
  if (id === 'bgcolor') {
    const hexColor = pickers.bgcolor.toHEXString();

    jQuery('#slidedesign, .backgroundchanger').css({
      backgroundColor: hexColor
    });

    if (hexIsLight(hexColor)) {
      jQuery('#monitorgrid').css({backgroundImage: "url('/sites/all/modules/art_revolution/images/il-grid-trans.png')"});
      jQuery('#backgroundcolormain ').css({color: "rgb(0, 0, 0) !important"});
      //console.log('test')
    } else {
      jQuery('#monitorgrid').css({backgroundImage: "url('/sites/all/modules/art_revolution/images/il-grid-white.png')"});
      jQuery('#backgroundcolormain ').css({color: "rgb(255, 255, 255) !important"});
    }

    jQuery('#backgroundcolormain').attr('value', hexColor);
  }
  if (id === 'fgcolortext') {
    jQuery('#' + $currentSlide + '-' + $currentLayer + ", .demo-preview").find('.font-text').css({
      color:
        pickers.fgcolortext.toHEXString()
    });
  }
  if (id === 'fgcolorclock') {
    jQuery('#' + $currentSlide + '-' + $currentLayer).find('.font-clock').css({
      color: pickers.fgcolorclock.toHEXString()
    });
  }
  if (id === 'fgcolornews') {
    jQuery('#' + $currentSlide + '-' + $currentLayer).find('.font-news').css({
      color: pickers.fgcolornews.toHEXString()
    });
  }
}

function hexIsLight(color) {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
  return brightness > 155;
}

function setString(id, str) {
  pickers[id].fromString(str);
  // console.error(pickers[id]);
  update(id);
}

update('bgcolor');
// update('newscolor');
update('fgcolortext');
update('fgcolorclock');
update('fgcolornews');
// update('slidedesign');



// Reset button clear video / image

function Clearimage(elem) {
  jQuery("#imagelayer").val("");
  jQuery(elem).parent().find("input[name=image_uri]").val("");
  insertImageToLayer("");
}

function Clearvideo(elem) {
  jQuery("#videolayer").val("");
  jQuery(elem).parent().find("input[name=video_uri]").val("");
  insertVideoToLayer("");
}


jQuery('#toggle_event_editing button').click(function () {
  if (jQuery(this).hasClass('locked_active') || jQuery(this).hasClass('unlocked_inactive')) {
    /* code to do when unlocking */
    jQuery('#switch_status').html('enable');
  } else {
    /* code to do when locking */
    jQuery('#switch_status').html('');
  }

  /* reverse locking status */
  jQuery('#toggle_event_editing button').eq(0).toggleClass('locked_inactive locked_active btn-default btn-info');
  jQuery('#toggle_event_editing button').eq(1).toggleClass('unlocked_inactive unlocked_active btn-info btn-default');
});



//
// popup frame and reload every iframe in overlay - but used for preview display
//
//

function create_SalpyVideo() {
  jQuery('<div id="SalpyVideo"><span></span><div><div id="SalpyVideo-container"></div></div></div>').appendTo("body")
}
var SalpyVideo = !1;
jQuery("body").on("click", ".video-converter", function (a) {
  0 == SalpyVideo && (create_SalpyVideo(), SalpyVideo = !0), a.preventDefault();
  var b = jQuery(this).attr("data-link");
  jQuery("#SalpyVideo").show(), jQuery('<iframe class="iframe_display_video" width="' + jQuery(this).data("width") + '" height="' + jQuery(this).data("height") + '" src="' + b + '" ></iframe>').appendTo("#SalpyVideo-container")
}), jQuery("body").on("click", "#SalpyVideo", function () {
  // location.reload();
  jQuery("#SalpyVideo").hide(), jQuery("#SalpyVideo").removeClass("SalpyVideo_video"), jQuery("#SalpyVideo").removeClass("SalpyVideo_image"), jQuery("#SalpyVideo-container").empty()
});

//Salpylay
function create_SalpyLay() {

  jQuery('<div id="SalpyLay"><span></span><div><div id="SalpyLay-container"></div></div></div>').appendTo("body")
}
var SalpyLay = !1;
jQuery("body").on("click", ".iframe-popup", function (a) {
  0 == SalpyLay && (create_SalpyLay(), SalpyLay = !0), a.preventDefault();
  var b = jQuery(this).attr("data-link");
  var heightStyleValue = document.getElementById("heightmeter").style.height;
  var widthStyleValue = document.getElementById("heightmeter").style.width;
  setTimeout(function(){
    jQuery("#SalpyLay").show(), jQuery('<iframe class="iframe_display" width="100%" height="' + heightStyleValue + '" src="' + b + '" ></iframe>').appendTo("#SalpyLay-container")
  }, 300);
  //jQuery("#SalpyLay").show(), jQuery('<iframe class="iframe_display" width="' + widthStyleValue + '" height="' + heightStyleValue + '" src="' + b + '" ></iframe>').appendTo("#SalpyLay-container")
}), jQuery("body").on("click", "#SalpyLay", function () {
  //location.reload();
  jQuery("#SalpyLay").hide(), jQuery("#SalpyLay").removeClass("SalpyLay_video"), jQuery("#SalpyLay").removeClass("SalpyLay_image"), jQuery("#SalpyLay-container").empty()
});
//SalpypLay
function create_SalpypLay() {

  jQuery('<div id="SalpypLay"><span></span><div><div id="SalpypLay-container"></div></div></div>').appendTo("body")
}

var SalpypLay = !1;
jQuery("body").on("click", ".iframe-popup-v2", function (a) {
  0 == SalpypLay && (create_SalpypLay(), SalpypLay = !0), a.preventDefault();
  var b = jQuery(this).attr("data-link");
  jQuery("#SalpypLay").show(), jQuery('<iframe class="iframe_display" width="' + jQuery(this).data("width") + '" height="' + jQuery(this).data("height") + '" src="' + b + '" ></iframe>').appendTo("#SalpypLay-container")
}), jQuery("body").on("click", "#SalpypLay", function () {
  //location.reload();
  jQuery("#SalpypLay").hide(), jQuery("#SalpypLay").removeClass("SalpypLay_video"), jQuery("#SalpypLay").removeClass("SalpypLay_image"), jQuery("#SalpypLay-container").empty()
});
