// ============================================================
// games-data.js
// Curated data for flagship games + a generic fallback builder.
// game.html reads the URL (?title=...&img=...&price=...) that
// was passed in by whichever card the user clicked anywhere on
// the site, looks the title up here for a rich page, and if it
// isn't in the database, auto-builds a sensible detail page from
// whatever the clicked card itself gave us. That's what makes a
// single game.html work for every single game/card on the site.
// ============================================================

// --- 1. Curated data for the "hero" titles that deserve a fuller page ---
const GAMES_DB = {

    "ea sports fc 26 the world's game edition": {
        title: "EA SPORTS FC™ 26 The World's Game Edition",
        image: "images/epic/discover/10002.jpg",
        gallery: [
            "images/epic/discover/10048.jpg",
            "images/epic/discover/10049.jpg",
            "images/epic/discover/10050.jpg",
            "images/epic/discover/10051.jpg",
            "images/epic/discover/10052.jpg"
        ],
        rating: "4.2",
        about: "The Club is Yours in EA SPORTS FC™ 26. Play your way with an overhauled gameplay experience powered by Community feedback, Manager Live Challenges that bring fresh storylines to the new season, and Archetypes inspired by greats of the game.",
        genres: ["Simulation", "Sports"],
        features: ["Co-op", "Multiplayer", "Single Player"],
        includesTitle: "EA SPORTS FC™ 26 The World's Game Edition Includes:",
        includes: [
            "3,000 Season Points",
            "One Gold Starting XI Pack, with 11 untradeable Rare Gold Player Items rated 84 or higher"
        ],
        editionTag: "Edition",
        oldPrice: "₹5,499",
        newPrice: "₹1,099.80",
        discount: "-80%",
        saleEnds: "Sale ends 7/30/2026 at 8:30 PM",
        developer: "EA CANADA",
        publisher: "Electronic Arts",
        releaseDate: "06/04/26"
    },

    "football manager 26": {
        title: "Football Manager 26",
        image: "images/epic/discover/fm26.jpg",
        gallery: [],
        rating: "4.4",
        about: "Take charge of any club, in any division, in over 30 nations. Build tactics, scout wonderkids, negotiate transfers, and lead your team from the dugout to the trophy cabinet.",
        genres: ["Simulation", "Sports", "Strategy"],
        features: ["Single Player", "Deep Management"],
        includesTitle: "Football Manager 26 Includes:",
        includes: ["Full career mode across 30+ leagues", "In-match 3D engine"],
        editionTag: "Base Game",
        oldPrice: "₹3,999",
        newPrice: "₹3,199.20",
        discount: "-20%",
        saleEnds: "Sale ends soon",
        developer: "Sports Interactive",
        publisher: "SEGA",
        releaseDate: "11/04/25"
    },

    "cyberpunk 2077 ultimate edition": {
        title: "Cyberpunk 2077: Ultimate Edition",
        image: "images/epic/discover/10011.jpg",
        gallery: [],
        rating: "4.6",
        about: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour, and body modification. Play as V, a mercenary outlaw, and make a name for yourself.",
        genres: ["RPG", "Action-Adventure"],
        features: ["Single Player", "Open World"],
        includesTitle: "Ultimate Edition Includes:",
        includes: ["Base game", "Phantom Liberty expansion", "All bonus digital content"],
        editionTag: "Edition",
        oldPrice: "₹2,999",
        newPrice: "₹1,499.50",
        discount: "-50%",
        saleEnds: "Sale ends soon",
        developer: "CD PROJEKT RED",
        publisher: "CD PROJEKT RED",
        releaseDate: "12/10/20"
    },

    "elden ring shadow of the erdtree": {
        title: "ELDEN RING Shadow of the Erdtree",
        image: "images/epic/discover/10013.jpg",
        gallery: [],
        rating: "4.8",
        about: "An expansive story-driven expansion for ELDEN RING. Journey to the Land of Shadow and stand against the mysteries and threats that lie in wait. The path ahead is treacherous, and the truth is even more so.",
        genres: ["RPG", "Action"],
        features: ["Single Player", "Co-op", "Open World"],
        editionTag: "DLC",
        oldPrice: "₹3,499",
        newPrice: "₹3,499",
        discount: "",
        saleEnds: "",
        developer: "FromSoftware",
        publisher: "Bandai Namco",
        releaseDate: "20/06/24"
    },

    "red dead redemption 2 ultimate edition": {
        title: "Red Dead Redemption 2: Ultimate Edition",
        image: "images/epic/discover/10019.jpg",
        gallery: [],
        rating: "4.7",
        about: "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters closing in, the gang must rob, steal, and fight to survive in a hostile world.",
        genres: ["Action-Adventure", "Open World"],
        features: ["Single Player", "Online Multiplayer"],
        editionTag: "Edition",
        oldPrice: "₹4,999",
        newPrice: "₹2,499.50",
        discount: "-50%",
        saleEnds: "Sale ends soon",
        developer: "Rockstar Games",
        publisher: "Rockstar Games",
        releaseDate: "05/11/19"
    },

    "hades ii early access": {
        title: "Hades II - Early Access",
        image: "images/epic/discover/10010.jpg",
        gallery: [],
        rating: "4.9",
        about: "Fend off the forces of the Titan of Time using dark sorcery, deadly force, and the boons of Olympian allies in this bewitching sequel to the acclaimed rogue-like dungeon crawler.",
        genres: ["Roguelike", "Action"],
        features: ["Single Player", "Early Access"],
        editionTag: "Early Access",
        oldPrice: "₹899",
        newPrice: "₹899",
        discount: "",
        saleEnds: "",
        developer: "Supergiant Games",
        publisher: "Supergiant Games",
        releaseDate: "06/05/24"
    }
};

