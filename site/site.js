/* globals window: false */

var $ = window.jQuery = require('../bower_components/jquery/dist/jquery.js');
require('../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js');
require('../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js');

function start () {
  $('body').on('click', '[data-toggle]', function (e) {
    e.preventDefault();
    var data = $(e.currentTarget).data();
    $(data.target).toggleClass(data.toggle);
  });

  $('body').on('click', '.content-nav a', function (e) {
    e.preventDefault();
    var href = $(e.currentTarget).attr('href');
    var parts = href.split('#');
    var anchor = parts[1];
    if (!anchor) return;

    var $target = $('#'+anchor);
    $('html, body').stop(true, true).animate({
      scrollTop: $target.offset().top - 20
    }, 300, 'swing', function () {
      window.location.hash = anchor;
    });
  });

  $('.content-nav').affix({
    offset: {
      top: $('.header').outerHeight()+$('.hero').outerHeight() + 30
    , bottom: function () {
        return (this.bottom = $('.footer').outerHeight(true))
      }
    }
  });

  $('body').scrollspy({ target: '.nav-sidebar', offset: 40 })

}

$(start);
