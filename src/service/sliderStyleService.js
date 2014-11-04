angular.module('jsl.slider').factory('$jslSliderStyleService', () => {


  function getMarginLeft(config) {
    var margin = (100 * config.position) / config.slides;
    if (margin > 100 * config.size) {
      margin = 100 * config.size;
    }
    return formatCssPercentage( -margin );
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
