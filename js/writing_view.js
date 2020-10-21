var view = app.views.current;
var current_page = $$('.page.writingView')[0].f7Page;
var writing_id = current_page.route.params.id;  //  넘겨받은 파라미터
// console.log(writing_id);
var myPostShowTemplate = $$('script#my-post-show-template').html();
// console.log(myPostShowTemplate);
var compiledMyPostShowTemplate = Template7.compile(myPostShowTemplate);

if ( writing_id == "new" ) { //신규 책 만들기
  var post = compiledMyPostShowTemplate({post: ''});
  $$('.my_post_show_wrapper').html(post);

  $$('.cf02 .header dt a span').text('+');
  $$('.btnArea').hide();
  $$('#save_writing .btnA').hide();
  $$('#add-writing-name').show();
  $$('#add-writing-name').find("input").focus();

  //$$('textarea.resizable').trigger('change');
  app.input.resizeTextarea("textarea.resizable");

  $$('#save_writing').on('submit', function(event){
    event.preventDefault();
    // console.log('submitted how many?');
    dialog_pending.open();
    var formData = app.form.convertToData($$(this));
    // console.log(writing_id);
    // console.log(formData);
    var data = {
      member_email: localStorage["dd-member-email"],
      member_token: localStorage["dd-member-token"],
      post: {
        title: formData["keyword"],
        body: formData["content"]
      }
    };
    //여기에 저장 프로시져
    var endpoint = endpoint_hostname + '/api/posts'
    app.request.post( endpoint, data, function(data) {
      // console.log(data);
      var response_data = JSON.parse(data);
      // console.log(response_data);
      // console.log(response_data.is_success === true);

      if (response_data.is_success === true) {
        dialog_pending.close();
        dialog.open();
        setTimeout(function () {
          dialog.close();
          view.router.back();
        }, 2000);
      } else {
        dialog_pending.close();
        alert('오류가 있습니다.');
      }
    });
  });

} else {
  var endpoint = endpoint_hostname + '/api/posts/' + writing_id + "/";
  var credentials = JSON.parse(localStorage["dd-member-credentials"]);

  if (localStorage["dd-member-credentials"] === undefined ) {
    view.router.navigate('login');
  }

  app.request.json(endpoint, credentials, function(data){
    // console.log(endpoint);
    var post = compiledMyPostShowTemplate({post: data});
    $$('.my_post_show_wrapper').html(post);

    //$$('textarea.resizable').trigger('change');
    app.input.resizeTextarea("textarea.resizable");

    $$(".picArea img").on('click', function() {
        $$('#writing_image').click();
    });
    $$(".picArea input").on('change', function() {
        readURL(this,$$(this));
    });
    //키워드 저장
    $$('#save_writing').on('submit', function(event){
      event.preventDefault();
      // console.log('submitted how many?');
      dialog_pending.open();
      var formData = app.form.convertToData($$(this));
      // console.log(writing_id);
      // console.log(formData);
      var data = {
        member_email: localStorage["dd-member-email"],
        member_token: localStorage["dd-member-token"],
        post: {
          title: formData["keyword"],
          body: formData["content"]
        }
      };

      //여기에 저장 프로시져
      var endpoint = endpoint_hostname + '/api/posts/' + writing_id
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

          if (response_data.is_success === true) {
            dialog_pending.close();
            dialog.open();
            setTimeout(function () {
              dialog.close();
              view.router.back();
            }, 2000);
          } else {
            dialog_pending.close();
            alert('오류가 있습니다.');
          }
        }
      }
      // console.log(data);
      var parsed_data = JSON.stringify(data);
      // console.log(parsed_data);
      xhr.send(parsed_data);
    });
  });
}

$$('#save_writing .header dt .btn03').on('click', function(){ //신규 책 만들기
  if($$('#add-writing-name').css('display') != 'none')  return false;
  $$('.btnArea').hide();
  $$('#save_writing .btnA').hide();
  $$('#add-writing-name').show();
  $$('#add-writing-name').find("input").val($$('.cf02 .header dt a span').text());
  $$('#add-writing-name').find("input").focus();
});

//새 글 제목 추가/수정 폼
$$("#add-writing-name").on('submit', function(event){
  event.preventDefault();
  var formData = app.form.convertToData($$(this));

  if (formData.writing_name == '') {
    notification1.open();
    $$(this).find("input").focus();
    return false;
  }
  $$('.cf02 .header dt a span').text(formData.writing_name);
  $$('.cf02 .header dt input[name="keyword"]').val(formData.writing_name);

  $$("#add-writing-name").hide();
  $$('.btnArea').show();
  $$('#save_writing .btnA').show();

  return false;
});

//돌아가기
$$('.writingView .goBack').on('click', function(){
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
    '삭제할까요?',
    function () {
      $$('.page-previous .lc01 li a[keyword-id="'+writing_id+'"]').parent().remove();
      view.router.back();
    }
  );

});

var dialog = app.dialog.create({
  text: '기록을 저장했어요.',
  // content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});

var dialog_pending = app.dialog.create({
  text: '기록을 저장중입니다.',
  // content: '<br/><i class="xi-check-circle" style="font-size:40px"></i>',
});
// Create full-layout notification
var notification1 = app.notification.create({
  icon: '<i class="xi-info"></i>',
  title: '글 추가',
  //titleRightText: 'now',
  subtitle: '글 이름을 입력해 주세요',
  //text: 'This is a simple notification message',
  closeTimeout: 3000,
});

//폼에서 이미지 선택
function readURL(input,obj) {
   if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            obj.siblings('em').find('.previewImg').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
//사진추가 버튼
$$(".fab.fab02.fab-right-bottom a.fab-label-button.picture").on('click', function() {
  app.fab.close('.fab.fab02.fab-right-bottom');
  $$('#writing_image').click();
});
//링크추가 버튼
$$(".fab.fab02.fab-right-bottom a.fab-label-button.link").on('click', function () {
  app.fab.close('.fab.fab02.fab-right-bottom');
  app.dialog.prompt('링크할 주소를 입력하세요', function (url) {
    $$('.linkArea a').attr('href',url);
    $$('.linkArea a').text(url);
  },null,$$('.linkArea a').text());
});

