$(document).ready(function () {
  // Send the form on enter keypress and avoid if shift is pressed
  $('#prompt').keypress(function (event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      $('form').submit();
    }
  });
  $('form').on('submit', function (event) {
    event.preventDefault();
    // get the CSRF token from the cookie
    var csrftoken = Cookies.get('csrftoken');

    // set the CSRF token in the AJAX headers
    $.ajaxSetup({
      headers: { 'X-CSRFToken': csrftoken }
    });
    // Get the prompt
    var prompt = $('#prompt').val();
    var dateTime = new Date();
    var time = dateTime.toLocaleTimeString();
    // Add the prompt to the response div
    $('#response').append('<p id="GFG1">(' + time + ') <i class="bi bi-person"></i>: ' + prompt + '</p>');
    $('#response #GFG1').css({ "color": "green", "width": "90%", "float": "left" });
    // Clear the prompt
    $('#prompt').val('');
    $.ajax({
      url: '/',
      type: 'POST',
      data: { prompt: prompt },
      dataType: 'json',
      success: function (data) {
        $('#response').append('<p id="GFG2">(' + time + ') <i class="bi bi-robot"></i>: ' + data.response + '</p>');
        $('#response #GFG2').css({ "color": "red", "width": "90%", "float": "right" });
      }
    });
  });
});