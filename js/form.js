// // 로그인 및 회원가입 관련 코드 다른 곳으전 이전

var view=app.views.current;

//비밀번호 리셋
$$('#reset_form01').on('submit', function(){
  var formData = app.form.convertToData($$(this));
  alert(JSON.stringify(formData));

  dialog2.open();
  setTimeout(function () {
    dialog2.close();
    view.router.back();
  }, 2000);

});
/*
$$('.fill-form-from-data').on('click', function(){
  var formData = {
    'name': 'John',
    'email': 'john@doe.com',
    'gender': 'female',
    'toggle': ['yes'],
  }
  app.form.fillFromData('#my-form', formData);
});
*/

// Create full-layout notification
var notification1 = app.notification.create({
  icon: '<i class="xi-info"></i>',
  title: '로그인',
  //titleRightText: 'now',
  subtitle: '해당 정보를 정확하게 입력해 주세요',
  //text: 'This is a simple notification message',
  closeTimeout: 3000,
});

// 안내 상자
var dialog2 = app.dialog.create({
  text: '이메일로 임시 패스워드를 <br/>보내드렸습니다.'
});
