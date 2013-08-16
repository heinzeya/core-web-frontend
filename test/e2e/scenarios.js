'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Core Web Front end App', function() {

  it('should redirect index.html', function() {
    browser().navigateTo('/');
  });

  it('should check ng-bind', function() {
    expect(using('#mwc-nav-bar-items a').binding('menu.title')).toBe('Whirled');
  });
});