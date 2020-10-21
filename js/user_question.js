var view = app.views.current;
// var current_path = view.router.history[view.router.history.length - 1];
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

  //돌아가기
  $$('.page.user .goBack').on('click', function(){
    view.router.back('/user/', {force: true});
  });
});
