app.controller('navCtrl', nav)

function nav($scope, $document){
  console.log('nav')
   var offset = 30;
   var top = 400;
    var duration = 200;

}

$('a[href^="#"]').on('click',function (e) {
    e.preventDefault();
    var target = this.hash,
    $target = $(target);
    $('html, body').animate({
        'scrollTop': $target.offset().top
    }, 1000, 'swing', function () {
        window.location.hash = target;
    });
});
