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
  touchenabled: "on",
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


//var $captionclasses = "big_white big_white_right big_black_right big_white_center big_orange big_black big_blackright medium_grey small_text small_text_right small_text_rightblack medium_text medium_textright medium_blacktextright medium_textcenter large_text very_large_text very_big_white very_big_black boxshadow black noshadow btn-default";
(function ($) {
    $(document).ready(function () {
        if ($slides.length === 0) {
            $("#art_revolution_main").hide(0);
        }
        $($slides).each(function (slideIndex) {
            addSlideTab(slideIndex);
            changeSlideDisabled(slideIndex);
            changeSlideLocked(slideIndex);
            loadSlide(0);
        });
        $("#slideslist").sortable({
            update: function (event, ui) {
                $("#slideslist").find("li").each(function (index) {
                    var sindex = $(this).attr("index");
                    $slides[sindex].index = index;
                });
            }
        });
        $('#addslide').click(function () {
            addSlide();
            return false;
        });
        $('#addLayer').click(function () {
            addLayer();
            return false;
        });
        $('#save').click(function () {
          saveLayerSlider(true);
        });
        $('.locked').click(function () {
            // if ($slides[slideIndex].lockslide == 'true') {
            var swaltext1 = Drupal.t('Slide Disabled');
            var swaltext2 = Drupal.t("As agreed with you, we've put a commercial ad here");

            swal({
                title: swaltext1,
                text: swaltext2,
                type: "info",
                confirmButtonClass: "btn-info",
                showCancelButton: false,
                html: true,
                closeOnConfirm: true,
            }, function(){
                // removeLayer(layerIndex);
            });
            // }
        });

        $('select[name=clockblock], select[name=newsblock], select[name=facebookblock]').change(function () {
            changeLayerDisabled($currentLayer, $(this).find('option:selected').val());
        });
        $('select[name=text_style_text]').change(function () {
            changeLayerStyle('text', $(this).find('option:selected').val());
        });
        $('select[name=font_size]').change(function () {
            changeLayerSize('text', $(this).val());
        });
        $('select[name=disableslide]').change(function () {
            $('ul#slideslist').find('li[index=' + $currentSlide + ']').toggleClass('disabled');
            $(this).toggleClass('disabled');
        });

        $('select[name=lockslide]').change(function () {
            $('ul#slideslist').find('li[index=' + $currentSlide + ']').toggleClass('locked');
            $(this).toggleClass('locked');
        });

        $('.slidertools').find('#slide-text-options').keyup(function () {
            $slides[$currentSlide].title = $(this).val().substring(0, 32);
            $("ul#slideslist li.active").find('span').eq(0).html($(this).val().substring(0, 32));
        });

        $('#content-type').find('#layer-text-options').keyup(function () {
            $slides[$currentSlide].layers[$currentLayer].title = $(this).val().substring(0, 32);
            $("ul#layerslist li.active").find('span').eq(0).html($(this).val().substring(0, 32));
        });

        $('#content-type').find('#layer-text').keyup(function () {
            $slides[$currentSlide].layers[$currentLayer].text = $(this).val();
            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html("<p class='font-text'>" + $(this).val() + "</p>");
            changeLayerStyle('text', $slides[$currentSlide].layers[$currentLayer].text_style_text);
            changeLayerColor($currentLayer, 'text', $slides[$currentSlide].layers[$currentLayer].font_color_text);
            changeLayerSize('text', $slides[$currentSlide].layers[$currentLayer].font_size);
        });
        /**Custom css*/
        $('[name=custom_css]').keyup(function () {
            $slides[$currentSlide].layers[$currentLayer].custom_css = $(this).val();
            $('#' + $currentSlide + '-' + $currentLayer).find('.inner').attr('style', $(this).val());
        });
        /*Global setiings*/
        $settings = $.extend(defaultSettings, $settings);
        $('input.global-settings, select.global-settings').each(function (index) {
            $(this).val($settings[$(this).attr('name')]);
        });
        $('#slidedesign, #preview').width($settings.startwidth).height($settings.startheight);

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
    });

    /*Slide functions*/
    function addSlideTab(slideIndex) {
        var slideTab = $('<li>').attr('index', slideIndex);
        var slideTabTitle = '';
        if ($slides[slideIndex].title == '') {
            slideTabTitle = $('<span>').text('Slide ' + (slideIndex + 1));
        } else {
            slideTabTitle = $('<span>').text($slides[slideIndex].title || 'Slide title');
        }
        slideTabTitle.click(function () {
            if ($(this).hasClass('active')) return;
            saveLayer();
            saveSlide();
            loadSlide(slideIndex);
        });
        var slideTabRemove = $('<span data-toggle="tooltip" data-placement="top" title="Verwijderen">').text('').addClass('remove-slide fas fa-trash');
        var slideTabDuplicate = $('<span data-toggle="tooltip" data-placement="top" title="Duplicate">').text('').addClass('remove-slide far fa-copy');
        slideTabRemove.click(function () {
            if ($(slideTab).hasClass('active')) {

                var swaltext1 = Drupal.t('Verwijder slide') + '<br>' + $slides[slideIndex].title;
                var swaltext2 = Drupal.t("Weet je zeker dat je deze slide wil verwijderen") + "<br>" + Drupal.t("Je kan dit niet meer ongedaan maken!");
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
                }, function(){
                    removeSlide(slideIndex);
                });
            }
            else {
                var savemessage2 = Drupal.t('Je moet eerst de slide kiezen die je wilt verwijderen, voordat je hem kan verwijderen');
                swal({
                    title: "",
                    text: savemessage2,
                    type: "info",
                    timer: 5500,
                    showCancelButton: false,
                    confirmButtonClass: "btn-info",
                });

            }
        });
        slideTabDuplicate.click(function () {
            if ($(slideTab).hasClass('active')) {

                var swaltext1 = Drupal.t('Verwijder slide') + '<br>' + $slides[slideIndex].title;
                var swaltext2 = Drupal.t("Weet je zeker dat je deze slide wil verwijderen") + "<br>" + Drupal.t("Je kan dit niet meer ongedaan maken!");
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
                }, function(){
                    removeSlide(slideIndex);
                });
            }
            else {
                var savemessage2 = Drupal.t('Je moet eerst de slide kiezen die je wilt verwijderen, voordat je hem kan verwijderen');
                swal({
                    title: "",
                    text: savemessage2,
                    type: "info",
                    timer: 5500,
                    showCancelButton: false,
                    confirmButtonClass: "btn-info",
                });

            }
        });
        slideTab.append(slideTabTitle).append(slideTabRemove);
        $('#slideslist').append(slideTab);
    }

    function addSlide() {
        saveLayer();
        saveSlide();
        var newSlideIndex = $slides.length;
        $slides[newSlideIndex] = {};
        $.extend(true, $slides[newSlideIndex], defaultSlide);
        $slides[newSlideIndex].index = newSlideIndex;
        addSlideTab(newSlideIndex);
        loadSlide(newSlideIndex);
        $('#art_revolution_main').show(0);
    }

    function loadSlide(slideIndex) {

        // var slidecl =  $('.disable-enabled').attr("class").split(" ");
        // var slidenewcl =[];
        //
        // $currentSlide = slideIndex;
        //
        // $('ul#slideslist').find('li').removeClass('active');
        // $('ul#slideslist').find('li[index=' + slideIndex + ']').addClass('active');
        // $('.enabledisableclass').find('.disable-enabled').addClass('sid');
        //
        // for(var i=0;i<slidecl.length;i++){
        //     r = slidecl[i].search(/sid-+/);
        //     if(r)slidenewcl[slidenewcl.length] = slidecl[i];
        // }
        //
        //
        // $('.disable-enabled').removeClass().addClass(slidenewcl.join(' '));
        // $('.disable-enabled').addClass('sid-' + slideIndex);


        if ($slides[slideIndex].disableslide != '') {
            changeSlideDisabled(slideIndex);
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
            $('#slidedesign, .demo-preview, .backgroundchanger').css({
                backgroundColor: $slides[slideIndex].backgroundcolormain
            });
        } else {
            $('#slidedesign, .demo-preview, .backgroundchanger').css({
                backgroundColor: '#0c0c0c'
            });
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
    }

    function saveSlide() {
        if ($slides.length == 0) return;
        jQuery('.slide-option').each(function (index) {
            $slides[$currentSlide][jQuery(this).attr('name')] = $(this).val();
        });
        $slides[$currentSlide].layers.sort(ArtCompare);
    }

    function removeSlide(slideIndex) {
        $('ul#slideslist').find('li[index=' + slideIndex + ']').remove();
        $slides[slideIndex].removed = 1;
        loadSlide(0);
    }

    /*Layer functions*/
    function loadLayers(slideIndex) {
        $('#slidedesign').find('div').remove();
        $currentSlide = slideIndex;
        /*Remove all layer tabs*/
        $('#layerslist').find('li').remove();
        /*Load new layer tabs*/
        if (typeof $slides[$currentSlide].layers == 'undefined') {
            $slides[$currentSlide].layers = new Array();
        }
        $($slides[$currentSlide].layers).each(function (layerIndex) {
            if ($slides[$currentSlide].layers[layerIndex].removed != 1) {
                addLayerTab(layerIndex);
            }
        });
        /*Reset layer option value*/
        // $('.layer-option').val('');
        if (typeof $slides[$currentSlide].layers[0] != 'undefined') {
            loadLayer(0);
            $('#layeroptions').css({visibility: 'visible'}).addClass("showlayers1");
            $('.addsliderbutton').removeClass("hidelayerbutton").addClass("showsliderbutton");
            $('.slidertools').css({visibility: 'visible'});
        } else {
            $('#layeroptions').css({visibility: 'hidden'}).removeClass("hiddenlayers").addClass("showlayers");
            $('.addsliderbutton').removeClass("hidelayerbutton").addClass("showsliderbutton");
            $('.slidertools').css({visibility: 'visible'});
        }
    }

    function addLayerTab(layerIndex, ajax) {
        var layertype = $slides[$currentSlide].layers[layerIndex].type;
        var layerTab = $('<li>').attr('index', layerIndex).addClass(layertype);
        $slides[$currentSlide].layers[layerIndex].title = $slides[$currentSlide].layers[layerIndex].title || 'Layer ' + (layerIndex + 1);
        //var layerTitle = $slides[$currentSlide].layers[layerIndex].title'Layer ' + (layerIndex + 1)
        var layerTabTitle = $('<span>').text($slides[$currentSlide].layers[layerIndex].title.substring(0, 32));
        var layerTabRemove = $('<span>').attr('data-toggle', 'tooltip').attr('data-placement', 'left').attr('title', 'Remove layer '+ $slides[$currentSlide].layers[layerIndex].title.substring(0, 32) +'').addClass('remove-layer fa fa-times-circle');
        var layerTabDuplicate = $('<span>').attr('data-toggle', 'tooltip').attr('data-placement', 'left').attr('title', 'duplicate layer '+ $slides[$currentSlide].layers[layerIndex].title.substring(0, 32) +'').addClass('duplicate-layer fa fa-copy');
        var layerTabMove = $('<span>').attr('data-toggle', 'tooltip').attr('data-placement', 'left').attr('title', 'Move layer '+ $slides[$currentSlide].layers[layerIndex].title.substring(0, 32) +'').addClass('move fa fa-arrows-v');
        layerTabTitle.click(function () {
            saveLayer();
            loadLayer(layerIndex);
        });
        layerTabDuplicate.click(function () {
            saveLayer();
            duplicateLayer(layerIndex);
        });
        layerTabRemove.click(function () {
            if ($(layerTab).hasClass('active')) {
                var swaltext1 = Drupal.t('Delete layer') + '<br>' + $slides[$currentSlide].layers[layerIndex].title;
                var swaltext2 = Drupal.t("Are you sure you want to delete this layer?") + "<br>" + Drupal.t("You will not be able to undo this action!");
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
                }, function(){
                    removeLayer(layerIndex);
                });
            }
            else {
                //var savemessage = Drupal.t('Slide remove failed');
                var savemessage2 = Drupal.t('You must first select the layer you want to delete and then press the remove button again');
                swal({
                    title: "",
                    text: savemessage2,
                    type: "info",
                    timer: 5500,
                    showCancelButton: false,
                    confirmButtonClass: "btn-info",
                });
            }
        });

        // layerTabRemove.click(function () {
        //     removeLayer(layerIndex);
        // });
        layerTab.append(layerTabTitle);
        layerTab.append(layerTabRemove);
        layerTab.append(layerTabDuplicate);
        layerTab.append(layerTabMove);
        $('ul#layerslist').append(layerTab);
        var newLayerDesign = $('<div>').addClass('layer tp-caption').attr('id', $currentSlide + '-' + layerIndex);
        newLayerDesign.addClass('caption');

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
            // newLayerDesign.addClass($slides[$currentSlide].layers[layerIndex].text_style);
            newLayerDesign.addClass($slides[$currentSlide].layers[layerIndex].font_size);
            // newLayerDesign.addClass($slides[$currentSlide].layers[layerIndex].font_color);
        }

        /*DRAG EN RESIZE FUNCTION FOR LAYER TYPE*/

        $slides.defaultResizeOptions = {
            aspectRatio: $slides[$currentSlide].layers[layerIndex].type == 'image',
            containment: "parent",
            handles: "all" ,autoHide:true,

            resize: function (event, ui) {
                $(this).find('img').css({width: ui.size.width, height: ui.size.height});
                $('input[name=width]').val(ui.size.width);
                $('input[name=height]').val(ui.size.height);
                setLayerDimensions(layerIndex, ui.size.width, ui.size.height);
            },
            create: function( event, ui ) {
                $(this).find('img').css({width: $slides[$currentSlide].layers[layerIndex].width, height: $slides[$currentSlide].layers[layerIndex].height});
            }
        };

        newLayerDesign.mousedown(function () {
            saveLayer();
            loadLayer(layerIndex);
        }).draggable({
            containment: "parent",
            drag: function (event, ui) {
                $('input[name=left]').val(ui.position.left);
                $('input[name=top]').val(ui.position.top);
                setLayerPosition(layerIndex, ui.position.top, ui.position.left);
            },
            grid: [0.1, 0.1]
        }).resizable($slides.defaultResizeOptions);

        var $typelayer = $slides[$currentSlide].layers[layerIndex].type;
        if ($typelayer != 'image') {
            newLayerDesign.resizable("disable");
        }

        if ($typelayer != 'text' && $typelayer != 'image' && $typelayer != 'clock') {
            newLayerDesign.draggable("disable");
        }

        /*TOT HIER DIE MOTHERFUCKER*/

        var content = '';
        switch ($slides[$currentSlide].layers[layerIndex].type) {

            case 'text':
                content = "<p class='font-text " + $slides[$currentSlide].layers[layerIndex].text_style_text + "' style='color:" + $slides[$currentSlide].layers[layerIndex].font_color_text + "'>" + $slides[$currentSlide].layers[layerIndex].text + "</p>";
                break;

            case 'image':
                content = '<img id="imageresize" src="' + $slides[$currentSlide].layers[layerIndex].image + '" style="width: ' + $slides[$currentSlide].layers[layerIndex].width + 'px; height: ' + $slides[$currentSlide].layers[layerIndex].height + 'px"/>';
                var img = new Image();
                img.onload = function () {
                    newLayerDesign.width($slides[$currentSlide].layers[layerIndex].width || this.width);
                    newLayerDesign.height($slides[$currentSlide].layers[layerIndex].height || this.height);
                };
                img.src = $slides[$currentSlide].layers[layerIndex].image;
                break;

            case 'video':
                content = '<video muted class="videoadmin" controls width="' + $slides[$currentSlide].layers[layerIndex].video_width + '" height="auto">"' + '"<source src="' + $slides[$currentSlide].layers[layerIndex].video + '"type="video/mp4">"' + '"</video>"';
                break;

            case 'clock':
                content = "<div style='' class='clockfull' style='color:" + $slides[$currentSlide].layers[layerIndex].font_color_clock + "'>" +
                    "<div id='clock' class='font-clock " + $slides[$currentSlide].layers[layerIndex].text_style_clock + "'>" +
                    "<p class='date'>DINSDAG | 27-08-2019</p>" +
                    "<p class='time'>15:36:30</p>" +
                    "</div>" +
                    "</div>";
                break;

            case 'news':
                content = "<div style='width:1920px; height:1080px;' class='nieuwsfull' style='color:" + $slides[$currentSlide].layers[layerIndex].font_color_news + "'> " +
                    "<div id='slideshow' class='sliders font-news " + $slides[$currentSlide].layers[layerIndex].text_style_news + "' >" +
                    "<div class='slideitem current'>" +
                    "<p class='newstitle'>Nieuws</p>" +
                    "<p class='newsinhoud'>Het nieuws bericht...</p></div>" +
                    "<div>" +
                    "</div>";
                break;

            case 'widgets':
                content = '<img class="widgetfullscreen" width="' + $slides[$currentSlide].layers[layerIndex].width + '" height="' + $slides[$currentSlide].layers[layerIndex].height + '" src="' + Drupal.settings.basePath + 'sites/all/modules/art_revolution/images/fbwidget.jpg"/>';
                break;
        }

        var inner = $('<div>').addClass('inner');
        if ($slides[$currentSlide].layers[layerIndex].custom_css) {
            inner.attr('style', $slides[$currentSlide].layers[layerIndex].custom_css);
        }
        inner.html(content);
        newLayerDesign.append(inner);
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

        try {
            $('#layerslist').sortable('destroy');
        } catch (e) {
        }
        $('#layerslist').sortable({
            handle: '.move',
            update: function (event, ui) {
                $('#layerslist').find('li').each(function (index) {
                    var lindex = $(this).attr('index');
                    $slides[$currentSlide].layers[lindex].index = index;
                    //$(this).find('.remove-layer').text(index);
                    $('#' + $currentSlide + '-' + lindex).css({zIndex: (99 - index)});
                    saveLayer();
                });
                $slides[$currentSlide].layers.sort(ArtCompare);
                //saveLayer();
                saveSlide();
                loadSlide($currentSlide);
            }
        });

        setTimeout(function () {
            $.each($slides[$currentSlide].layers, function(indexTmp, value) {
                switch ($slides[$currentSlide].layers[indexTmp].type) {
                    case 'text':
                        changeLayerDisabled(indexTmp, 'enable', false);
                        changeLayerColor(indexTmp, 'text', $slides[$currentSlide].layers[indexTmp].font_color_text, false);
                        break;
                    case 'video':
                        changeLayerDisabled(indexTmp, 'enable', false);
                        break;
                    case 'image':
                        changeLayerDisabled(indexTmp, 'enable', false);
                        break;
                    case 'clock':
                        changeLayerDisabled(indexTmp, $slides[$currentSlide].layers[indexTmp].clockblock, false);
                        changeLayerColor(indexTmp, 'clock', $slides[$currentSlide].layers[indexTmp].font_color_clock, false);
                        break;
                    case 'news':
                        changeLayerDisabled(indexTmp, $slides[$currentSlide].layers[indexTmp].newsblock, false);
                        changeLayerColor(indexTmp, 'news', $slides[$currentSlide].layers[indexTmp].font_color_news, false);
                        break;
                    case 'widgets':
                        changeLayerDisabled(indexTmp, $slides[$currentSlide].layers[indexTmp].facebookblock, false);
                        break;
                }
            });
        });
    }

    function addLayer() {
        /*Save current layer*/
        $('#layeroptions').css({visibility: 'visible'});
        saveLayer();
        /*Init new layer*/
        var newLayerIndex = $slides[$currentSlide].layers.length;
        $slides[$currentSlide].layers[newLayerIndex] = {};
        $.extend(true, $slides[$currentSlide].layers[newLayerIndex], defaultLayer);
        addLayerTab(newLayerIndex);
        loadLayer(newLayerIndex);
    }

    function duplicateLayer(layerIndex) {
        /*Save current layer*/
        saveLayer();
        /*Init new layer*/
        var newLayerIndex = $slides[$currentSlide].layers.length;
        $slides[$currentSlide].layers[newLayerIndex] = {};
        $.extend(true, $slides[$currentSlide].layers[newLayerIndex], $slides[$currentSlide].layers[layerIndex]);
        addLayerTab(newLayerIndex);
        loadLayer(newLayerIndex);
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

        $("#content-type").tabs({
            selected: $contenttypes[$slides[$currentSlide].layers[layerIndex].type],
            active: $contenttypes[$slides[$currentSlide].layers[layerIndex].type],
            activate: function (event, ui) {
                var type = $(ui.newTab[0]).data('type');
                var panel = $(ui.newPanel[0]);
                $slides[$currentSlide].layers[$currentLayer].type = type;
                $('ul#layerslist li.active').removeClass('text image video clock news social widgets').addClass(type);
                if (type === 'image') {
                    // panel.find('input').trigger('onchange');
                    var widgethumbnail = $('<img>').attr({
                        src: $slides[$currentSlide].layers[$currentLayer].image
                    }).css({'width': $slides[$currentSlide].layers[$currentLayer].width, 'height': $slides[$currentSlide].layers[$currentLayer].height});
                    var op = $slides.defaultResizeOptions;
                    $('#' + $currentSlide + '-' + $currentLayer).resizable("destroy");
                    op.aspectRatio = true;
                    $('#' + $currentSlide + '-' + $currentLayer).resizable(op).draggable("enable");
                    $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
                }
                if (type === 'text') {
                    // panel.find('textarea[id=layer-text]').trigger('keyup');
                    // panel.find('select[name=font_size]').trigger('change');
                    // panel.find('select[name=text_style]').trigger('change');

                    $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("enable").css({'width': 'auto', 'height': 'auto'});
                }

                if (type === 'clock') {
                    var widgethumbnail = "<div class='clockfull' style='color:" + $slides[$currentSlide].layers[layerIndex].font_color_clock +"'>" +
                        "<div id='clock' class='font-clock " + $slides[$currentSlide].layers[layerIndex].text_style_clock +"'>" +
                        "<p class='date'>DINSDAG | 27-08-2019</p>" +
                        "<p class='time'>15:36:30</p>" +
                        "</div>" +
                        "</div>";
                    $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
                    // $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");

                    //panel.find('select[name=clockblock]').trigger('change');
                    // setLayerPosition($currentLayer, 0, 0);
                } if (type === 'news') {
                    var widgethumbnail = "<div class='nieuwsfull' style='width:1920px; height:1080px; color:" + $slides[$currentSlide].layers[layerIndex].font_color_news +"'> " +
                        "<div id='slideshow' class='sliders font-news " + $slides[$currentSlide].layers[layerIndex].text_style_news +"' >" +
                        "<div class='slideitem current'>" +
                        "<p class='newstitle'>Nieuws titel</p>" +
                        "<p class='newsinhoud'>Het nieuws bericht...</p></div>" +
                        "<div>" +
                        "</div>";
                    $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
                    $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");

                    panel.find('select[name=newsblock]').trigger('change');
                    setLayerPosition($currentLayer, 0, 0);
                }  if (type === 'video') {
                    $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");
                }
                if (type === 'widgets') {
                    var widgethumbnail = $('<img>').attr({
                        src: Drupal.settings.basePath + 'sites/all/modules/art_revolution/images/fbwidget.jpg',
                        class: 'widgetfullscreen',
                        width: 1920,
                        height: 1080
                    });
                    $('#' + $currentSlide + '-' + $currentLayer).find('.inner').html(widgethumbnail);
                    $('#' + $currentSlide + '-' + $currentLayer).resizable("disable").draggable("disable");

                    panel.find('select[name=facebookblock]').trigger('change');
                    setLayerPosition($currentLayer, 0, 0);
                }
            }
        });

        setTimeout(function () {
            switch ($slides[$currentSlide].layers[$currentLayer].type) {
                case 'text':
                    changeLayerDisabled($currentLayer, 'enable');
                    changeLayerColor($currentLayer, 'text', $slides[$currentSlide].layers[$currentLayer].font_color_text);
                    changeLayerStyle('text', $slides[$currentSlide].layers[$currentLayer].text_style_text);
                    changeLayerSize('text', $slides[$currentSlide].layers[$currentLayer].font_size);
                    break;
                case 'video':
                    setLayerPosition($currentLayer, 0, 0);
                    changeLayerDisabled($currentLayer, 'enable');
                    break;
                case 'image':
                    changeLayerDisabled($currentLayer, 'enable');
                    break;
                case 'clock':
                    // setLayerPosition($currentLayer, 0, 0);
                    changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].clockblock);
                    changeLayerColor($currentLayer, 'clock', $slides[$currentSlide].layers[$currentLayer].font_color_clock);
                    changeLayerStyle('clock', $slides[$currentSlide].layers[$currentLayer].text_style_clock);
                    break;
                case 'news':
                    setLayerPosition($currentLayer, 0, 0);
                    changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].newsblock);
                    changeLayerColor($currentLayer, 'news', $slides[$currentSlide].layers[$currentLayer].font_color_news);
                    changeLayerStyle('news', $slides[$currentSlide].layers[$currentLayer].text_style_news);
                    break;
                case 'widgets':
                    setLayerPosition($currentLayer, 0, 0);
                    changeLayerDisabled($currentLayer, $slides[$currentSlide].layers[$currentLayer].facebookblock);
                    break;
            }
        });
    }

    function changeLayerStyle(changeType, fontStyle) {
        $slides[$currentSlide].layers[$currentLayer]['text_style_' + changeType] = fontStyle;
        $('#' + $currentSlide + '-' + $currentLayer).find(".font-" + changeType).removeClass().addClass(fontStyle).addClass('font-' + changeType);
        $("input[name=text_style_" + changeType + "]").val(fontStyle);
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
            $('.layerset').addClass('locked');
            $('#monitorscreen').addClass('locked');
        } else {
            $('.slidertools').removeClass('locked');
            $('.layerset').removeClass('locked');
            $('#monitorscreen').removeClass('locked');
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
                    layerStatus = 'enable';
                    break;
                case 'clock':
                    layerStatus = $slides[$currentSlide].layers[$currentLayer].clockblock;
                    break;
                case 'news':
                    layerStatus = $slides[$currentSlide].layers[$currentLayer].newsblock;
                    break;
                case 'widgets':
                    layerStatus = $slides[$currentSlide].layers[$currentLayer].facebookblock;
                    break;
            }
            // switch ($slides[$currentSlide].layers[layerIndex].type) {
            //     case 'text':
            //     case 'image':
            //     case 'video':
            //         layerStatus = 'enable';
            //         break;
            //     case 'clock':
            //         layerStatus = $('select[name=clockblock]').find('option:selected').val();
            //         break;
            //     case 'news':
            //         layerStatus = $('select[name=newsblock]').find('option:selected').val();
            //         break;
            //     case 'widgets':
            //         layerStatus = $('select[name=facebookblock]').find('option:selected').val();
            //         break;
            // }
        }
        //console.log(layerIndex, layerStatus);
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
        });
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

    function saveGlobalSettings() {
        $('input.global-settings, select.global-settings').each(function (index) {
            $settings[$(this).attr('name')] = $(this).val();
        });
    }

    // function saveLayerSlider(ajax) {
    //     saveSlide();
    //     saveLayer();
    //     saveGlobalSettings();
    //     $slides.sort(ArtCompare);
    //     var $slides2 = [];
    //
    //     $.each($slides, function (index, slide) {
    //         if (slide.removed == 0) {
    //             var layers = [];
    //             slide.layers.sort(ArtCompare);
    //             $.each(slide.layers, function (index, layer) {
    //                 if (layer.removed == 0) {
    //                     layers[layers.length] = layer;
    //                 }
    //             });
    //             slide.layers = layers;
    //             $slides2[$slides2.length] = slide;
    //         }
    //     });
    //     var datasettings = base64Encode(JSON.stringify($settings));
    //     var dataslides = base64Encode(JSON.stringify($slides2));
    //     var data = {
    //         cache: false,
    //         sid: jQuery('input[name=sid]').val(),
    //         data: dataslides,
    //         settings: datasettings
    //     };
    //     $('#save').val('');
    //     $.ajax({
    //         url: Drupal.settings.basePath + '?q=admin/art_revolution/save',
    //         type: 'POST',
    //         data: data,
    //         dataType: 'json',
    //         success: function (data) {
    //             location.reload(data);
    //         },
    //         error: function (jqXHR, textStatus, errorThrown) {
    //             alert(textStatus + ":" + jqXHR.responseText);
    //         }
    //     });
    // }
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


    $('.toggle').click(function (e) {
        e.preventDefault();

        var $this = $(this);

        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('li .inner').removeClass('show');
            $this.parent().parent().find('li .inner').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
    });

})(jQuery);
