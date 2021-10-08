
$(document).ready(function() {
  // --- our code goes here ---
  //checks if the text area is over the limit or under the limit for limitations
  $("#tweet-text").on('input', function() {
    if ((140 - $('#tweet-text').val().length) < 0) {
      $(this).next('div').children('output').addClass('overlimit')
    }
    if ((140 - $('#tweet-text').val().length) >= 0) {
      $(this).next('div').children('output').removeClass('overlimit')
    }
    $(this).next('div').children('output').text(140 - $('#tweet-text').val().length)
  })
});