var view = app.views.current;
var current_path = view.router.history[view.router.history.length - 1];
// console.log(current_path);
var userTemplate = $$('script#user-question-template').html();
var endpoint = endpoint_hostname + '/api/member/bookmarked_posts/';
// console.log(userTemplate);
// console.log(endpoint);
var compiledUserTemplate = Template7.compile(userTemplate);

if (localStorage["dd-member-credentials"] === undefined ) {
  view.router.navigate('login');
} else {
  var credentials = JSON.parse(localStorage["dd-member-credentials"]);
}

app.request.json(endpoint, credentials, function(data){
  // console.log(data);
  var posts = compiledUserTemplate({posts: data});
  // console.log(posts);
  $$('.page.user').html(posts);

  var current_tab = current_path.split("#")[1];
  // console.log(current_tab);
  if (current_tab == 'tab-1') {
    $$('a.tab-link.like').addClass('tab-link-active');
    $$('a.tab-link.hate').removeClass('tab-link-active');

    $$('#tab-1.page-content.tab').addClass('tab-active');
    $$('#tab-2.page-content.tab').removeClass('tab-active');

    $$('#tab-1.page-content.tab').show();
    $$('#tab-2.page-content.tab').hide();
  } else {
    $$('#tab-2.page-content.tab').addClass('tab-active');
    $$('#tab-1.page-content.tab').removeClass('tab-active');

    $$('a.tab-link.hate').addClass('tab-link-active');
    $$('a.tab-link.like').removeClass('tab-link-active');

    $$('#tab-1.page-content.tab').hide();
    $$('#tab-2.page-content.tab').show();
  }

  $$('a.tab-link.like').on('click', function(e) {
    // console.log('tab-1 clicked');
    $$('a.tab-link.like').addClass('tab-link-active');
    $$('a.tab-link.hate').removeClass('tab-link-active');

    $$('#tab-1.page-content.tab').show();
    $$('#tab-2.page-content.tab').hide();
  });
  $$('a.tab-link.hate').on('click', function() {
    // console.log('tab-2 clicked');
    $$('a.tab-link.hate').addClass('tab-link-active');
    $$('a.tab-link.like').removeClass('tab-link-active');

    $$('#tab-1.page-content.tab').hide();
    $$('#tab-2.page-content.tab').show();
  });

  $$('.swipeout-delete').on('click', function(e) {
    e.preventDefault();
    var post_id = $$(this).attr('href');
    // console.log('swipeout-delete clicked');
    var data = {
      member_email: localStorage["dd-member-email"],
      member_token: localStorage["dd-member-token"]
    };
    // console.log(post_id);
    var endpoint = endpoint_hostname + '/api/posts/' + post_id + '/remove_bookmarks/'
    app.request.post( endpoint, data, function(data) {
      // console.log(data);
      var response_data = JSON.parse(data);
      // console.log(response_data);
      if (response_data.is_success === true) {
        console.log('북마크 삭제 성공');
        view.router.back('/user/', {force: true});
      } else {
        alert('오류가 있습니다.');
      }
    });
  });

  //돌아가기
  $$('.page.user .goBack').on('click', function(){
    view.router.back('/user/', {force: true});
  });
});
