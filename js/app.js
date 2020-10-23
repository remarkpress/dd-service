
var $$ = Dom7;

var app = new Framework7({
  view: {
    iosDynamicNavbar: false,
  },
  // App root element
  root: '#app',
  // App Name
  name: 'DifferentDoors',
  // App id
  id: 'com.myapp.dd',
  theme: 'ios',
  // Enable swipe panel
  panel: {
  //  swipe: 'left',
  },
  dialog: {
    buttonOk: '예',
    buttonCancel: '아니오'
  },
  // Add default routes
  routes: [
    {
      path: '/',
      url: 'html/main.html',
      options: {
        transition: 'f7-fade',
      },
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/main.js";
          $$('head').append(s);
        },
        pageBeforeOut: function(e, page) {
          $$('.page.main').remove();
        }
      }
    },
    {
      path: '/book/',
      url: 'html/book.html',
      options: {
        transition: 'f7-fade',
      },
      on: {
        pageBeforeOut: function(e, page) {
          $$('.page.book').remove();
        },
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/book.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/writing/',
      url: 'html/writing.html',
      options: {
        transition: 'f7-fade',
      },
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/writing.js";
          $$('head').append(s);
        },
        pageBeforeOut: function(e, page) {
          $$('.page.writing').remove();
        }
      }
    },
    {
      path: '/user/',
      url: 'html/user.html',
      options: {
        transition: 'f7-fade',
      },
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
      url: 'html/user.html',
      options: {
        transition: 'f7-fade',
      },
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/user_question.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/user_account/',
      url: 'html/user.html',
      options: {
        transition: 'f7-fade',
      },
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/user_account.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/user_about/',
      url: 'html/user_about.html',
      options: {
        transition: 'f7-fade',
      },
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/user_static.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/user_contact/',
      url: 'html/user_contact.html',
      options: {
        transition: 'f7-fade',
      },
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/user_static.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/login/',
      url: 'html/login.html',
      options: {
        transition: 'f7-fade',
      },
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/login.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/join01/',
      url: 'html/join01.html',
      options: {
        transition: 'f7-fade',
      },
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/join01.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/join02/',
      url: 'html/join02.html',
      options: {
        transition: 'f7-fade',
      },
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/join02.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/join03/',
      url: 'html/join03.html',
      options: {
        transition: 'f7-fade',
      },
      on: {
        pageInit: function (e, page) {
          var s = document.createElement('script');
          s.src = "js/join03.js";
          $$('head').append(s);
        }
      }
    },
    {
      path: '/reset/',
      url: 'html/reset_password.html',
      options: {
        transition: 'f7-fade',
      },
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
      options: {
        transition: 'f7-fade',
      },
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
      options: {
        transition: 'f7-fade',
      },
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

var endpoint_hostname = 'http://differentdoors.durumi.io';
// var endpoint_hostname = 'http://localhost:3000';

//뷰 생성
if (localStorage["dd-member-credentials"] === undefined ) {
  app.views.create('.view-main', {
    url: '/login/',   //초기 로딩 페이지
  });
} else {
  app.views.create('.view-main', {
    url: '/',   //초기 로딩 페이지
  });
}

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

