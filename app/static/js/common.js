jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('open');
  });

  // Fixed header
  function fixedHeader() {
    if($(this).scrollTop() > 50) {
      $('.header').addClass('fixed');
    }
    else {
      $('.header').removeClass('fixed');
    }
  }

  fixedHeader();

  $(window).scroll(function() {
    fixedHeader();
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  // Scroll to anchor
  $('.scroll-down').on('click', function (event) {
    event.preventDefault();

    var id  = $(this).attr('href'),
    offset = $(window).width() < 1025 ? 80 : 115,
    top = $(id).offset().top;

    $('body,html').animate({scrollTop: top - offset}, 1000);
  });

  $('.product__bottom a').on('click', function (event) {
    event.preventDefault();

    var id  = $(this).attr('href'),
    offset = $(window).width() < 1025 ? 80 : 115,
    top = $(id).offset().top;

    $('body,html').animate({scrollTop: top - offset}, 1000);
  });

  $('.video__btn').click(function() {
    var videoPlayer = $(this).parent().find('.video__player');
    videoPlayer[0].play();
    videoPlayer.prop('controls', true);
    videoPlayer.parent().addClass('video--play');
    $(this).hide();
  });

  // Focus input effect
  $('.form__field').focus(function() {
    $(this).parent().prev('.form__label').addClass('is-active');
  });

  $('.form__field, .form__field--textarea').focusout(function() {
    if ($(this).val() == '') {
      $(this).parent().prev('.form__label').removeClass('is-active');
    }
  });

  // Masonry
  var grid = $('.categories-items .row').masonry({
    itemSelector: '.categories-items__item',
    columnWidth: '.categories-items__item:last-child'
  });

  function masonryProjectResize() {
    if($('.categories-items').length) {
      var defaultSize = $('.categories-items__item:last-child').width();
      var projectDefault = $('.categories-items__item');
      var projectMasonryTall = $('.categories-items__item--tall');
      
      projectDefault.css('height', defaultSize);
      projectMasonryTall.css('height', defaultSize*2);
    }
  }

  masonryProjectResize();

  $(window).resize(function() {
    masonryProjectResize();
  });
  

  grid.imagesLoaded().progress( function() {
    grid.masonry('layout');
  });

  // Input Mask
  var inputPhone = document.querySelectorAll('input[type="tel"]');
  if (inputPhone.length) {

    var maskOptions = {
      mask: '+{7} (000) 000-00-00'
    };

    for(var i = 0; i < inputPhone.length; i++) {
      new IMask(inputPhone[i], maskOptions);
    }
  }

  new Swiper('.slider--about', {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1200: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 30
      }
    }
  });

  new Swiper('.slider--project', {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1200: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 30
      }
    }
  });

  new Swiper('.slider--testimonial', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  new Swiper('.cost-products__slider', {
    slidesPerView: 1.3,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1366: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  });

  var productSlider = new Swiper('.product-gallery__slider', {
    spaceBetween: 10
  });

  var productThumbSlider = new Swiper('.product-gallery__thumbnails', {
    slidesPerView: 5,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1200: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      },
      767: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      400: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  $('.product-gallery__thumbnails-item').click(function(e) {
    var activeIndex = productThumbSlider.clickedIndex;
    productSlider.slideTo(activeIndex);
  });

  $().fancybox({
    selector : '[data-fancybox="group"]',
    thumbs   : false,
    hash     : false,
    loop: true,
    beforeClose : function(instance) {
      if ($('.product-gallery__slider').length) {
        productSlider.slideTo( instance.currIndex);
      }
    }
  });

  // Open map in popup
  $('#contact-map').popup({
    opacity: 0.3,
    transition: 'all 0.3s'
  });

  $('.contact-list__map-link').click(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'get',
      url: '/wp-content/themes/fatto/map.php',
      data: {lng: $(this).data('lng'), lat: $(this).data('lat')},
      success: function(res) {
        $('#contact-map').html(res);
        $('#contact-map').popup('show');
      }
    });
  });

  // Partner slider
  var breakpoint = window.matchMedia( '(min-width: 992px)' );
  var partnerSlider;

  var breakpointChecker = function() {
     // if larger viewport and multi-row layout needed
     if ( breakpoint.matches === true ) {
        // clean up old instances and inline styles when available
        if ( partnerSlider !== undefined ) {
          if ($('.partners-list').length) {
            $('.partners-list').removeClass('swiper-container');
            $('.partners-list__item').unwrap('.swiper-wrapper');
            $('.partners-list__item').removeClass('swiper-slide');
            $('.partners-list .swiper-pagination').remove();
            partnerSlider.destroy( true, true );
          }
        }
        // or/and do nothing
        return;
     // else if a small viewport and single column layout needed
     } else if ( breakpoint.matches === false ) {
        // fire small viewport version of swiper
        return enableSwiper();
     }
  };

  var enableSwiper = function() {
    $('.partners-list').addClass('swiper-container');
    if (! $('.partners-list .swiper-wrapper').length ) {
      $('.partners-list__item').wrapAll('<div class="swiper-wrapper"></div>');
    }
    $('.partners-list__item').addClass('swiper-slide');
    $('.partners-list').append('<div class="swiper-pagination"></div>');

    partnerSlider = new Swiper ('.partners-list', {
      slidesPerView: 3,
      spaceBetween: 15,
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },

      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);
  // kickstart
  breakpointChecker();

  // Form
  var requiredField = $('.wpcf7-form .wpcf7-validates-as-required');

  requiredField.each(function(i, el) {
    $(el).attr('required', true);
  });

  var wpcf7Elm = document.querySelector( '.wpcf7' );
 
  if (wpcf7Elm) {
    wpcf7Elm.addEventListener( 'wpcf7submit', function( event ) {
      $('.wpcf7-form-control').each(function(i, el) {
        $(this).parent().prev('.form__label').removeClass('is-active');
      });
      $('label[for="order-file"] span').text('Прикрепить файл');
    }, false );
  }


  $('#btn-price').click(function() {
    var title = $(this).parents('.product__content').find('h1').text();
    $('.online-order__form').find('input[name="subject"]').val('Узнать стоимость под необходимые размеры: ' + title);
  });

  $('#btn-order').click(function() {
    var title = $(this).parents('.product__content').find('h1').text();
    $('.online-order__form').find('input[name="subject"]').val('Заявка на заказ: ' + title);
  });

  $('#order-file').change(function() {
    var filename = $(this).val().replace(/.*\\/, "");
    $('label[for="order-file"] span').text(filename);
  });

});