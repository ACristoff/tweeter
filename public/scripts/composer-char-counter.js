
$(document).ready(function() {
  // --- our code goes here ---

  function writing(input) {
    console.log(input)
  }

  const textBox = document.getElementById('tweet-text')
  // let textTotal = textBox.val();

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


// $( "li.item-a" )
//   .closest( "ul" )
//   .css( "background-color", "red" );

// document.addEventListener("dblclick", (event) => {
//   console.log(event);
//   // your code here
// });

// $('#myOpt').click(function() {
//   $(this).closest('select').change(function() {
//     console.log('We found the select element');
//   });
// });

// document.querySelector("#counter")