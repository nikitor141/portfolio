import * as webpTest from './modules/iswebp.js';
webpTest.isWebp();

let socials = document.querySelector('.hero__socials');

function mobileSocialsButtonFunc() {
   let status = socials.getAttribute('aria-expanded');
   status = status === 'false' ? 'true' : 'false';
   socials.setAttribute('aria-expanded', `${status}`);

   if (status === 'true') {
      document.addEventListener('click', e => {
         if (!e.target.closest('.hero__socials')) {
            status = 'false';
            socials.setAttribute('aria-expanded', `${status}`)
         };
      });
   };
};

function socialsResizeHandler() {
   socialsPositionY = parseFloat(window.getComputedStyle(socials).top);
};

let socialsScrollHandler = () => {
   if (socialsPositionY <= window.scrollY) {
      socials.classList.add('scrolled');
   } else {
      socials.classList.remove('scrolled');
   };
};

//функция для десктопа
let socialsPositionY;
function socialsFixed(isEnable = true) {
   //если десктоп
   if (isEnable) {
      socialsPositionY = parseFloat(window.getComputedStyle(socials).top);
      window.addEventListener('resize', socialsResizeHandler);
      window.addEventListener('scroll', socialsScrollHandler);
      //если мобильное
   } else {
      window.removeEventListener('resize', socialsResizeHandler);
      window.removeEventListener('scroll', socialsScrollHandler);
   }
};

//функция для мобильных
function socialsMobile(isEnable = true) {
   socials.classList.remove('scrolled');
   //получает кнопку

   let button = document.querySelector('.hero__socials-button');
   //если мобильное
   if (isEnable) {
      button.addEventListener('click', mobileSocialsButtonFunc);
      //если десктоп
   } else {
      button.removeEventListener('click', mobileSocialsButtonFunc);
   }
};

//создается медиазапрос
let mediaQuery = window.matchMedia('(max-width: 530px)');

//проверка медиазапроса
let MqCheck = () => {

   //если мобильная то
   if (mediaQuery.matches) {

      //отключаются функции для десктопа
      socialsFixed(false);

      //запускаются функции для мобильной
      socialsMobile();

      //если десктопная то
   } else {

      //отключаются функции для мобильной
      socialsMobile(false);

      //запускаются функции для десктопа
      socialsFixed();
   }
}
//запускается проверка медиазапроса при изменении медиазапроса
mediaQuery.addEventListener('change', () => {
   MqCheck();
});
//запускается проверка медиазапроса при загрузке страницы
MqCheck();


//image function
if (document.querySelector('.lazy-image')) {
   let lazyImages = document.querySelectorAll('.lazy-image');
   lazyImages.forEach(imgWrapper => {
      let loaded = () => {
         imgWrapper.classList.add("loaded");
      };
      let img = imgWrapper.querySelector('img');
      let src = img.getAttribute('src');
      let smallSrc = src.replace(/\.([^/.]+)$/, "-small.$1")
      imgWrapper.style.backgroundImage = `url("${smallSrc}")`

      if (img.complete) {
         loaded();
      } else {
         img.addEventListener('load', loaded);
      }
   });
};