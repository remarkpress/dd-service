var view = app.views.current;
var current_page = $$('.page.bookView')[0].f7Page;
var book_id = current_page.route.params.id;  //  넘겨받은 파라미터

if(book_id == "new"){ //신규 책 만들기
  $$('.ib02 .swiper-slide:first-child .tc02 dt a').text('(책 이름을 입력해 주세요)');
  $$('#add-book-name').show();
  $$('#add-book-name').find("input").focus();
}

var swiper = new Swiper('.ib02.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    init: function () {
      console.log('book swiper created');
    },
    tap: function () {
      if(this.clickedIndex == 0)  this.slideNext();
      else if(this.clickedIndex > 0){
        var keyword_id = $$(this.clickedSlide).find('.cf02').attr('data-item-id');
        view.router.navigate('/writing_view/'+keyword_id+'/'); 
      }
    },
  }
});

//돌아가기
$$('.bookView .goBack').on('click', function(){
  view.router.back();
});

//새 노트 제목 추가
$$("#add-book-name").submit(function(event){
  event.preventDefault();
  var formData = app.form.convertToData($$(this));

  if(formData.book_name == ''){
    notification1.open();
    $$(this).find("input").focus();
    return false;
  }
  $$('.ib02 .swiper-slide:first-child .tc02 dt a').text(formData.book_name);

  $$("#add-book-name").hide();
  return false;
});
// Create full-layout notification
var notification1 = app.notification.create({
  icon: '<i class="xi-info"></i>',
  title: '노트 추가',
  //titleRightText: 'now',
  subtitle: '노트 이름을 입력해 주세요',
  //text: 'This is a simple notification message',
  closeTimeout: 3000,
});
