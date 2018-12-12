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
    var videoPlayer = $(this).prev();
    videoPlayer[0].play();
    videoPlayer.prop('controls', true);
    $(this).hide();
  });

  new Swiper('.slider', {
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

});