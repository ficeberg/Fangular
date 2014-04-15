'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /main when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/main");
  });


  describe('main', function() {

    beforeEach(function() {
      browser.get('index.html#/main');
    });


    it('should render main when user navigates to /main', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for main/);
    });

  });


  describe('conf', function() {

    beforeEach(function() {
      browser.get('index.html#/conf');
    });


    it('should render conf when user navigates to /conf', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for conf/);
    });

  });
});
