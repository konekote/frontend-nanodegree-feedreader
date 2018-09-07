/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

    describe('RSS Feeds', function () {

        // Checks if there is at least 1 feed and it is defined.
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Checks if each feed has a URL defined that is not empty.
        it('has a URL', function () {
            allFeeds.forEach(element => {
                expect(element.url).toBeDefined();
                expect(element.url.length).not.toBe(0);
            });
        });

        // Checks if each feed has a name defined that is not empty.
        it('has a name', function () {
            allFeeds.forEach(element => {
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        });
    });

    describe('menu', function () {

        // Checks if menu is hidden by default.
        it('hides the menu', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Checks if menu changes visibility when the icon is clicked.
        it('toggles the menu', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('initial entries', function () {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });


        // Checks if there is at least one .entry element in the .feed container.
        it('should have an entry element', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function () {

        let firstFeed, 
            secondFeed;

        // Loads 2 different feeds and saves the HTML of each in a variable.
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeed = $('.feed')[0].innerHTML;
                loadFeed(1, function () {
                    secondFeed = $('.feed')[0].innerHTML;
                    done();
                });
            });
        });

        // Checks if the HTML of each variable is different.
        it('should load new feed', function () {
            expect(firstFeed !== secondFeed).toBe(true);
        });
    });
}());