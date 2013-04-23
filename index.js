var SlideShow = require('slideshow');
var Tip = require('tip');
var events = require('event');
var ga = require('analytics');

module.exports = function(options) {

  var slides = SlideShow.create(options);

  slides.each(function(slide, i){
    var indicator = slides.indicators[i];

    // Create a tooltip for this indicator
    var tip = new Tip({
      content: slide.getAttribute('data-title'),
      target: indicator,
      position: 'north'
    });

    // Show and hide the tip
    events.bind(indicator, 'mouseover', tip.show.bind(tip));
    events.bind(indicator, 'mouseout', tip.hide.bind(tip));
    events.bind(indicator, 'click', tip.hide.bind(tip));

  });

  slides.on('previous', function(){
    ga.trackEvent({
      category: 'Slider',
      action: 'button',
      label: 'Left Arrow'
    });
  });

  slides.on('next', function(){
    ga.trackEvent({
      category: 'Slider',
      action: 'button',
      label: 'Right Arrow'
    });
  });

  slides.on('select', function(i){
    ga.trackEvent({
      category: 'Slider',
      action: 'toggle',
      label: 'Slide ' + i
    });
  });

  return slides;
};