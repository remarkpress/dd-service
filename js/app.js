
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
          console.log('pageInit');
          var s = document.createElement('script');
          s.src = "js/main.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/book/',
      url: 'html/book.html',
    },
    {
      path: '/scrap/',
      url: 'html/scrap.html',
    },
    {
      path: '/login/',
      url: 'html/login.html',
    },
    {
      path: '/join/',
      url: 'html/join.html',
    },
    {
      path: '/scrap_view/',
      url: 'html/scrap_view.html',
      on: {
        pageInit: function (e, page) {
          console.log('pageInit');
          var s = document.createElement('script');
          s.src = "js/scrap_view.js";
          $$('head').append(s);
        }
      }
    },
  ]
  // ... other parameters
});

//뷰 생성
app.views.create('.view-main', {
  url: '/login/',   //초기 로딩 페이지
});

//하단 탭바
$$('.toolbar-bottom a').on('click', function(){
  $$(this).siblings().removeClass('tab-link-active');
  $$(this).addClass('tab-link-active');
  if($$(this).hasClass('main')) $$(this).parent().parent().addClass('mainMode');
  else $$(this).parent().parent().removeClass('mainMode');
});
//delay time
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

