;
(function() {
  'use strict';
  // Animations
  var homeAnimate = function() {
    if ($('#home').length > 0) {
      $('#home').waypoint(function(direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(function() {
            $('#home .to-animate').each(function(k) {
              var el = $(this);
              setTimeout(function() {
                el.addClass('fadeInUp animated');
              }, k * 200, 'easeInOutExpo');
            });
          }, 200);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '80%'
      });
    }
  };

  // Document on load.
  $(function() {
    homeAnimate();
  });
}());
