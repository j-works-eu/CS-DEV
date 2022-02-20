    (function($) {
     "use strict";
        /* ==============================================
        CAROUSEL
        =============================================== */
        $('.owl-carousel').owlCarousel({
            loop:true,
            margin:15,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:2,
                    nav:false
                },
                1000:{
                    items:3,
                    nav:false,
                    loop:false
                }
            }
        })

        /* ==============================================
        SMOOTH SCROLL
        =============================================== */
        smoothScroll.init({
            speed: 800, // Integer. How fast to complete the scroll in milliseconds
            easing: 'easeInOutCubic', // Easing pattern to use
            updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
            offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
            callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
            callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
        });
    })(jQuery);