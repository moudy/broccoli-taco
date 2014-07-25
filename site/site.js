var $ = require('jquery');

function start () {
  console.log('ss');
  $('body').on('click', '[data-toggle]', function (e) {
    e.preventDefault();
    var data = $(e.currentTarget).data();
    $(data.target).toggleClass(data.toggle);
  });
}

$(start);
