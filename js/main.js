
var slideTemplate = $$('script#swiper-template').html();
// console.log(slideTemplate);
var compiledSlideTemplate = Template7.compile(slideTemplate);

var endpoint = endpoint_hostname + '/api/posts/';
if (localStorage["dd-member-credentials"] === undefined ) {
  view.router.navigate('login');
} else {
  var credentials = JSON.parse(localStorage["dd-member-credentials"]);
}
// console.log(credentials);
app.request.json(endpoint, credentials, function(data){
  var slides = compiledSlideTemplate({slides: data});
  $$('.swiper-wrapper').html(slides);

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
            console.log('main swiper created');
           },
          tap: function (event) {
            /*
            if(this.clickedIndex != this.activeIndex){
              console.log('다름');
              event.stopPropagation();
              return false;
            }
            if(this.clickedIndex != this.activeIndex) this.slideTo(this.clickedIndex,100);
            */
            //console.log("tap" + this.clickedIndex);

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
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false,
        },
        on: {
          tap: function () {
            //console.log("tap" + this.clickedIndex);
            //if(this.clickedIndex != this.activeIndex) return false;
            //if(this.clickedIndex != this.activeIndex) this.slideTo(this.clickedIndex,0);
            //this.detachEvents();
          },
        },
      });
    }
  }

  app.on('cardBeforeOpen', function (el, prevent) {
    if(swiper.clickedIndex != swiper.activeIndex){  //current슬라이드가 아닌경우
      swiper.slideTo(swiper.clickedIndex,100);
//      console.log("cardBeforeOpen not current" + swiper.clickedIndex);
      prevent();
    }else{
//      console.log("cardBeforeOpen current" + swiper.clickedIndex);
      $$('.navbar.main-navbar').hide();    
      swiper.clickedSlide.querySelector('.tc01').classList.remove('draggable');
      swiper.detachEvents();
    }
  });
  app.on('cardClose', function (el, prevent) {
    $$('.navbar.main-navbar').show();
    var current = $$(swiper.clickedSlide.querySelector('.tc01'));
    current.scrollTop = 0;
    current.addClass('draggable');
    $$("#add-new-keyword").hide();
    swiper.attachEvents();
  });
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


  /* 컨텐츠 닫기
  $$('.tc01 a.card-close').on('click', function(){
    $$(this).parents('.tc01').scrollTop = 0;
    $$(this).parents('.tc01').addClass('draggable');
    //swiper.clickedSlide.querySelector('.tc01').classList.add('draggable')
    $$("#add-new-keyword").hide();
    swiper.attachEvents();
  })*/

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
    var prompt_id = $$('.swiper-slide-active ul.ng01 li input[type="hidden"]').val();
    var q_name = $$('.swiper-slide-active ul.ng01 li input[type="radio"]').attr('name');
    var opt_no = $$('.swiper-slide-active ul.ng01 li').length;
    var id = 'answer-'+prompt_id+'-'+opt_no ;
    var answer = $$("<li/>");
    answer.append('<input type="radio" name="'+q_name+'" id="'+id+'" value="'+word+'"/>');
    answer.append('<label class="btn02" for="'+id+'"><span>'+word+'</span></label>');
    answer.insertBefore($$('.swiper-slide-active ul.ng01 li.add'));
    answer.find('label').click();
    $$('.swiper-slide-active ul.ng01 li.add').remove();
    $$("#add-new-keyword").hide();
    $$(".tc01 form button.confirm").css('display','');
    return false;
  });


  $$(".tc01 form").submit(function(event){
    event.preventDefault();
    if($$(this).find('input[type="radio"]:checked').length < 1){
      notification2.open();
      return false;
    }
    // console.log(credentials);
    var formData = app.form.convertToData($$(this));
    // console.log(formData);
    var data = {
      member_email: localStorage["dd-member-email"],
      member_token: localStorage["dd-member-token"],
      post: {
        title: formData["title"],
        prompt_id: formData["prompt_id"]
      }
    };
    // console.log(data);
    var form = $$(this);
    /*여기에 저장 프로시져 추가*/
    app.request.post(endpoint, data, function(data) {
      // console.log(data);
      var response_data = JSON.parse(data);
      // console.log(response_data);
      // console.log(response_data.is_success === true);

      if (response_data.is_success === true) {
        // notificationSave.open();
        dialog.open();
        setTimeout(function () {
          dialog.close();
        }, 2000);
        form.parents('.tc01').find('a.card-close').click();
      } else {
        alert('오류가 있습니다.');
      }
    });
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
  var notificationDelete = app.notification.create({
    icon: '<i class="xi-cloud-download"></i>',
    title: '질문 카드',
    //titleRightText: 'now',
    subtitle: '해당 질문 카드를 삭제하였어요!',
    //text: 'This is a simple notification message',
    closeTimeout: 3000,
  });
  //답안 선택 저장 및 목록으로 돌아가기 안내
  var dialog = app.dialog.create({
    text: '‘나의 글’에 담았어요!',
    on: {
      opened: function () {
      }
    }
  });
  //질문 담기 완료 안내
  var dialog2 = app.dialog.create({
    text: '해당 질문을 담았어요!',
    content: '<br/><i class="xi-file-check" style="font-size:40px"></i>',
    on: {
      opened: function () {
      }
    }
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
          //selectedItem.bg_img = window.getComputedStyle(item.querySelectorAll('.header')[0]).backgroundImage;
        },

        move: dragMoveListener,

        end (event) {
          if ($$('.ib01').hasClass('swiper-container-vertical')) { return false;
          }
          console.log(selectedItem.item_id);
          if (isRemoveSlide == 1) { //좋아요에 담기
            var data = JSON.parse(localStorage["dd-member-credentials"]);
            // console.log(data);
            app.request.post(endpoint_hostname + '/api/posts/' + selectedItem.item_id + '/add_to_likes', data, function(data) {
              var response_data = JSON.parse(data);
              if (response_data.is_success === true) {
                //addLike(selectedItem);  //좋아요에 추가
                setTimeout(function() {
                  swiper.removeSlide(swiper.activeIndex);
                  isRemoveSlide = false;
                  dialog2.open();
                  setTimeout(function () {
                    dialog2.close();
                  }, 1000);
                }, 200);
              } else {
                alert('오류가 있습니다.');
              }
            });
          } else if (isRemoveSlide == 2) { //삭제
            var data = JSON.parse(localStorage["dd-member-credentials"]);
            // console.log(data);
            app.request.post(endpoint_hostname + '/api/posts/' + selectedItem.item_id + '/remove_from_main', data, function(data) {
              var response_data = JSON.parse(data);
              if (response_data.is_success === true) {
                setTimeout(function() {
                  swiper.removeSlide(swiper.activeIndex);
                  isRemoveSlide = false;
                  notificationDelete.open();
                }, 200);
              } else {
                alert('오류가 있습니다.');
              }
            });
          } else {
            //원위치시킴
            var tc01 = swiper.slides[swiper.activeIndex].querySelector('.tc01');
            //$$('.ib01 .swiper-slide-active .draggable').css({'transform': 'translate(0px, 0px)'});
            //$$('.ib01 .swiper-slide-active .draggable').attr('data-y',0);
            $$(tc01).css({'transform': 'translate(0px, 0px)'});
            $$(tc01).attr('data-y',0);
            $$(tc01).removeClass('movedown').removeClass('moveup');
          }
        }
      }
    });

  function dragMoveListener (event) {
    if($$('.ib01').hasClass('swiper-container-vertical')) return false;

    var moved = event.pageY - event.y0;
    if(moved > 200){  // 아래로 내려 좋아요
      swiper.slides[swiper.activeIndex].innerHTML = "";
      swiper.slides[swiper.activeIndex].classList.add("remove");
      isRemoveSlide = 1;
    }else if(moved < -200){  // 위로 올려 싫어요
      swiper.slides[swiper.activeIndex].innerHTML = "";
      swiper.slides[swiper.activeIndex].classList.add("remove");
      isRemoveSlide = 2;
    }else{
      isRemoveSlide = 0;
    }
    //좋아요 싫어요 아이콘 보이기
    var tc01 = swiper.slides[swiper.activeIndex].querySelector('.tc01');
    if(tc01){
      if(moved > 50){  // 아래로 내림
        tc01.classList.remove('moveup');
        if(!tc01.classList.contains('movedown')) tc01.classList.add('movedown');
      }else if(moved < -50){  // 위로 올림
        tc01.classList.remove('movedown');
        if(!tc01.classList.contains('moveup')) tc01.classList.add('moveup');
      }else{
        tc01.classList.remove('movedown');
        tc01.classList.remove('moveup');
      }
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
});
