//textarea 자동 높이
var textarea = document.querySelector('textarea');

textarea.addEventListener('keydown', autosize);
             
function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}

//돌아가기
$$('.goBack').on('click', function(){
  var view=app.views.current;
  //view.router.back(view.history[1],{force:true});

  app.dialog.confirm(
    '저장하지 않고 나갈까요?', 
    function () {
      view.router.back();
    }
  );

});
