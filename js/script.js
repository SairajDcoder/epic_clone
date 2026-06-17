$(function () {

    $(".logo-item").hover(

        function () {

            $(".logo-dropdown").stop(true, true).fadeIn(150);

            $(".logo-chevron").addClass("rotate");

        },

        function () {

            $(".logo-dropdown").stop(true, true).fadeOut(150);

            $(".logo-chevron").removeClass("rotate");

        }

    );



    $(".dist-item").hover(

        function () {

            $(".dist-dropdown").stop(true, true).fadeIn(150);

            $(".dist-chevron").addClass("rotate");

        },

        function () {

            $(".dist-dropdown").stop(true, true).fadeOut(150);

            $(".dist-chevron").removeClass("rotate");

        }

    );



    var currentSlide = 0;
    var totalSlides = $(".hero-slide").length;
    var slideTimer = null;
    var slideDuration = 7000;

    function goToSlide(index) {

        $(".hero-slide").removeClass("active-slide");
        $(".hero-slide").eq(index).addClass("active-slide");

        $(".game-item").removeClass("active-game");
        $(".game-item").eq(index).addClass("active-game");

        $(".progress-fill").stop(true, true).css("width", "0%");

        $(".active-game .progress-fill").css("animation", "none");

        setTimeout(function () {
            $(".active-game .progress-fill").css("animation", "fillBar " + (slideDuration / 1000) + "s linear forwards");
        }, 10);

        currentSlide = index;

        clearTimeout(slideTimer);

        slideTimer = setTimeout(function () {
            var next = (currentSlide + 1) % totalSlides;
            goToSlide(next);
        }, slideDuration);

    }

    $(".game-item").on("click", function () {

        var index = $(this).data("index");

        goToSlide(index);

    });

    $(".next-arrow").on("click", function (e) {

        e.preventDefault();

        var next = (currentSlide + 1) % totalSlides;

        goToSlide(next);

    });

    $(".prev-arrow").on("click", function (e) {

        e.preventDefault();

        var prev = (currentSlide - 1 + totalSlides) % totalSlides;

        goToSlide(prev);

    });

    goToSlide(0);

    // Featured Carousel Logic
    var currentFeaturedPage = 0;
    var totalFeaturedPages = 2; // We have 12 cards, 6 per view = 2 pages

    function updateFeaturedCarousel() {
        var translateX = -(currentFeaturedPage * 100);
        $(".featured-track").css("transform", "translateX(" + translateX + "%)");

        if (currentFeaturedPage === 0) {
            $(".featured-prev").addClass("disabled");
        } else {
            $(".featured-prev").removeClass("disabled");
        }

        if (currentFeaturedPage === totalFeaturedPages - 1) {
            $(".featured-next").addClass("disabled");
        } else {
            $(".featured-next").removeClass("disabled");
        }
    }

    $(".featured-next").on("click", function (e) {
        e.preventDefault();
        if (currentFeaturedPage < totalFeaturedPages - 1) {
            currentFeaturedPage++;
            updateFeaturedCarousel();
        }
    });

    $(".featured-prev").on("click", function (e) {
        e.preventDefault();
        if (currentFeaturedPage > 0) {
            currentFeaturedPage--;
            updateFeaturedCarousel();
        }
    });

    // Initialize carousel state
    updateFeaturedCarousel();

    // Top Releases Carousel Logic
    var currentTopReleasesPage = 0;
    var totalTopReleasesPages = 2; // We have 12 cards, 6 per view = 2 pages

    function updateTopReleasesCarousel() {
        var translateOffset = currentTopReleasesPage === 0 ? "0px" : "calc(" + (-100 * currentTopReleasesPage) + "% - " + (20 * currentTopReleasesPage) + "px)";
        $(".top-releases-track").css("transform", "translateX(" + translateOffset + ")");

        if (currentTopReleasesPage === 0) {
            $(".top-releases-prev").addClass("disabled");
        } else {
            $(".top-releases-prev").removeClass("disabled");
        }

        if (currentTopReleasesPage === totalTopReleasesPages - 1) {
            $(".top-releases-next").addClass("disabled");
        } else {
            $(".top-releases-next").removeClass("disabled");
        }
    }

    $(".top-releases-next").on("click", function (e) {
        e.preventDefault();
        if (currentTopReleasesPage < totalTopReleasesPages - 1) {
            currentTopReleasesPage++;
            updateTopReleasesCarousel();
        }
    });

    $(".top-releases-prev").on("click", function (e) {
        e.preventDefault();
        if (currentTopReleasesPage > 0) {
            currentTopReleasesPage--;
            updateTopReleasesCarousel();
        }
    });

    // Initialize carousel state
    updateTopReleasesCarousel();

    // Spotlight Carousel Logic (Looping)
    var currentSpotlightPage = 0;
    var totalSpotlightPages = $(".spotlight-page").length;

    function updateSpotlightCarousel() {
        var translateOffset = -(currentSpotlightPage * 100);
        $("#spotlight-track").css("transform", "translateX(" + translateOffset + "%)");
    }

    $("#spotlight-next").on("click", function (e) {
        e.preventDefault();
        currentSpotlightPage = (currentSpotlightPage + 1) % totalSpotlightPages;
        updateSpotlightCarousel();
    });

    $("#spotlight-prev").on("click", function (e) {
        e.preventDefault();
        currentSpotlightPage = (currentSpotlightPage - 1 + totalSpotlightPages) % totalSpotlightPages;
        updateSpotlightCarousel();
    });

    // Initialize Spotlight
    if ($("#spotlight-track").length > 0) {
        updateSpotlightCarousel();
    }

    // Genres Carousel Logic (Looping)
    var currentGenresPage = 0;
    var totalGenresPages = $(".genres-page").length;

    function updateGenresCarousel() {
        var translateOffset = -(currentGenresPage * 100);
        $("#genres-track").css("transform", "translateX(" + translateOffset + "%)");
    }

    $("#genres-next").on("click", function (e) {
        e.preventDefault();
        currentGenresPage = (currentGenresPage + 1) % totalGenresPages;
        updateGenresCarousel();
    });

    $("#genres-prev").on("click", function (e) {
        e.preventDefault();
        currentGenresPage = (currentGenresPage - 1 + totalGenresPages) % totalGenresPages;
        updateGenresCarousel();
    });

    // Initialize Genres
    if ($("#genres-track").length > 0) {
        updateGenresCarousel();
    }

});