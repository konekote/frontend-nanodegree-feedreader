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

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has a URL', function () {
            allFeeds.forEach(element => {
                expect(element.url).toBeDefined();
                expect(element.url.length).not.toBe(0);
            });
        });

        it('has a name', function () {
            allFeeds.forEach(element => {
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
        });
    });

    describe('menu', function () {

        it('hides the menu', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


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


        it('should have an entry element', function () {
            expect(document.getElementsByClassName('entry')).not.toBeUndefined();
        });
    });

    describe('New Feed Selection', function () {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* For this test, it is enough to check if the first element has changed. */
        it('should load new feed', function (done) {

            let firstPreviousNode = $('.feed').children().toArray()[0];
            loadFeed(1, function () {
                let firstCurrentNode = $('.feed').children().toArray()[0];
                expect(firstPreviousNode.href !== firstCurrentNode.href).toBe(true);
                done();
            });
        });
    });
}());