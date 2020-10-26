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
    var email = response_data.data.member.email;
    var token = response_data.data.member.authentication_token;

    if ( response_data.is_success === true ) {
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
      alert('오류가 있습니다.');
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
