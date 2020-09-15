var view=app.views.current;

//로그인
$$('#login_form').on('submit', function(){
  var formData = app.form.convertToData($$(this));
  //console.log(formData);
  alert(JSON.stringify(formData));
  view.router.navigate('/');  
});
//가입01
$$('#join_form01').on('submit', function(){
  var formData = app.form.convertToData($$(this));
  //console.log(formData);
  alert(JSON.stringify(formData));
  view.router.navigate('/join02/');  
});
//가입02
$$('#join_form02').on('submit', function(){
  var formData = app.form.convertToData($$(this));
  alert(JSON.stringify(formData));
  view.router.navigate('/join03/');  
});
//가입03
$$('#join_form03').on('submit', function(){
  var formData = app.form.convertToData($$(this));
  alert(JSON.stringify(formData));

  dialog.open();
  setTimeout(function () {
    dialog.close();
    view.router.navigate('/');  
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
var dialog = app.dialog.create({
  text: '성공적으로 가입되었습니다.',
  content: '<br/><i class="xi-file-check" style="font-size:40px"></i>',
});
