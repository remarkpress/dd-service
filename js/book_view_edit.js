var view = app.views.current;
var current_page = $$('.page.bookViewEdit')[0].f7Page;
var book_id = current_page.route.params.id;  //  넘겨받은 파라미터

var bookViewEditTemplate = $$('script#book-view-edit-template').html();
var compiledBookViewEditTemplate = Template7.compile(bookViewEditTemplate);

var endpoint = endpoint_hostname + '/api/books/' + book_id;
// console.log(endpoint);
if (localStorage["dd-member-credentials"] === undefined ) {
  view.router.navigate('login');
} else {
  var credentials = JSON.parse(localStorage["dd-member-credentials"]);
}

app.request.json(endpoint, credentials, function(data){
  var book = data.book;
  // console.log(book);
  // console.log(book.chapters.length);

  if (book.chapters.length > 0) {
    var book_template = compiledBookViewEditTemplate({book: book});
    // console.log(book);
    $$('.page.bookViewEdit .page-content.view-add-content').html(book_template);

    //돌아가기
    $$('.goBack').on('click', function(){
      view.router.back();
    });
    // // 순서변경액션
    // $$('.sortable').on('sortable:sort', function(e) {
    //   console.log(e);
    // });

    //키워드 book에 적용
    $$('#book_edit_form').on('submit', function(e) {
      dialog_pending.open();
      var components = $$(this).find('li.swipeout');
      var order_data = [];

      for (var i = components.length - 1; i >= 0; i--) {
        // console.log(components[i]);
        var dummy = document.createElement('html');
        dummy.innerHTML = components[i].innerHTML;
        var post_id = $$(dummy).find('input.order_input').val();
        // console.log(post_id);
        var data_pair = {post_id: post_id, order: i};
        // console.log(data_pair);
        order_data.push(data_pair);
      }
      // console.log(order_data);
      var data = {
        member_email: localStorage["dd-member-email"],
        member_token: localStorage["dd-member-token"],
        order_data: order_data,
      };
      // console.log(data);
      var endpoint = endpoint_hostname + '/api/books/' + book_id + '/arrange_order/';
      //변경된 내용을 서버에 저장하는 코드 : 삭제된 아이템과 변경된 순서를 DB에 적용한 후, 새로운 아이템 목록을 조회하여 가져옮
      app.request.post(endpoint, data, function(data) {
        var response_data = JSON.parse(data);
        if (response_data.is_success === true) {
          //변경된 내용을 나의책 보기 슬라이드에 적용하는 코드(https://swiperjs.com/api/ 레퍼런스 참고)
          var swiper = document.querySelector('.page-previous .ib02.swiper-container').swiper;
          swiper.removeAllSlides();
          var book = response_data.data.book;
          // console.log(book);
          var book_title = book.title;
          var nickname = response_data.data.nickname;

          swiper.prependSlide('<div class="swiper-slide"><dl class="tc02"><dt><a href="#">'+book_title+'</a></dt><dd>'+nickname+'</dd></dl></div>');
          //나의 책 슬라이더에 child 추가(실제 코드는 서버에서 조회한 데이터로 생성해야 함)
          for(var index in book.chapters) {
            var keyword = book.chapters[index].post.title;
            var question = book.chapters[index].post.question;
            var content = book.chapters[index].post.body;
            var img_src = "";  //서버에서 불러온 이미지 경로
            swiper.appendSlide('<div class="swiper-slide"><div class="cf02 viewer"><dl class="header"><dt><span>'+keyword+'</span></dt><dd>'+question+'</dd></dl><div class="textArea">'+content+'</div><div class="picArea"><img src="'+img_src+'"/></div></div></div>');
          }

          //얼럿
          dialog_pending.close();
          dialog.open();
          setTimeout(function () {
            dialog.close();
            view.router.back(); //나의 책 보기 화면으로 돌아감
          }, 2000);
        } else {
          alert('오류가 있습니다.');
        }
      });
    });
  } else {
    // view.router.back('/books/' + book_id, {force: true});
    dialog_empty_posts.open();
    setTimeout(function () {
      dialog_empty_posts.close();
      view.router.back(); //나의 책 보기 화면으로 돌아감
    }, 2000);
  }
});

var dialog = app.dialog.create({
  text: '수정한 사항을 적용 하였습니다.',
  content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});
var dialog_pending = app.dialog.create({
  text: '수정한 사항을 적용중입니다.',
  content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});
var dialog_empty_posts = app.dialog.create({
  text: '글이 없습니다.',
  content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});
