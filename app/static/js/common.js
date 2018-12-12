jQuery(document).ready(function($) {

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('open');
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
    top = $(id).offset().top;

    $('body,html').animate({scrollTop: top - 115}, 1000);
  });

  $('.video__btn').click(function() {
    var videoPlayer = $(this).parent().find('.video__player');
    videoPlayer[0].play();
    videoPlayer.prop('controls', true);
    videoPlayer.parent().addClass('video--play');
    $(this).hide();
  });

  new Swiper('.slider--about', {
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  new Swiper('.slider--project', {
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  new Swiper('.slider--testimonial', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

});