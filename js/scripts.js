// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    if (iOS) {
        $("#anim").removeProp('autoplay')
                 .prop('controls', true);
    }

    if (Math.random() > 0.1) {
        $("#follower").remove();
    }
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

var mouseX = 0, mouseY = 0;
$(document).mousemove(function(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
});

// cache the selector
var follower = $("#follower");
var xp = 0, yp = 0;
var loop = setInterval(function(){
    // change 12 to alter damping higher is slower
    xp += (mouseX - xp) / 12;
    yp += (mouseY - yp) / 12;
    follower.css({left:xp, top:yp});

}, 30);
