var view = app.views.current;
// var current_path = view.router.history[view.router.history.length - 1];
// console.log(current_path);
var userTemplate = $$('script#user-account-template').html();
var endpoint = endpoint_hostname + '/api/member';
// console.log(userTemplate);
// console.log(endpoint);
var compiledUserTemplate = Template7.compile(userTemplate);

if (localStorage["dd-member-credentials"] === undefined ) {
  view.router.navigate('login');
} else {
  var credentials = JSON.parse(localStorage["dd-member-credentials"]);
}

app.request.json(endpoint, credentials, function(data){
  // console.log(data);
  var user = compiledUserTemplate({user: data});
  $$('.page.user').html(user);

  //// 돌아가기
  // console.log($$('.page.user .goBack'));
  // console.log(view.router.back());
  $$('.page.user .goBack').on('click', function(){
    // view.router.back();
    view.router.back('/user/', {force: true});
  });

  // 이름 수정
  $$('.ng06_01 .updateNmae').on('click', function () {
    app.dialog.prompt('이름을 적어주세요', function (name) {
      // 서버에 저장
      var data = {
        member_email: localStorage["dd-member-email"],
        member_token: localStorage["dd-member-token"],
        name: name
      };
      var endpoint = endpoint_hostname + '/api/update_nickname/'
      // console.log(data);
      // console.log(endpoint);
      app.request.post(endpoint, data, function (data) {
        var response_data = JSON.parse(data);
        if (response_data.is_success === true) {
          $$('.user-sub-navbar01 .title dt').text(name);
        } else {
          // console.log('failed');
          // console.log(response_data);
          if (response_data.data.error === 'taken') {
            alert('이미 존재하는 이름입니다');
          } else {
            alert('오류가 있습니다. 다시 시도해주세요.');
          }
        }
      });
    });
  });
  // Password
  $$('.ng06_01 .updatePassword').on('click', function () {
    app.dialog.password('새로운 비밀번호를 입력해 주세요.', function (password) {
      // 서버에 저장

      app.dialog.alert('다음 비밀번호로 변경되었습니다 :' + password);
    });
  });
  //로그아웃
  $$('.ng06_01 .logout').on('click', function(){
    app.dialog.confirm(
      '로그아웃 하시겠습니까?',
      function () {
        //로그아웃 처리 코드
        localStorage.removeItem('dd-member-credentials');
        localStorage.removeItem('dd-member-email');
        localStorage.removeItem('dd-member-token');

        view.router.navigate('/login/');
      }
    );

  });
  // 계정삭제
  $$('.ng06_01 .deleteAccount').on('click', function(){
    app.dialog.confirm(
      '계정과 함께 지금까지 작성했던 <br/>모든 데이터가 사라져요. <br/>그래도 삭제하시겠어요? ',
      function () {
        //계정삭제 처리 코드

        app.dialog.alert('계정이 삭제되었습니다.<br/>이용해 주셔서 감사합니다!');
        view.router.navigate('/login/');
      }
    );

  });
});
