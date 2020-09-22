var view=app.views.current;

$$('#login_form.form-ajax-submit').on('formajax:beforesend', function (e) {
  // e.preventDefault();
  // console.log(e);
});

$$('#login_form.form-ajax-submit').on('formajax:complete', function (e) {
  console.log('submitted');
  // console.log(xhr);
  // var xhr = e.detail.xhr; // actual XHR object
  // console.log(xhr);
  // var data = e.detail.data; // Ajax response from action file
  // console.log(e.detail.data);

});

$$('#login_form.form-ajax-submit').on('formajax:success', function (e) {
  console.log('success');
  var xhr = e.detail.xhr; // actual XHR object
  var response_data = JSON.parse(xhr.response);
  var email = response_data.data.member.email;
  var token = response_data.data.member.authentication_token;

  localStorage.removeItem('dd-member-credentials');
  localStorage.setItem('dd-member-credentials', JSON.stringify({ member_email: email, member_token: token }))

  $$('.page.login').remove();
  view.router.navigate({
    path: '/',
    params: {
      token: token
    }
  });
});


// app.on('formAjaxError', function (formEl, data, xhr) {
//   // do something with response data
//   console.log(data);
// });


$$('#login_form.form-ajax-submit').on('formajax:error', function (e) {
  console.log('error');
  var xhr = e.detail.xhr; // actual XHR object
  console.log(xhr);
  var data = e.detail.data; // Ajax response from action file
  // do something with response data
  console.log(e.detail.data);
});
