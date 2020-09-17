var view = app.views.current;
var current_page = $$('.page.bookView')[0].f7Page;
var book_id = current_page.route.params.id;  //  넘겨받은 파라미터

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
