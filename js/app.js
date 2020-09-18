
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
        }
      }
    },
    {
      path: '/book/',
      url: 'html/book.html',
    },
    {
      path: '/writing/',
      url: 'html/writing.html',
    },
    {
      path: '/user/',
      url: 'html/user.html',
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/user.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/user_question/',
      url: 'html/user_question.html',
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/user.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/user_account/',
      url: 'html/user_account.html',
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/user.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/user_about/',
      url: 'html/user_about.html',
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/user.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/user_contact/',
      url: 'html/user_contact.html',
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/user.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/login/',
      url: 'html/login.html',
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/form.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/join01/',
      url: 'html/join01.html',
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/form.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/join02/',
      url: 'html/join02.html',
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/form.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/join03/',
      url: 'html/join03.html',
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/form.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/reset/',
      url: 'html/reset_password.html',
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/form.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/writing_view/:id/',
      url: 'html/writing_view.html',
      options: {
        transition: 'f7-dive',
      },      
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/writing_view.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/book_view/:id/',
      url: 'html/book_view.html',
      options: {
        transition: 'f7-dive',
      },      
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/book_view.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/book_view_add/:id/',
      url: 'html/book_view_add.html',
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/book_view_add.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/book_view_edit/:id/',
      url: 'html/book_view_edit.html',
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/book_view_edit.js";
          $$('head').append(s);
        }
      }
    },
  ]
});


//뷰 생성
app.views.create('.view-main', {
  url: '/login/',   //초기 로딩 페이지
//  url: '/book_view_add/0/',
//  url: '/',
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

