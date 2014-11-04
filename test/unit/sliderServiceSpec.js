describe('$jslSliderService', () => {
  var service;

  beforeEach(module('jsl.slider'));
  beforeEach(() => {
    inject( $jslSliderService => {
      service = $jslSliderService;
    });
  });

  var createElement = () => angular.element([
      '<div>',
      '  <ul>',
      '    <li>a</li>',
      '    <li>b</li>',
      '    <li>c</li>',
      '  </ul>',
      '</div>'
    ].join(''));

  it('constructs a slider object', () => {
    var element = createElement(),
        slider  = service.createSlider(element);

    expect(slider.getSize()).to.equal(3);
    expect(slider.getPosition()).to.equal(0);
  });

  it('constructs a slider object and moves it to the right one step', () => {
    var element = createElement(),
        slider  = service.createSlider(element);

    slider.moveNext();

    expect(slider.getSize()).to.equal(3);
    expect(slider.getPosition()).to.equal(1);
  });

  it('constructs a slider object and moves it to the right several steps', () => {
    var element = createElement(),
        slider  = service.createSlider(element);

    slider.moveNext();
    slider.moveNext();
    slider.moveNext();
    slider.moveNext();

    expect(slider.getSize()).to.equal(3);
    expect(slider.getPosition()).not.to.equal(3);
    expect(slider.getPosition()).to.equal(2);
  });

  it('constructs a slider object and moves it to the left one step', () => {
    var element = createElement(),
        slider  = service.createSlider(element);

    slider.moveNext();
    slider.moveNext();
    slider.movePrev();

    expect(slider.getSize()).to.equal(3);
    expect(slider.getPosition()).to.equal(1);

  });

  it('moves at a given rate', () => {
    var element = createElement(),
        slider  = service.createSlider(element, {steps: 2});

    slider.moveNext();

    expect(slider.getPosition()).to.equal(2);

    slider.moveNext();

    expect(slider.getPosition()).to.equal(2); //not moving forward
  });

  it('can refresh the slider after changing something in the dom', () => {

    var element = createElement(),
        slider  = service.createSlider(element);

    expect(slider.getSize()).to.equal(3);

    var newLi = angular.element('<li>d</li>');
    element[0].querySelector('ul').appendChild(newLi[0]);
    slider.refresh();

    expect(slider.getSize()).to.equal(4);

  });

});
