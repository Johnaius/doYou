var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // Pagination dots
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });