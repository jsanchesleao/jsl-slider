describe('$jslSliderService', function () {
  var service;

  beforeEach(module('jsl.slider'));
  beforeEach(function () {
    inject( $jslSliderService => {
      service = $jslSliderService;
    });
  });

  it('builds an empty order object', () => {
    expect('foo').not.to.equal('bar');
  });

});
