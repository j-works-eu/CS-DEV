if ($slides == null) $slides = [];
if ($settings == null) $settings = {};

let defaultSettings = {
  delay: 9000,
  startposition: 'horizontal',
  startwidth: 1920,
  startheight: 1080,
  schermwidth: 1920,
  schermheight: 1080,
  fullScreenAlignForce: "on",
  touchenabled: "off",
  onHoverStop: "off",
  stopAtSlide: -1,
  stopAfterLoops: -1,
  keyboardNavigation: "off",
  fullWidth: 'on',
  fullScreen: 'on',
  forceFullWidth: "off",
  dottedOverlay: "none",
  navigationType: 'none',
  navigationArrows: 'verticalcentered',
  navigationHAlign: 'center',
  navigationVAlign: 'bottom',
  navigationStyle: 'square',
  timer: 'bottom',

};

let defaultSlide = {
  title: '',
  background_image: '',
  background_image_uri: '',
  background_image_preview: '',
  background_full_video: '',
  videowidthfull: 1920,
  videoheightfull: 1080,
  data_masterspeed: 1500,
  data_transition: 'fade',
  data_slotamount: 7,
  layers: [],
  backgroundcolormain: '#000000',
  background_color_clock: '',
  removed: 0,
  disableslide: 'false',
  lockslide: 'false',
  datevan:'',
  datenaar: '',
  dateSTART_TijdHour:'',
  dateSTART_TijdMinutes:'',
  dateEND_TijdHour: '',
  dateEND_Minutes: '',
};

let defaultLayer = {
  index: 10,
  title: "",
  type: "text",
  text: "TEXT",
  image: "",
  fid: "",
  video: "",
  video_uri: "",
  left: "left",
  top: "top",
  layertransparant: 1,
  data_speed: 300,
  extra_animation: "geenanimatie",
  incomingclasses: "fade",
  outgoingclasses: "fadeout",
  data_start: "0",
  data_endspeed: "0",
  data_easing: "",
  data_endeasing: "",
  removed: 0,
  video_width: 1920,
  video_height: 1080,
  videosize: "",
  width: "",
  height: "",
  videoloop: "",
  clockblock: "disabled",
  newsblock: "disabled",
  facebookblock: "disabled",
  clockblockstyle: "",
  widgetpos: "res_b",
  widgetzoom: "1.4",
  refreshelfsight: "21600000",
  clockzoom: "1",
  clockoptions: "datum",
  slidewidth: "",
  slideheight: "",
  data_nextslideatend: "true",
  data_autoplay: "true",
  data_volume: "mute",
  font_uitlijning: "left",
  font_uitlijning_v1: "left",
  font_uitlijning_clock: "left",
  text_style_clock: "verdana",
  text_style_text: "verdana",
  text_style_news: "verdana",
  extrafanimation: "noanimation",
  weatherwidgets: "noweather",
  weercity: "",
  weercountry: "NL",
  Wbgactive: "false",
  Waactive: "false",
  WForecast: "false",
  text_rotate: "",
  image_rotate: "",
  movie_rotate: "",
  instagramid: "",
  instagramtag: "",
  googleplaceid: "",
  googleplaceminrate: "",
  elfsightFB: "",
  iframeURL: "",

};

let $firsttime = true;
let $contenttypes = {
  text: 0,
  image: 1,
  video: 2,
  clock: 3,
  news: 4,
  widgets: 5,
  iframe: 6,
  animatie: 7,
  weather: 8,
  instagram: 9,
  facebook: 10,
  googlereview: 11,
};

