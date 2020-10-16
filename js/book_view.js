var view = app.views.current;
var current_page = $$('.page.bookView')[0].f7Page;
var book_id = current_page.route.params.id;  //  넘겨받은 파라미터
var bookViewTemplate = $$('script#book-view-template').html();
var compiledBookViewTemplate = Template7.compile(bookViewTemplate);

if (book_id == "new") { //신규 책 만들기
  var nickname = current_page.route.query.nickname;
  var book_object = compiledBookViewTemplate({nickname: nickname, book: ''});
  $$('.page.bookView').html(book_object);

  $$('.ib02 .swiper-slide:first-child .tc02 dt a').text('');
  $$('#add-book-name').show();
  $$('.ib02 .controls').hide();
  $$('#add-book-name').find("input").focus();

  //돌아가기
  $$('.bookView .goBack').on('click', function(){
    view.router.back();
  });

  //새 노트 제목 추가
  $$("#add-book-name").on('submit', function(event){
    event.preventDefault();
    var formData = app.form.convertToData($$(this));

    if(formData.book_name == ''){
      notification1.open();
      $$(this).find("input").focus();
      return false;
    }

    var endpoint = endpoint_hostname + '/api/books';
    var data = {
      member_email: localStorage["dd-member-email"],
      member_token: localStorage["dd-member-token"],
      book: {
        title: formData.book_name
      }
    };
    // console.log(data);
    app.request.post( endpoint, data, function(data) {
      var response_data = JSON.parse(data);

      if (response_data.is_success === true) {
        // console.log(response_data);
        var book = response_data.data.book;
        // console.log(book);

        // console.log($$('.editBook #populate_button').attr('href') = '/book_view_add/' + book.id );
        $$('.editBook #populate_button').attr('href', '/book_view_add/' + book.id + '/');
        $$('.editBook #arrange_button').attr('href', '/book_view_edit/' + book.id + '/');
        $$('.ib02 .swiper-slide:first-child .tc02 dt a').text(formData.book_name);
        $$('.ib02 .controls').show();
        $$("#add-book-name").hide();
        return false;
      } else {
        alert('오류가 있습니다.');
      }
    });
  });

  var swiper = new Swiper('.ib02.swiper-container', {
    zoom: true,
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
        console.log('tap');
        if(this.clickedIndex == 0) {
          this.slideNext();
        } else if(this.clickedIndex > 0) {
          var keyword_id = $$(this.clickedSlide).find('.cf02').attr('data-item-id');
          view.router.navigate('/writing_view/'+keyword_id+'/');
        }
      },
    }
  });
} else {
  var endpoint = endpoint_hostname + '/api/books/' + book_id;

  if (localStorage["dd-member-credentials"] === undefined ) {
    view.router.navigate('login');
  } else {
    var credentials = JSON.parse(localStorage["dd-member-credentials"]);
  }

  app.request.json(endpoint, credentials, function(data){
    // console.log(data);
    var book_object = compiledBookViewTemplate({book: data.book, nickname: data.nickname});
    // console.log(data.nickname);
    $$('.page.bookView').html(book_object);

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
          // console.log('tap', $$(this.clickedSlide));
          if(this.clickedIndex == 0)  this.slideNext();
          else if(this.clickedIndex > 0){
            var keyword_id = $$(this.clickedSlide).find('.cf02').attr('data-item-id');
            // console.log(keyword_id);
            view.router.navigate('/writing_view/'+keyword_id+'/');
          }
        },
      }
    });
    //돌아가기
    $$('.bookView .goBack').on('click', function(){
      view.router.back();
    });
  });
}

// Create full-layout notification
var notification1 = app.notification.create({
  icon: '<i class="xi-info"></i>',
  title: '노트 추가',
  //titleRightText: 'now',
  subtitle: '노트 이름을 입력해 주세요',
  //text: 'This is a simple notification message',
  closeTimeout: 3000,
});