// --- 2. Helpers ---

function slugifyTitle(str) {
    if (!str) return "";
    return str
        .toLowerCase()
        .replace(/™|®|©/g, "")
        .replace(/[\u2018\u2019\u201C\u201D]/g, "") // strip smart quotes
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function findCuratedGame(title) {
    const slug = slugifyTitle(title);
    if (!slug) return null;
    // exact match first
    if (GAMES_DB[slug]) return GAMES_DB[slug];
    // fall back to loose "contains" match so slightly different
    // title strings (e.g. missing edition suffix) still resolve
    for (const key in GAMES_DB) {
        if (slug.indexOf(key) !== -1 || key.indexOf(slug) !== -1) {
            return GAMES_DB[key];
        }
    }
    return null;
}

// Builds a full data object for ANY game, using curated data if we
// have it, otherwise generating sensible defaults from whatever the
// clicked card passed us in the URL.
function buildGameData(params) {
    const title = params.get("title") || "Unknown Game";
    const curated = findCuratedGame(title);

    if (curated) {
        return curated;
    }

    // Generic fallback, built from the clicked card's own data
    const img = params.get("img") || "images/epic/discover/10002.jpg";
    const priceParam = params.get("price") || "";
    const isFree = /free/i.test(priceParam);

    let oldPrice = "";
    let newPrice = isFree ? "Free" : (priceParam || "₹1,499");
    let discount = "";

    const discountMatch = priceParam.match(/-\d+%/);
    if (discountMatch) discount = discountMatch[0];

    return {
        title: title,
        image: img,
        gallery: [],
        rating: (3.8 + Math.random() * 1.1).toFixed(1),
        about: "Dive into " + title + " — available now on the Epic Games Store. Check back soon for a full description, screenshots, and system requirements for this title.",
        genres: ["Adventure", "Action"],
        features: ["Single Player"],
        editionTag: "Base Game",
        oldPrice: oldPrice,
        newPrice: newPrice,
        discount: discount,
        saleEnds: discount ? "Sale ends soon" : "",
        developer: "Independent Studio",
        publisher: "Epic Games",
        releaseDate: "TBA"
    };
}

// --- 3. Populate the page ---

function populateGamePage(data) {
    document.getElementById("pageTitle").textContent = data.title + " | Epic Games";
    document.getElementById("gameTitle").textContent = data.title;
    document.getElementById("ratingNum").textContent = data.rating;
    document.getElementById("ratingsSectionNumber").textContent = data.rating;

    // Main image
    const mainImg = document.getElementById("mainImage");
    mainImg.src = data.image;

    // Gallery thumbnails
    const thumbTrack = document.getElementById("thumbTrack");
    if (thumbTrack) {
        thumbTrack.innerHTML = "";
        var galleryImages = (data.gallery && data.gallery.length) ? data.gallery : [data.image];
        galleryImages.forEach(function (src, idx) {
            var div = document.createElement("div");
            div.className = "thumb-box" + (idx === 0 ? " active" : "");
            var img = document.createElement("img");
            img.src = src;
            img.className = "thumb-img";
            img.alt = "Screenshot " + (idx + 1);
            div.appendChild(img);
            div.addEventListener("click", function () {
                mainImg.src = src;
                thumbTrack.querySelectorAll(".thumb-box").forEach(function (b) { b.classList.remove("active"); });
                div.classList.add("active");
            });
            thumbTrack.appendChild(div);
        });
    }

    // About text
    document.getElementById("aboutText").textContent = data.about;

    // Genres
    var genreWrap = document.getElementById("genreTags");
    genreWrap.innerHTML = "";
    (data.genres || []).forEach(function (g) {
        var a = document.createElement("a");
        a.href = "#";
        a.textContent = g;
        genreWrap.appendChild(a);
    });

    // Features
    var featureWrap = document.getElementById("featureTags");
    featureWrap.innerHTML = "";
    (data.features || []).forEach(function (f) {
        var a = document.createElement("a");
        a.href = "#";
        a.textContent = f;
        featureWrap.appendChild(a);
    });

    // Includes section
    var includesSection = document.getElementById("includesSection");
    if (data.includes && data.includes.length) {
        document.getElementById("includesTitle").textContent = data.includesTitle || (data.title + " Includes:");
        var list = document.getElementById("includesList");
        list.innerHTML = "";
        data.includes.forEach(function (item) {
            var li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });
        includesSection.style.display = "";
    } else {
        includesSection.style.display = "none";
    }

    // Edition card
    document.getElementById("editionImg").src = data.image;
    document.getElementById("editionTag").textContent = data.editionTag;
    document.getElementById("editionTitle").textContent = data.title;
    document.getElementById("editionDesc").textContent = data.about.slice(0, 180) + (data.about.length > 180 ? "..." : "");
    setPriceBlock("edition", data);

    // Edition sale ends
    var editionSaleEl = document.getElementById("editionSaleEnds");
    if (editionSaleEl) {
        if (data.saleEnds) {
            editionSaleEl.textContent = data.saleEnds;
            editionSaleEl.style.display = "";
        } else {
            editionSaleEl.style.display = "none";
        }
    }

    // System requirements title
    document.getElementById("sysReqTitle").textContent = data.title + " System Requirements";

    // Editions section title
    var editionsTitle = document.getElementById("editionsTitle");
    if (editionsTitle) {
        editionsTitle.textContent = data.title + " Editions";
    }

    // Sidebar
    document.getElementById("sidebarLogo").src = data.image;
    document.getElementById("sidebarEditionTag").textContent = data.editionTag;
    setPriceBlock("sidebar", data);
    document.getElementById("sidebarDeveloper").textContent = data.developer;
    document.getElementById("sidebarPublisher").textContent = data.publisher;
    document.getElementById("sidebarReleaseDate").textContent = data.releaseDate;
}

function setPriceBlock(prefix, data) {
    var isSidebar = prefix === "sidebar";
    var oldEl = document.getElementById(isSidebar ? "sidebarOldPrice" : "editionOldPrice");
    var newEl = document.getElementById(isSidebar ? "sidebarNewPrice" : "editionNewPrice");
    var dEl = document.getElementById(isSidebar ? "sidebarDiscount" : "editionDiscount");
    var saleEl = isSidebar ? document.getElementById("sidebarSaleEnds") : null;

    if (data.discount) {
        if (dEl) { dEl.textContent = data.discount; dEl.style.display = ""; }
        if (oldEl && data.oldPrice) { oldEl.textContent = data.oldPrice; oldEl.style.display = ""; }
    } else {
        if (dEl) dEl.style.display = "none";
        if (oldEl) oldEl.style.display = "none";
    }
    if (newEl) newEl.textContent = data.newPrice;
    if (saleEl) {
        if (data.saleEnds) {
            saleEl.textContent = data.saleEnds;
            saleEl.style.display = "";
        } else {
            saleEl.style.display = "none";
        }
    }
}

// --- 4. Run on load ---
document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var data = buildGameData(params);
    populateGamePage(data);

    // Thumbnail carousel scroll buttons
    var thumbTrack = document.getElementById("thumbTrack");
    var prevBtn = document.querySelector(".thumb-prev");
    var nextBtn = document.querySelector(".thumb-next");

    if (prevBtn && thumbTrack) {
        prevBtn.addEventListener("click", function () {
            thumbTrack.scrollBy({ left: -200, behavior: "smooth" });
        });
    }
    if (nextBtn && thumbTrack) {
        nextBtn.addEventListener("click", function () {
            thumbTrack.scrollBy({ left: 200, behavior: "smooth" });
        });
    }
});