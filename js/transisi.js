var PageTransitions = (function () {

    var $main = $('#ruang-halaman'),
        $pages = $main.children('div.halaman'),
        $iterate = $('#tombolMulaiSekarang'),
        animcursor = 1,
        pagesCount = $pages.length,
        saatini = 0,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        support = Modernizr.cssanimations;



    function init() {

        $pages.each(function () {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class'));
        });

        $pages.eq(saatini).addClass('halaman-saatini');

        var audio = document.getElementById("audio");

        $iterate.on('click', function () {
            $('#tombolMulaiSekarang').hide();
            audio.play();

            if (isAnimating) {
                return false;
            }
            if (animcursor > 67) {
                animcursor = 1;
            }
            nextPage(animcursor);
            ++animcursor;
        });

    }



    function nextPage(options) {
        var animation = (options.animation) ? options.animation : options;

        if (isAnimating) {
            return false;
        }

        isAnimating = true;

        var $currPage = $pages.eq(saatini);

        if (options.showPage) {
            if (options.showPage < pagesCount - 1) {
                saatini = options.showPage;
            } else {
                saatini = 0;
            }
        } else {
            if (saatini < pagesCount - 1) {
                ++saatini;
            } else {
                saatini = 0;
            }
        }

        var $nextPage = $pages.eq(saatini).addClass('halaman-saatini'),
            outClass = '',
            inClass = '';

        switch (animation) {

            case 1:
                outClass = 'halaman-rotateFoldRight';
                inClass = 'halaman-moveFromLeftFade halaman-delay200';
                break;
        }

        $currPage.addClass(outClass).on(animEndEventName, function () {
            $currPage.off(animEndEventName);
            endCurrPage = true;
            if (endNextPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        $nextPage.addClass(inClass).on(animEndEventName, function () {
            $nextPage.off(animEndEventName);
            endNextPage = true;
            if (endCurrPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        if (!support) {
            onEndAnimation($currPage, $nextPage);
        }

    }

    function onEndAnimation($outpage, $inpage) {
        endCurrPage = false;
        endNextPage = false;
        resetPage($outpage, $inpage);
        isAnimating = false;
    }

    function resetPage($outpage, $inpage) {
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' halaman-saatini');
    }

    init();

    return {
        init: init,
        nextPage: nextPage,
    };

})();

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({
        loop: false
    })
    .add({
        targets: '.ml1 .letter',
        scale: [0.3, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 1500,
        delay: (el, i) => 70 * (i + 1)
    }).add({
        targets: '.ml1 .line',
        scaleX: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 1500,
        offset: '-=875',
        delay: (el, i, l) => 80 * (l - i)
    });
