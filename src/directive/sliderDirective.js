angular.module('jsl.slider')
  .directive('jslSlider', ($jslSliderService) => {
    return {
      restrict: 'A',
      link: (scope, elem, attrs) => {
        window.slider = $jslSliderService.createSlider(elem, {
          slides: Number(attrs.jslSliderDisplay),
          steps: Number(attrs.jslSliderSteps)
        });

        elem[0].classList.add('jsl-slider-wrapper');

        var prev = angular.element('<button class="jsl-slider-prev">.</button>');
        prev[0].onclick = slider.movePrev;
        elem[0].appendChild(prev[0]);

        var next = angular.element('<button class="jsl-slider-next">.</button>');
        next[0].onclick = slider.moveNext;
        elem[0].appendChild(next[0]);

      }
    }
  });
