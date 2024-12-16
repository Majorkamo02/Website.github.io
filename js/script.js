var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-75px";
  }
  prevScrollpos = currentScrollPos;
}


document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-img');
  const closeButton = document.getElementById('close-btn');
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');

  let currentIndex = 0;

  // Open lightbox with clicked image
  function openLightbox(index) {
      currentIndex = index;
      lightboxImage.src = galleryImages[currentIndex].src;
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Lock scrolling
  }

  // Close lightbox
  function closeLightbox() {
      lightbox.classList.add('hidden');
      document.body.style.overflow = ''; // Unlock scrolling
  }

  // Show previous image
  function showPreviousImage() {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      lightboxImage.src = galleryImages[currentIndex].src;
  }

  // Show next image
  function showNextImage() {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      lightboxImage.src = galleryImages[currentIndex].src;
  }

  // Event Listeners
  galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => openLightbox(index));
  });

  closeButton.addEventListener('click', closeLightbox);
  leftArrow.addEventListener('click', showPreviousImage);
  rightArrow.addEventListener('click', showNextImage);

  // Close lightbox when clicking outside the image (on the darkened area)
  lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
  });

  // Add keyboard support for navigation
  document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('hidden')) {
          if (e.key === 'ArrowLeft') showPreviousImage();
          if (e.key === 'ArrowRight') showNextImage();
          if (e.key === 'Escape') closeLightbox();
      }
  });
});
