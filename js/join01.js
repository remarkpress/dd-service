var view=app.views.current;

//가입01
$$('#join_form01').on('submit', function(){
  var formData = app.form.convertToData($$(this));
  var data = formData;
  var endpoint = endpoint_hostname + '/api/check_email'
  app.request.post(endpoint, data, function(data) {
    var response_data = JSON.parse(data);
    // console.log(response_data.data.email);
    if ( response_data.is_success === true ) {
      view.router.navigate({
        path: '/join02/',
        query: {
          "email": response_data.data.email
        }
      });
    } else {
      dialog_email_unavailable.open();
      setTimeout(function () {
        dialog_email_unavailable.close();
      }, 2000);
    }
  });
});

var dialog_email_unavailable = app.dialog.create({
  text: '사용할 수 없는 이메일입니다.',
  content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});
//돌아가기
$$('.user-navbar .goBack').on('click', function(){
  view.router.back();
});