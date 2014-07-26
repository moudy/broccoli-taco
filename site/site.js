/* globals window: false */

var $ = window.jQuery = require('../bower_components/jquery/dist/jquery.js');
require('../bower_components/headroom.js/dist/headroom.js');
require('../bower_components/headroom.js/dist/jQuery.headroom.js');

function start () {
  $('body').on('click', '[data-toggle]', function (e) {
    e.preventDefault();
    var data = $(e.currentTarget).data();
    $(data.target).toggleClass(data.toggle);
  });

  if ('/' !== window.location.pathname) $('.header').headroom();

  $('body').on('click', '.content-nav a', function (e) {
    e.preventDefault();
    var href = $(e.currentTarget).attr('href');
    var parts = href.split('#');
    var anchor = parts[1];
    if (!anchor) return;

    var $target = $('#'+anchor);
    $target.removeClass('animate-flash');
    $('html, body').stop(true, true).animate({
      scrollTop: $target.offset().top - 70
    }, 300, 'swing', function () {
      window.location.hash = anchor;
      setTimeout(function () { $target.addClass('animate-flash'); }, 10);
    });
  });

}

$(start);
