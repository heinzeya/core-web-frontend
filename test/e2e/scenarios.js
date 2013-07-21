'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Core Web Front end App', function() {

  it('should redirect index.html', function() {
    browser().navigateTo('/');
  });
});