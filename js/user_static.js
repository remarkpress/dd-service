var view = app.views.current;

//돌아가기
$$('.page.user .goBack').on('click', function(){
  // view.router.back();
  view.router.back('/user/', {force: true});
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
  text: '메일 주소를 복사하였습니다.'
});
