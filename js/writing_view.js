
var view = app.views.current;
var current_page = $$('.page.writingView')[0].f7Page;
var writing_id = current_page.route.params.id;  //  넘겨받은 파라미터

if ( writing_id == "new" ) { //신규 책 만들기
  $$('.cf02 .header dt a span').text('+');
  $$('.btnArea').hide();
  $$('#save_writing .btnA').hide();
  $$('#add-writing-name').show();
  $$('#add-writing-name').find("input").focus();
} else {
  var myPostShowTemplate = $$('script#my-post-show-template').html();
  // console.log(myPostShowTemplate);
  var compiledMyPostShowTemplate = Template7.compile(myPostShowTemplate);
  var endpoint = endpoint_hostname + '/api/posts/' + writing_id;

  if (localStorage["dd-member-credentials"] === undefined ) {
    view.router.navigate('login');
  } else {
    var credentials = JSON.parse(localStorage["dd-member-credentials"]);
  }

  app.request.json(endpoint, credentials, function(data){
    console.log(data);
    var post = compiledMyPostShowTemplate({post: data});
    $$('.my_post_show_wrapper').html(post);
  });
}
$$('#save_writing .header dt .btn03').on('click', function(){ //신규 책 만들기
  $$('.btnArea').hide();
  $$('#save_writing .btnA').hide();
  $$('#add-writing-name').show();
  $$('#add-writing-name').find("input").val($$('.cf02 .header dt a span').text());
  $$('#add-writing-name').find("input").focus();
});

//새 글 제목 추가/수정 폼
$$("#add-writing-name").submit(function(event){
  event.preventDefault();
  var formData = app.form.convertToData($$(this));

  if(formData.writing_name == ''){
    notification1.open();
    $$(this).find("input").focus();
    return false;
  }
  $$('.cf02 .header dt a span').text(formData.writing_name);

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
    '해당 키워드를 삭제하시겠습니까?',
    function () {
      $$('.page-previous .lc01 li a[keyword-id="'+writing_id+'"]').parent().remove();
      view.router.back();
    }
  );

});
//키워드 저장
$$('#save_writing').on('submit', function(){
  var formData = app.form.convertToData($$(this));
  alert(JSON.stringify(formData));

  if(writing_id == "new"){  //신규추가
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
// Create full-layout notification
var notification1 = app.notification.create({
  icon: '<i class="xi-info"></i>',
  title: '글 추가',
  //titleRightText: 'now',
  subtitle: '글 이름을 입력해 주세요',
  //text: 'This is a simple notification message',
  closeTimeout: 3000,
});
