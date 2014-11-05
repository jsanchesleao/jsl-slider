(function(){
"use strict";
angular.module('jsl.slider', []);

angular.module('jsl.slider')
  .directive('jslSlider', function($jslSliderService) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
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

angular.module('jsl.slider').factory('$jslSliderService', function($jslSliderStyleService) {

  function createSlider(element, config) {
    if (config === undefined)
      config = {};

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
      getSize: function() {
        return lis.length;
      },
      getPosition: function() {
        return position;
      },
      getElement: function() {
        return element;
      },

      refresh: initialize,
      moveNext: moveNext,
      movePrev: movePrev
    }
  }

  return {
    createSlider: createSlider
  };
});

angular.module('jsl.slider').factory('$jslSliderStyleService', function() {


  function getMarginLeft(config) {
    var margin = (100 * config.position * config.steps) / config.slides;
    if (margin > getMarginLimit(config) ) {
      margin = getMarginLimit(config);
    }
    return formatCssPercentage( -margin );
  }

  function getMarginLimit(config){
    return (100 / config.slides) * (config.size - config.slides);
  }

  function setUpSliderStyle(wrapper, ul, config) {
    var lis = ul.children;

    wrapper.style.overflow = 'hidden';
    wrapper.style.padding = '0';

    ul.style.width = formatCssPercentage(100 * lis.length);
    ul.style.listStyle = 'none';
    ul.style.padding = '0';
    ul.style.margin = '0';

    ul.style.webkitTransition = "margin 0.5s ease-in-out";
    ul.style.MozTransition = "margin 0.5s ease-in-out";
    ul.style.msTransition = "margin 0.5s ease-in-out";
    ul.style.OTransition = "margin 0.5s ease-in-out";
    ul.style.transition = "margin 0.5s ease-in-out";

    for( var i = 0; i < lis.length; i++ ){
      lis[i].style.margin = '0';
      lis[i].style.padding = '0';
      lis[i].style.width = formatCssPercentage(100 / (lis.length * config.slides));
      lis[i].style.float = 'left';
      lis[i].style.boxSizing = 'border-box';
    }
  }


  function formatCssPercentage(number) {
    if (number === 0 || number !== number) {
      return '0';
    }
    return number + '%';
  }

  return {
    getMarginLeft: getMarginLeft,
    setUpSliderStyle: setUpSliderStyle
  };
});
}());