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
    /**
     * @name RSS Feeds
     * @description test suite that contains a related set of tests. This suite is all about the RSS feeds definitions, the allFeeds variable in our application.
     * @function
     * @param {function} anonymous function
     */
    describe('RSS Feeds', function() {
         /**
          * @name are defined
          * @description tests to make sure that the allFeeds variable has been defined and that it is not empty.
          * @function
          * @param {function} anonymous function
          */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         /**
          * @name each have a url defined and is not empty
          * @description test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
          * @function
          * @param {function} anonymous function
          */
         it('each have a url defined and is not empty', function () {
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

         /**
          * @name each have a name defined and is not empty
          * @description test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
          * @function
          * @param {function} anonymous function
          */
         it('each have a name defined and is not empty', function () {
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

    /**
     * @name The Menu
     * @description test suite that contains a related set of tests. This suite is all about the menu in our application.
     * @function
     * @param {function} anonymous function
     */
    describe('The Menu', function () {
         /**
          * @name beforeEach
          * @description custom matcher 'toHaveClass' for menu tests below referenced jasmine tutorial http://jasmine.github.io/2.1/custom_matcher.html and using github user 'velesin' implementation https://github.com/velesin/jasmine-jquery/blob/master/lib/jasmine-jquery.js#L376-L383
          * @function
          * @param {function} anonymous function
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

         /**
          * @name element is hidden by default
          * @description test that ensures the menu element is hidden by default.
          * @function
          * @param {function} anonymous function
          */
         it('element is hidden by default', function () {
           expect($('body')).toHaveClass('menu-hidden');
         });

          /**
           * @name is visible when the menu icon is clicked
           * @description test that ensures the menu changes visibility when the menu icon is clicked.
           * @function
           * @param {function} anonymous function
           */
          it('is visible when the menu icon is clicked', function () {
            $('.menu-icon-link').click();
            expect($('body')).not.toHaveClass('menu-hidden');

            if ($('body').hasClass('')) {
              $('.menu-icon-link').click();
              expect($('body')).toHaveClass('menu-hidden');
            }
          });
    });

    /**
     * @name Initial Entries
     * @description test suite that contains a related set of tests. This suite is all about the initial entries in our application.
     * @function
     * @param {function} anonymous function
     */
    describe('Initial Entries', function () {
        /**
         * @name beforeEach
         * @description set up function that runs the ajax request loadFeed
         * @function
         * @param {function} anonymous function
         */
        beforeEach(function(done) {
          loadFeed(0, done);
        });

         /**
          * @name loadFeed is called, completes, and has at leat a single .entry element
          * @description test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
          * @function
          * @param {function} anonymous function
          */
         it('loadFeed is called, completes, and has at leat a single .entry element', function (done) {
           expect($('.feed').has('.entry').length).toBeGreaterThan(0);
           done();
         });
    });

    /**
     * @name New Feed Selection
     * @description test suite that contains a related set of tests. This suite is all about loading new feed entries in our application.
     * @function
     * @param {function} anonymous function
     */
    describe('New Feed Selection', function () {
        /**
         * @name beforeEach
         * @description set up function that runs the ajax request loadFeed
         * @function
         * @param {function} anonymous function
         */
         beforeEach(function(done) {
           loadFeed(0, done);
         });

         /**
          * @name content actually changes
          * @description test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
          * @function
          * @param {function} anonymous function
          */
        it('content actually changes', function (done) {
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
      * @name Favorites Functionality
      * @description test suite that contains a related set of tests. This suite is all about testing the favorites functionality.
      * @function
      * @param {function} anonymous function
      */
    describe('Favorites Functionality', function () {
        /**
         * @name beforeEach
         * @description set up function that runs the ajax request loadFeed and sets up a custom matcher for jquery hasClass testing.
         * @function
         * @param {function} anonymous function
         */
         beforeEach(function(done) {
           loadFeed(0, done);

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
         * @name to add feed item to favorites
         * @description test that will ensure a feed item is added to a favorites list.
         * @function
         * @param {function} anonymous function
         */
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

        /**
         * @name to remove feed item from favorites
         * @description test that will ensure when a feed item is removed from a favorites list
         * @function
         * @param {function} anonymous function
         */
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

        /**
         * @name to display favorites feeds list
         * @description test that will ensure when all feed items in a favorites list are displayed
         * @function
         * @param {function} anonymous function
         */
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
    });

   /**
    * @name Categorize Feed Items Functionality
    * @description test suite that contains a related set of tests. This suite is all about testing the categorize functionality.
    * @function
    * @param {function} anonymous function
    */
    describe('Categorize Feed Items Functionality', function () {
        /**
         * @name beforeEach
         * @description set up function that runs the ajax request loadFeed
         * @function
         * @param {function} anonymous function
         */
         beforeEach(function(done) {
           loadFeed(0, done);
         });

       /**
        * @name to add a category to a feed item
        * @description test that will ensure when a category is added to a feed item
        * @function
        * @param {function} anonymous function
        */
        xit('to add a category to a feed item', function () {
          var self = this;
          var category;
          $('input').keyup(function() {
            self.category = $(this).val();
            $('.category-text').text(self.category);
          }).keyup();

          expect($('.category-text').text()).toBe(self.category);
        });

        /**
         * @name to change a category on a feed item
         * @description test that will ensure when an existing category is changed on a feed item
         * @function
         * @param {function} anonymous function
         */
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

        /**
         * @name to remove category on a feed item
         * @description test that will ensure when a category is removed from a feed item
         * @function
         * @param {function} anonymous function
         */
        xit('to remove category on a feed item', function () {
          var self = this;
          var category;
          $('input').keyup(function() {
            self.category = $(this).val();
            $('.category-text').text(self.category);
          }).keyup();

          expect($('.category-text').text()).toBeNull();
        });
    });
}());
