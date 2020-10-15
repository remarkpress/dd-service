var view=app.views.current;
var current_join_page = $$('.page.join')[$$('.page.join').length -1 ].f7Page;
var params = current_join_page.route.query;
var email = params.email;
var nickname = params.nickname;

//가입03
$$('#join_form03').on('submit', function(){
  var formData = app.form.convertToData($$(this));
  var data = {
    member: {
      email: email,
      nickname: nickname,
      password: formData['password'],
      password_confirmation: formData['password2']
    }
  }
  // console.log(data);
  var endpoint = endpoint_hostname + '/api/sign_up'
  app.request.post(endpoint, data, function(data) {
    var response_data = JSON.parse(data);
    // console.log(response_data);
    if ( response_data.is_success === true ) {
      dialog.open();
      setTimeout(function () {
        dialog.close();
        view.router.navigate('/login/');
      }, 2000);
    } else {
      dialog_failed.open();
      setTimeout(function () {
        dialog_failed.close();
        view.router.navigate('/join01/', {force: true});
      }, 2000);
    }
  });
});

var dialog = app.dialog.create({
  text: '성공적으로 가입되었습니다.',
  content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});

var dialog_failed = app.dialog.create({
  text: '오류가 있습니다. 처음부터 다시 진행해주세요.',
  content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});

//돌아가기
$$('.user-navbar .goBack').on('click', function(){
  view.router.back();
});