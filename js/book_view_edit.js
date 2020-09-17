var view = app.views.current;
var current_page = $$('.page.bookViewEdit')[0].f7Page;
var book_id = current_page.route.params.id;  //  넘겨받은 파라미터

//돌아가기
$$('.goBack').on('click', function(){
  view.router.back();
});


//키워드 book에 적용
$$('#book_edit_form').on('submit', function(){
  var formData = app.form.convertToData($$(this));

  //변경된 내용을 서버에 저장하는 코드 : 삭제된 아이템과 변경된 순서를 DB에 적용한 후, 새로운 아이템 목록을 조회하여 가져옮

  //변경된 내용을 나의책 보기 슬라이드에 적용하는 코드(https://swiperjs.com/api/ 레퍼런스 참고)
  var swiper = document.querySelector('.page-previous .ib02.swiper-container').swiper;

  //나의 책 슬라이더에 child 추가(실제 코드는 서버에서 조회한 데이터로 생성해야 함)
  for(var id in formData.keyword_id) {
    var keyword = "키워드" + id;  //서버에서 불러온 키워드명
    var question = "마음이 울적할때는 어떤 음악을 듣나요?";  //서버에서 불러온 질문
    var content = "클래식을 추천합니다. 클래식을 추천합니다. 클래식을 추천합니다. ";  //서버에서 불러온 본문
    var img_src = "http://lorempixel.com/400/200/cats";  //서버에서 불러온 이미지 경로
    swiper.appendSlide('<div class="swiper-slide"><div class="cf02 viewer"><dl class="header"><dt><span>'+keyword+'</span></dt><dd>'+question+'</dd></dl><div class="textArea">'+content+'</div><div class="picArea"><img src="'+img_src+'"/></div></div></div>');
  }

  //얼럿
  dialog.open();
  setTimeout(function () {
    dialog.close();
    view.router.back(); //나의 책 보기 화면으로 돌아감
  }, 2000);

});

var dialog = app.dialog.create({
  text: '수정한 사항을 적용 하였습니다.',
  content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});
