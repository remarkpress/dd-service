var bookListTemplate = $$('script#book-list-template').html();
// console.log(bookListTemplate);
var compiledBookListTemplate = Template7.compile(bookListTemplate);
var endpoint = endpoint_hostname + '/api/books';

if (localStorage["dd-member-credentials"] === undefined ) {
  view.router.navigate('login');
} else {
  var credentials = JSON.parse(localStorage["dd-member-credentials"]);
}

app.request.json(endpoint, credentials, function(data){
  var book = compiledBookListTemplate({books: data.books, nickname: data.nickname});
  $$('.page.book .page-content.sub-content').html(book);
  $$('.toolbar-bottom').show();

});
