
var view = app.views.current;

//돌아가기
$$('.page.user .goBack').on('click', function(){
  view.router.back();
});
//이름 수정
$$('.ng06_01 .updateNmae').on('click', function () {
  app.dialog.prompt('변경할 이름을 입력해 주세요', function (name) {
    // 서버에 저장

    $$('.user-sub-navbar01 .title dt').text(name);
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
      view.router.navigate('/login/'); 
    }
  );

});
//계정삭제
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
//메일 주소 복사
$$('.tc04 .btn05').on('click', function(){

  $$(this).siblings('input')[0].select(); 
  document.execCommand('copy');

  dialog.open();
  setTimeout(function () {
    dialog.close();
    view.router.back();
  }, 2000);

});

var dialog = app.dialog.create({
  text: '메일 주소를 복사하였습니다.',
  content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});
