describe('$jslSliderStyleService', () => {
  var service;

  beforeEach(module('jsl.slider'));
  beforeEach(() => {
    inject( $jslSliderStyleService => {
      service = $jslSliderStyleService;
    });
  });

  it('gets the correct margin for the element given a slider configuration state with zero position', () => {

    var margin = service.getMargin({
      position: 0,
      size: 5,
      steps: 1
    });

    expect(margin).to.equal('0');
  });

  it('gets the correct margin for the element given a slider configuration state', () => {

    var margin = service.getMargin({
      position: 2,
      size: 5,
      steps: 1
    });

    expect(margin).to.equal('-40%');
  });


});
