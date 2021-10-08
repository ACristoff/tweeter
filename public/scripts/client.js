/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { urlencoded } = require("body-parser");

// //returns a tweet element as an <article>

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// const safeHTML = `<p>${escape(textFromUser)}</p>`;


$(document).ready(function () {
  const createTweetElement = (data) => {
    const $tweetformat = $(`
    <article class="tweet">
      <header> 
        <div> 
        <img src="${data.user.avatars}">  <p>${data.user.name}</p>
        </div>
        <p>${data.user.handle}</p>
      </header>
  
      <content>
        <p>${escape(data.content.text)}</p>
      </content>
      <hr>
      <footer> 
        <p>${timeago.format(data.created_at)}</p>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    
    </article>`);
    return $tweetformat
  }

  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  const errorOut = function (errorType) {
    const errorFormat = $(`<div class="error-out"><i class="fas fa-exclamation-triangle"></i> <p><b>UH OH! Your tweet is ${errorType}</b></p></div>`)
    $(".new-tweet").append(errorFormat)
  };


  $.ajax({
    url: "/tweets",
    method: "GET"
  })
  .then((result) => {
    console.log('GET result:', result)
    renderTweets(result);
  });


  // This function executes when someone attempts to submit a tweet
  $("form").on("submit", function (event) {
    //prevents the default form post request, replacing it with ajax requests
    event.preventDefault();

    //if there is an error previously existing, removes it with an animation.
    if ($('#tweet-text').val().length > 140 || $('#tweet-text').val().length <= 0) {
      if ($('error-out')) {
        $('.error-out').slideUp(400, () => {
          $(".error-out").remove()
          // console.log($('#new-tweet').children().last());
          // $('#new-tweet').children().last().remove();
        });
      }
    }

    if ($('error-out')) {
      $('.error-out').slideUp(400, () => {
        $(".error-out").remove()
        // console.log($('#new-tweet').children().last());
        // $('#new-tweet').children().last().remove();
      });
    }

    //if a new error is detected, we use this conditional and a helper function to add a new element notifying the user of their error
    if ($('#tweet-text').val().length > 140) {
      errorOut('too long! Brevity is the soul of wit!')
      $(".error-out").slideDown(400)
      return;
    } else if ($('#tweet-text').val().length <= 0) {
      errorOut('empty! Speak up!')
      $(".error-out").slideDown(400)
      return;
    }

    //if no errors occured, this ajax post request will execute and send the tweet to the server
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize()
    })
      .then((result) => {
        console.log(result, "tweet sent!")
        //clears the tweet text-area element
        $('#tweet-text').val('')
        //resets the counter back to 140
        $('#counter').text(140)
        //a new ajax get request refreshes the tweet-container and shows you your newest tweet along with any others
        $.ajax({
          url: "/tweets",
          method: "GET"
        })
          .then((result) => {
            console.log('GET result:', result)
            renderTweets(result);
          });
      });
  });

  $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 300) {
      $('.bottomMenu').fadeIn();
    } else {
      $('.bottomMenu').fadeOut();
    }
  });
});
