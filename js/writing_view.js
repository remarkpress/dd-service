if (localStorage["dd-member-credentials"] === undefined ) {
  view.router.navigate('login');
}

var view = app.views.current;
var current_page = $$('.page.writingView')[0].f7Page;
var last_path = view.router.history[view.router.history.length - 2];
// console.log(last_path);
// console.log(last_path.includes("/book_view/"));
var writing_id = current_page.route.params.id;  //  넘겨받은 파라미터
// console.log(writing_id);
var myPostShowTemplate = $$('script#my-post-show-template').html();
// console.log(myPostShowTemplate);
var compiledMyPostShowTemplate = Template7.compile(myPostShowTemplate);
var credentials = JSON.parse(localStorage["dd-member-credentials"]);

if ( writing_id == "new" ) { //신규 책 만들기
  var post = compiledMyPostShowTemplate({post: ''});
  $$('.my_post_show_wrapper').html(post);

  // $$('.cf02 .header dt a span').text('+');
  $$('.btnArea').hide();
  $$('#save_writing .btnA').hide();
  $$('#add-writing-name').show();

  window.setTimeout(function(){
    $$('#add-writing-name').find("input").focus();
    //document.querySelector('#add-writing-name input').select();
  },1000);

  $$(".picArea input").on('change', function() {
      readURL(this,$$(this));
  });

  //$$('textarea.resizable').trigger('change');
  app.input.resizeTextarea("textarea.resizable");

  $$('#save_writing').on('submit', function(event){
    event.preventDefault();
    $$(this).removeClass('inputMode');

    var formData = app.form.convertToData($$(this));
    // console.log(formData);
    if (formData["keyword"] === '') {
      dialog_title_empty.open();
      setTimeout(function () {
        dialog_title_empty.close();
      }, 1000);
      return false;
    }
    if (formData["content"] === '') {
      dialog_body_empty.open();
      setTimeout(function () {
        dialog_body_empty.close();
      }, 1000);
      return false;
    }
    // console.log('submitted how many?');
    dialog_pending.open();
    // console.log(writing_id);
    // console.log(formData);
    var data = {
      member_email: localStorage["dd-member-email"],
      member_token: localStorage["dd-member-token"],
      post: {
        title: formData["keyword"],
        body: formData["content"],
        link: formData["link"],
        picture: formData["picture"],
        doodle: formData["doodle"]
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

  app.request.json(endpoint, credentials, function(data){
    // console.log(endpoint);
    // console.log(data);
    var post = compiledMyPostShowTemplate({post: data});
    $$('.my_post_show_wrapper').html(post);

    if (data.picture) {
      var persisted_picture = $$('<img/>').addClass('previewImg').attr('src', data.picture);
      $$('.picArea em').append(persisted_picture);
      long_tab_delete_picture(persisted_picture);
    }
    if (data.doodle) {
      var persisted_doodle = $$('<img/>').addClass('drawImg').attr('src', data.doodle);
      $$('.drawArea em').append(persisted_doodle);
      long_tab_delete_doodle(persisted_doodle);
    }
    if (data.link) {
      // console.log(data.link);
      var link_input = $$("<input type='hidden' name='link'>").attr('value', data.link);
      $$('.linkArea ').append(link_input);

      var link_data = {
        member_email: localStorage["dd-member-email"],
        member_token: localStorage["dd-member-token"],
        url: data.link
      };
      app.request.post(endpoint_hostname + '/api/link_preview', link_data, function(response){
        // console.log(response);
        var response_data = JSON.parse(response);
        if (response_data.is_success === true) {
          var img_url = response_data.data.image;
          var page_title = response_data.data.title;

        } else {
          var img_url = 'images/logo_dummy.png';
          var page_title = '링크';
        }
        var persisted_a = $$("<a/>").attr('href', data.link);
        var persisted_thumb = $$('<div class="thumb"/>').append($$('<img src="'+ img_url +'"/>'));
        var persisted_meta = $$('<div class="meta"/>').append($$('<b>'+ page_title +'</b>')).append($$('<em>'+ data.link +'</em>'));
        persisted_a.append(persisted_thumb).append(persisted_meta);
        $$('.linkArea ').append(persisted_a);
        long_tab_delete_link(persisted_a);
      });
    }

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
      $$(this).removeClass('inputMode');

      var formData = app.form.convertToData($$(this));
      if (formData["content"] === '') {
        dialog_body_empty.open();
        setTimeout(function () {
          dialog_body_empty.close();
        }, 1000);
        return false;
      }
      dialog_pending.open();
      // console.log(writing_id);
      // console.log(formData);
      var picture_persistence = $$('.picArea em img.previewImg').length > 0;
      var doodle_persistence = $$('.drawArea em img.drawImg').length > 0;
      // console.log(picture_persistence);
      // console.log(doodle_persistence);
      var data = {
        member_email: localStorage["dd-member-email"],
        member_token: localStorage["dd-member-token"],
        post: {
          title: formData["keyword"],
          body: formData["content"],
          link: formData["link"],
          picture: formData["picture"],
          doodle: formData["doodle"],
          picture_persistence: picture_persistence,
          doodle_persistence: doodle_persistence
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
            if (last_path.includes("/book_view/")) {
              setTimeout(function () {
                dialog.close();
                view.router.back(last_path, {force: true});
              }, 2000);
            } else {
              setTimeout(function () {
                dialog.close();
                view.router.back();
              }, 2000);
            }
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
  $$(this).find('span').hide();
  //$$('#save_writing .btnA').hide();
  $$('#add-writing-name').show();
  $$('#add-writing-name').find("input").val($$('.cf02 .header dt span').text());
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
  $$('.cf02 .header dt .btn03 span').text(formData.writing_name).show();
  $$('.cf02 .header dt input[name="keyword"]').val(formData.writing_name);

  $$("#add-writing-name").hide();
  $$('.btnArea').show();
  //$$('#save_writing .btnA').show();

  return false;
});
$$("#add-writing-name input").on("blur", function(){
  if($$(this).val().length > 0){
    $$('.cf02 .header dt .btn03 span').text($$(this).val());
    $$('.cf02 .header dt input[name="keyword"]').val($$(this).val());
  }
  $$('.cf02 .header dt .btn03 span').show();
  $$("#add-writing-name").hide();
  $$('.btnArea').show();
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
    '기록을 삭제할까요?',
    function () {
      // console.log(writing_id);
      var data = {
        member_email: localStorage["dd-member-email"],
        member_token: localStorage["dd-member-token"]
      };
      // console.log(data);
      var endpoint = endpoint_hostname + '/api/posts/' + writing_id
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
            $$('.page-previous .lc01 li a[keyword-id="'+writing_id+'"]').parent().remove();
            view.router.back();
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
    }
  );

});
//저장하기 버튼
$$('.fab03 > a').on('click', function(){
  $$('#save_writing .btnA button').click();
});

var dialog = app.dialog.create({
  text: '기록을 저장했어요.'
});

var dialog_pending = app.dialog.create({
  text: '기록을 저장중입니다.'
});
var dialog_drawing = app.dialog.create({
  text: '그림을 그려주세요.'
});
var dialog_body_empty = app.dialog.create({
  text: '본문에 글을 써주세요.'
});
var dialog_title_empty = app.dialog.create({
  text: '제목에 글을 써주세요.'
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
          var img = obj.siblings('em').find('.previewImg');
          var img_data = e.target.result;
          // console.log(img_data);

          if(img.length > 0){
            img.attr('src', e.target.result);
          }else{
            img = $$('<img/>').addClass('previewImg').attr('src', e.target.result);
            obj.siblings('em').append(img);
          }
          $$('.picArea').append('<input type="hidden" name="picture" value="'+ img_data +'">');
          long_tab_delete_picture(img);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function long_tab_delete_picture(img) {
  if (img.length > 0) {
    //그리기 삭제(롱 탭)
    var pressTimer;
    var startScrollTop, endScrollTop;
    img.touchend(function(){
      clearTimeout(pressTimer);
      // Clear timeout
      return false;
    }).touchstart(function(){
      // Set timeout
      startScrollTop = $$('.my_post_show_wrapper')[0].scrollTop;
      var $this = $$(this);
      pressTimer = window.setTimeout(function() {
        endScrollTop = $$('.my_post_show_wrapper')[0].scrollTop;
        if(startScrollTop == endScrollTop){
          app.dialog.confirm('이미지를 삭제할까요?', function () {
            $this.remove();
          });
        }
      },300);
      return false;
    });
  };
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
    var a = $$("<a/>").attr('href',url);

    var data = {
      member_email: localStorage["dd-member-email"],
      member_token: localStorage["dd-member-token"],
      url: url
    };
    app.request.post(endpoint_hostname + '/api/link_preview', data, function(response){
      // console.log(response);
      var response_data = JSON.parse(response);
      if (response_data.is_success === true) {
        var img_url = response_data.data.image;
        var page_title = response_data.data.title;
      } else {
        var img_url = 'images/logo_dummy.png';
        var page_title = '링크';
      }
      var thumb = $$('<div class="thumb"/>').append($$('<img src="'+ img_url +'"/>'));
      var meta = $$('<div class="meta"/>').append($$('<b>'+ page_title +'</b>')).append($$('<em>'+ url +'</em>'));
      a.append(thumb).append(meta);
      $$('.linkArea ').empty();
      $$('.linkArea ').append(a);
      $$('.linkArea').append('<input type="hidden" name="link" value="'+ url +'">');
    });
    long_tab_delete_link(a);
  },null,$$('.linkArea a .meta em').text());
});
function long_tab_delete_link(a) {
  if (a.length > 0) {
    //링크 삭제(롱 탭)
    var pressTimer;
    var startScrollTop, endScrollTop;
    a.touchend(function(){
      clearTimeout(pressTimer);
      // Clear timeout
      return false;
    }).touchstart(function(){
      // Set timeout
      startScrollTop = $$('.my_post_show_wrapper')[0].scrollTop;
      var $this = $$(this);
      pressTimer = window.setTimeout(function() {
        endScrollTop = $$('.my_post_show_wrapper')[0].scrollTop;
        if(startScrollTop == endScrollTop){
          app.dialog.confirm('링크를 삭제할까요?', function () {
            var $input = $this.parent('div').find("input[type='hidden']");
            $input.remove();
            $this.remove();
          });
        }
      },300);
      return false;
    });
  }
}

//그리기
var canvas = 0;
var signaturePad;

$$('.popup-drawing').on('popup:opened', function (e) {
  app.fab.close('.fab.fab02.fab-right-bottom');
  if(canvas != 0){
    return false;
  }
  canvas = document.getElementById('signature-pad');

  // Adjust canvas coordinate space taking into account pixel ratio,
  // to make it look crisp on mobile devices.
  // This also causes canvas to be cleared.
  function resizeCanvas() {
      // When zoomed out to less than 100%, for some very strange reason,
      // some browsers report devicePixelRatio as less than 1
      // and only part of the canvas is cleared then.
      var ratio =  Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
  }

  window.onresize = resizeCanvas;
  resizeCanvas();

  signaturePad = new SignaturePad(canvas, {
    minWidth: 1,
    maxWidth: 1,
    backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
  });

  document.getElementById('save-png').addEventListener('click', function () {
    if (signaturePad.isEmpty()) {
      dialog_drawing.open();
      setTimeout(function () {
        dialog_drawing.close();
      }, 1000);
      return false;
    }

    var data = signaturePad.toDataURL('image/png');

    var img = $$('.drawArea em').find('.drawImg');
    if(img.length > 0){
      img.attr('src', data);
    }else{
      img = $$('<img/>').addClass('drawImg').attr('src', data);
      $$('.drawArea em').append(img);
    }
    $$('.drawArea').append('<input type="hidden" name="doodle" value="'+ data +'">');
    long_tab_delete_doodle(img);
    app.popup.close();
    //console.log(data);
    //window.open(data);
  });
  /*
  document.getElementById('save-jpeg').addEventListener('click', function () {
    if (signaturePad.isEmpty()) {
      return alert("Please provide a signature first.");
    }

    var data = signaturePad.toDataURL('image/jpeg');
    console.log(data);
    window.open(data);
  });

  document.getElementById('save-svg').addEventListener('click', function () {
    if (signaturePad.isEmpty()) {
      return alert("Please provide a signature first.");
    }

    var data = signaturePad.toDataURL('image/svg+xml');
    console.log(data);
    console.log(atob(data.split(',')[1]));
    window.open(data);
  });
  */
  document.getElementById('clear').addEventListener('click', function () {
    signaturePad.clear();
  });

  document.getElementById('undo').addEventListener('click', function () {
    var data = signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      signaturePad.fromData(data);
    }
  });

});
function long_tab_delete_doodle(img) {
  if (img.length > 0) {
    //그리기 삭제(롱 탭)
    var pressTimer;
    var startScrollTop, endScrollTop;
    img.touchend(function(){
      clearTimeout(pressTimer);
      // Clear timeout
      return false;
    }).touchstart(function(){
      // Set timeout
      startScrollTop = $$('.my_post_show_wrapper')[0].scrollTop;
      var $this = $$(this);
      pressTimer = window.setTimeout(function() {
        endScrollTop = $$('.my_post_show_wrapper')[0].scrollTop;
        if(startScrollTop == endScrollTop){
          app.dialog.confirm('이미지를 삭제할까요?', function () {
            $this.remove();
          });
        }
      },300);
      return false;
    });
  };
}

$$('.popup-drawing').on('popup:closed', function (e) {
    signaturePad.clear();
});

$$( document ).on( 'click', '.cf02 .linkArea a', function(){
  event.preventDefault();
  window.open($$(this).attr('href'));
});

