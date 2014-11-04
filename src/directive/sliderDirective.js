angular.module('jsl.slider')
  .directive('jslSlider', ($jslSliderService) => {
    return {
      restrict: 'A',
      link: (scope, elem, attrs) => {
        window.slider = $jslSliderService.createSlider(elem, {
          slides: Number(attrs.jslSliderDisplay),
          steps: Number(attrs.jslSliderSteps)
        });
      }
    }
  });
