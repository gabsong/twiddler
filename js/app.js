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
  const $currentUser = $('#page-title > a');

  // Create tweet as htmlString (helper function)
  const buildTweet = (username, message, ts) => {
    return `<div class="tweet-wrapper center">
        <div class="tweet">
          <div>
            <span class="${username} handle">@${username}</span>
          </div>
          <div>
            <p class="message">${message}</p>
            <p class="timestamp">${ts}</p>
          </div>
        </div>
      </div>`.trim();
  };

  // Load first tweets (total: 11)
  let lastTweet = {
    home: streams.home.length
  };

  let index = streams.home.length - 1;
  while (index >= 0) {
    const tweet = streams.home[index];
    $stream.append(buildTweet(tweet.user, tweet.message, tweet.created_at));
    index -= 1;
  }

  // Get tweets from local storage (helper function)
  const getTweets = (start, end, username) => {
    let tweets = '';
    let collection = [];

    // can use function for home and user streams
    if (username === 'home') {
      collection = streams.home;
    } else {
      collection = streams.users[username];
    }

    // build as string so we only call prepend once
    (collection).slice(start, end).forEach((tweet) => {
      tweets = buildTweet(tweet.user, tweet.message, tweet.created_at) + tweets;
    });

    // update count object and test in the console
    lastTweet[username] = end; // side effect
    console.log(`The ${$currentUser.attr('name')} timeline has ${lastTweet[username]} tweets`);

    // return htmlString of non-initialized DOM objects
    return tweets;
  };

  // Load new tweets on click [See new tweets]
  $('#load-tweets').on('click', (event) => {
    let username = $currentUser.attr('name');
    let start = 0;
    let length = 0;

    if (username === 'home') {
      start = lastTweet.home;
      length = streams.home.length;
    } else {
      start = lastTweet[username];
      length = streams.users[username].length;
    }

    console.log(`+${length - start} tweets starting at #${start}`);
    $stream.prepend(getTweets(start, length, username));
  });

  // Show user tweets on click <@username>
  $stream.on('click', '.handle', (event) => {
    const username = $(event.target).text().substring(1);

    if ($currentUser.attr('name') !== username) {
      $stream.children().remove();
      $currentUser.text(username);
      $currentUser.attr('name', username);
    }

    $stream.prepend(getTweets(lastTweet[username] || 0, streams.users[username].length, username));
  });

  // Show "home" tweets on click [Home]
  $('#nav-home').on('click', (event) => {
    if ($currentUser.attr('name') !== 'home') {
      $stream.children().remove();
      console.log(`All ${$currentUser.attr('name')} tweets removed from the DOM`);
      $currentUser.text('Home');
      $currentUser.attr('name', 'home');
      $stream.prepend(getTweets(0, streams.home.length, 'home'));
    }
  });

  // Fix position of Tweet button


  // See if code can be simplified


  // Some helpful functions
  $('#flash-message').hide();
  // $('#postTweet').on('click', () => {
  //   $('#flashMessage')
  //     .slideDown(1000)
  //     .delay(3000)
  //     .slideUp();
  // });

  // progressive enhancement: site functional even without JS
  // Event Propagation: when an event moves through the DOM from child to a
  // parent element, that's called Event Propagation, because the event
  // propagates, or moves through the DOM.

  // .eq method to select an array element
  // .css method can be used to change color: .css({ color: 'green' })
  // .prev method returns the previous sibling element (also, there is "next")
  // $('li:hidden').show() to show hidden list elements
  // $someVar.attr('target', '_blank') adds an attribute of target="_blank"
  // or attr('download', true) -- notice true has no quotes
  // css :after (you can add a css element with this)
  // custom selector: $('img[src$=".png"]') where ^ is starts with, $ is end
  // preventDefault() <- check uses
});