# Project Overview

I was given a web-based application that reads RSS feeds. The original developer of this application saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and started writing their first test suite! Unfortunately, they decided to move on and we're now left with an application with an incomplete test suite.

A [live demo of the app test results can be found here](http://arosa81.github.io/jasminetestdrivendev/).


## Run the Web App and Jasmine Tests Locally

1. Check out the repository
2. Open the index.html file in your web browser
3. Scroll to the bottom of the page to see test results
4. To run additional tests (below), uncomment out expectations code in feadreader.js file, save changes, and refresh web page

## Additional Tests for Future Functionality

Specs starting with *SPEC HAS NO EXPECTATIONS* is testing for future functionality that has not been fully implemented. The expectations for them have been commented out, but includes code to adequately test these additional features. These tests include:

1. Test suite for *Favorites* feature
  1. Spec: **add feed item to favorites**

   *This test will ensure a feed item is added to a favorites list*
  ```javascript
  xit('to add feed item to favorites', function () {
    var self = this;
    var targetURL;
    $('.fav-unselect-icon').click(function(e) {
      targetURL = $(e.target).parent().attr('href');
      $(this).toggleClass('fav-unselect-icon fav-select-icon');
    });

    addFeedFav(self.targetURL); //This function adds feed items to favorites list

    expect($('article')).toHaveClass('fav-select-icon');
    expect($('article')).not.toHaveClass('fav-unselect-icon');
  });
  ```

  1. Spec: **remove feed item from favorites**

   *This test will ensure when a feed item is removed from a favorites list*
  ```javascript
  xit('to remove feed item from favorites', function () {
    var self = this;
    var targetURL;
    $('.fav-select-icon').click(function(e) {
      self.targetURL = $(e.target).parent().attr('href');
      $(this).toggleClass('fav-unselect-icon fav-select-icon');
    });

    deleteFeedFav(self.targetURL); //This function removes feed items from favorites list

    expect($('article')).toHaveClass('fav-unselect-icon');
    expect($('article')).not.toHaveClass('fav-select-icon');
  });
  ```

  1. Spec: **display favorites feeds list**

   *This test will ensure when all feed items in a favorites list are displayed*
  ```javascript
  xit('to display favorites feeds list', function () {
    var self = this;
    var initialFeedContent = $('.feed').html(),
        secondFeedContent;

    $('.menu-fav-icon-link').click();
    loadFavFeed();  //This function hides current feed and shows fav feed

    expect(self.secondFeedContent).not.toEqual(initialFeedContent);

    $('.entry-link').each(function() {
      expect($(this).hasClass('fav-select-icon')).toBeTruthy();
    });
  });
  ```

1. Test suite for *Categorize Feed Items* feature
  1. Spec: **add a category to a feed item**

   *This test will ensure when a category is added to a feed item*
  ```javascript
  xit('to add a category to a feed item', function () {
    var self = this;
    var category;
    $('input').keyup(function() {
      self.category = $(this).val();
      $('.category-text').text(self.category);
    }).keyup();

    expect($('.category-text').text()).toBe(self.category);
  });
  ```

  1. Spec: **change a category on a feed item**

   *This test that will ensure when an existing category is changed on a feed item*
  ```javascript
  xit('to change a category on a feed item', function () {
    var self = this;
    var initialCategory, newCategoryText;

    $('.category-text').each(function(i, element) {
      self.initialCategory = $(this).text();
      $('input').keyup(function() {
        self.newCategoryText = $(this).val();
        $('.category-text').text(self.newCategoryText);
      }).keyup();

      expect(this).not.toBe(self.newCategoryText);
    });
  });
  ```

  1. Spec: **remove category on a feed item**

   *This test will ensure when a category is removed from a feed item*
  ```javascript
  xit('to remove category on a feed item', function () {
    var self = this;
    var category;
    $('input').keyup(function() {
      self.category = $(this).val();
      $('.category-text').text(self.category);
    }).keyup();

    expect($('.category-text').text()).toBeNull();
  });
  ```
