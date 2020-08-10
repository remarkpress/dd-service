
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

var swiper = app.swiper.create('.ib01', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      initialSlide: 5,
      coverflowEffect: {
        rotate: 0,
        stretch: -2,
        depth: 8,
        modifier: 10,
        slideShadows: true,
      },
      on: {
        tap: function () {
          document.querySelector('.swiper-container').classList.add('expanded');
          document.querySelector('.swiper-slide-active .tc01').classList.remove('draggable');
          this.detachEvents();
        },
      },
});


var elem = document.querySelector('.ib01 a.close');
if (elem) {
  elem.addEventListener('click', function(){
    document.querySelector('.swiper-slide-active .tc01').scrollTop = 0;
    document.querySelector('.swiper-container').classList.remove('expanded');
    document.querySelector('.swiper-slide-active .tc01').classList.add('draggable');
    swiper.attachEvents();
  })
}

const buttons = document.querySelectorAll(".toolbar-bottom a")
for (const button of buttons) {
    button.addEventListener('click', function(){
      location.href = this.getAttribute('href');
    });
}

/* 위아래로 스와이프 아웃 */
var isRemoveSlide = 0;
var selectedItem = {
  item_id: '',
  bg_img: ''
};
interact('.draggable')
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
        //선택한 아이템 정보
        var item = swiper.slides[swiper.activeIndex].querySelectorAll('.tc01')[0];
        selectedItem.item_id = item.getAttribute('data-item-id');
        selectedItem.bg_img = window.getComputedStyle(item.querySelectorAll('.header')[0]).backgroundImage;
      },

      move: dragMoveListener,

      end (event) {
        if(isRemoveSlide == 1){ //좋아요에 담기
          addLike(selectedItem);  //좋아요에 추가
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
  })

function dragMoveListener (event) {

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
  var elements = document.querySelectorAll('.ng02 ul li a');
  for (let el of elements) {
    if(el.classList.contains('empty')){
      el.classList.remove("empty");
      el.classList.add("thumb");
      el.style.backgroundImage = item.bg_img;
      el.setAttribute('href', 'view.html?item_id='+item.item_id);
      break;
    }
  }
}
