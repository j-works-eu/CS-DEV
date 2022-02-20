      jQuery(document).ready(function ($) {
          var $container = $('.masonry_wrapper');
          $container.imagesLoaded(function () {
              $container.isotope({
                  itemSelector: '.item',
                  layoutMode: 'fitRows'
              });
          });
      
          $('nav.portfolio-filter ul li a').click(function () {
      
              $('nav.portfolio-filter ul li a').removeClass('active');
              $(this).addClass('active');
      
              var selector = $(this).attr('data-filter');
              $container.isotope({
                  filter: selector
              });
      
  
            return false;
          });
      });
     