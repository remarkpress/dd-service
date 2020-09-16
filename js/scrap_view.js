
var view = app.views.current;
var current_page = $$('.page.scrapView')[0].f7Page;
var keyword_id = current_page.route.params.id;  //  넘겨받은 파라미터

//돌아가기
$$('.goBack').on('click', function(){
  //view.router.back(view.history[1],{force:true});
  app.dialog.confirm(
    '저장하지 않고 나갈까요?', 
    function () {
      view.router.back();
    }
  );

});
//키워드 삭제
$$('.fab01 > a').on('click', function(){
  app.dialog.confirm(
    '해당 키워드를 삭제하시겠습니까?', 
    function () {
      $$('.page-previous .lc01 li a[keyword-id="'+keyword_id+'"]').parent().remove();
      view.router.back();
    }
  );

});
//키워드 저장
$$('#save_myrecord').on('submit', function(){
  var formData = app.form.convertToData($$(this));
  alert(JSON.stringify(formData));

  if(keyword_id == "new"){  //신규추가
    //여기에 저장 프로시져


  }else{  //수정
    //여기에 저장 프로시져

  }

  dialog.open();
  setTimeout(function () {
    dialog.close();
    view.router.back();
  }, 2000);

});

var dialog = app.dialog.create({
  text: '변경내용을 저장하였습니다.',
  content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});
