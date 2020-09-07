
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'DifferentDoors',
  // App id
  id: 'com.myapp.dd',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/',
      url: 'html/main.html',
      on: {
        pageAfterIn: function test (e, page) {
        },
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/main.js";
          $$('head').append(s);
        },
      }
    },
    {
      path: '/like/',
      url: 'html/like.html',
    },
    {
      path: '/login/',
      url: 'html/login.html',
    },
  ]
  // ... other parameters
});

//뷰 생성
app.views.create('.view-main', {
  url: '/'
});

//하단 탭바
$$('.toolbar-bottom a').on('click', function(){
  $$(this).siblings().removeClass('tab-link-active');
  $$(this).addClass('tab-link-active');
});
