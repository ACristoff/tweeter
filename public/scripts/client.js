/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { urlencoded } = require("body-parser");

// //returns a tweet element as an <article>




$(document).ready(() => {

  //escape function for use when rendering tweets, prevents cross-site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (data) => {
    //a template variable that gets appended with the information that's passed through as the paramater data
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
    return $tweetformat;
  };

  const renderTweets = (tweets) => {
    //empties the tweet container
    $("#tweets-container").empty();
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend(createTweetElement(tweet));
    };
  };

  //when the page initializes, does a get request and renders the tweets
  $.ajax({
    url: "/tweets",
    method: "GET"
  })
    .then((result) => {
      renderTweets(result);
    });

  //dynamically adds height to the textarea depending on how much it would need to scroll to show all the text
  const dynamicHeight = function () {
    $("textarea").each(function () {
      this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
    }).on("input", function () {
      this.style.height = "auto";
      this.style.height = (this.scrollHeight) + "px";
    });
  };

  //when the dropdown nav button gets clicked, it drops down the new tweet section based on whether or not it's already hidden
  $("#dropdown").click(() => {
    if ($("section.new-tweet").is(":hidden")) {
      $("section.new-tweet").slideDown(300, () => {
        dynamicHeight();
      });
    } else {
      $("section.new-tweet").slideUp();
    };
  });

  // This function executes when someone attempts to submit a tweet
  $("form").on("submit", function (event) {
    //prevents the default form post request, replacing it with ajax requests
    event.preventDefault();
    //if there is an error previously existing, removes it with an animation.
    if ($('.error-out-empty').is(":visible")) {
      $(".error-out-empty").slideUp(400);
    } else if ($('.error-out-long').is(":visible")) {
      $(".error-out-long").slideUp(400);
    };
    //if a new error is detected, we use this conditional and a helper function to add a new element notifying the user of their error
    if ($('#tweet-text').val().length > 140) {
      // errorOut('too long! Brevity is the soul of wit!');
      $(".error-out-long").slideDown(400);
      return;
    } else if ($('#tweet-text').val().length <= 0) {
      // errorOut('empty! Speak up!');
      $(".error-out-empty").slideDown(400);
      return;
    };

    //if no errors occured, this ajax post request will execute and send the tweet to the server
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize()
    })
      .then((result) => {
        //clears the tweet text-area element
        $('#tweet-text').val('');
        //resets the counter back to 140
        $('#counter').text(140);
        //a new ajax get request refreshes the tweet-container and shows you your newest tweet along with any others
        $.ajax({
          url: "/tweets",
          method: "GET"
        })
          .then((result) => {
            renderTweets(result);
          });
      });
  });

  //checks how far we've scrolled and fades in a button to scroll up to top if we've scrolled down enough
  $(document).scroll(function () {
    let y = $(this).scrollTop();
    if (y > 400) {
      $('.bottomMenu').fadeIn();
    } else {
      $('.bottomMenu').fadeOut();
    };
  });
});
