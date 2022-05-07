import Swiper, { Navigation, Pagination } from 'swiper';

const swiperEl = document.querySelector('.reviews .swiper');

const initSwiper = () => {
  if (swiperEl === null) {
    return false;
  }

  const slider = new Swiper(swiperEl, {
    modules: [Navigation, Pagination],
    loop: true,
    slidesPerView: 1,
    autoHeight: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.reviews .nav-button--next',
      prevEl: '.reviews .nav-button--prev',
    },
  })
};

export {
  initSwiper,
}
