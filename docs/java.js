let currentImage = 0;
const images = Array.from(document.querySelectorAll(".gallery-grid img"));

function openLightbox(img) {
    currentImage = images.indexOf(img);
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeImage(direction) {
    currentImage += direction;
    if (currentImage < 0) currentImage = images.length - 1;
    if (currentImage >= images.length) currentImage = images.length - 1 ? 0 : currentImage;
    document.getElementById("lightbox-img").src = images[currentImage].src;
}


