var view=app.views.current;
var current_join_page = $$('.page.join')[$$('.page.join').length -1 ].f7Page;
var params = current_join_page.route.query;
var email = params.email;
// console.log(email);

//가입02
$$('#join_form02').on('submit', function(){
  var formData = app.form.convertToData($$(this));
  var data = formData;
  // console.log(data);
  var endpoint = endpoint_hostname + '/api/check_nickname'
  app.request.post(endpoint, data, function(data) {
    var response_data = JSON.parse(data);
    // console.log(response_data);
    if ( response_data.is_success === true ) {
      view.router.navigate({
        path: '/join03/',
        query: {
          "email": email,
          "nickname": response_data.data.nickname
        }
      });
    } else {
      dialog_nickname_unavailable.open();
      setTimeout(function () {
        dialog_nickname_unavailable.close();
      }, 2000);
    }
  });
});

var dialog_nickname_unavailable = app.dialog.create({
  text: '사용할 수 없는 이름입니다.',
  content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});

//돌아가기
$$('.user-navbar .goBack').on('click', function(){
  view.router.back();
});