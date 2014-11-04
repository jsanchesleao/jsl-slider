angular.module('jsl.slider').factory('$jslSliderService', ($jslSliderStyleService) => {

  function createSlider(element, config = {}) {

    var ul, lis, steps, slides, position;
    function initialize() {
      ul = element[0].querySelector('ul');
      lis = ul.children;
      position = position || 0;
      slides = config.slides || 1
      steps = slides || 1;

      $jslSliderStyleService.setUpSliderStyle(element[0], ul, {slides: slides});
    }

    function moveNext() {
      if (position < (lis.length - steps) ) {
        position += steps;
      }
      updateSliderOnScreen();
    }

    function movePrev() {
      if (position >= steps) {
        position -= steps;
      }
      updateSliderOnScreen();
    }

    function updateSliderOnScreen() {
      ul.style.marginLeft = $jslSliderStyleService.getMarginLeft({
        size: lis.length,
        position: position,
        slides: slides
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
});
