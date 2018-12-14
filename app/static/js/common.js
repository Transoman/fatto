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
  // $('.catalog-list').masonry({
  //   itemSelector: '.catalog-list__item',
  //   columnWidth: '.grid-sizer',
  //   percentPosition: true,
  //   gutter: '.gutter-sizer'
  // });

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

  // Validation form
  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
    return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");
  
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