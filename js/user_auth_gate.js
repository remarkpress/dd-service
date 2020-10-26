var view=app.views.current;
//로그인
$$('#check_email_form').on('submit', function(){
  var formData = app.form.convertToData($$(this));
  var endpoint = endpoint_hostname + '/api/check_email'
  // console.log(endpoint);
  var data = formData;
  app.request.post(endpoint, data, function(data) {
    var response_data = JSON.parse(data);
    var email = response_data.data.email;
    // console.log(email);
    if ( response_data.is_success === true ) {
      var path = '/login/';
    } else {
      var path = '/join02/';
    }
    // console.log(path);
    view.router.navigate({
      path: path,
      query: {
        "email": response_data.data.email
      }
    });
  });
});
