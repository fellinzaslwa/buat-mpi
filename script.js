
// CURRENT PAGE
let currentPage = 1;
const totalPages = 5;

function showPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    currentPage = pageNumber;

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById("page" + currentPage);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    // Update navigation
    document.getElementById("pageIndicator").textContent =
        String(currentPage).padStart(2, "0") + " / 05";

    document.getElementById("prevBtn").style.visibility =
        currentPage === 1 ? "hidden" : "visible";

    document.getElementById("nextBtn").style.visibility =
        currentPage === totalPages ? "hidden" : "visible";
}

function goNext() {
    showPage(currentPage + 1);
}

function goBack() {
    showPage(currentPage - 1);
}

function nextPage(pageNumber) {
    showPage(pageNumber);
}

// RESTART
function restart() {
    closeInvitation();
    closeMemoriesPopup();
    showPage(1);
}

// MUSIC
const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play()
            .then(() => {
                musicButton.innerHTML = "⏸ Pause Music";
            })
            .catch(error => {
                console.log("Music could not play:", error);
            });
    } else {
        bgMusic.pause();
        musicButton.innerHTML = "♫ Play Music";
    }
}

// INVITATION SLIDESHOW
let currentSlide = 0;

const invitationImages = [
    "images/1.png",
    "images/2.png"
];

function openInvitationPopup() {
    currentSlide = 0;
    updateSlide();

    document.getElementById("invitationPopup").style.display = "flex";
}

function changeSlide(direction) {
    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = invitationImages.length - 1;
    }

    if (currentSlide >= invitationImages.length) {
        currentSlide = 0;
    }

    updateSlide();
}

function updateSlide() {
    document.getElementById("invitationSlide").src =
        invitationImages[currentSlide];

    document.getElementById("slideIndicator").textContent =
        String(currentSlide + 1).padStart(2, "0") +
        " / " +
        String(invitationImages.length).padStart(2, "0");
}

function closeInvitation() {
    document.getElementById("invitationPopup").style.display = "none";
}

function closeOutside(event) {
    if (event.target.id === "invitationPopup") {
        closeInvitation();
    }
}

// OUR MEMORIES SLIDESHOW
let currentMemory = 0;

const memoryImages = [
    "images/couple1.png",
    "images/couple2.png",
    "images/couple3.png",
    "images/couple4.png"
];

function openMemoriesPopup() {
    currentMemory = 0;
    updateMemory();

    document.getElementById("memoriesPopup").style.display = "flex";
}

function changeMemory(direction) {
    currentMemory += direction;

    if (currentMemory < 0) {
        currentMemory = memoryImages.length - 1;
    }

    if (currentMemory >= memoryImages.length) {
        currentMemory = 0;
    }

    updateMemory();
}

function updateMemory() {
    document.getElementById("memorySlide").src =
        memoryImages[currentMemory];

    document.getElementById("memoryIndicator").textContent =
        String(currentMemory + 1).padStart(2, "0") +
        " / " +
        String(memoryImages.length).padStart(2, "0");
}

function closeMemoriesPopup() {
    document.getElementById("memoriesPopup").style.display = "none";
}

function closeMemoriesOutside(event) {
    if (event.target.id === "memoriesPopup") {
        closeMemoriesPopup();
    }
}

// KEYBOARD CONTROLS
document.addEventListener("keydown", function(event) {
    const invitationPopup = document.getElementById("invitationPopup");
    const memoriesPopup = document.getElementById("memoriesPopup");

    if (event.key === "Escape") {
        closeInvitation();
        closeMemoriesPopup();
    }

    if (invitationPopup.style.display === "flex") {
        if (event.key === "ArrowRight") changeSlide(1);
        if (event.key === "ArrowLeft") changeSlide(-1);
    }

    if (memoriesPopup.style.display === "flex") {
        if (event.key === "ArrowRight") changeMemory(1);
        if (event.key === "ArrowLeft") changeMemory(-1);
    }
});

// INITIAL PAGE
showPage(1);
