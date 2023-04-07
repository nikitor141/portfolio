if (document.querySelectorAll('.slider').length > 0) {

   document.querySelectorAll('.slider').forEach(slider => {

      if (document.documentElement.clientWidth <= 1024) {
         slider.dataset.visible = 1
      }
      let slidesVisible = +slider.dataset.visible;
      let index = slider.dataset.infinite == 'true' ? -slidesVisible : 0;
      let track = slider.querySelector('.slider__track');
      let slides = slider.getElementsByClassName('slider__slide');
      let slideWidth = slider.querySelector('.slider__wrapper').offsetWidth / slidesVisible;
      for (const item of slides) {
         item.style.width = slideWidth + 'px';
         if (slidesVisible == 1) item.style.padding = 0;
      }

      window.addEventListener('resize', () => {
         slidesVisible = +slider.dataset.visible;
         index = slider.dataset.infinite == 'true' ? -slidesVisible : 0;
         track = slider.querySelector('.slider__track');
         slides = slider.getElementsByClassName('slider__slide');
         slideWidth = slider.querySelector('.slider__wrapper').offsetWidth / slidesVisible;
         for (const item of slides) {
            item.style.width = slideWidth + 'px';
            if (slidesVisible == 1) item.style.padding = 0;
         }
         track.style.width = slideWidth * slides.length + 'px';
         track.style.left = slideWidth * index + 'px';
      });

      //infinite
      if (slider.dataset.infinite == 'true') {

         for (let i = 0; i < slidesVisible; i++) {
            let clone = slides[slides.length - 1 - i].cloneNode(true);
            track.prepend(clone);
            console.log()
         }
         for (let i = 0; i < slidesVisible; i++) {

            let clone = slides[i + slidesVisible].cloneNode(true);
            track.appendChild(clone);
            console.log(clone)
         }

         track.addEventListener('transitionend', () => {
            //prev
            if (Math.abs(index) == 0) {
               index = -(slides.length - slidesVisible) + +slidesVisible;
               track.style.left = slideWidth * index + 'px';
            }
            //next
            if (Math.abs(index) >= slides.length - slidesVisible) {
               index = -slidesVisible;
               track.style.left = slideWidth * index + 'px';

            }

         });

      }
      //------
      track.style.width = slideWidth * slides.length + 'px';
      track.style.left = slideWidth * index + 'px';

      //dots
      if (slider.querySelector('.slider__dots')) {

         let dotsContainer = slider.querySelector('.slider__dots');


         // creating dots and add active to first dot -------------------------
         for (i = 0; i < slides.length - slidesVisible * 2; i++) {
            let sliderDot = document.createElement('button');
            sliderDot.classList.add('slider__dot')
            dotsContainer.append(sliderDot)
         }
         let dots = slider.querySelectorAll('.slider__dot');
         dots[0].classList.add('active');
         // -------------------------------------------------------------------

         let dotsHeight = dotsContainer.offsetHeight;
         slider.querySelectorAll('.slider__control').forEach(item => item.style.top = `calc(50% - ${dotsHeight}px)`)

         dots.forEach((dotItem, dotIndex) => {
            dotItem.addEventListener('click', () => {
               if (!track.classList.contains('_shifting') && !dotItem.classList.contains('active')) {
                  anim(300)
                  dotFunc(dotIndex)
                  console.log(index, dotIndex)
                  dots.forEach(item => item.classList.remove('active'));
                  dots[Math.abs(index)].classList.add('active')
               }
            });
         });
      }
      //click events
      slider.addEventListener('click', e => {

         if (!track.classList.contains('_shifting')) {

            if (e.target.closest('.slider__control--prev')) {
               prev();
            }
            if (e.target.closest('.slider__control--next')) {
               next();
            }

            if (slider.querySelector('.slider__dots')) {
               let dots = slider.querySelectorAll('.slider__dot');
               dots.forEach(item => item.classList.remove('active'));
               dots[Math.abs(index)].classList.add('active');
            }
         }


      });

      let dotFunc = (dotIndex) => {
         index = -dotIndex;
         track.style.left = slideWidth * index + 'px';
      }

      let anim = (duration = 500) => {
         track.classList.add('_shifting');
         track.style.transitionProperty = 'left';
         track.style.transitionDuration = duration + 'ms';

         track.addEventListener('transitionend', () => {
            track.style.removeProperty('transition-property');
            track.style.removeProperty('transition-duration');
            track.classList.remove('_shifting');
         });

      }

      let prev = () => {

         if (Math.abs(index) <= 0) {
            if (!slider.dataset.infinite == 'true') {
               anim(300);
               track.style.left = slideWidth * -(slides.length - slidesVisible) + 'px';
               index = -(slides.length - slidesVisible);
            }
         } else {
            anim(300);
            track.style.left = slideWidth * ++index + 'px';
         }
      }

      let next = () => {
         if (Math.abs(index) >= slides.length - slidesVisible) {
            if (!slider.dataset.infinite == 'true') {
               anim(300);
               track.style.left = 0;
               index = 0
            }
         } else {
            anim(300);
            track.style.left = slideWidth * --index + 'px';
         }
      }



   });
}