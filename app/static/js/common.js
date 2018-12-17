jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('open');
  });

  // Fixed header
  $(window).scroll(function() {
    if($(this).scrollTop() > 50) {
      $('.header').addClass('fixed');
    }
    else {
      $('.header').removeClass('fixed');
    }
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
    $(this).prev('.form__label').addClass('is-active');
  });

  $('.form__field, .form__field--textarea').focusout(function() {
    if ($(this).val() == '') {
      $(this).prev('.form__label').removeClass('is-active');
    }
  });

  // Masonry
  var grid = $('.categories-items .row').masonry({
    itemSelector: '.categories-items__item',
    columnWidth: '.categories-items__item:last-child',
    percentPosition: true
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
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      767: {
        slidesPerView: 1,
        spaceBetween: 30
      }
    }
  });

  new Swiper('.slider--project', {
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
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

  new Swiper('.product-gallery__thumbnails', {
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

  // Change product image
  $('.product-gallery__thumbnails img').click(function(){
    var large = $(this).data('large_image');
    var medium = $(this).data('medium_image');
    $('.product-gallery__img img').fadeOut(300, changeImg(medium, large, $('.product-gallery__img img')));
  });

  function changeImg(medium, large, element){
    var element = element;
    var large = large;
    var medium = medium;
    setTimeout(function(){ tdZoomFade()},300);
    function tdZoomFade(){
        element.attr('src', medium)
        element.attr('data-large_image', large)
        element.attr('data-medium_image', medium)
        element.parent().attr('href', large)
        element.fadeIn(300);
    }
  }

  // Validation form
  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
    return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  $.extend( $.validator.messages, {
    required: "Это поле необходимо заполнить",
    remote: "Пожалуйста, введите правильное значение.",
    email: "Пожалуйста, введите корректный адрес электронной почты.",
    url: "Пожалуйста, введите корректный URL.",
    date: "Пожалуйста, введите корректную дату.",
    dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
    number: "Пожалуйста, введите число.",
    digits: "Пожалуйста, вводите только цифры.",
    creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
    equalTo: "Пожалуйста, введите такое же значение ещё раз.",
    extension: "Пожалуйста, выберите файл с правильным расширением.",
    maxlength: $.validator.format( "Пожалуйста, введите не больше {0} символов." ),
    minlength: $.validator.format( "Пожалуйста, введите не меньше {0} символов." ),
    rangelength: $.validator.format( "Пожалуйста, введите значение длиной от {0} до {1} символов." ),
    range: $.validator.format( "Пожалуйста, введите число от {0} до {1}." ),
    max: $.validator.format( "Пожалуйста, введите число, меньшее или равное {0}." ),
    min: $.validator.format( "Пожалуйста, введите число, большее или равное {0}." )
  } );
  
  /* Валидация формы */
  $(".online-order__form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
      email: "Введите Ваш E-mail",
      address: "Введите Ваш адрес доставки",
      desc: "Введите Ваше описание",
      validate_code: "Введите Проверочный код",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $('.online-order__form').serialize();
      ajaxSend('.online-order__form', t);
    }
  });

  $(".download__form").validate({
    messages: {
      email: "Введите Ваш E-mail",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $('.download__form').serialize();
      ajaxSend('.download__form', t);
    }
  });
  
  /* Функцыя для отправки формы */
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

});