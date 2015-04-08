var mouseX = 0, mouseY = 0;
var xp = 0, yp = 0;
var bugged = false;
$(document).mousemove(function(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
});

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

    $('#below-header').click(function () {
        var follower = $("#follower");
        var loop1 = undefined;
        var loop2 = undefined;

        if (!bugged) {
            bugged = true;
            // cache the selector
            follower.show();

            loop = setInterval(function () {

                var ang = Math.floor(Math.atan2(mouseY - yp, mouseX - xp) * 180 / Math.PI) + 90;
                follower.css({transform: 'rotate(' + ang + 'deg)'});

                // change 12 to alter damping higher is slower
                xp += (mouseX - xp) / 12;
                yp += (mouseY - yp) / 12;
                follower.css({left: xp, top: yp});

            }, 30);

            loop2 = setInterval(function () {
                if (Math.abs(mouseX - xp) > 5 || Math.abs(mouseY - yp) > 5)
                    follower.find("span").toggleClass('icon-about icon-about-open');
                else {
                    follower.find("span").removeClass('icon-about-open')
                        .addClass('icon-about');
                }
            }, 200);
        } else {
            bugged = false;
            clearInterval(loop1);
            clearInterval(loop2);
            follower.hide();
        }
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
