
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

var swiper = app.swiper.create('.ib01', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: -2,
        depth: 8,
        modifier: 10,
        slideShadows: true,
      },
      on: {
        tap: function () {
          document.querySelector('.swiper-container').classList.add('expanded');
        },
      },
});

var elem = document.querySelector('.ib01 a.close');
if (elem) {
  elem.addEventListener('click', function(){
    document.querySelector('.swiper-slide-active').scrollTop = 0;
    document.querySelector('.swiper-container').classList.remove('expanded');
  })
}

const buttons = document.querySelectorAll(".toolbar-bottom a")
for (const button of buttons) {
    button.addEventListener('click', function(){
      location.href = this.getAttribute('href');
    });
}

