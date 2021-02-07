var view = app.views.current;
var current_page = $$('.page.bookView')[0].f7Page;
var book_id = current_page.route.params.id;  //  넘겨받은 파라미터
var bookViewTemplate = $$('script#book-view-template').html();
var compiledBookViewTemplate = Template7.compile(bookViewTemplate);

$$(document).mouseup(function(e) {
// var container = $$("#add-book-name");
// if(container.has(e.target).length === 0) {
    if($$('.controls').css('display') == "none"){
      $$('.ib02 .controls').show();
      $$("#add-book-name").hide();
    }
//}
});

if (book_id == "new") { //신규 책 만들기
  var nickname = current_page.route.query.nickname;
  var book_object = compiledBookViewTemplate({nickname: nickname, book: ''});
  $$('.page.bookView').html(book_object);

  $$('.ib02 .swiper-slide:first-child .tc02 dt a').text('');
  $$('#add-book-name').show();
  $$('.ib02 .controls').hide();
  $$('#add-book-name').find("input").focus();

  $$( '.tc02.front > dt a' ).on( 'click', function(event){
    event.stopPropagation();

    // 책생성(1차 제목작성)후에 제목을 수정하려고 할때 책 상세 페이지로 리디렉션 /입구/
    if (localStorage['dd-new-book_id'].length ) {
      dialogLoading.open();
      var new_book_id_to_redirect_to = localStorage['dd-new-book_id'];
      // console.log(new_book_id_to_redirect_to);
      view.router.navigate('/book_view/'+ new_book_id_to_redirect_to  + '/', {
        force: true,
        reloadAll: true,
        ignoreCache: true,
      });
      // return false;
    }

    // console.log('aa');
    $$('#add-book-name').show();
    $$('.ib02 .controls').hide();
    $$('#add-book-name').find("input").val($$(this).text()).focus();
  });

  $$( '#add-book-name' ).on( 'submit', function(event){
    event.preventDefault();
    dialogPending.open();
    var formData = app.form.convertToData($$(this));

    if(formData.book_name == ''){
      dialogEmptyBookTitle.open();
      setTimeout(function () {
        dialogEmptyBookTitle.close();
      }, 1500);
      $$(this).find("input").focus();
      return false;
    }

    $$('.ib02 .swiper-slide:first-child .tc02 dt a').text(formData.book_name);
    $$('.ib02 .controls').show();
    $$("#add-book-name").hide();

    var data = {
      member_email: localStorage["dd-member-email"],
      member_token: localStorage["dd-member-token"],
      book: {
        title: formData.book_name
      }
    };
    // console.log(data);
    var endpoint = endpoint_hostname + '/api/books';
    app.request.post( endpoint, data, function(data) {
      var response_data = JSON.parse(data);
      if (response_data.is_success === true) {
        // console.log(response_data);
        var book = response_data.data.book;
        // console.log(book);
        var new_book_id = response_data.data.book.id;
        // console.log(new_book_id);
        localStorage.setItem('dd-new-book_id', new_book_id);
        // console.log($$('.editBook #populate_button').attr('href') = '/book_view_add/' + book.id );
        $$('.editBook #populate_button').attr('href', '/book_view_add/' + book.id + '/');
        $$('.editBook #arrange_button').attr('href', '/book_view_edit/' + book.id + '/');
        $$('.ib02 .swiper-slide:first-child .tc02 dt a').text(formData.book_name);
        $$('.ib02 .controls').show();
        $$("#add-book-name").hide();
        dialogPending.close();
        // console.log('책 생성 성공');
      } else {
        // $$('.ib02 .controls').show();
        // $$("#add-book-name").hide();
        // console.log('책 생성 실패');
        dialogPending.close();
        dialogFailed.open();
        setTimeout(function () {
          dialogFailed.close();
          view.router.back();
          // view.router.navigate('/book/', {
          //   force: true,
          //   reloadAll: true,
          //   ignoreCache: true,
          // });
        }, 1500);
      }
    });
  });

  //돌아가기
  $$('.bookView .goBack').on('click', function(){
   view.router.navigate('/book/', {
      force: true,
      reloadAll: true,
      ignoreCache: true
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
        // console.log('tap');
        if(this.clickedIndex == 0) {
          //this.slideNext();
        } else if(this.clickedIndex > 0) {
          var keyword_id = $$(this.clickedSlide).find('.cf02').attr('data-item-id');
          view.router.navigate('/writing_view/'+keyword_id+'/');
        }
      },
    }
  });

  // 삭제버튼
  $$('#delete_button').on('click', function(event) {
    event.preventDefault();
    // console.log('delete button clicked');
    app.dialog.confirm(
      '정말로 책을 삭제하시겠습니까?',
      function() {
        dialogDeletePending.open();
        var data = {
          member_email: localStorage["dd-member-email"],
          member_token: localStorage["dd-member-token"]
        };
        // console.log(data);
        if (localStorage["dd-new-book_id"] === undefined) {
          dialogRetry.open();
          setTimeout(function () {
            dialogRetry.close();
            view.router.back();
            // view.router.navigate('/book/', {
            //   force: true,
            //   reloadAll: true,
            //   ignoreCache: true,
            // });
          }, 1500);
        } else {
          var new_book_id = localStorage["dd-new-book_id"];
          var endpoint = endpoint_hostname + '/api/books/' + new_book_id
          // console.log(endpoint);
          var xhr = new XMLHttpRequest();
          xhr.open("DELETE", endpoint);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.onreadystatechange = function () {
            // console.log(this.readyState);
            // console.log(this.status);
            if (this.readyState == 4 && this.status == 200) {
              var response = this.responseText;
              // console.log(response);
              var response_data = JSON.parse(response);
              if (response_data.is_success === true) {
                // $$('.page-previous .lc01 li a[keyword-id="'+writing_id+'"]').parent().remove();
                // console.log('삭제 성공');
                localStorage.removeItem('dd-new-book_id');
                view.router.navigate('/book/', {
                  force: true,
                  reloadAll: true,
                  ignoreCache: true
                });
                dialogDeletePending.close();
              } else {
                localStorage.removeItem('dd-new-book_id');
                dialogDeletePending.close();
                dialogFailed.open();
                setTimeout(function () {
                  dialogFailed.close();
                }, 1500);
              }
            }
          }
          // console.log(data);
          var parsed_data = JSON.stringify(data);
          // console.log(parsed_data);
          xhr.send(parsed_data);
        }
      }
    );
  });
} else { // when book_id is not 'new'
  if (localStorage["dd-member-credentials"] === undefined ) {
    view.router.navigate('login');
  } else {
    var credentials = JSON.parse(localStorage["dd-member-credentials"]);
  }

  if (dialogLoading !== undefined) {
    dialogLoading.close();
  }

  var endpoint = endpoint_hostname + '/api/books/' + book_id;
  app.request.json(endpoint, credentials, function(data){
    dialogLoading.close();
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
          //console.log('tap', $$(this.clickedSlide));
          if(this.clickedIndex == 0) {
            //this.slideNext();
          }else if(this.clickedIndex > 0){
            var keyword_id = $$(this.clickedSlide).find('.cf02').attr('data-item-id');
            // console.log(keyword_id);
            view.router.navigate('/writing_view/'+keyword_id+'/');
          }
        },
      }
    });

    // 책생성(1차 제목작성)후에 제목을 수정하려고 할때 책 상세 페이지로 리디렉션 /출구/
    if (localStorage["dd-new-book_id"] === book_id) {
      // console.log(localStorage["dd-new-book_id"]);
      var persisting_book_title = data.book.title;
      // console.log(persisting_book_title);
      $$('form#add-book-name').find('input[name=book_name]').removeAttr('placeholder');
      $$('form#add-book-name').find('input[name=book_name]').val(persisting_book_title);
      $$('.ib02 .swiper-slide:first-child .tc02 dt a').text('');
      $$('#add-book-name').show();
      $$('.ib02 .controls').hide();
      $$('#add-book-name').find("input").focus();
      localStorage.removeItem('dd-new-book_id');
    }

    $$( '.tc02.front > dt a' ).on( 'click', function(event){
      event.stopPropagation();
      // console.log('aa');
      $$('#add-book-name').show();
      $$('.ib02 .controls').hide();
      $$('#add-book-name').find("input").val($$(this).text()).focus();
      $$('.ib02 .swiper-slide:first-child .tc02 dt a').text('');
      $$('#add-book-name').off('submit');
    });

    $$('#add-book-name').off('submit');
    // $$( '#add-book-name' ).on( 'submit', function(event){
    $$( document ).on( 'submit', '#add-book-name', function(event){
      event.preventDefault();
      dialogPending.open();
      var formData = app.form.convertToData($$(this));
      if(formData.book_name == ''){
        dialogEmptyBookTitle.open();
        setTimeout(function () {
          dialogEmptyBookTitle.close();
        }, 1500);
        $$(this).find("input").focus();
        return false;
      }
      $$('.ib02 .swiper-slide:first-child .tc02 dt a').text(formData.book_name);
      $$('.ib02 .controls').show();
      $$("#add-book-name").hide();

      var data = {
        member_email: localStorage["dd-member-email"],
        member_token: localStorage["dd-member-token"],
        book: {
          title: formData.book_name
        }
      };
      // console.log(data);
      var endpoint = endpoint_hostname + '/api/books/' + book_id
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", endpoint);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        // console.log(this.readyState);
        // console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
          var response = this.responseText;
          // console.log(response);
          var response_data = JSON.parse(response);
          // console.log(response_data);
          if (response_data.is_success === true) {
            // console.log('book title updated successfully');
            // view.router.navigate('/book_view/'+book_id+'/');
            dialogPending.close();
            return false;
          } else {
            $$('.ib02 .controls').show();
            $$("#add-book-name").hide();
            dialogPending.close();
            alert('오류가 있습니다.');
          }
        }
      }
      // console.log(data);
      var parsed_data = JSON.stringify(data);
      // console.log(parsed_data);
      xhr.send(parsed_data);
    });

    //돌아가기
    $$('.bookView .goBack').on('click', function(){
      setTimeout(function(){
        $$('.toolbar-bottom').show();
      },800);
       view.router.navigate('/book/', {force: true});
    });

    $$('#delete_button').on('click', function(event) {
      event.preventDefault;
      // console.log('delete button clicked');
      app.dialog.confirm(
        '정말로 책을 삭제하시겠습니까?',
        function() {
          dialogDeletePending.open();
          var data = {
            member_email: localStorage["dd-member-email"],
            member_token: localStorage["dd-member-token"]
          };
          // console.log(data);
          var endpoint = endpoint_hostname + '/api/books/' + book_id
          // console.log(endpoint);
          var xhr = new XMLHttpRequest();
          xhr.open("DELETE", endpoint);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.onreadystatechange = function () {
            // console.log(this.readyState);
            // console.log(this.status);
            if (this.readyState == 4 && this.status == 200) {
              var response = this.responseText;
              // console.log(response);
              var response_data = JSON.parse(response);
              if (response_data.is_success === true) {
                // $$('.page-previous .lc01 li a[keyword-id="'+writing_id+'"]').parent().remove();
                // console.log('삭제 성공');
                view.router.navigate('/book/', {
                  force: true,
                  reloadAll: true,
                  ignoreCache: true
                });
                dialogDeletePending.close();
              } else {
                dialogDeletePending.close();
                dialogRetry.open();
                setTimeout(function () {
                  dialogRetry.close();
                }, 1500);
                return false;
              }
            }
          }
          // console.log(data);
          var parsed_data = JSON.stringify(data);
          // console.log(parsed_data);
          xhr.send(parsed_data);
        }
      )
    });
  });
}

var dialogEmptyBookTitle = app.dialog.create({
  text: '노트 이름을 입력해 주세요'
});

var dialogPending = app.dialog.create({
  text: '책을 저장중입니다.'
});

var dialogDeletePending = app.dialog.create({
  text: '책을 삭제중입니다.'
});

var dialogFailed = app.dialog.create({
  text: '오류가 있습니다.'
})

var dialogRetry = app.dialog.create({
  text: '다시 시도해주세요.'
})

var dialogLoading = app.dialog.create({
  text: '로딩중입니다.'
})
