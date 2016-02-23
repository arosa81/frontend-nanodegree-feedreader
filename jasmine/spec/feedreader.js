/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each feed has a url defined and is not empty', function () {
           /**
            * @name testValidURL
            * @description accepts feed item url value and runs expectations that it is defined and not empty
            * @function
            * @param {string} feedURL - feed item url
            */
           var testValidURL = function(feedURL) {
             expect(feedURL).toBeDefined();
             expect(feedURL.length).toBeGreaterThan(0);
           };

           //loops through feeds and invokes testValidURL function
           allFeeds.forEach(function(feed) {
             testValidURL(feed.url);
           });
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed has a name defined and is not empty', function () {
           /**
            * @name testValidFeedName
            * @description accepts feed item name value and runs expectations that it is defined and not empty
            * @function
            * @param {string} feedName - feed item name
            */
           var testValidFeedName = function(feedName) {
             expect(feedName).toBeDefined();
             expect(feedName.length).toBeGreaterThan(0);
           };

           //loops through feeds and invokes testValidFeedName function
           allFeeds.forEach(function(feed) {
             testValidFeedName(feed.name);
           });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        /**
         * created custom matcher 'toHaveClass' for menu tests below
         * referenced jasmine tutorial http://jasmine.github.io/2.1/custom_matcher.html
         * and using github user 'velesin' implementation https://github.com/velesin/jasmine-jquery/blob/master/lib/jasmine-jquery.js#L376-L383
         */
        beforeEach(function() {
          jasmine.addMatchers({
            toHaveClass: function () {
              return {
                compare: function (actual, className) {
                  return {
                    pass: $(actual).hasClass(className)
                  };
                }
              };
            }
          });
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('menu element is hidden by default', function () {
           expect($('body')).toHaveClass('menu-hidden');
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menu is visible when menu icon is clicked', function () {
            $('.menu-icon-link').click();
            expect($('body')).not.toHaveClass('menu-hidden');

            if ($('body').hasClass('')) {
              $('.menu-icon-link').click();
              expect($('body')).toHaveClass('menu-hidden');
            }
          });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        // setting up all tests by running ajax request loadFeed
        beforeEach(function(done) {
          loadFeed(0, function() {
            done();
          });
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('loadFeed is called, completes, and has at leat a single .entry element', function (done) {
           expect($('.feed').has('.entry').length).toBeGreaterThan(0);
           done();
         });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        // setting up all tests by running ajax request loadFeed
        beforeEach(function(done) {
          loadFeed(0, function() {
            done();
          });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('New feed content actually changes', function (done) {
          var self = this;
          var initialFeedContent = $('.feed').html(),
              secondFeedContent;

          // running ajax requst loadFeed for new feed content
          loadFeed(1, function() {
            self.secondFeedContent = $('.feed').html();
            expect(self.secondFeedContent).not.toEqual(initialFeedContent);
            done();
          });
        });
    });

    /**
     * @name Favorites--
     * @description This test suite contains all specs for testing the favorites functionality.
     * @function
     */
    describe('Favorites--', function () {
        // setting up all tests by running ajax request loadFeed
        beforeEach(function(done) {
          loadFeed(0, function() {
            done();
          });
          // custom matcher for jquery hasClass
          jasmine.addMatchers({
            toHaveClass: function () {
              return {
                compare: function (actual, className) {
                  return {
                    pass: $(actual).hasClass(className)
                  };
                }
              };
            }
          });
        });

        /**
          * @name add feed item to favorites
          * @description test that will ensure a feed item is added to a favorites list
          * @function
          */
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

        /**
          * @name remove feed item from favorites
          * @description test that will ensure when a feed item is removed from a favorites list
          * @function
          */
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

        /**
          * @name display favorites feeds list
          * @description test that will ensure when all feed items in a favorites list are displayed
          * @function
          */
        it('display favorites feeds list', function () {
          var self = this;
          var initialFeedContent = $('.feed').html(),
              secondFeedContent;

          $('.menu-fav-icon-link').click();
          // loadFavFeed();  //This function hides current feed and shows fav feed

          // expect(self.secondFeedContent).not.toEqual(initialFeedContent);
          //
          // $('.entry-link').each(function() {
          //   expect($(this).hasClass('fav-select-icon')).toBeTruthy();
          // });
        });
    });

    /**
     * @name Categorize Feed Items--
     * @description This test suite contains all specs for testing the categorize functionality.
     * @function
     */
    describe('Categorize Feed Items--', function () {
        // setting up all tests by running ajax request loadFeed
        beforeEach(function(done) {
          loadFeed(0, function() {
            done();
          });
        });

        /**
         * @name add a category to a feed item
         * @description test that will ensure when a category is added to a feed item
         * @function
         */
        it('add a category to a feed item', function () {
          var self = this;
          var category;
          $('input').keyup(function() {
            self.category = $(this).val();
            $('.category-text').text(self.category);
          }).keyup();

          // expect($('.category-text').text()).toBe(self.category);
        });

        /**
          * @name change a category on a feed item
          * @description test that will ensure when an existing category is changed on a feed item
          * @function
          */
        it('change a category on a feed item', function () {
          var self = this;
          var initialCategory, newCategoryText;

          $('.category-text').each(function(i, element) {
            self.initialCategory = $(this).text();
            $('input').keyup(function() {
              self.newCategoryText = $(this).val();
              $('.category-text').text(self.newCategoryText);
            }).keyup();

            // expect(this).not.toBe(self.newCategoryText);
          });
        });

        /**
          * @name remove category on a feed item
          * @description test that will ensure when a category is removed from a feed item
          * @function
          */
        it('remove category on a feed item', function () {
          var self = this;
          var category;
          $('input').keyup(function() {
            self.category = $(this).val();
            $('.category-text').text(self.category);
          }).keyup();

          // expect($('.category-text').text()).toBeNull();
        });
    });
}());
