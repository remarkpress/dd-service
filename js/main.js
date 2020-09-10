
/*
var endpoint = 'https://my-json-server.typicode.com/typicode/demo/posts';

var slideTemplate = $$('script#swiper-template').html();
console.log(slideTemplate);
var compiledSlideTemplate = Template7.compile(slideTemplate);

app.request.json(endpoint, function(data){
  var slides = compiledSlideTemplate({slides: data});
  $$('.swiper-wrapper').html(slides);
});
*/
/* 메인 스와이퍼 */
var swiper_mode = "hor";
var current_swiper_index = Math.floor($$('.ib01 .swiper-slide').length / 2);
var swiper = create_swiper(swiper_mode,current_swiper_index);  //초기접속시 가로모드
//스와이퍼 생성
function create_swiper(mode,current){
  if(mode == "hor"){  // 가로모드
    return app.swiper.create('.ib01', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      initialSlide: current,
      coverflowEffect: {
        rotate: 0,
        stretch: -2,
        depth: 8,
        modifier: 10,
        slideShadows: true,
      },
      on: {
        init: function () {
         },
        tap: function () {
          $$('.swiper-container').addClass('expanded');
          $$('.swiper-slide-active .tc01').removeClass('draggable');
          this.detachEvents();
        },


      },
    });
  }else{  //세로모드
    return app.swiper.create('.ib01', {
      direction: 'vertical',
      effect: 'coverflow',
      autoHeight: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      initialSlide: current,
      coverflowEffect: {
        rotate: 0,
        stretch: 1,
        depth: 0,
        modifier: 0,
        slideShadows: false,
      },
      on: {
        tap: function () {
          $$('.swiper-container').addClass('expanded');
          this.detachEvents();
        },
      },
    });
  }
}

/* 스와이프 모드 변환 */
$$('.navbar .right a.cList').on('click', function(){
  //draggable.unset();
  var current = swiper.activeIndex;
  swiper.destroy();
  swiper = create_swiper("ver",current);
  $$(this).parent().parent().removeClass("horMode").addClass("verMode");
})
$$('.navbar .right a.cCar').on('click', function(){
  //draggable.set();
  var current = swiper.activeIndex;
  swiper.destroy();
  swiper = create_swiper("hor",current);
  $$(this).parent().parent().removeClass("verMode").addClass("horMode");
})


/* 컨텐츠 닫기*/
$$('.ib01 a.close').on('click', function(){
  $$('.swiper-slide-active .tc01').scrollTop = 0;
  $$('.swiper-container').removeClass('expanded');
  $$('.swiper-slide-active .tc01').addClass('draggable');
  $$("#add-new-keyword").hide();
  swiper.attachEvents();
})

//새 답안 추가 폼 열기
$$('.ng01 li.add > button').on('click', function(){
  $$("#add-new-keyword").show();
  $$("#add-new-keyword").find("input").val('');
  $$("#add-new-keyword").find("input").focus();
  $$(".tc01 form button.confirm").css('display','none');
});

//새 답안 추가
$$("#add-new-keyword").submit(function(event){
  event.preventDefault();
  var word = $$("#add-new-keyword input").val();
  if(word == ''){
    notification1.open();
    $$("#add-new-keyword").find("input").focus();
    return false;
  }
  var q_name = $$('.swiper-slide-active ul.ng01 li input').attr('name');
  var opt_no = $$('.swiper-slide-active ul.ng01 li').length + 1;
  var id = q_name+'-'+opt_no ;
  var answer = $$("<li/>");
  answer.append('<input type="radio" name="'+q_name+'" id="'+id+'" value="'+word+'"/>');
  answer.append('<label class="btn02" for="'+id+'"><span>'+word+'</span></label>');
  answer.insertBefore($$('.swiper-slide-active ul.ng01 li.add'));
  $$("#add-new-keyword").hide();
  $$(".tc01 form button.confirm").css('display','');
  return false;
});

