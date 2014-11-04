angular.module('jsl.slider')
  .directive('jslSlider', ($jslSliderService) => {
    return {
      restrict: 'A',
      link: (scope, elem, attrs) => {
        var slider = $jslSliderService.createSlider(elem, {
          slides: Number(attrs.jslSliderDisplay),
          steps: Number(attrs.jslSliderSteps)
        });

        var prev = angular.element('<button>Prev</button>');
        prev[0].onclick = slider.movePrev;
        elem[0].appendChild(prev[0]);

        var next = angular.element('<button>Next</button>');
        next[0].onclick = slider.moveNext;
        elem[0].appendChild(next[0]);

      }
    }
  });
