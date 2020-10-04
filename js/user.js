var view = app.views.current;
// var current_path = view.router.history[view.router.history.length - 1];
// console.log(current_path);
var userTemplate = $$('script#user-main-template').html();
var endpoint = endpoint_hostname + '/api/member';
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
  var user = compiledUserTemplate({user: data});
  $$('.page.user').html(user);

  //돌아가기
  $$('.page.user .goBack').on('click', function(){
    view.router.back();
  });
});
