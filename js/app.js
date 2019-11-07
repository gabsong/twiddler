// http://gregfranko.com/jquery-best-practices/
// IIFE - Immediately Invoked Function Expression
( (yourcode) => {

  // The global jQuery object is passed as a parameter
  yourcode(window.jQuery, window, document);

}) ( ($, window, document) => {

  // The $ is now locally scoped
  $( () => { /* The DOM is ready! */ } );

  // The rest of your code goes here!
  const $body = $('body');
  const $stream = $('#stream');

  // create tweet as HTML
  const buildTweetTxt = (user, message, ts) => {
    return `<div class="tweet">
      <p class="handle">@${user}</p>
      <p class="message">${message}</p>
      <p class="timestamp">${ts}</p>
      </div>`.trim();
  };

  // create tweet as DOM object
  // const buildTweetObj = (user, message, ts) => {
  //   let $tweet = $('<div></div>').addClass('tweet');
  //   const $user = $('<p></p>').addClass('handle').text('@' + user);
  //   const $message = $('<p></p>').text(message);
  //   const $ts = $('<p></p>').addClass('timestamp').text(ts);
  //   $user.appendTo($tweet);
  //   $message.appendTo($tweet);
  //   $ts.appendTo($tweet);
  //   return $tweet;
  // };

  // loads initial set of tweets (total: 11)
  let index = streams.home.length - 1;
  let lastTweet = {
    home: streams.home.length
  };
  while (index >= 0) {
    const tweet = streams.home[index];
    $stream.append(buildTweetTxt(tweet.user, tweet.message, tweet.created_at));
    index -= 1;
  }

  const getTweet = (start, end, handle) => {
    let tweets = '';
    let collection = [];
    if (handle === undefined) {
      handle = 'home';
      collection = streams.home;
    } else {
      collection = streams.users[handle];
    }

    (collection).slice(start, end).forEach(tweet => {
      tweets = buildTweetTxt(tweet.user, tweet.message, tweet.created_at) + tweets;
    });
    lastTweet[handle] = end; // side effect
    return tweets;
  };

  // try loading tweets on click
  $('#get-tweets').click( () => {
    const start = lastTweet.home;
    const length = streams.home.length;
    console.log(`Adding ${length - start} tweets starting from #${start}`);
    $stream.prepend(getTweet(start, streams.home.length));
    console.log(`Current tweet count is ${streams.home.length}`);
  });

  // show tweets by user


  // update home-area to have username and back button


  // show user stream when username is clicked


  // test new functions
  // console.log(getTweet(0,5));
  // console.log(getTweet(5,10, 'mracus'));
  // console.log(lastTweet);

});