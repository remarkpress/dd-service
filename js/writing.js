var myPostsTemplate = $$('script#my-posts-template').html();
// console.log(myPostsTemplate);
var compiledMyPostsTemplate = Template7.compile(myPostsTemplate);
var endpoint = endpoint_hostname + '/api/posts/my';

if (localStorage["dd-member-credentials"] === undefined ) {
  view.router.navigate('login');
} else {
  var credentials = JSON.parse(localStorage["dd-member-credentials"]);
}

app.request.json(endpoint, credentials, function(data){
  var posts = compiledMyPostsTemplate({posts: data});
  $$('.my_posts_wrapper').html(posts);
});