(function ($) {


  $(document).ready(function () {

    // $("body").on('dblclick', '.layer', function(e) {
    //   console.log("hi");
    //   $( "button.LayersOptions" ).trigger( "click" );
    // });

// Verwijder irritante opacity die over lagen wordt gedaan

    setTimeout(
      function () {
        $('.layer').removeClass('ui-state-disabled');
      }, 1000);

// ---------------------------------------------------------

    if ($slides.length === 0) {
      $("#art_revolution_main").hide(0);
    }

    $($slides).each(function (slideIndex) {
      addSlideTab(slideIndex);
      changeSlideDisabled(slideIndex);
      changeSlideLocked(slideIndex);
      loadSlide(0);
    });

    $("#slideslist").click(function(){

      loadSlide($currentSlide);

      let slidedisabled  = $slides[$currentSlide].disableslide;

      if (slidedisabled == 'true') {
        $('select[name=disableslide]').addClass('disabled');
        $('select[name=disableslide]').css('background-color', '#ff746f');
        $('ul#slideslist').find('li[index=' + $currentSlide + ']').addClass('disabled');
      } else {
          $('select[name=disableslide]').removeClass('disabled');
          $('select[name=disableslide]').css('background-color', '#7dcc93');
          $('ul#slideslist').find('li[index=' + $currentSlide + ']').removeClass('enabled');
      }

      if(typeof changepercentage == 'changepercentage'){
        changepercentage();
      }

    });

    $("#layerslist").click(function(){
      let currentlayer =  $slides[$currentSlide].layers[$currentLayer];

      let videoloop  = currentlayer.videoloop;
      if (videoloop == 'loop') {
        $('select[name=videoloop]').addClass('optionsenabled');
        $('select[name=videoloop]').css('background-color', '#7dcc93');
      }

      changepercentage(); // transparant layer percentage reset
    });

    $("#slideslist").sortable({
      containment: 'parent',
      tolerance: 'pointer',
      scroll: true,
      scrollSpeed: 4,
      update: function (event, ui,) {
        $("#slideslist").find("li").each(function (index) {
          var sindex = $(this).attr('index');
          $slides[sindex].index = index;
        });
      },
    });

    $(".nav-side-menu select").change(function () {
      saveLayer();
      saveSlide();
    });

    $(".nav-side-menu input").change(function () {
      saveLayer();
      saveSlide();
    });

    $('#addslide').click(function () {
      saveLayer();
      saveSlide();

      let newSlideIndex = $slides.length;
      $slides[newSlideIndex] = {};
      $.extend(true, $slides[newSlideIndex], defaultSlide);
      $slides[newSlideIndex].index = newSlideIndex;
      addSlideTab(newSlideIndex);

      if (newSlideIndex == '0') {
        loadSlide(newSlideIndex);
        $('#art_revolution_main').show(0);
        $('.slideroptions').removeClass('hiddenlayers').addClass('showlayers');
        $('#exampleModalPreview').modal('show');
        saveSlide();
        saveLayer();
      } else {
        loadSlide(newSlideIndex);
        $('#art_revolution_main').show(newSlideIndex);
        $('.slideroptions').removeClass('hiddenlayers').addClass('showlayers');
        $('#exampleModalPreview').modal('show');
        saveSlide();
        saveLayer();
      }

      //resetsliderpercentage(newSlideIndex);

    });

    $('#addLayer').click(function () {
      $('#layeroptions').css({visibility: 'visible'});
      saveLayer();
      let newLayerIndex = $slides[$currentSlide].layers.length;

      $slides[$currentSlide].layers[newLayerIndex] = {};
      $.extend(true, $slides[$currentSlide].layers[newLayerIndex], defaultLayer);
      //console.log(newLayerIndex);
      addLayerTab(newLayerIndex);

      loadLayer(newLayerIndex);

      $("#layerslist li:last-child").prependTo("#layerslist")

      $('#layerslist').find('li').each(function (index) {
        var lindex = $(this).attr('index');
        $slides[$currentSlide].layers[lindex].index = index;
        $('#' + $currentSlide + '-' + lindex).css({zIndex: (99 - index)});
        saveLayer();
      });

      loadLayer(newLayerIndex);

      /*Center center die layer shit*/
      let customscreenWidth = $settings.customstartwidth;
      let screenWidth = $settings.schermwidth;
      let screenHeight = $settings.startheight;
      let numberOfScreens = $settings.startwidth / screenWidth;
      let scrollWidth = $('body').prop("scrollWidth") - $('body').prop("clientWidth");

      if (customscreenWidth) {
        setLayerPosition(newLayerIndex, 0, 0);
      } else {
        if (scrollWidth > 0) {
          let sliceWidth = scrollWidth / numberOfScreens;
          let scrollLeft = $('body').scrollLeft();
          let list = [];
          for (let i = 0; i <= scrollWidth; i += sliceWidth) {
            list.push(i);
          }
          let currentSlice = 1;
          for (slicedNumber of list) {

            if (scrollLeft === 0) {
              setLayerPosition(newLayerIndex, 0, 0);
            } else if (scrollLeft >= slicedNumber && scrollLeft <= sliceWidth * currentSlice) {
              setLayerPosition(newLayerIndex, 0, (currentSlice * screenWidth) - (screenWidth));
            }
            currentSlice++;
          }
        } else {
          setLayerPosition(newLayerIndex, 0, 0);
        }


        saveLayer();
        saveSlide();

      }
      $('#layeroptions').addClass("showlayers").removeClass('hiddenlayers');
    });

    $('#save').click(function () {
      saveLayerSlider(true);
    });

    $('li.locked').click(function () {
      // if ($slides[slideIndex].lockslide == 'true') {
      var swaltext1 = Drupal.t('Slide Locked');
      var swaltext2 = Drupal.t("As agreed with you, an advertisement has been placed here.");

      swal({
        title: swaltext1,
        text: swaltext2,
        imageUrl: '/themes/seven/slide-locked.png',
        confirmButtonClass: "btn-info",
        showCancelButton: false,
        html: true,
        closeOnConfirm: true,
      }, function () {
        // removeLayer(layerIndex);
      });
      // }
    });

    $('select[name=text_style_text]').change(function () {
      changeLayerStyle('text', $(this).find('option:selected').val());
    });

    $('select[name=text_style_clock]').change(function () {
      changeLayerStyle('clock', $(this).find('option:selected').val());
    });

    $('select[name=text_style_cnews]').change(function () {
      changeLayerStyle('news', $(this).find('option:selected').val());
    });
    $('select[name=font_size]').change(function () {
      changeLayerSize('text', $(this).val());
    });
    $('select[name=font_uitlijning_v1]').change(function () {
      changeLayeruitlijning('text', $(this).val());
    });

    $('select[name=font_uitlijning_clock]').change(function () {
      changeLayeruitlijningClock('clock', $(this).val());
    });

    $('select[name=disableslide]').change(function () {
      $('ul#slideslist').find('li[index=' + $currentSlide + ']').toggleClass('disabled');
      $(this).toggleClass('disabled');
    });

    $('select[name=lockslide]').change(function () {
      $('ul#slideslist').find('li[index=' + $currentSlide + ']').toggleClass('locked');
      $(this).toggleClass('locked');
    });

    $('.slideroptions').find('#slide-text-options').keyup(function () {
      $slides[$currentSlide].title = $(this).val().substring(0, 32);
      $("ul#slideslist li.active").find('span').eq(0).html($(this).val().substring(0, 32));

    });

    $('select[name=lockslide]').change(function () {
      $slides[$currentSlide].title = $(this).val().substring(0, 32);
      $("ul#slideslist li.active").find('span').eq(0).html($(this).val().substring(0, 32));

    });

    $('#content-type').find('#layer-text-options').keyup(function () {
      $slides[$currentSlide].layers[$currentLayer].title = $(this).val().substring(0, 31);
      $("ul#layerslist li.active").find('span').eq(0).html($(this).val().substring(0, 31));

    });


    $('#content-type').find('#layer-text').keyup(function (e) {
      // euro = u20ac
      var ranges = [
        '[\u00A0-\u20ab]',
        '[\u20ad-\u269f]',
        '[\u26A0-\u329f]',
        // The following characters could not be minified correctly
        // if specifed with the ES6 syntax \u{1F400}
        '[🀄-🧀]'
        //'[\u{1F004}-\u{1F9C0}]'
      ];

      var str = $('#layer-text').val();
      str = str.replace(new RegExp(ranges.join('|'), 'ug'), '');
      $("#layer-text").val(str);

      $slides[$currentSlide].layers[$currentLayer].text = $(this).val();
      $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html("<p class='font-text'>" + nl2br($(this).val()) + "</p>");

      changeLayerStyle('text', $slides[$currentSlide].layers[$currentLayer].text_style_text);
      changeLayerColor($currentLayer, 'text', $slides[$currentSlide].layers[$currentLayer].font_color_text);
      changeLayerSize('text', $slides[$currentSlide].layers[$currentLayer].font_size);
      changeLayeruitlijning('text', $slides[$currentSlide].layers[$currentLayer].font_uitlijning_v1);
    });


    $('[name=custom_css]').keyup(function () {
      $slides[$currentSlide].layers[$currentLayer].custom_css = $(this).val();
      $('#' + $currentSlide + '-' + $currentLayer).find('.inner').attr('style', $(this).val());
    });


    (function() {
      orig = $.fn.css;
      $.fn.css = function() {
        var result = orig.apply(this, arguments);
        $(this).trigger('stylechanged');
        return result;
      }
    })();

    // Add listener
    $('a#handle').on('stylechanged', function () {
      let calcpercentgeopacity = $("#layerTrans").val() * 100;
      $('#' + $currentSlide + '-' + $currentLayer).find('.inner').children(":first")
        .css({'opacity': calcpercentgeopacity +'%'});
    });

    $('#slider').mouseup(function (e) {
      saveLayer();
    });



    $('#slidedesign, #preview').width($settings.startwidth).height($settings.startheight);

    /*Global setiings*/

    $settings = $.extend(defaultSettings, $settings);
    $('input.global-settings, select.global-settings').each(function (index) {
      $(this).val($settings[$(this).attr('name')]);
    });

    // Time / Date load
    addDateTimeEditor();

    $('select[name=widgetzoom]').change(function () {
      if ($('select[name=widgetpos]').val() != 'res_a') {
        changeWidgetzoom($currentLayer, $(this).val());
      }
    });


    $('select[name=widgetpos]').change(function () {
      var $widget = $('#' + $currentSlide + '-' + $currentLayer).find("." + $slides[$currentSlide].layers[$currentLayer].elfsightFB);
      if ($(this).val() == 'res_a') {
        $widget.css({
          width: '1920px',
          height: '1080px',
          zoom: ''
        });
        $('select[name=widgetzoom]').prop("disabled", true);
      }
      if ($(this).val() == 'res_b') {
        $widget.css({
          width: 'auto',
          height: 'auto'
        });

      }
    });


    $('select[name=clockzoom]').change(function () {
      changeclockzoom($currentLayer, $(this).val());
    });

    $('select[name=clockoptions]').change(function () {
      changeTimeEditor($currentLayer, $(this).val());
      addDateTimeEditor($currentLayer, $(this).val());
    });

    $('input[name=left]').change(function () {
      var left = $(this).val(),
        layer = $('#' + $currentSlide + '-' + $currentLayer);
      if (left == 'left') left = 0;
      else if (left == 'center') {
        left = ($('#slidedesign').width() - layer.width()) / 2;
      } else if (left == 'right') {
        left = $('#slidedesign').width() - layer.width();
      }
      $('#' + $currentSlide + '-' + $currentLayer).css({
        left: left + 'px'
      });
    });
    $('input[name=top]').change(function () {
      $('#' + $currentSlide + '-' + $currentLayer).css({
        top: $(this).val() + 'px'
      });
    });
    $('input[name=width]').change(function () {
      $('#' + $currentSlide + '-' + $currentLayer).css({
        width: $(this).val() + 'px'
      });
    });
    $('input[name=height]').change(function () {
      $('#' + $currentSlide + '-' + $currentLayer).css({
        height: $(this).val() + 'px'
      });
    });


    /* #ANIMATIONS CHANGE ON SELECT*/


    $('select[name=extrafanimation]').change(function () {
      startanimatie();
    });

    // $('select[name=weatherwidgets]').change(function () {
    //   //doe iets ......
    // });

  });


  /*Focus text on position (add <br />*/
  function addTextAtCaret(textAreaId, text) {
    var textArea = document.getElementById(textAreaId);
    var cursorPosition = textArea.selectionStart;
    addTextAtCursorPosition(textArea, cursorPosition, text);
    updateCursorPosition(cursorPosition, text, textArea);
  }

  function addTextAtCursorPosition(textArea, cursorPosition, text) {
    var front = (textArea.value).substring(0, cursorPosition);
    var back = (textArea.value).substring(cursorPosition, textArea.value.length);
    textArea.value = front + text + back;
  }

  function updateCursorPosition(cursorPosition, text, textArea) {
    cursorPosition = cursorPosition + text.length;
    textArea.selectionStart = cursorPosition;
    textArea.selectionEnd = cursorPosition;
    textArea.focus();
  }

  function saveSlide() {
    if ($slides.length == 0) return;
    jQuery('.slide-option').each(function (index) {
      $slides[$currentSlide][jQuery(this).attr('name')] = $(this).val();
    });

    // $slides[$currentSlide].layers.sort(ArtCompare);
    // saveLayer();
  }

  function removeSlide(slideIndex) {
    $slides[slideIndex].removed = 1;
    $('ul#slideslist').find('li[index=' + slideIndex + ']').remove();
    if (slideIndex == $currentSlide) {
      if ($('ul#slideslist li').length > 0) {
        var firstIndex = parseInt($('ul#slideslist').find('li:first').attr('index'));
        loadSlide(firstIndex);
        // saveLayerSlider();
      }
    }
  }

  /*Slide functions  $slides[$currentSlide].title    */
  function addSlideTab(slideIndex) {
    var transslide = Drupal.t('Slide Title');
    var slideTab = $('<li>').attr('index', slideIndex);
    var slideTabTitle = '';
    var slideTabTitlePreview = '';

    if ($slides[slideIndex].title == '') {
      slideTabTitle = $('<span class="titleslide">').text(transslide + ' #' + (slideIndex + 1));
      slideTabTitlePreview = 'Slide ' + (transslide + ' #' + (slideIndex + 1));
    } else {
      slideTabTitle = $('<span class="titleslide">').text($slides[slideIndex].title || 'Slide title');
      slideTabTitlePreview = $slides[slideIndex].title ;
    }


    slideTabTitle.click(function () {
      if ($(this).hasClass('active')) return;
      saveLayer();
      saveSlide();
      loadSlide(slideIndex);
      // Remove layer options fields
      var countlayers = $('#layerslist li').length;
      if (countlayers === 0) {
        $('#layeroptions').removeClass('showlayers').addClass('hiddenlayers');
        $('.addsliderbutton').removeClass("hidelayerbutton").addClass("showsliderbutton");
        $('.slidertools').css({visibility: 'visible'});
      }

    });

    var slideTabRemove = $('<span data-toggle="tooltip" data-placement="right" title="Verwijder slide">').text('').addClass('remove-slide fa fa-trash-o');
    var slideTabDuplicate = $('<span data-toggle="tooltip" data-placement="right" title="Dupliceer slide">').text('').addClass('dublicate-slide fa fa-copy');
    var slideTabPreview = $('<span data-link="/klant/preview-slide?id=' + jQuery('input[name=sid]').val() + '&slide=' + slideIndex + '"  data-slideid="#' + slideIndex + '" id="" class=" iframe-popup ownbutton" data-width="1050" data-height="650" data-toggle="tooltip" data-placement="right" data-html="true" title="Preview slide: ' + slideTabTitlePreview + '">').text('').addClass('preview-slide dublicate-slide far fas fa-tv');

    slideTabRemove.click(function () {

      var swaltext1 = Drupal.t('Delete') + ' ' + $slides[slideIndex].title;
      var swaltext2 = Drupal.t("Are you sure you want to delete this slide?") + "<br>" + Drupal.t("You cannot undo this!");
      var swalconfirm = Drupal.t('Delete');
      var swalcancel = Drupal.t('Cancel');


      swal({
        title: swaltext1,
        text: swaltext2,
        type: "error",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: swalconfirm,
        cancelButtonText: swalcancel,
        html: true,
        closeOnConfirm: true,
      }, function () {
        removeSlide(slideIndex);

        // Remove layer options fields
        var countslides = $('#slideslist li').length;
        if (countslides === 0) {
          $('.slideroptions').removeClass('showlayers').addClass('hiddenlayers');
          $('#layeroptions').removeClass('showlayers').addClass('hiddenlayers');
          $('.addsliderbutton').removeClass("hidelayerbutton").addClass("showsliderbutton");
          $('.slidertools').css({visibility: 'visible'});
        }

      });

    });

    slideTabDuplicate.click(function () {
      if ($(slideTab).hasClass('active')) {
        duplicateSlide(slideIndex);

        function delay() {
          $("#slideslist").find("li:last-child").addClass('last');

        }

        window.setTimeout(delay, 200); // 1 seconds
        $("#slideslist").find("li").each(function (index) {
          var sindex = $(this).attr("index");
          $slides[sindex].index = index;
        });
      } else {
        var savemessage2 = Drupal.t('You must first choose the slide you want to duplicate.');
        swal({
          title: "",
          text: savemessage2,
          type: "info",
          timer: 3500,
          showCancelButton: false,
          confirmButtonClass: "btn-info",
        });

      }
    });

    slideTab.append(slideTabTitle);
    slideTab.append(slideTabPreview);
    slideTab.append(slideTabDuplicate);
    slideTab.append(slideTabRemove);
    $('#slideslist').append(slideTab);
  }


  function duplicateSlide() {
    var newSlideIndex = $slides.length;
    $slides[newSlideIndex] = {};
    $.extend(true, $slides[newSlideIndex], $slides[$currentSlide]);
    addSlideTab(newSlideIndex);
    loadSlide(newSlideIndex);
  }

  function loadSlide(slideIndex) {

    var slidecl = $('.disable-enabled').attr("class").split(" ");
    var slidenewcl = [];

    $currentSlide = slideIndex;

    $('ul#slideslist').find('li').removeClass('active').removeClass('current');
    $('ul#slideslist').find('li[index=' + slideIndex + ']').addClass('active').addClass('current');
    $('.enabledisableclass').find('.disable-enabled').addClass('sid');

    for (var i = 0; i < slidecl.length; i++) {
      r = slidecl[i].search(/sid-+/);
      if (r) slidenewcl[slidenewcl.length] = slidecl[i];
    }


    $('.disable-enabled').removeClass().addClass(slidenewcl.join(' '));
    $('.disable-enabled').addClass('sid-' + slideIndex);


    if ($slides[slideIndex].disableslide == 'true') {
        $('select[name=disableslide]').addClass('disabled');
        $('ul#slideslist').find('li[index=' + slideIndex + ']').addClass('disabled');
      }

    if ($slides[slideIndex].disableslide != 'false') {
      $('select[name=disableslide]').removeClass('disabled');
      $('ul#slideslist').find('li[index=' + slideIndex + ']').removeClass('enabled');
    }

    if ($slides[slideIndex].lockslide != '') {
      changeSlideLocked(slideIndex);
    }

    if ($slides[slideIndex].background_image != '') {
      $('#slidedesign').css({
        backgroundImage: 'url(' + $slides[slideIndex].background_image + ')'
      });
    } else {
      $('#slidedesign').css({
        backgroundImage: 'none'
      });
    }

    if ($slides[slideIndex].backgroundcolormain != '') {
      setString('bgcolor', $slides[slideIndex].backgroundcolormain);
      // $('#slidedesign, .demo-preview, .backgroundchanger').css({
      //     backgroundColor: $slides[slideIndex].backgroundcolormain
      // });
    } else {
      setString('bgcolor', defaultSlide.backgroundcolormain);
      // $('#slidedesign, .demo-preview, .backgroundchanger').css({
      //     backgroundColor: '#0c0c0c'
      // });
    }

    jQuery('.slide-option').each(function (index) {
      if (typeof $slides[slideIndex][jQuery(this).attr('name')] != "undefined") {
        jQuery(this).val($slides[slideIndex][jQuery(this).attr('name')]);
      } else {
        jQuery(this).val('');
      }
    });
    // console.error($slides[slideIndex]);
    /**/
    loadLayers(slideIndex);
    addpreviewBGimage();
    removeanimtiotoptions();
    changeSlideDisabled(slideIndex);
  }

  /*Layer functions*/
  function loadLayers(slideIndex) {
    $('#slidedesign').find('div').remove();
    $currentSlide = slideIndex;
    /*Remove all layer tabs*/
    $('#layerslist').find('li').remove();
    /*Load new layer tabs*/
    if (typeof $slides[$currentSlide].layers == 'undefined') {
      $slides[$currentSlide].layers = [];
    }
    $($slides[$currentSlide].layers).each(function (layerIndex) {
      if ($slides[$currentSlide].layers[layerIndex].removed != 1) {
        addLayerTab(layerIndex);
      }
    });
    /*Reset layer option value*/
    // $('.layer-option').val('');
    if (typeof $slides[$currentSlide].layers[0] != 'undefined') {
      $('#layeroptions').addClass("showlayers").removeClass('hiddenlayers');
      $('.addsliderbutton').removeClass("hidelayerbutton").addClass("showsliderbutton");
      $('.slidertools').css({visibility: 'visible'});
      //console.log('show layer ouput');

      loadLayer(0);
    } else {
      $('#layeroptions').removeClass('showlayers').addClass('hiddenlayers');
      $('.addsliderbutton').removeClass("hidelayerbutton").addClass("showsliderbutton");
      $('.slidertools').css({visibility: 'visible'});
      //console.log('dont show layer ouput');

    }
  }

  function nl2br(str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
      return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }


  function addLayerTab(layerIndex, ajax, ui) {
    var translayer = Drupal.t('Layer Title');
    var layertype = $slides[$currentSlide].layers[layerIndex].type;
    var layerTab = $('<li>').attr('index', layerIndex).addClass(layertype);
    $slides[$currentSlide].layers[layerIndex].title = $slides[$currentSlide].layers[layerIndex].title || translayer + ' #' + (layerIndex + 1);
    //var layerTitle = $slides[$currentSlide].layers[layerIndex].title'Layer ' + (layerIndex + 1)
    var layerTabTitle = $('<span>').text($slides[$currentSlide].layers[layerIndex].title.substring(0, 31)).addClass('titlelayerclass');
    var layerTabhide = $('<span data-toggle="tooltip" data-placement="bottom" data-html="true" title="Tijdelijk verbergen ' + $slides[$currentSlide].layers[layerIndex].title + '">').text('').addClass('verberg-layer far far fa-eye');
    var layerTabRemove = $('<span data-toggle="tooltip" data-placement="bottom" data-html="true" title="Verwijderd ' + $slides[$currentSlide].layers[layerIndex].title + '">').text('').addClass('remove-layer fa fa-trash-o');
    var layerTabDuplicate = $('<span data-toggle="tooltip" data-placement="bottom" data-html="true" title="Dupliceer ' + $slides[$currentSlide].layers[layerIndex].title + '">').text('').addClass('duplicate-layer fa fa-copy');


    layerTabTitle.click(function () {
      saveLayer();
      loadLayer(layerIndex);
      removeanimtiotoptions();
    });

    layerTabDuplicate.click(function () {
      saveLayer();
      duplicateLayer(layerIndex);
      loadLayer(layerIndex);
    });

    layerTabhide.click(function () {
      var layerIndex = $(this).parent('li').attr('index');
      $('#slidedesign').find('div#' + $currentSlide + '-' + layerIndex + '').toggleClass('hidden');
      $(this).toggleClass('fa-eye-slash');
    });

    layerTabRemove.click(function () {
      var layerIndex = $(this).parent('li').attr('index');
      var swaltext1 = Drupal.t('Remove') + ' ' + $slides[$currentSlide].layers[layerIndex].title;
      var swaltext2 = Drupal.t("Are you sure you want to remove this layer") + "<br>" + Drupal.t("This can not be undone!");
      var swalconfirm = Drupal.t('Delete');
      var swalcancel = Drupal.t('Cancel');

      swal({
        title: swaltext1,
        text: swaltext2,
        type: "error",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: swalconfirm,
        cancelButtonText: swalcancel,
        html: true,
        closeOnConfirm: true,
      }, function () {
        removeLayer(layerIndex);
        saveLayer();

        // Remove layer options fields
        var countlayers = $('#layerslist li').length;
        if (countlayers === 0) {
          $('#layeroptions').removeClass('showlayers').addClass('hiddenlayers');
          $('.addsliderbutton').removeClass("hidelayerbutton").addClass("showsliderbutton");
          $('.slidertools').css({visibility: 'visible'});
        }

      });
    });

    // layerTabRemove.click(function () {
    //     removeLayer(layerIndex);
    // });
    layerTab.append(layerTabTitle);
    layerTab.append(layerTabRemove);
    layerTab.append(layerTabDuplicate);
    layerTab.append(layerTabhide);
    $('ul#layerslist').append(layerTab);

    var typeclass = $slides[$currentSlide].layers[layerIndex].type;
    // var picture = $('ul#layerslist li.active').removeClass('text image video clock news social widgets weather instagram facebook googlereview').addClass(type);
    var newLayerDesign = $('<div>').addClass('layer tp-caption').attr('id', $currentSlide + '-' + layerIndex);

    if (typeclass === 'text') {
      newLayerDesign.addClass('caption' + ' ' + 'tekst');
    } else {
      newLayerDesign.addClass('caption' + ' ' + typeclass);
    }
    if (typeof $slides[$currentSlide].layers[layerIndex].videosize == 'undefined') {
      $slides[$currentSlide].layers[layerIndex].videosize = 'videosize_A';
    }

    if (typeof $slides[$currentSlide].layers[layerIndex].layertransparant == 'undefined') {
      $slides[$currentSlide].layers[layerIndex].layertransparant = '1';
    }

    if (typeof $slides[$currentSlide].layers[layerIndex].layertransparant == '') {
      $slides[$currentSlide].layers[layerIndex].layertransparant = '1';
    }

    if (typeof $slides[$currentSlide].layers[layerIndex].layertransparant == ' ') {
      $slides[$currentSlide].layers[layerIndex].layertransparant = '1';
    }
    if (typeof $slides[$currentSlide].layers[layerIndex].text_style_text == 'undefined') {
      $slides[$currentSlide].layers[layerIndex].text_style_text = '';
    }
    if (typeof $slides[$currentSlide].layers[layerIndex].font_size == 'undefined') {
      $slides[$currentSlide].layers[layerIndex].font_size = '62px';
    }
    if (typeof $slides[$currentSlide].layers[layerIndex].font_color_text == 'undefined') {
      $slides[$currentSlide].layers[layerIndex].font_color_text = '#ffffff';
    }
    if (typeof $slides[$currentSlide].layers[layerIndex].font_color_news == 'undefined') {
      $slides[$currentSlide].layers[layerIndex].font_color_news = '#ffffff';
    }
    if (typeof $slides[$currentSlide].layers[layerIndex].font_color_clock == 'undefined') {
      $slides[$currentSlide].layers[layerIndex].font_color_clock = '#ffffff';
    }
    if ($slides[$currentSlide].layers[layerIndex].type == 'text') {
      newLayerDesign.addClass($slides[$currentSlide].layers[layerIndex].font_size);
    }

    /* DRAG, RESIZE & ROTATE FUNCTION */

    $slides.defaultResizeOptions = {
      aspectRatio: $slides[$currentSlide].layers[layerIndex].type == 'image',
      // containment: "parent",
      handles: "all",

      resize: function (event, ui) {
        $(this).find('img').css({width: ui.size.width, height: ui.size.height});
        $('input[name=width]').val(ui.size.width);
        $('input[name=height]').val(ui.size.height);
        setLayerDimensions(layerIndex, ui.size.width, ui.size.height);
      },
      create: function () {
        $(this).find('img').css({
          width: $slides[$currentSlide].layers[layerIndex].width,
          height: $slides[$currentSlide].layers[layerIndex].height
        });
      }
    };

    $slides.defaultResizeOptionsMovie = {
      aspectRatio: true,
      containment: "parent",
      handles: "all",

      resize: function (event, ui) {
        $(this).find('video').css({width: ui.size.width, height: ui.size.height});
        $(this).find('layer').css({width: ui.size.width, height: ui.size.height});
        $('input[name=video_width]').val(ui.size.width);
        $('input[name=video_height]').val(ui.size.height);
        setLayerDimensions(layerIndex, ui.size.video_width, ui.size.video_height);
      },
      create: function () {
        $(this).find('video').css({
          width: $slides[$currentSlide].layers[layerIndex].width,
          height: $slides[$currentSlide].layers[layerIndex].height
        });
      }
    };

    $slides.defaultRotateOptionsImage = {
      degrees: $slides[$currentSlide].layers[layerIndex].image_rotate,
      radians: $slides[$currentSlide].layers[layerIndex].image_rotate,
      distance: 1,
      delay: 0,
      alsoRotate: true,
      wheelRotate: false,
      rotate: function (event, ui) {
      },
      start: function () {
        $('input[name=image_rotate]').val();
      },
      stop: function (event, ui) {
        let radians = ui.angle.current;
        let degrees = radians * 180 / Math.PI;
        $('input[name=image_rotate]').val(degrees);
      },
    };

    $slides.defaultRotateOptionsText = {
      degrees: $slides[$currentSlide].layers[layerIndex].text_rotate,
      radians: $slides[$currentSlide].layers[layerIndex].text_rotate,
      distance: 10,
      delay: 10,
      alsoRotate: true,
      wheelRotate: false,
      rotate: function (event, ui) {
      },
      start: function () {
        $('input[name=text_rotate]').val();
      },
      stop: function (event, ui) {
        let radians = ui.angle.current;
        let degrees = radians * 180 / Math.PI;
        $('input[name=text_rotate]').val(degrees);
      },
    };
    $slides.defaultRotateOptionsMovie = {
      degrees: $slides[$currentSlide].layers[layerIndex].movie_rotate,
      radians: $slides[$currentSlide].layers[layerIndex].movie_rotate,
      distance: 10,
      delay: 10,
      alsoRotate: true,
      wheelRotate: false,
      rotate: function (event, ui) {
      },
      start: function () {
        $('input[name=movie_rotate]').val();
      },
      stop: function (event, ui) {
        let radians = ui.angle.current;
        let degrees = radians * 180 / Math.PI;
        $('input[name=movie_rotate]').val(degrees);
      },
    };
    var recoupLeft, recoupTop;

    newLayerDesign.mousedown(function () {
      saveLayer();
      loadLayer(layerIndex);
    }).draggable({
      // containment: "parent",
      opacity: "0.5",
      cursor: "move",
      zIndex: 99999,

      start: function (event, ui) {
        var left = parseInt($(this).css('left'), 10);
        left = isNaN(left) ? 0 : left;
        var top = parseInt($(this).css('top'), 10);
        top = isNaN(top) ? 0 : top;
        recoupLeft = left - ui.position.left;
        recoupTop = top - ui.position.top;
      },
      drag: function (event, ui) {
        ui.position.left += recoupLeft;
        ui.position.top += recoupTop;

        $('input[name=left]').val(ui.position.left);
        $('input[name=top]').val(ui.position.top);

        setLayerPosition(layerIndex, ui.position.top, ui.position.left);

        ui.position.top = Math.round(ui.position.top);
        ui.position.left = Math.round(ui.position.left);
      },

    }).resizable($slides.defaultResizeOptions)

    // let change = {
    //   37: {
    //     left: "-=0.01"
    //   },
    //
    //   38: {
    //     top: "-=0.01"
    //   },
    //
    //   39: {
    //     left: "+=0.01"
    //   },
    //
    //   40: {
    //     top: "+=0.01"
    //   },
    // }
    // $(document).one("keydown", keyDown)
    //
    // let going;
    //
    // function keyDown(event) {
    //
    //   //console.log("down")
    //   $(document).one("keyup", keyup)
    //   let animation = change[event.which];
    //   let keepGoingF = keepGoing();
    //
    //   function keepGoing() {
    //     $(".layer.selected").css(animation)
    //   }
    //
    //   if(keepGoingF == "" || keepGoingF !== "undefined") {
    //     return false;
    //   } else {
    //     going = setInterval(keepGoing, 0.1);
    //   }
    //
    // }
    //
    // function keyup() {
    //   let layerSelected = $('.layer.selected');
    //
    //   let left = parseInt($(layerSelected).css('left'), 1);
    //   let top = parseInt($(layerSelected).css('top'), 1);
    //
    //   $('input[name=left]').val(Math.round(left));
    //   $('input[name=top]').val(Math.round(top));
    //
    //   clearInterval(going)
    //   $(document).one("keydown", keyDown)
    //   saveLayer();
    // }

    let $typelayer = $slides[$currentSlide].layers[layerIndex].type;

    if ($typelayer != 'text' && $typelayer != 'image' && $typelayer != 'clock' && $typelayer != 'widgets' && $typelayer != 'video') {
      newLayerDesign.draggable("disable");
    }

    if ($typelayer == 'image') {
      newLayerDesign.rotatable($slides.defaultRotateOptionsImage);
    }
    if ($typelayer == 'text') {
      newLayerDesign.rotatable($slides.defaultRotateOptionsText).resizable("disable");
    }
    if ($typelayer == 'video') {
      newLayerDesign.rotatable($slides.defaultRotateOptionsMovie).resizable($slides.defaultResizeOptionsMovie);
    }
    if ($typelayer == 'iframe') {
      newLayerDesign.draggable("disable").resizable("disable");
    }
    if ($typelayer == 'weather') {
      newLayerDesign.draggable("disable").resizable("disable");
    }
    if ($typelayer == 'animatie') {
      newLayerDesign.draggable("disable").resizable("disable");
    }
    if ($typelayer == 'instagram') {
      newLayerDesign.draggable("disable").resizable("disable");
    }
    if ($typelayer == 'facebook') {
      newLayerDesign.draggable("disable").resizable("disable");
    }
    if ($typelayer == 'googlereview') {
      newLayerDesign.draggable("disable").resizable("disable");
    }

    /*TOT HIER DIE MOTHERFUCKER*/

    let content = '';
    switch ($slides[$currentSlide].layers[layerIndex].type) {

      case 'text':
        content = $('<p>')
          .addClass('font-text ' + $slides[$currentSlide].layers[layerIndex].text_style_text)
          .css({
            'opacity': $slides[$currentSlide].layers[layerIndex].layertransparant,
            'text-align': $slides[$currentSlide].layers[layerIndex].font_uitlijning_v1,
            'color': $slides[$currentSlide].layers[layerIndex].font_color_text
          })
          .html(nl2br($slides[$currentSlide].layers[layerIndex].text))
        ;
        break;

      case 'image':
        content = '<img class="imageuploaded" id="imageresize" src="' + $slides[$currentSlide].layers[layerIndex].image + '" style="width: ' + $slides[$currentSlide].layers[layerIndex].width + 'px; height: ' + $slides[$currentSlide].layers[layerIndex].height + 'px; opacity: ' + $slides[$currentSlide].layers[layerIndex].layertransparant + ';"/>';
        let img = new Image();
        img.src = $slides[$currentSlide].layers[layerIndex].image;
        break;

      case 'video':
        content = '<video muted style="opacity: ' + $slides[$currentSlide].layers[layerIndex].layertransparant + ';" class="videoadmin" preload=auto width=' + $slides[$currentSlide].layers[layerIndex].video_width + ' height="auto">' + '<source src="' + $slides[$currentSlide].layers[layerIndex].video + '"type="video/mp4">' + '</video>'
        break;

      case 'clock':

        if ($slides[$currentSlide].layers[layerIndex].clockoptions === 'datum') {
          content = "<div class='clockfull' style='zoom:" + $slides[$currentSlide].layers[layerIndex].clockzoom + " ; color:" + $slides[$currentSlide].layers[layerIndex].font_color_clock + "; text-align:" + $slides[$currentSlide].layers[layerIndex].font_uitlijning_clock + "; opacity: " + $slides[$currentSlide].layers[layerIndex].layertransparant + ";'>" +
            "<div id='clock' class='font-clock " + $slides[$currentSlide].layers[layerIndex].text_style_clock + "  " + $slides[$currentSlide].layers[layerIndex].clockoptions + "'>" +
            "<div class='clockoptions'>" +
            "<p><span class='onlyday " + $slides[$currentSlide].layers[layerIndex].clockoptions + "'></span><span class='date " + $slides[$currentSlide].layers[layerIndex].clockoptions + "'> |  </span><span class='onlydate " + $slides[$currentSlide].layers[layerIndex].clockoptions + "' ></span></p>" +
            "<p class='clocktime " + $slides[$currentSlide].layers[layerIndex].clockoptions + "'></p>" +
            "</div>" +
            "</div>" +
            "</div>";
        }


        if ($slides[$currentSlide].layers[layerIndex].clockoptions === 'datum-a') {
          content = "<div class='clockfull' style='zoom:" + $slides[$currentSlide].layers[layerIndex].clockzoom + " ; color:" + $slides[$currentSlide].layers[layerIndex].font_color_clock + "; text-align:" + $slides[$currentSlide].layers[layerIndex].font_uitlijning_clock + "; opacity: " + $slides[$currentSlide].layers[layerIndex].layertransparant + ";'>" +
            "<div id='clock' class='font-clock " + $slides[$currentSlide].layers[layerIndex].text_style_clock + "'>" +
            "<div class='clockoptions'>" +
            "<p class='onlydate'></p>" +
            "</div>" +
            "</div>" +
            "</div>";
        }

        if ($slides[$currentSlide].layers[layerIndex].clockoptions === 'dag-a') {
          content = "<div class='clockfull' style='zoom:" + $slides[$currentSlide].layers[layerIndex].clockzoom + " ; color:" + $slides[$currentSlide].layers[layerIndex].font_color_clock + "; text-align:" + $slides[$currentSlide].layers[layerIndex].font_uitlijning_clock + "; opacity: " + $slides[$currentSlide].layers[layerIndex].layertransparant + ";'>" +
            "<div id='clock' class='font-clock " + $slides[$currentSlide].layers[layerIndex].text_style_clock + "'>" +
            "<div class='clockoptions'>" +
            "<p class='onlyday'></p>" +
            "</div>" +
            "</div>" +
            "</div>";
        }

        if ($slides[$currentSlide].layers[layerIndex].clockoptions === 'tijd-a') {
          content = "<div class='clockfull' style='zoom:" + $slides[$currentSlide].layers[layerIndex].clockzoom + " ; color:" + $slides[$currentSlide].layers[layerIndex].font_color_clock + "; text-align:" + $slides[$currentSlide].layers[layerIndex].font_uitlijning_clock + "; opacity: " + $slides[$currentSlide].layers[layerIndex].layertransparant + ";'>" +
            "<div id='clock' class='font-clock " + $slides[$currentSlide].layers[layerIndex].text_style_clock + "'>" +
            "<div class='clockoptions'>" +
            "<p class='clocktime'></p>" +
            "</div>" +
            "</div>" +
            "</div>";
        }

        break;

      case 'news':
        content = "<div style='width:1920px; height:1080px;' class='nieuwsfull' style='color:" + $slides[$currentSlide].layers[layerIndex].font_color_news + "; opacity: " + $slides[$currentSlide].layers[layerIndex].layertransparant + ";'> " +
          "<div id='slideshow' class='sliders font-news " + $slides[$currentSlide].layers[layerIndex].text_style_news + "' >" +
          "<div class='slideitem current'>" +
          "<p class='newstitle'>Nieuws titel</p>" +
          "<p class='newsinhoud'>Het nieuws bericht...</p></div>" +
          "<div>" +
          "</div>";
        break;

      case 'widgets':

        if ($slides[$currentSlide].layers[layerIndex].widgetpos === '') {
          content = "<div style='opacity: " + $slides[$currentSlide].layers[layerIndex].layertransparant + "; width:" + $settings.startwidth + "px; height:" + $settings.startheight + "px;' class=" + $slides[$currentSlide].layers[layerIndex].elfsightFB + ">'</div>";
          $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("enable").css({
            'width': 'auto',
            'height': 'auto'
          });
        }

        if ($slides[$currentSlide].layers[layerIndex].widgetpos === 'res_a') {
          content = "<div style='opacity: " + $slides[$currentSlide].layers[layerIndex].layertransparant + "; width:" + $settings.startwidth + "px; height:" + $settings.startheight + "px;' class=" + $slides[$currentSlide].layers[layerIndex].elfsightFB + ">'</div>";
          $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("enable").css({
            'width': 'auto',
            'height': 'auto'
          });
        }

        if ($slides[$currentSlide].layers[layerIndex].widgetpos === 'res_b') {
          content = "<div style='opacity: " + $slides[$currentSlide].layers[layerIndex].layertransparant + "; width:auto; height:auto; zoom:" + $slides[$currentSlide].layers[layerIndex].widgetzoom + "; 'class='" + $slides[$currentSlide].layers[layerIndex].elfsightFB + "'></div>";
          $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("enable").css({
            'width': 'auto',
            'height': 'auto'
          });
        }

        break;

      case 'iframe':
        content = '<iframe width="'+$slides[$currentSlide].layers[layerIndex].slidewidth+'px'+'" height="'+$slides[$currentSlide].layers[layerIndex].slideheight+'px'+'" scrolling="no" id="iframeContentMain" class="iframeContentMain" name="iframeContentMain" src="' + $slides[$currentSlide].layers[layerIndex].iframeURL + '"></iframe>';
        break;

      case 'animatie': /* #ANIMATIONS */

        if ($slides[$currentSlide].layers[layerIndex].extrafanimation === 'noanimation') {
          content = "\"<div class='animationframe'><div id='animatieframe' style='width:1920px; height:1080px;' class='\" + $slides[$currentSlide].layers[layerIndex].extrafanimation + \"'>\" + \"</div></div>\"";
        }

        if ($slides[$currentSlide].layers[layerIndex].extrafanimation === 'fsa-rain') {
          content =
            "<div style='width:" + $slides[$currentSlide].layers[layerIndex].slidewidth + "px; height:" + $slides[$currentSlide].layers[layerIndex].slideheight + "px;' id='animatieframe' class='" + $slides[$currentSlide].layers[layerIndex].extrafanimation + "'>" +
            raincontent +
            "</div>";
        }

        if ($slides[$currentSlide].layers[layerIndex].extrafanimation === 'fsa-snow') {
          content =
            "<div style='width:" + $slides[$currentSlide].layers[layerIndex].slidewidth + "px; height:" + $slides[$currentSlide].layers[layerIndex].slideheight + "px;' id='animatieframe' class='" + $slides[$currentSlide].layers[layerIndex].extrafanimation + "'>" +
            snowcontent +
            "</div>";
        }

        if ($slides[$currentSlide].layers[layerIndex].extrafanimation === 'fsa-blocks') {
          content =
            "<div style='width:" + $slides[$currentSlide].layers[layerIndex].slidewidth + "px; height:" + $slides[$currentSlide].layers[layerIndex].slideheight + "px;' id='animatieframe' class='" + $slides[$currentSlide].layers[layerIndex].extrafanimation + "'>" +
            "<div class='animationframe'>" +
            "<i style='background:rgba(255, 255, 255, 0.7);'></i><i style='background:rgba(255, 255, 255, 0.7);'></i><i style='background:rgba(255, 255, 255, 0.7);'></i><i style='background:rgba(255, 255, 255, 0.7);'></i><i style='background:rgba(255, 255, 255, 0.7);'></i><i style='background:rgba(255, 255, 255, 0.7);'></i><i style='background:rgba(255, 255, 255, 0.7);'></i><i style='background:rgba(255, 255, 255, 0.7);'></i><i style='background:rgba(255, 255, 255, 0.7);'></i><i style='background:rgba(255, 255, 255, 0.7);'></i>" +
            "</div>" +
            "</div>";
        }

        if ($slides[$currentSlide].layers[layerIndex].extrafanimation === 'fsa-blocks') {
          content =
            "<div style='width:" + $slides[$currentSlide].layers[layerIndex].slidewidth + "px; height:" + $slides[$currentSlide].layers[layerIndex].slideheight + "px;' id='animatieframe' class='" + $slides[$currentSlide].layers[layerIndex].extrafanimation + "'>" +
            "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
            "<div class='animationframe'>" +
            "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
            "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
            "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
            "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
            "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
            "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
            "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
            "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
            "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
            "</div>" +
            "</div>";
        }

        if ($slides[$currentSlide].layers[layerIndex].extrafanimation === 'fsa-confetti') {
          content =
            "<div style='width:" + $slides[$currentSlide].layers[layerIndex].slidewidth + "px; height:" + $slides[$currentSlide].layers[layerIndex].slideheight + "px;' id='animatieframe' class='" + $slides[$currentSlide].layers[layerIndex].extrafanimation + "'>" +
            "<div class='conf-cont'>" +
            "<div class='animationframe'>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "<div class='confetti'></div>" +
            "</div>" +
            "</div>" +
            "</div>";
        }

        if ($slides[$currentSlide].layers[layerIndex].extrafanimation === 'fsa-stars') {
          content =
            "<div style='width:" + $slides[$currentSlide].layers[layerIndex].slidewidth + "px; height:" + $slides[$currentSlide].layers[layerIndex].slideheight + "px;' id='animatieframe' class='" + $slides[$currentSlide].layers[layerIndex].extrafanimation + "'>" +
            "<div class='animationframe'>" +
            "<div class='stars'></div>" +
            "</div>" +
            "</div>";
        }

        if ($slides[$currentSlide].layers[layerIndex].extrafanimation === 'fsa-balloons') {
          content =
            "<div style='width:" + $slides[$currentSlide].layers[layerIndex].slidewidth + "px; height:" + $slides[$currentSlide].layers[layerIndex].slideheight + "px;' id='animatieframe' class='" + $slides[$currentSlide].layers[layerIndex].extrafanimation + "'>" +
            "<div class='animationframe'>" +
            "<div class='balloons'></div>" +
            "</div>" +
            "</div>";

          loadballoons();
        }

        if ($slides[$currentSlide].layers[layerIndex].extrafanimation === 'fsa-balls') {
          content =
            "<div style='width:" + $slides[$currentSlide].layers[layerIndex].slidewidth + "px; height:" + $slides[$currentSlide].layers[layerIndex].slideheight + "px;' id='animatieframe' class='" + $slides[$currentSlide].layers[layerIndex].extrafanimation + "'>" +
            "<div class='animationframe'>" +
            "<div id='baller'></div>" +
            "</div>" +
            "</div>";

          loadballs();
        }

        if ($slides[$currentSlide].layers[layerIndex].extrafanimation === 'fsa-fireworks') {
          content =
            "<div style='width:" + $slides[$currentSlide].layers[layerIndex].slidewidth + "px; height:" + $slides[$currentSlide].layers[layerIndex].slideheight + "px;' id='animatieframe' class='" + $slides[$currentSlide].layers[layerIndex].extrafanimation + "'>" +
            "<div class='animationframe'>" +
            "<div class='pyro'></div>" +
            "</div>" +
            "</div>";
        }

        break;

      case 'weather':

        if ($slides[$currentSlide].layers[layerIndex].weatherwidgets === 'noweather') {
          content =
            "<div class='demo-weatherwidgetAnimated' style='width:1920px; height:1080px;'>" +
            "<img src='/sites/all/modules/art_revolution/images/weather/Clouds.png'>" +
            "</div>" +
            "<div class='demo-weatherwidgetImage' style='width:1920px; height:1080px;'></div>" +
            "<div class='demo-weatherwidget'>" +
            "    <div class='demo-container-weer'>" +
            "        <div class='demo-weather'><img src='/sites/all/modules/art_revolution/images/weather/Mainweather.png'></div>" +
            "        <div class='demo-forecaster' id='demo-forecast'><img src='/sites/all/modules/art_revolution/images/weather/Forecast.png'></div>" +
            "    </div>" +
            "</div>";
        }

        if ($slides[$currentSlide].layers[layerIndex].weatherwidgets === 'weatherBeta') {
          content =
            "<div class='demo-weatherwidgetAnimated' style='width:1920px; height:1080px;'>" +
            "<img src='/sites/all/modules/art_revolution/images/weather/Clouds.png'>" +
            "</div>" +
            "<div class='demo-weatherwidgetImage' style='width:1920px; height:1080px;'></div>" +
            "<div class='demo-weatherwidget'>" +
            "    <div class='demo-container-weer'>" +
            "        <div class='demo-weather'><img src='/sites/all/modules/art_revolution/images/weather/Mainweather.png'></div>" +
            "        <div class='demo-forecaster' id='demo-forecast'><img src='/sites/all/modules/art_revolution/images/weather/Forecast.png'></div>" +
            "    </div>" +
            "</div>";
        }
        else  {
          content =
            "<div class='demo-weatherwidgetAnimated' style='width:1920px; height:1080px;'>" +
            "<img src='/sites/all/modules/art_revolution/images/weather/Clouds.png'>" +
            "</div>" +
            "<div class='demo-weatherwidgetImage' style='width:1920px; height:1080px;'></div>" +
            "<div class='demo-weatherwidget'>" +
            "    <div class='demo-container-weer'>" +
            "        <div class='demo-weather'><img src='/sites/all/modules/art_revolution/images/weather/Mainweather.png'></div>" +
            "        <div class='demo-forecaster' id='demo-forecast'><img src='/sites/all/modules/art_revolution/images/weather/Forecast.png'></div>" +
            "    </div>" +
            "</div>";
        }

        break;

      case 'instagram':

        content =
          ""; /// CONTENT INSTAGRAM

        break;

      case 'facebook':

        content =
          ""; /// CONTENT INSTAGRAM

        break;

      case 'googlereview':



        // widgethumbnail =
        //   ""; //// CONTENT
        // $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
        content =
          "<div className='googlereviewsDiv'>" +
          "<div className='googleinfo'>" +
          "<div className='revname'><span id='reviewname'></span></div>" +
          "<div className='ratingall'>" +
          "<span id='reviewrating'> </span> <span className='googleRstar' data-rating='' data-num-stars='5'></span><span id='reviewstotal'></span>" +
          "</div>" +
          "</div>" +
          "<div className='card-columns p-4'>" +
          " <div id='google-reviews'></div>" +
          "</div>" +
          "<input id='GoogleRinput' value='" + $slides[$currentSlide].layers[$currentLayer].googleplaceid + "' type='hidden'/>" +
          "<input id='googleplaceminrate' value='" + $slides[$currentSlide].layers[$currentLayer].googleplaceminrate + "' type='hidden'/>" +
          "<div id='map'></div>" +

          "</div>";

        // "<div id='animatieframe' style='width:1920px; height:1080px;' class='" + $slides[$currentSlide].layers[$currentLayer].extrafanimation + "'>" +
        // "<div class='animationframe'>" +
        // "<div class='pyro'></div>" +
        // "</div>" +
        // "</div>";

        // $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
        // $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
        // setLayerPosition($currentLayer, 0, 0);

        break;
    }

    var typeclass = $slides[$currentSlide].layers[layerIndex].type;
    var inner = $('<div>').addClass('inner');
    if ($slides[$currentSlide].layers[layerIndex].custom_css) {
      inner.attr('style', $slides[$currentSlide].layers[layerIndex].custom_css);
    }
    inner.html(content);
    newLayerDesign.append(inner);

    $('#layerslist').find('li').each(function (index) {
      var lindex = $(this).attr('index');
      $slides[$currentSlide].layers[lindex].index = index;
      var zIndex = 99 - $slides[$currentSlide].layers[layerIndex].index;


      $('#slidedesign').append(newLayerDesign);
      var left = $slides[$currentSlide].layers[layerIndex].left;
      var right = null;
      if (left == 'left') left = 0;
      if (left == 'right') left = $('#slidedesign').width() - newLayerDesign.width();
      if (left == 'center') left = ($('#slidedesign').width() - newLayerDesign.width()) / 2;
      newLayerDesign.css({
        top: $slides[$currentSlide].layers[layerIndex].top + 'px',
        left: left + 'px',
        zIndex: zIndex
      });
    });


    $('#layeroptions').show(0);
    try {
      $('#layerslist').sortable('destroy');
    } catch (e) {
    }
    $('#layerslist').sortable({
      containment: '.vertical-tabs',
      scroll: true,
      scrollSpeed: 4,
      handle: '.titlelayerclass',
      update: function (event, ui) {
        $('#layerslist').find('li').each(function (index) {
          var lindex = $(this).attr('index');
          $slides[$currentSlide].layers[lindex].index = index;
          $('#' + $currentSlide + '-' + lindex).css({zIndex: (99 - index)});
          saveLayer();
        });
        $slides[$currentSlide].layers.sort(ArtCompare);
        //saveLayer();
        saveSlide();
        loadSlide($currentSlide);

      },
    });


    setTimeout(function () {
      $.each($slides[$currentSlide].layers, function (indexTmp, value) {
        switch ($slides[$currentSlide].layers[indexTmp].type) {
          case 'text':
            //changeLayerDisabled(indexTmp, 'enable', false);
            changeLayerRotation(indexTmp, 'text', $slides[$currentSlide].layers[indexTmp].text_rotate);
            changeLayerColor(indexTmp, 'text', $slides[$currentSlide].layers[indexTmp].font_color_text, false);
            break;
          case 'video':
            changeLayerRotation(indexTmp, 'movie', $slides[$currentSlide].layers[indexTmp].movie_rotate);
            //changeLayerDisabled(indexTmp, 'enable', false);
            break;
          case 'image':
            //changeLayerDisabled(indexTmp, 'enable', false);
            changeLayerRotation(indexTmp, 'image', $slides[$currentSlide].layers[indexTmp].image_rotate);
            break;
          case 'clock':
            addDateTimeEditor();
            //changeLayerDisabled(indexTmp, $slides[$currentSlide].layers[indexTmp].clockblock, false);
            changeLayerColor(indexTmp, 'clock', $slides[$currentSlide].layers[indexTmp].font_color_clock, false);
            break;
          case 'news':
            //changeLayerDisabled(indexTmp, $slides[$currentSlide].layers[indexTmp].newsblock, false);
            changeLayerColor(indexTmp, 'news', $slides[$currentSlide].layers[indexTmp].font_color_news, false);
            break;
          case 'widgets':
            //changeLayerDisabled(indexTmp, $slides[$currentSlide].layers[indexTmp].facebookblock, false);
            break;
          case 'animatie':
            //changeLayerDisabled(indexTmp, $slides[$currentSlide].layers[indexTmp].animatieblock, false);
            break;
          case 'weather':
            //changeLayerDisabled(indexTmp, $slides[$currentSlide].layers[indexTmp].animatieblock, false);
            break;
          case 'instagram':
            //changeLayerDisabled(indexTmp, $slides[$currentSlide].layers[indexTmp].animatieblock, false);
            break;
          case 'facebook':
            //changeLayerDisabled(indexTmp, $slides[$currentSlide].layers[indexTmp].animatieblock, false);
            break;
          case 'googlereview':
            //changeLayerDisabled(indexTmp, $slides[$currentSlide].layers[indexTmp].animatieblock, false);
            break;
        }
      });
    });
  }


  function duplicateLayer(layerIndex) {
    /*Save current layer*/
    //saveLayer();
    /*Init new layer*/
    var newLayerIndex = $slides[$currentSlide].layers.length;
    $slides[$currentSlide].layers[newLayerIndex] = {};
    $.extend(true, $slides[$currentSlide].layers[newLayerIndex], $slides[$currentSlide].layers[layerIndex]);
    addLayerTab(newLayerIndex);
    loadLayer(newLayerIndex);

  }


// Add preview BG-Image in options slidelist

  function addpreviewBGimage() {

    // html img tag
    let imagelink = $('#background-image').val();

    if (imagelink != '') {
      $('#plaatjelink').css({display: 'unset'});
      $('#background-image').attr("type","hidden");
      $('#plaatjelink').attr("src", imagelink);
      $('.field_bg_img button.clearfield').css({display: 'unset'});
      $('.bguploadbutton').css({display: 'none'});
    } else {
      $('#background-image').attr("type","text");
      $('#plaatjelink').css({display: 'none'});
      $('.field_bg_img button.clearfield').css({display: 'none'});
      $('.bguploadbutton').css({display: 'unset'});
    }
  }


// Remove Option list layers if not necessary.

  function removeanimtiotoptions() {

    let layerlistactive = 'ul#layerslist li.active';

    setTimeout(function () {
      if ($(layerlistactive).hasClass('animatie')) {
        $('.effect-animation').css('display', 'none');
      }
      else if ($(layerlistactive).hasClass('googlereview')) {
        $('.effect-animation').css('display', 'none');
      }
      else {
        $('.effect-animation').css('display', 'unset');
      }
    });

  }

  function loadLayer(layerIndex) {

    $currentLayer = layerIndex;
    $('.layer').removeClass('selected');
    $('#' + $currentSlide + '-' + layerIndex).addClass('selected');
    $('ul#layerslist').find('li').removeClass('active');
    $('ul#layerslist').find('li[index=' + layerIndex + ']').addClass('active');
    /*Bind layer data*/
    $('.layer-option').each(function (index) {
      if (typeof $slides[$currentSlide].layers[layerIndex][$(this).attr('name')] != 'undefined') {
        $(this).val($slides[$currentSlide].layers[layerIndex][$(this).attr('name')]);
      } else if ($(this).is("select")) {
        $(this).val($(this).find("option:first").val());
      } else {
        $(this).val('');
      }



    });

    setTimeout(
      function () {
        $('#slidewidth').val($settings.startwidth);
        $('#slideheight').val($settings.startheight);

      }, 2000)
    // $('select[name=disableslide]').change(function () {
    //   $('ul#slideslist').find('li[index=' + $currentSlide + ']').toggleClass('disabled');
    //   $(this).toggleClass('disabled');
    // });


    $("#content-type").tabs({
      selected: $contenttypes[$slides[$currentSlide].layers[layerIndex].type],
      active: $contenttypes[$slides[$currentSlide].layers[layerIndex].type],

      activate: function (event, ui) {
        var widgethumbnail;
        var type = $(ui.newTab[0]).data('type');
        var panel = $(ui.newPanel[0]);
        $slides[$currentSlide].layers[$currentLayer].type = type;
        //Chech Type Log
        $('ul#layerslist li.active').removeClass('text image video clock news social widgets weather instagram facebook googlereview').addClass(type);

        if (type === 'text') {
          $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("enable").css({
            'opacity': $slides[$currentSlide].layers[$currentLayer].layertransparant,
            'width': 'auto',
            'height': 'auto'
          });
        }

        if (type === 'image') {
          // panel.find('input').trigger('onchange');
          widgethumbnail = $('<img class="imageuploaded">').attr({
            src: $slides[$currentSlide].layers[$currentLayer].image
          }).css({
            'opacity': $slides[$currentSlide].layers[$currentLayer].layertransparant,
            'width': $slides[$currentSlide].layers[$currentLayer].width,
            'height': $slides[$currentSlide].layers[$currentLayer].height
          });
          var op = $slides.defaultResizeOptions;
          var rot = $slides.defaultRotateOptionsImage;
          $('#' + $currentSlide + '-' + $currentLayer).resizable("destroy");
          op.aspectRatio = true;
          $('#' + $currentSlide + '-' + $currentLayer).resizable(op).draggable("enable").rotatable(rot);
          $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);

        }


        if (type === 'video') {
          widgethumbnail = $('<video class="videoadmin">').attr({
            src: $slides[$currentSlide].layers[$currentLayer].video
          }).css({
            'opacity': $slides[$currentSlide].layers[$currentLayer].layertransparant,
            'width': $slides[$currentSlide].layers[$currentLayer].video_width,
            'height': "auto"
          });
          var op = $slides.defaultResizeOptionsMovie;
          var rot = $slides.defaultRotateOptionsMovie;
          $('#' + $currentSlide + '-' + $currentLayer).resizable("destroy");
          op.aspectRatio = true;
          $('#' + $currentSlide + '-' + $currentLayer).resizable(op).draggable("enable").rotatable(rot);
          $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
        }


        if (type === 'clock') {

          if ($slides[$currentSlide].layers[$currentLayer].clockoptions === 'datum') {
            widgethumbnail = "<div class='clockfull' style='zoom:" + $slides[$currentSlide].layers[$currentLayer].clockzoom + " ; color:" + $slides[$currentSlide].layers[$currentLayer].font_color_clock + "; text-align:" + $slides[$currentSlide].layers[$currentLayer].font_uitlijning_clock + "; opacity:" + $slides[$currentSlide].layers[$currentLayer].layertransparant + ";'>" +
              "<div id='clock' class='font-clock " + $slides[$currentSlide].layers[$currentLayer].text_style_clock + "  " + $slides[$currentSlide].layers[$currentLayer].clockoptions + "'>" +
              "<div class='clockoptions'>" +
              "<p><span class='onlyday " + $slides[$currentSlide].layers[$currentLayer].clockoptions + "'></span><span class='date " + $slides[$currentSlide].layers[$currentLayer].clockoptions + "'> |  </span><span class='onlydate " + $slides[$currentSlide].layers[$currentLayer].clockoptions + "' ></span></p>" +
              "<p class='clocktime " + $slides[$currentSlide].layers[$currentLayer].clockoptions + "'></p>" +
              "</div>" +
              "</div>" +
              "</div>";
            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            addDateTimeEditor();
          }


          if ($slides[$currentSlide].layers[layerIndex].clockoptions === 'datum-a') {
            widgethumbnail = "<div class='clockfull' style='zoom:" + $slides[$currentSlide].layers[$currentLayer].clockzoom + " ; color:" + $slides[$currentSlide].layers[$currentLayer].font_color_clock + "; text-align:" + $slides[$currentSlide].layers[$currentLayer].font_uitlijning_clock + "; opacity:" + $slides[$currentSlide].layers[$currentLayer].layertransparant + ";'>" +
              "<div id='clock' class='font-clock " + $slides[$currentSlide].layers[$currentLayer].text_style_clock + "'>" +
              "<div class='clockoptions'>" +
              "<p class='onlydate'></p>" +
              "</div>" +
              "</div>" +
              "</div>";
            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            addDateTimeEditor();
          }

          if ($slides[$currentSlide].layers[layerIndex].clockoptions === 'dag-a') {
            widgethumbnail = "<div class='clockfull' style='zoom:" + $slides[$currentSlide].layers[$currentLayer].clockzoom + " ; color:" + $slides[$currentSlide].layers[$currentLayer].font_color_clock + "; text-align:" + $slides[$currentSlide].layers[$currentLayer].font_uitlijning_clock + "; opacity:" + $slides[$currentSlide].layers[$currentLayer].layertransparant + ";'>" +
              "<div id='clock' class='font-clock " + $slides[$currentSlide].layers[$currentLayer].text_style_clock + "'>" +
              "<div class='clockoptions'>" +
              "<p class='onlyday'></p>" +
              "</div>" +
              "</div>" +
              "</div>";
            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            addDateTimeEditor();
          }

          if ($slides[$currentSlide].layers[layerIndex].clockoptions === 'tijd-a') {
            widgethumbnail = "<div class='clockfull' style='zoom:" + $slides[$currentSlide].layers[$currentLayer].clockzoom + " ; color:" + $slides[$currentSlide].layers[$currentLayer].font_color_clock + "; text-align:" + $slides[$currentSlide].layers[$currentLayer].font_uitlijning_clock + "; opacity:" + $slides[$currentSlide].layers[$currentLayer].layertransparant + ";'>" +
              "<div id='clock' class='font-clock " + $slides[$currentSlide].layers[$currentLayer].text_style_clock + "'>" +
              "<div class='clockoptions'>" +
              "<p class='clocktime'></p>" +
              "</div>" +
              "</div>" +
              "</div>";
            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            addDateTimeEditor();
          }

        }

        if (type === 'news') {

          var widgethumbnail = "<div class='nieuwsfull' style='width:1920px; height:1080px; color:" + $slides[$currentSlide].layers[$currentLayer].font_color_news + "; opacity:" + $slides[$currentSlide].layers[$currentLayer].layertransparant + ";'> " +
            "<div id='slideshow' class='sliders font-news " + $slides[$currentSlide].layers[$currentLayer].text_style_news + "' >" +
            "<div class='slideitem current'>" +
            "<p class='newstitle'>Nieuws titel</p>" +
            "<p class='newsinhoud'>Het nieuws bericht...</p></div>" +
            "<div>" +
            "</div>";
          $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
          $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");

          panel.find('select[name=newsblock]').trigger('change');
          setLayerPosition($currentLayer, 0, 0);

        }

        if (type === 'widgets') {

          if ($slides[$currentSlide].layers[$currentLayer].widgetpos === '') {
            widgethumbnail = "<div style='width:" + $settings.startwidth + "px; height:" + $settings.startheight + "px; opacity:" + $slides[$currentSlide].layers[$currentLayer].layertransparant + ";' class=" + $slides[$currentSlide].layers[$currentLayer].elfsightFB + ">'</div>";
            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
          }

          if ($slides[$currentSlide].layers[$currentLayer].widgetpos === 'res_a') {
            widgethumbnail = "<div style='width:" + $settings.startwidth + "px; height:" + $settings.startheight + "px; opacity:" + $slides[$currentSlide].layers[$currentLayer].layertransparant + ";' class=" + $slides[$currentSlide].layers[$currentLayer].elfsightFB + ">'</div>";
            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
          }

          if ($slides[$currentSlide].layers[$currentLayer].widgetpos === 'res_b') {
            widgethumbnail = "<div style='width:auto; height:auto; zoom:" + $slides[$currentSlide].layers[$currentLayer].widgetzoom + "; opacity:" + $slides[$currentSlide].layers[$currentLayer].layertransparant + "; 'class='" + $slides[$currentSlide].layers[$currentLayer].elfsightFB + "'></div>";
            $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("enable").css({
              'width': 'auto',
              'height': 'auto'
            });
          }
        }

        if (type === 'iframe') {
          widgethumbnail = '<iframe width="'+$slides[$currentSlide].layers[$currentLayer].slidewidth+'px'+'" height="'+$slides[$currentSlide].layers[$currentLayer].slideheight+'px'+'" scrolling="no" id="iframeContentMain" class="iframeContentMain" name="iframeContentMain" src="' + $slides[$currentSlide].layers[$currentLayer].iframeURL + '"></iframe>';
          $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
        }

        if (type === 'animatie') {

          if ($slides[$currentSlide].layers[$currentLayer].extrafanimation === 'noanimation') {
            widgethumbnail = "<div class='animationframe'><div id='animatieframe' style='width:1920px; height:1080px;' class='" + $slides[$currentSlide].layers[$currentLayer].extrafanimation + "'>" + "</div></div>";
            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
            setLayerPosition($currentLayer, 0, 0);
          }

          if ($slides[$currentSlide].layers[$currentLayer].extrafanimation === 'fsa-rain') {
            widgethumbnail =
              "<div id='animatieframe' style='width:1920px; height:1080px;' class='" + $slides[$currentSlide].layers[$currentLayer].extrafanimation + "'>" +
              raincontent +
              "</div>";

            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
            setLayerPosition($currentLayer, 0, 0);
          }

          if ($slides[$currentSlide].layers[$currentLayer].extrafanimation === 'fsa-snow') {
            widgethumbnail =
              "<div id='animatieframe' style='width:1920px; height:1080px;' class='" + $slides[$currentSlide].layers[$currentLayer].extrafanimation + "'>" +
              snowcontent +
              "</div>";

            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
            setLayerPosition($currentLayer, 0, 0);
          }

          if ($slides[$currentSlide].layers[$currentLayer].extrafanimation === 'fsa-confetti') {
            widgethumbnail =
              "<div id='animatieframe' style='width:1920px; height:1080px;' class='" + $slides[$currentSlide].layers[$currentLayer].extrafanimation + "'>" +
              "<div class='animationframe'>" +
              "<div class='conf-cont'>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "<div class='confetti'></div>" +
              "</div>" +
              "</div>" +
              "</div>";

            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
            setLayerPosition($currentLayer, 0, 0);
          }

          if ($slides[$currentSlide].layers[$currentLayer].extrafanimation === 'fsa-blocks') {
            widgethumbnail =
              "<div id='animatieframe' style='width:1920px; height:1080px;' class='" + $slides[$currentSlide].layers[$currentLayer].extrafanimation + "'>" +
              "<div class='animationframe'>" +
              "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
              "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
              "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
              "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
              "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
              "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
              "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
              "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
              "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
              "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
              "</div>" +
              "</div>";

            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
            setLayerPosition($currentLayer, 0, 0);
          }

          if ($slides[$currentSlide].layers[$currentLayer].extrafanimation === 'fsa-stars') {
            content =
              "<div id='animatieframe' style='width:1920px; height:1080px;' class='" + $slides[$currentSlide].layers[$currentLayer].extrafanimation + "'>" +
              "<div class='animationframe'>" +
              "<div class='stars'></div>" +
              "</div>" +
              "</div>";

            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
            setLayerPosition($currentLayer, 0, 0);
          }

          if ($slides[$currentSlide].layers[$currentLayer].extrafanimation === 'fsa-balloons') {
            content =
              "<div id='animatieframe' style='width:1920px; height:1080px;' class='" + $slides[$currentSlide].layers[$currentLayer].extrafanimation + "'>" +
              "<div class='animationframe'>" +
              "<div class='balloons'></div>" +
              "</div>" +
              "</div>";

            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
            setLayerPosition($currentLayer, 0, 0);
            loadballoons();
          }

          if ($slides[$currentSlide].layers[$currentLayer].extrafanimation === 'fsa-balls') {
            content =
              "<div id='animatieframe' style='width:1920px; height:1080px;' class='" + $slides[$currentSlide].layers[$currentLayer].extrafanimation + "'>" +
              "<div class='animationframe'>" +
              "<div id='baller'></div>" +
              "</div>" +
              "</div>";

            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
            setLayerPosition($currentLayer, 0, 0);
            loadballs();
          }

          if ($slides[$currentSlide].layers[$currentLayer].extrafanimation === 'fsa-fireworks') {
            content =
              "<div id='animatieframe' style='width:1920px; height:1080px;' class='" + $slides[$currentSlide].layers[$currentLayer].extrafanimation + "'>" +
              "<div class='animationframe'>" +
              "<div class='pyro'></div>" +
              "</div>" +
              "</div>";

            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
            $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
            setLayerPosition($currentLayer, 0, 0);
          }
        }

        if (type === 'weather') {

          if ($slides[$currentSlide].layers[$currentLayer].weatherwidgets === 'noweather') {
            widgethumbnail =
              "<div class='demo-weatherwidgetAnimated' style='width:1920px; height:1080px;'>" +
              "<img src='/sites/all/modules/art_revolution/images/weather/Clouds.png'>" +
              "</div>" +
              "<div class='demo-weatherwidgetImage' style='width:1920px; height:1080px;'></div>" +
              "<div class='demo-weatherwidget'>" +
              "    <div class='demo-container-weer'>" +
              "        <div class='demo-weather'><img src='/sites/all/modules/art_revolution/images/weather/Mainweather.png'></div>" +
              "        <div class='demo-forecaster' id='demo-forecast'><img src='/sites/all/modules/art_revolution/images/weather/Forecast.png'></div>" +
              "    </div>" +
              "</div>";
            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
          }

          if ($slides[$currentSlide].layers[$currentLayer].weatherwidgets === 'weatherBeta') {
            widgethumbnail =
              "<div class='demo-weatherwidgetAnimated' style='width:1920px; height:1080px;'>" +
              "<img src='/sites/all/modules/art_revolution/images/weather/Clouds.png'>" +
              "</div>" +
              "<div class='demo-weatherwidgetImage' style='width:1920px; height:1080px;'></div>" +
              "<div class='demo-weatherwidget'>" +
              "    <div class='demo-container-weer'>" +
              "        <div class='demo-weather'><img src='/sites/all/modules/art_revolution/images/weather/Mainweather.png'></div>" +
              "        <div class='demo-forecaster' id='demo-forecast'><img src='/sites/all/modules/art_revolution/images/weather/Forecast.png'></div>" +
              "    </div>" +
              "</div>";
            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
          } else {
            widgethumbnail =
              "<div class='demo-weatherwidgetAnimated' style='width:1920px; height:1080px;'>" +
              "<img src='/sites/all/modules/art_revolution/images/weather/Clouds.png'>" +
              "</div>" +
              "<div class='demo-weatherwidgetImage' style='width:1920px; height:1080px;'></div>" +
              "<div class='demo-weatherwidget'>" +
              "    <div class='demo-container-weer'>" +
              "        <div class='demo-weather'><img src='/sites/all/modules/art_revolution/images/weather/Mainweather.png'></div>" +
              "        <div class='demo-forecaster' id='demo-forecast'><img src='/sites/all/modules/art_revolution/images/weather/Forecast.png'></div>" +
              "    </div>" +
              "</div>";
            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
          }
        }

        if (type === 'instagram') {

          // widgethumbnail =
          //   ""; //// CONTENT
          // $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
          widgethumbnail =
            "<div className='googlereviewsDiv'>" +
            "<div className='googleinfo'>" +
            "<div className='revname'><span id='reviewname'></span></div>" +
            "<div className='ratingall'>" +
            "<span id='reviewrating'> </span> <span className='googleRstar' data-rating='' data-num-stars='5'></span><span id='reviewstotal'></span>" +
            "</div>" +
            "</div>" +
            "<div className='card-columns p-4'>" +
            " <div id='google-reviews'></div>" +
            "</div>" +

            "<input id='GoogleRinput' value='" + $slides[$currentSlide].layers[$currentLayer].googleplaceid + "' type='hidden'/>" +
            "<input id='googleplaceminrate' value='" + $slides[$currentSlide].layers[$currentLayer].googleplaceminrate + "' type='hidden'/>" +
            "<div id='map'></div>" +

            "</div>";

          // "<div id='animatieframe' style='width:1920px; height:1080px;' class='" + $slides[$currentSlide].layers[$currentLayer].extrafanimation + "'>" +
          // "<div class='animationframe'>" +
          // "<div class='pyro'></div>" +
          // "</div>" +
          // "</div>";

          $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
          $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
          setLayerPosition($currentLayer, 0, 0);

        }

        if (type === 'facebook') {

          widgethumbnail =
            ""; //// CONTENT
          $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);

        }

        if (type === 'googlereview') {

          widgethumbnail =
            "<div className='googlereviewsDiv'>" +
            "<div className='googleinfo'>" +
            "<div className='revname'><span id='reviewname'></span></div>" +
            "<div className='ratingall'>" +
            "<span id='reviewrating'> </span> <span className='googleRstar' data-rating='' data-num-stars='5'></span><span id='reviewstotal'></span>" +
            "</div>" +
            "</div>" +
            "<div className='card-columns p-4'>" +
            " <div id='google-reviews'></div>" +
            "</div>" +

            "<input id='GoogleRinput' value='" + $slides[$currentSlide].layers[$currentLayer].googleplaceid + "' type='hidden'/>" +
            "<input id='googleplaceminrate' value='" + $slides[$currentSlide].layers[$currentLayer].googleplaceminrate + "' type='hidden'/>" +
            "<div id='map'></div>" +

            "</div>";

          // "<div id='animatieframe' style='width:1920px; height:1080px;' class='" + $slides[$currentSlide].layers[$currentLayer].extrafanimation + "'>" +
          // "<div class='animationframe'>" +
          // "<div class='pyro'></div>" +
          // "</div>" +
          // "</div>";

          $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
          $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
          setLayerPosition($currentLayer, 0, 0);


        }
      }
    });


    setTimeout(function () {
      switch ($slides[$currentSlide].layers[$currentLayer].type) {
        case 'text':
          changepercentage();
          //changeLayerDisabled($currentLayer, 'enable');
          //changeLayerRotation($currentLayer, 'text', $slides[$currentSlide].layers[$currentLayer].text_rotate);
          changeLayerColor($currentLayer, 'text', $slides[$currentSlide].layers[$currentLayer].font_color_text);
          changeLayerStyle('text', $slides[$currentSlide].layers[$currentLayer].text_style_text);
          changeLayerSize('text', $slides[$currentSlide].layers[$currentLayer].font_size);
          changeLayeruitlijning('text', $slides[$currentSlide].layers[$currentLayer].font_uitlijning_v1);

          break;
        case 'video':
          changepercentage();
          //changeLayerRotation($currentLayer, 'video', $slides[$currentSlide].layers[$currentLayer].image_rotate);
          //changeLayerDisabled($currentLayer, 'enable');
          break;
        case 'image':
          changepercentage();
          //changeLayerDisabled($currentLayer, 'enable');
          //changeLayerRotation($currentLayer, 'image', $slides[$currentSlide].layers[$currentLayer].image_rotate);
          break;
        case 'clock':
          changepercentage();
          //changeLayerDisabled($currentLayer, 'enable');
          //changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].clockblock);
          changeLayerColor($currentLayer, 'clock', $slides[$currentSlide].layers[$currentLayer].font_color_clock);
          changeLayerStyle('clock', $slides[$currentSlide].layers[$currentLayer].text_style_clock);
          changeLayeruitlijningClock('clock', $slides[$currentSlide].layers[$currentLayer].font_uitlijning_clock);
          break;
        case 'news':
          changepercentage();
          setLayerPosition($currentLayer, 0, 0);
          // changeLayerDisabled($currentLayer, 'enable');
          //changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].newsblock);
          changeLayerColor($currentLayer, 'news', $slides[$currentSlide].layers[$currentLayer].font_color_news);
          changeLayerStyle('news', $slides[$currentSlide].layers[$currentLayer].text_style_news);
          break;
        case 'widgets':
          changepercentage();
          if ($currentLayer, $slides[$currentSlide].layers[$currentLayer].widgetpos === '') {
            setLayerPosition($currentLayer, 0, 0);
            // changeLayerDisabled($currentLayer, 'enable');
            //changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].facebookblock);
          }

          if ($currentLayer, $slides[$currentSlide].layers[$currentLayer].widgetpos === 'res_a') {
            setLayerPosition($currentLayer, 0, 0);
            // changeLayerDisabled($currentLayer, 'enable');
            //changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].facebookblock);
            $('#' + $currentSlide + '-' + $currentLayer).find('select[name="widgetzoom"]').attr('enable', 'enable');
          }
          if ($currentLayer, $slides[$currentSlide].layers[$currentLayer].widgetpos === 'res_b') {
            $('#' + $currentSlide + '-' + $currentLayer).find('select[name="widgetzoom"]').attr('disabled', 'disabled');
            // changeLayerDisabled($currentLayer, 'enable');
            //setLayerPosition($currentLayer, 0, 0);
            //changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].facebookblock);
          }
          break;
        case 'iframe':
          changepercentage();
          setLayerPosition($currentLayer, 0, 0);
          break;
        case 'animatie':
          //changeLayerDisabled($currentLayer, 'enable');
          setLayerPosition($currentLayer, 0, 0);
          //changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].animatieblock);
          break;
        case 'weather':
          changepercentage();
          //changeLayerDisabled($currentLayer, 'enable');
          setLayerPosition($currentLayer, 0, 0);
          //changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].animatieblock);
          break;
        case 'instagram':
          //changeLayerDisabled($currentLayer, 'enable');
          setLayerPosition($currentLayer, 0, 0);
          //changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].animatieblock);
          break;
        case 'facebook':
          //changeLayerDisabled($currentLayer, 'enable');
          setLayerPosition($currentLayer, 0, 0);
          //changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].animatieblock);
          break;
        case 'googlereview':
          //changeLayerDisabled($currentLayer, 'enable');
          setLayerPosition($currentLayer, 0, 0);
          //changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].animatieblock);
          break;
      }
    });
  }


  function changeLayerStyle(layerIndex, fontStyle) {
    $slides[$currentSlide].layers[$currentLayer]['text_style_' + layerIndex] = fontStyle;
    $('#' + $currentSlide + '-' + $currentLayer).find(".font-" + layerIndex).removeClass().addClass(fontStyle).addClass('font-' + layerIndex);
    $("input[name=text_style_" + layerIndex + "]").val(fontStyle);
  }


  function changeLayerColor(layerIndex, changeType, fontColor, changeInput) {
    if (!changeInput) {
      changeInput = true;
    }
    $slides[$currentSlide].layers[layerIndex]['font_color_' + changeType] = fontColor;
    $('#' + $currentSlide + '-' + layerIndex).find(".font-" + changeType).css({color: fontColor});
    if (changeInput) {
      $("input[name=font_color_" + changeType + "]").css({backgroundColor: fontColor});
    }
  }

  function changeLayeruitlijning(changeType, fontUitlijning) {
    $slides[$currentSlide].layers[$currentLayer].font_uitlijning_v1 = fontUitlijning;
    $('#' + $currentSlide + '-' + $currentLayer).find(".font-" + changeType).css({'text-align': fontUitlijning});
  }

  function changeLayeruitlijningClock(changeType, fontUitlijningClock) {
    $slides[$currentSlide].layers[$currentLayer].font_uitlijning_clock = fontUitlijningClock;
    $('#' + $currentSlide + '-' + $currentLayer).find(".font-" + changeType).css({'text-align': fontUitlijningClock});
  }

  function changeTimeEditor(layerIndex, clockop) {
    $slides[$currentSlide].layers[$currentLayer].clockoptions = clockop;
    //$('#' + $currentSlide + '-' + $currentLayer).find(".clocktime").removeClass().addClass('only ').addClass('onlytime' + layerIndex);
    $('#' + $currentSlide + '-' + $currentLayer).find(".clockoptions").empty();


    if (clockop === 'datum') {
      $('#' + $currentSlide + '-' + $currentLayer).find(".clockoptions").html("<p><span class='onlyday'> |  </span><span class='onlydate' ></span></p><p class='clocktime'></p>");
    }

    if (clockop === 'datum-a') {
      $('#' + $currentSlide + '-' + $currentLayer).find(".clockoptions").html("<p class='onlydate'></p>");
    }

    if (clockop === 'dag-a') {
      $('#' + $currentSlide + '-' + $currentLayer).find(".clockoptions").html("<p class='onlyday'></p>");
    }

    if (clockop === 'tijd-a') {
      $('#' + $currentSlide + '-' + $currentLayer).find(".clockoptions").html("<p class='clocktime'></p>");
    }
  }

  function changeLayerSize(changeType, fontSize) {
    $slides[$currentSlide].layers[$currentLayer].font_size = fontSize;
    $('#' + $currentSlide + '-' + $currentLayer).find(".font-" + changeType).css({'fontSize': fontSize});
  }

  function changeSlideDisabled(slideIndex) {
    if ($slides[slideIndex].disableslide != 'false') {
      $('select[name=disableslide]').addClass('disabled');
      $('ul#slideslist').find('li[index=' + slideIndex + ']').addClass('disabled');
    } else {
      $('select[name=disableslide]').removeClass('disabled');
      $('ul#slideslist').find('li[index=' + slideIndex + ']').removeClass('enabled');

    }
  }

  function changeSlideLocked(slideIndex) {
    if ($slides[slideIndex].lockslide != 'false') {
      // $('select[name=lockslide]').addClass('locked');
      $('ul#slideslist').find('li[index=' + slideIndex + ']').addClass('locked');
      $('.slidertools').addClass('locked');
      $('.v-tabs').addClass('locked');
      $('#layers_all').addClass('locked');
      $('#monitorscreen').addClass('locked');
    } else {
      $('.slidertools').removeClass('locked');
      $('.v-tabs').removeClass('locked');
      $('#monitorscreen').removeClass('locked');
      $('#layers_all').removeClass('locked');
      // $('select[name=lockslide]').removeClass('locked');
      $('ul#slideslist').find('li[index=' + slideIndex + ']').removeClass('unlocked');
    }
  }

  function changeLayerDisabled(layerIndex, layerStatus, changeButton) {
    if (!changeButton) {
      changeButton = true;
    }
    if (!layerStatus) {
      switch ($slides[$currentSlide].layers[layerIndex].type) {
        case 'text':
        case 'image':
        case 'video':
        case 'clock':
        case 'news':
        case 'widgets':
        case 'iframe':
        case 'animatie':
        case 'weather':
        case 'instagram':
        case 'facebook':
        case 'googlereview':
          layerStatus = 'enable';
          break;
      }

    }

    if (layerStatus === 'enable') {
      if (changeButton) {
        $('.layer-dis-ena- select').removeClass('disabled');
      }
      $('#' + $currentSlide + '-' + layerIndex).removeClass('ui-state-disabled ui-draggable-disabled ui-resizable-disabled');
    } else {
      if (changeButton) {
        $('.layer-dis-ena- select').addClass('disabled');
      }
      $('#' + $currentSlide + '-' + layerIndex).addClass('ui-state-disabled ui-draggable-disabled ui-resizable-disabled');
    }
  }

  function changeLayerRotation($layerIndex, changeType, rotation) {
    switch (changeType) {
      case 'text':
        //$slides[$currentSlide].layers[$layerIndex].text_rotate = rotation;
        break;
      case 'image':
        //$slides[$currentSlide].layers[$layerIndex].image_rotate = rotation;
        break;
    }

    $('#' + $currentSlide + '-' + $layerIndex).css({transform: 'rotate(' + parseInt(rotation) + 'deg)'});
  }

  function changeLayervideo($layerIndex, vsize, vwidth, vheight) {
    $slides[$currentSlide].layers[$currentLayer].videosize = vsize;
    let screenWidth = $settings.startwidth;

    // $('#' + $currentSlide + '-' + $currentLayer).find(".videoadmin").css({width:'1280',  height:'720'});

    if (vsize === 'videosize_auto') {
      $('#' + $currentSlide + '-' + $currentLayer).find(".videoadmin").css({width: 'auto', height: 'auto'});
    }
    if (vsize === 'videosize_full') {
      //  $('#' + $currentSlide + '-' + $currentLayer).find(".videoadmin").css({width:'100%',  height:'auto'});
    }
    if (vsize === 'videosize_full_auto') {
      $('#' + $currentSlide + '-' + $currentLayer).find(".videoadmin").css({
        width: screenWidth,
        height: 'auto',
        margin_top: '-15%'
      });
    }
    if (vsize === 'videosize_A') {
      $('#' + $currentSlide + '-' + $currentLayer).find(".videoadmin").css({width: '1920', height: '1080'});
    }
    if (vsize === 'videosize_B') {
      $('#' + $currentSlide + '-' + $currentLayer).find(".videoadmin").css({width: '1280', height: '720'});
    }
    if (vsize === 'videosize_C') {
      $('#' + $currentSlide + '-' + $currentLayer).find(".videoadmin").css({width: '848', height: '480'});
    }
    if (vsize === 'videosize_D') {
      $('#' + $currentSlide + '-' + $currentLayer).find(".videoadmin").css({width: '480', height: '270'});
    }
    if (vsize === 'videosize_E') {
      $('#' + $currentSlide + '-' + $currentLayer).find(".videoadmin").css({width: '352', height: '198'});
    }
  }

  function changeWidgetzoom($layerIndex, zoom) {
    $slides[$currentSlide].layers[$currentLayer].videosize = zoom;
    $('#' + $currentSlide + '-' + $currentLayer).find("." + $slides[$currentSlide].layers[$currentLayer].elfsightFB).css({zoom: zoom});
  }

  function changeclockzoom($layerIndex, zoom) {
    $slides[$currentSlide].layers[$currentLayer].clockzoom = zoom;
    $('#' + $currentSlide + '-' + $currentLayer).find(".clockfull").css({zoom: zoom});
  }

  function setLayerPosition($layerIndex, top, left) {
    $slides[$currentSlide].layers[$layerIndex].top = top;
    $slides[$currentSlide].layers[$layerIndex].left = left;
    $('#' + $currentSlide + '-' + $currentLayer).css({top: top, left: left});
  }

  function setLayerDimensions($layerIndex, width, height) {
    $slides[$currentSlide].layers[$layerIndex].width = width;
    $slides[$currentSlide].layers[$layerIndex].height = height;
  }

  function saveLayer() {
    if ($slides.length == 0) {
      return;
    }
    if ($slides[$currentSlide].layers.length == 0) {
      return;
    }
    $('.layer-option').each(function (index) {
      $slides[$currentSlide].layers[$currentLayer][$(this).attr('name')] = $(this).val();
    })
  }

  function removeLayer(layerIndex) {
    $('#' + $currentSlide + '-' + layerIndex).remove();
    $slides[$currentSlide].layers[layerIndex]['removed'] = 1;
    $('ul#layerslist').find('li[index=' + layerIndex + ']').remove();
    if (layerIndex == $currentLayer) {
      if ($('ul#layerslist li').length > 0) {
        var firstIndex = parseInt($('ul#layerslist').find('li:first').attr('index'));
        loadLayer(firstIndex);
      }
    }
  }

  // SLIDER RESET
  function resetsliderpercentage(slideIndex) {
    $currentSlide = slideIndex;
    let calcpercentgeopacity = 100;
    $("a#handle").css({'left': calcpercentgeopacity+'%'});
    $("input#layerTrans").val(1);
  }

  function changepercentage() {

    $("#slider").slider({
      range: "min",
      animate: true,
      value: $slides[$currentSlide].layers[$currentLayer].layertransparant,
      min: 0,
      max: 1,
      step: 0.01,
      slide: function(event, ui) {
        update(1,ui.value); //changed
      }
    });
    update();

    function update(slider,val) {
      //changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
      var $amount = slider == 1 ? val : $slides[$currentSlide].layers[$currentLayer].layertransparant;

      $("#layerTrans").val($amount);
      // $("#amount-label").text($amount);
      let percentage = ($amount * 100).toFixed(0) + '%';
      $('#slider a').html('<label>' + percentage + '</label>');
    }

    let calcpercentgeopacity = $slides[$currentSlide].layers[$currentLayer].layertransparant * 100;
    $("a#handle").css({'left': calcpercentgeopacity+'%'});
    // console.log(calcpercentgeopacity);
  }

  function saveGlobalSettings() {
    $('input.global-settings, select.global-settings').each(function (index) {
      $settings[$(this).attr('name')] = $(this).val();
    });
  }


  //=======================
  //===========================


  function saveLayerSlider(ajax) {


    saveLayer();
    saveSlide();
    saveGlobalSettings();
    var $slides2 = [];

    $.each($slides.sort(ArtCompare), function (index, slide) {
      if (slide.removed === 0) {
        var layers = [];
        $.when(slide.layers.sort(ArtCompare)).then(function () {
          $.each(slide.layers, function (index, layer) {
            if (layer.removed === 0) {
              layers[layers.length] = layer;
            }
          });
        });
        slide.layers = layers;
        $slides2[$slides2.length] = slide;
      }
    });

    var datasettings = base64Encode(JSON.stringify($settings));
    var dataslides = base64Encode(JSON.stringify($slides2));
    var data = {
      cache: false,
      sid: jQuery('input[name=sid]').val(),
      data: dataslides,
      settings: datasettings
    };

    $("#allsaved").show();

    $.ajax({
      url: Drupal.settings.basePath + '?q=admin/art_revolution/save',
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function (data) {
        setTimeout(function () {
          $("#allsaved").hide();
        }, 1300);
        $currentSlide = parseInt($('#slideslist li[class*="active"]').attr('index'));
        $currentLayer = parseInt($('#layerslist li[class*="active"]').attr('index'));
        $slides = $slides2;
        localStorage.selectedSlide = $currentSlide;
        localStorage.selectedLayer = $currentLayer;
        location.reload(true);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert(textStatus + ":" + jqXHR.responseText);
      }

    });
  }



  //===========================
  //=======================

  //END SAVE function

  // -------------------------------


  // CLOCK WIDGET function

  //=======================
  //===========================

  function addDateTimeEditor() {

        $('[class^="clocktime"]').clocktime(123456789);
        $('[class^="onlydate"]').onlydate(123456789);
        $('[class^="onlyday"]').onlyday(123456789);

  }

  $.fn.clocktime = function (currentTime) {

    return this.each(function () {

      updateClock = function (self, diff) {

        var date = new Date();
        var hours = date.getHours();
        if (hours < 10) hours = "0" + hours;

        var minutes = date.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;

        var seconds = date.getSeconds();
        if (seconds < 10) seconds = "0" + seconds;

        var formattedTime = hours + ':' + minutes + ':' + seconds;

        self.text(formattedTime);
      };

      updateClock($(this));

    });
  };


  $.fn.onlydate = function (currentTime) {

    return this.each(function () {

      updateonlyDate = function (self, diff) {

        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;

        var formattedTime = day + '-' + month + '-' + year;

        self.text(formattedTime);
        //console.log(self.attr("id")+":"+formattedTime);
      };

      updateonlyDate($(this));

    });
  };

  $.fn.onlyday = function (currentTime) {

    return this.each(function () {

      updateonlyDay = function (self, diff) {

        var date = new Date();
        var week = ["ZONDAG", "MAANDAG", "DINSDAG", "WOENSDAG", "DONDERDAG", "VRIJDAG", "ZATERDAG"];
        var formattedTime = week[date.getDay()];

        self.text(formattedTime);

      };

      updateonlyDay($(this));

    });
  };



  //===========================
  //=======================

  //END CLOCK WIDGET

  // -------------------------------


  //===========================
  //=======================

  /* #LAYER TYPE ANIMATIONS */

  //=======================
  //===========================


  function loadballoons() {
    setTimeout(function () {
      $(function () {
        for (var i = 0; i < 50; i++) {
          $('.balloons').append("<div class='balloon balloon" + i + "'></div>");
        }
      });
    }, 100);
  }
  function loadballs() {
    setTimeout(function () {
      // Some random colors
      const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

      const numBalls = 50;
      const balls = [];

      for (let i = 0; i < numBalls; i++) {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        ball.style.background = colors[Math.floor(Math.random() * colors.length)];
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        ball.style.width = `${Math.random()}em`;
        ball.style.height = ball.style.width;

        balls.push(ball);
        document.getElementById("baller").append(ball);
      }

      balls.forEach((el, i, ra) => {
        let to = {
          x: Math.random() * (i % 2 === 0 ? -11 : 11),
          y: Math.random() * 12
        };

        let anim = el.animate(
          [
            {transform: "translate(0, 0)"},
            {transform: `translate(${to.x}rem, ${to.y}rem)`}
          ],
          {
            duration: (Math.random() + 1) * 2000, // random duration
            direction: "alternate",
            fill: "both",
            iterations: Infinity,
            easing: "ease-in-out"
          }
        );
      });
    }, 100);
  }

  /* #ANIMATIONS CHANGE ON SELECT*/
  $(document).ready(function () {

    $("select[name=extrafanimation]").change(function () {
      startanimatie();
    });

  });

  /* #ANIMATIONS CHANGE ON CONTENT*/

  let raincontent =
    //#region <DIV> STYLE RAIN CONTENT
    "<div class='animationframe'>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "<i class='rain'></i>" +
    "</div>";
  //#endregion

  let snowcontent =
    //#region <DIV> STYLE SNOW CONTENT
    "<div class='animationframe'>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "<i class='snow'></i>" +
    "</div>";
  //#endregion

  function startanimatie() {

    function init() {

      /* #ANIMATIONS STYLE HTML OPTION LIST*/

      let rain =
        //#region <DIV> STYLE RAIN
        raincontent;
      //#endregion

      let snow =
        //#region <DIV> STYLE SNOW
        "<div style='width:" + $slides[$currentSlide].layers[$currentLayer].slidewidth + "px; height:" + $slides[$currentSlide].layers[$currentLayer].slideheight + "px;' id='animatieframe' class='fsa-snow'>" +
        snowcontent +
        "</div>";
      //#endregion


      let blocks =
        //#region <DIV> STYLE BLOCKS
        "<div style='width:" + $slides[$currentSlide].layers[$currentLayer].slidewidth + "px; height:" + $slides[$currentSlide].layers[$currentLayer].slideheight + "px;' id='animatieframe' class='fsa-blocks'>" +
        "<div class='animationframe'>" +
        "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
        "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
        "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
        "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
        "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
        "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
        "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
        "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
        "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
        "<i style='background:rgba(255, 255, 255, 0.7);'></i>" +
        "</div>" +
        "</div>";
      //#endregion

      let confetti =
        //#region <DIV> STYLE CONFETTI
        "<div style='width:" + $slides[$currentSlide].layers[$currentLayer].slidewidth + "px; height:" + $slides[$currentSlide].layers[$currentLayer].slideheight + "px;' id='animatieframe' class='fsa-confetti'>" +
        "<div class='animationframe'>" +
        "<div class='conf-cont'>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "<div class='confetti'></div>" +
        "</div>" +
        "</div>" +
        "</div>";
      //#endregion

      let stars =
        //#region <DIV> STYLE STARS
        "<div style='width:" + $slides[$currentSlide].layers[$currentLayer].slidewidth + "px; height:" + $slides[$currentSlide].layers[$currentLayer].slideheight + "px;' id='animatieframe' class='fsa-stars'>" +
        "<div class='animationframe'>" +
        "<div class='stars'></div>" +
        "</div>" +
        "</div>";
      //#endregion

      let balloons =
        //#region <DIV> STYLE BALLOONS
        "<div style='width:" + $slides[$currentSlide].layers[$currentLayer].slidewidth + "px; height:" + $slides[$currentSlide].layers[$currentLayer].slideheight + "px;' id='animatieframe' class='fsa-balloons'>" +
        "<div class='animationframe'>" +
        "<div class='balloons'></div>" +
        "</div>" +
        "</div>";
      //#endregion

      let balls =
        //#region <DIV> STYLE BALLS
        "<div style='width:" + $slides[$currentSlide].layers[$currentLayer].slidewidth + "px; height:" + $slides[$currentSlide].layers[$currentLayer].slideheight + "px;' id='animatieframe' class='fsa-balls'>" +
        "<div class='animationframe'>" +
        "<div id='baller'></div>" +
        "</div>" +
        "</div>";
      //#endregion

      let fireworks =
        //#region <DIV> STYLE FIREFLIES
        "<div style='width:" + $slides[$currentSlide].layers[$currentLayer].slidewidth + "px; height:" + $slides[$currentSlide].layers[$currentLayer].slideheight + "px;' id='animatieframe' class='fsa-fireflies'>" +
        "<div class='animationframe'>" +
        "<div class='pyro'></div>" +
        "</div>" +
        "</div>";
      //#endregion



      $('#' + $currentSlide + '-' + $currentLayer).find('.animationframe').empty(); // RESET DIV FOR POPULATING

      if ($('select[name=extrafanimation]').val() === 'fsa-rain') {
        $('#' + $currentSlide + '-' + $currentLayer).find('.animationframe').append(rain);
      }
      if ($('select[name=extrafanimation]').val() === 'fsa-snow') {
        $('#' + $currentSlide + '-' + $currentLayer).find('.animationframe').append(snow);
      }
      if ($('select[name=extrafanimation]').val() === 'fsa-stars') {
        $('#' + $currentSlide + '-' + $currentLayer).find('.animationframe').append(stars);
      }
      if ($('select[name=extrafanimation]').val() === 'fsa-blocks') {
        $('#' + $currentSlide + '-' + $currentLayer).find('.animationframe').append(blocks);
      }
      if ($('select[name=extrafanimation]').val() === 'fsa-confetti') {
        $('#' + $currentSlide + '-' + $currentLayer).find('.animationframe').append(confetti);
      }
      if ($('select[name=extrafanimation]').val() === 'fsa-balloons') {
        $('#' + $currentSlide + '-' + $currentLayer).find('.animationframe').append(balloons);
        loadballoons();
      }
      if ($('select[name=extrafanimation]').val() === 'fsa-balls') {
        $('#' + $currentSlide + '-' + $currentLayer).find('.animationframe').append(balls);
        loadballs();
      }
      if ($('select[name=extrafanimation]').val() === 'fsa-fireflies') {
        $('#' + $currentSlide + '-' + $currentLayer).find('.animationframe').append(fireflies);
      }
      if ($('select[name=extrafanimation]').val() === 'fsa-fireworks') {
        $('#' + $currentSlide + '-' + $currentLayer).find('.animationframe').append(fireworks);
      }


    }


    setTimeout(function () {
      init();
      saveLayer();
    }, 500);

  }

  //===========================
  //=======================

  /*END  #LAYER TYPE ANIMATIONS */

  //=======================
  //===========================


})(jQuery);






