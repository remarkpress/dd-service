var view=app.views.current;
var current_join_page = $$('.page.join')[$$('.page.join').length -1 ].f7Page;

var params = current_join_page.route.query;
var email = params.email;

//가입02
$$('#join_form02').on('submit', function(){
  var formData = app.form.convertToData($$(this));

  view.router.navigate({path: '/join03/',
    query: {
      "email": email,
      formData
    }
  });
});
