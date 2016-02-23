# Project Overview

I was given a web-based application that reads RSS feeds. The original developer of this application saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and started writing their first test suite! Unfortunately, they decided to move on and we're now left with an application with an incomplete test suite.

A [live demo of the app test results can be found here](http://arosa81.github.io/jasminetestdrivendev/).


## Run the Web App and Jasmine Tests Locally

1. Check out the repository
2. Open the index.html file in your web browser
3. Scroll to the bottom of the page to see test results

## Additional Tests for Future Functionality

Specs starting with *SPEC HAS NO EXPECTATIONS* is testing for future functionality that has not been fully implemented. The expectations for them have been commented out, but includes code to adequately test these additional features. These tests include:

1. Test suite for *Favorites* feature
  1. Spec: **add feed item to favorites**
  *This test will ensure a feed item is added to a favorites list*
  ```javascript
  it('add feed item to favorites', function () {
    var self = this;
    var targetURL;
    $('.fav-unselect-icon').click(function(e) {
      targetURL = $(e.target).parent().attr('href');
      $(this).toggleClass('fav-unselect-icon fav-select-icon');
    });

    // addFeedFav(self.targetURL); //This function adds feed items to favorites list

    // expect($('article')).toHaveClass('fav-select-icon');
    // expect($('article')).not.toHaveClass('fav-unselect-icon');
  });
  ```

  1. Spec: **remove feed item from favorites**
  *This test will ensure when a feed item is removed from a favorites list*
  ```javascript
  it('remove feed item from favorites', function () {
    var self = this;
    var targetURL;
    $('.fav-select-icon').click(function(e) {
      self.targetURL = $(e.target).parent().attr('href');
      $(this).toggleClass('fav-unselect-icon fav-select-icon');
    });

    // deleteFeedFav(self.targetURL); //This function removes feed items from favorites list

    // expect($('article')).toHaveClass('fav-unselect-icon');
    // expect($('article')).not.toHaveClass('fav-select-icon');
  });
  ```
