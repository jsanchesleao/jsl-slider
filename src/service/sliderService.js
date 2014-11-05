angular.module('jsl.slider').factory('$jslSliderService', ['$jslSliderStyleService', ($jslSliderStyleService) => {

  function createSlider(element, config = {}) {

    var ul, lis, steps, slides, position;
    function initialize() {
      ul = element[0].querySelector('ul');
      lis = ul.children;
      position = position || 0;
      slides = config.slides || 1
      steps = config.steps || slides || 1;

      $jslSliderStyleService.setUpSliderStyle(element[0], ul, {slides: slides});
    }

    function getMaxPosition() {
      return Math.ceil( (lis.length - slides) / steps );
    }

    function moveNext() {
      if (position < getMaxPosition() ) {
        position += 1;
      }
      updateSliderOnScreen();
    }

    function movePrev() {
      if (position > 0) {
        position -= 1;
      }
      updateSliderOnScreen();
    }

    function updateSliderOnScreen() {
      ul.style.marginLeft = $jslSliderStyleService.getMarginLeft({
        size: lis.length,
        position: position,
        slides: slides,
        steps: steps
      });
    }

    initialize();

    return {
      getSize: () => lis.length,
      getPosition: () => position,
      getElement: () => element,

      refresh: initialize,
      moveNext: moveNext,
      movePrev: movePrev
    }

  }

  return {
    createSlider: createSlider
  };
}]);
