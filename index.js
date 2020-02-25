

// Fucking smooth scrolling
$(document).ready(function () {

    var scrollreveal = ScrollReveal();

    scrollreveal.reveal('.jumbotron-content', {
        delay: 300,
        origin: 'top',
        distance: '50px',
        duration: 1500,
        reset: true
    });

    scrollreveal.reveal('.info-panel', {
        delay: 400,
        reset: true,
        origin: 'bottom',
        distance: '50px',
        duration: 1500
    });

    scrollreveal.reveal('.working-space', {
        delay: 300,
        reset: true,
        origin: 'top',
        distance: '20px',
        duration: 1000
    });

    scrollreveal.reveal('.project-panel-item', {
        delay: 300,
        reset: true,
        origin: 'bottom',
        distance: '50px',
        duration: 1200
    });

    scrollreveal.reveal('.logo', {
        delay: 300,
        origin: 'bottom',
        distance: '50px',
        reset: true,
        duration: 1000
    });



    $(".scroll").click(function (e) {
        e.preventDefault();

        $('body, html').animate({
            scrollTop: $(this.hash).offset().top
        }, 1300);

    });

    $(".scroll-bottom").click(function (e) {
        e.preventDefault();

        $('body, html').animate({
            scrollTop: $(this.hash).offset().top
        }, 1300);

    });

});


$(document).ready(function () {
    $(".jumbotron").parallaxie({
        speed: 0.5
    });
});
