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



    // featured one
    var currentFeaturedPage = 0;
    var totalFeaturedPages = 2; // total 12 cards, 6 per page

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

    updateFeaturedCarousel();

    // top release
    var currentTopReleasesPage = 0;
    var totalTopReleasesPages = 2; // same total 12 cards, 6 per page

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

    updateTopReleasesCarousel();

    // spotlight 
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

    if ($("#spotlight-track").length > 0) {
        updateSpotlightCarousel();
    }

    // genere
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

    if ($("#genres-track").length > 0) {
        updateGenresCarousel();
    }

    // Games database for search
    var gamesDatabase = [
        {
            title: "Sifu",
            category: "Base Game",
            image: "images/epic/discover/search/10014.jpg",
            link: "game.html"
        },
        {
            title: "Sifu Digital Deluxe Edition",
            category: "Edition",
            image: "images/epic/discover/search/10015.jpg",
            link: "game.html"
        },
        {
            title: "Sifu Deluxe Edition Upgrade Bundle",
            category: "Add-On",
            image: "images/epic/discover/search/10016.jpg",
            link: "game.html"
        },
        {
            title: "PC Building Simulator 2",
            category: "Base Game",
            image: "images/epic/discover/search/10017.jpg",
            link: "#"
        },
        {
            title: "DAVE THE DIVER",
            category: "Base Game",
            image: "images/epic/discover/search/10011.jpg",
            link: "game.html"
        },
        {
            title: "Rocket League",
            category: "Base Game",
            image: "images/epic/discover/search/10010.jpg",
            link: "#"
        },
        {
            title: "EA SPORTS FC™ 26",
            category: "Base Game",
            image: "images/epic/discover/search/10026.jpg",
            link: "game.html"
        },
        {
            title: "007 First Light",
            category: "Base Game",
            image: "images/epic/discover/search/10012.jpg",
            link: "#"
        },
        {
            title: "CONTROL Resonant",
            category: "Base Game",
            image: "images/epic/discover/search/10013.jpg",
            link: "#"
        },
        {
            title: "Subnautica 2",
            category: "Base Game",
            image: "images/epic/discover/search/10019.jpg",
            link: "#"
        }
    ];

    // Search Input Logic
    $(".search-input").on("input", function () {
        var query = $(this).val().toLowerCase().trim();
        var dropdown = $(this).siblings(".search-results-dropdown");
        var listContainer = dropdown.find(".search-results-list");

        if (query === "") {
            dropdown.stop(true, true).fadeOut(150);
            return;
        }

        // Filter games matching query
        var matches = gamesDatabase.filter(function (game) {
            return game.title.toLowerCase().indexOf(query) !== -1;
        });

        // Clear previous results
        listContainer.empty();

        if (matches.length > 0) {
            // Take up to 4 top matches
            var topMatches = matches.slice(0, 4);

            $.each(topMatches, function (idx, game) {
                var itemHtml = `
                    <a href="${game.link}" class="search-result-item">
                        <img src="${game.image}" class="search-result-thumb" alt="${game.title}">
                        <div class="search-result-info">
                            <span class="search-result-category">${game.category}</span>
                            <span class="search-result-title">${game.title}</span>
                        </div>
                    </a>
                `;
                listContainer.append(itemHtml);
            });

            dropdown.stop(true, true).fadeIn(150);
        } else {
            listContainer.append('<div class="text-muted p-2 text-center" style="font-size: 13px;">No results found</div>');
            dropdown.stop(true, true).fadeIn(150);
        }
    });

    // Show dropdown again on focus if search input is not empty
    $(".search-input").on("focus", function () {
        if ($(this).val().trim() !== "") {
            $(this).siblings(".search-results-dropdown").stop(true, true).fadeIn(150);
        }
    });

    // Close dropdown when clicking outside
    $(document).on("click", function (e) {
        if (!$(e.target).closest(".search-box").length) {
            $(".search-results-dropdown").stop(true, true).fadeOut(150);
        }
    });

});