//답안 선택 저장 및 목록으로 돌아가기
var dialog = app.dialog.create({
  text: '나의 기록에 담았어요!',
  content: '<br/><i class="xi-file-check" style="font-size:40px"></i>',
  on: {
    opened: function () {
    }
  }
})

$$(".tc01 form").submit(function(event){
  event.preventDefault();
  if($$(this).find('input[type="radio"]:checked').length < 1){
    notification2.open();
    return false;
  }

  /*여기에 저장 프로시져 추가*/

  //notificationSave.open();
  dialog.open();
  setTimeout(function () {
    dialog.close();
  }, 1000);
  $$('.swiper-slide-active .tc01').scrollTop = 0;
  $$('.swiper-container').removeClass('expanded');
  $$('.swiper-slide-active .tc01').addClass('draggable');
  swiper.attachEvents();
});

// Create full-layout notification
var notification1 = app.notification.create({
  icon: '<i class="xi-info"></i>',
  title: '키워드 추가',
  //titleRightText: 'now',
  subtitle: '키워드를 입력해 주세요',
  //text: 'This is a simple notification message',
  closeTimeout: 3000,
});
var notification2 = app.notification.create({
  icon: '<i class="xi-info"></i>',
  title: '나의 기록 추가',
  //titleRightText: 'now',
  subtitle: '키워드를 선택해 주세요',
  //text: 'This is a simple notification message',
  closeTimeout: 3000,
});
var notificationSave = app.notification.create({
  icon: '<i class="xi-cloud-download"></i>',
  title: '나의 기록 추가',
  //titleRightText: 'now',
  subtitle: '나의 기록에 담았어요!',
  //text: 'This is a simple notification message',
  closeTimeout: 3000,
});


/* 위아래로 스와이프 아웃 */
var isRemoveSlide = 0;
var selectedItem = {
  item_id: '',
  bg_img: ''
};
draggable = interact('.draggable')
  .draggable({
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    autoScroll: true,

    listeners: {
      start (event) {
        if($$('.ib01').hasClass('swiper-container-vertical')) return false; 
        //선택한 아이템 정보
        var item = swiper.slides[swiper.activeIndex].querySelectorAll('.tc01')[0];
        selectedItem.item_id = item.getAttribute('data-item-id');
        selectedItem.bg_img = window.getComputedStyle(item.querySelectorAll('.header')[0]).backgroundImage;
      },

      move: dragMoveListener,

      end (event) {
        if($$('.ib01').hasClass('swiper-container-vertical')) return false; 
        if(isRemoveSlide == 1){ //좋아요에 담기
          //addLike(selectedItem);  //좋아요에 추가
          setTimeout(function() {
            swiper.removeSlide(swiper.activeIndex);
            isRemoveSlide = false;
          }, 200);
        }else if(isRemoveSlide == 2){ //삭제
          setTimeout(function() {
            swiper.removeSlide(swiper.activeIndex);
            isRemoveSlide = false;
          }, 200);
        }

      }
    }
  });

function dragMoveListener (event) {
  if($$('.ib01').hasClass('swiper-container-vertical')) return false; 

  var moved = event.pageY - event.y0;
  if(moved > 200){  // 아래로 내림
    swiper.slides[swiper.activeIndex].innerHTML = "";
    swiper.slides[swiper.activeIndex].classList.add("remove");
    isRemoveSlide = 1;
  }else if(moved < -200){  // 위로 올림
    swiper.slides[swiper.activeIndex].innerHTML = "";
    swiper.slides[swiper.activeIndex].classList.add("remove");
    isRemoveSlide = 2;
  }else{
    isRemoveSlide = 0;
  }

  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  // translate the element
  target.style.webkitTransform = target.style.transform = 'translate(' + 0 + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}
//좋아요에 추가
function addLike (item) {
  $$('.ng02 ul li a').each(function(){
    if($$(this).hasClass('empty')){
      $$(this).removeClass("empty");
      $$(this).addClass("thumb");
      $$(this).css('background-image',item.bg_img);
      $$(this).attr('href', 'view.html?item_id='+item.item_id);
      return false;
    }
  });
}

