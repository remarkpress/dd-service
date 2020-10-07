var view = app.views.current;
var current_page = $$('.page.bookViewAdd')[0].f7Page;
var book_id = current_page.route.params.id;  //  넘겨받은 파라미터

var bookViewAddTemplate = $$('script#book-view-add-template').html();
var compiledBookViewAddTemplate = Template7.compile(bookViewAddTemplate);

var endpoint = endpoint_hostname + '/api/books/' + book_id + '/available_posts/';
// console.log(endpoint);
if (localStorage["dd-member-credentials"] === undefined ) {
  view.router.navigate('login');
} else {
  var credentials = JSON.parse(localStorage["dd-member-credentials"]);
}

app.request.json(endpoint, credentials, function(data){
  // console.log(data);
  var post_list = compiledBookViewAddTemplate({posts: data});
  // console.log(post_list);
  $$('.page.bookViewAdd').html(post_list);

  //돌아가기
  $$('.goBack').on('click', function(){
    view.router.back();
  });

  //키워드 book에 추가
  $$('#book_add_form').on('submit', function(){
    var formData = app.form.convertToData($$(this));
    //변경된 내용을 서버에 저장하는 코드 : 추가된 아이템을 DB에 적용한 후, 새로운 아이템 목록을 조회하여 가져옮
    var data = {
      member_email: localStorage["dd-member-email"],
      member_token: localStorage["dd-member-token"],
      formData
    };
    // console.log(data);
    var endpoint = endpoint_hostname + '/api/books/' + book_id + '/populate/';

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
          //$$('.page-previous .ib02 .swiper-wrapper').append('<div class="swiper-slide"><div class="cf02 viewer"><dl class="header"><dt><span>'+keyword+'</span></dt><dd>'+question+'</dd></dl><div class="textArea">'+content+'</div><div class="picArea"><img src="'+img_src+'"/></div></div></div>');
        }
        //swiper.update();
        //swiper.pagination.update();
        //swiper.navigation.update();

        //얼럿
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
});

var dialog = app.dialog.create({
  text: '선택한 키워드를 추가 하였습니다.',
  content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});
