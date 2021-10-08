
$(document).ready(function() {
  // --- our code goes here ---

  //dynamically adds height to the textarea depending on how much it would need to scroll to show all the text
  $("textarea").each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight ) + "px;overflow-y:hidden;");
  }).on("input", function () {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
  });
  
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