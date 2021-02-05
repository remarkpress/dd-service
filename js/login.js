var view=app.views.current;
var current_page = $$('.page.login')[$$('.page.login').length -1 ].f7Page;
var params = current_page.route.query;
var email = params.email;

//로그인
$$('#login_form').on('submit', function(){
  var formData = app.form.convertToData($$(this));
  var endpoint = endpoint_hostname + '/api/sign_in'
  // console.log(endpoint);
  var data = {
    sign_in: {
      email: email,
      password: formData["sign_in[password]"]
    }
  }

  app.request.post(endpoint, data, function(data) {
    var response_data = JSON.parse(data);
    // console.log(response_data);
    if ( response_data.is_success === true ) {
      var email = response_data.data.member.email;
      var token = response_data.data.member.authentication_token;

      localStorage.removeItem('dd-member-credentials');
      localStorage.setItem('dd-member-credentials', JSON.stringify({ member_email: email, member_token: token }));
      localStorage.setItem('dd-member-email', email);
      localStorage.setItem('dd-member-token', token);
      // $$('.page.login').remove();
      view.router.navigate({
        path: '/',
        params: {
          token: token
        }
      });
    } else {
      dialog_failed_login.open();
      setTimeout(function () {
        dialog_failed_login.close();
        view.router.back();
      }, 2000);
    }
  });
});

// Create full-layout notification
var notification1 = app.notification.create({
  icon: '<i class="xi-info"></i>',
  title: '로그인',
  //titleRightText: 'now',
  subtitle: '해당 정보를 정확하게 입력해 주세요',
  //text: 'This is a simple notification message',
  closeTimeout: 3000,
});

var dialog_failed_login = app.dialog.create({
  text: '로그인에 실패했습니다.'
});
