// script.js
// MAMEhmej_Topia Toy Store - Dynamic Product Gallery with Image Lightbox

// ---------- TOY DATABASE (all products with correct image paths - NO EMOJIS) ----------
const toysList = [
  { name: "Xylophone", price: "$5", img: "images/xylophone.jpg", waNumber: "96103562494" },
  { name: "Painting Projection", price: "$11", img: "images/paintingprojection.jpg", waNumber: "96103562494" },
  { name: "Drawing Board", price: "$15", img: "images/drawingboard.jpg", waNumber: "96103562494" },
  { name: "Pretty Animals Big", price: "$15", img: "images/prettyanimalsbig.jpg", waNumber: "96103562494" },
  { name: "Building Block Car", price: "$20", img: "images/buildingcar.jpg", waNumber: "96103562494" },
  { name: "Metal Models", price: "$20", img: "images/metalmodels.jpg", waNumber: "96103562494" },
  { name: "Magnetic", price: "$10", img: "images/magnetictiles.jpg", waNumber: "96103562494" },
  { name: "Fold High", price: "$10", img: "images/woodblocks.jpg", waNumber: "96103562494" },
  { name: "DIY Earphones", price: "$10", img: "images/diyearphones.jpg", waNumber: "96103562494" },
  { name: "Learning Fun", price: "$15", img: "images/electronicpiano.jpg", waNumber: "96103562494" },
  { name: "Toy Beads", price: "$15", img: "images/toybeads.jpg", waNumber: "96103562494" },
  { name: "Baby Sweet Love", price: "$10", img: "images/babydoll.jpg", waNumber: "96103562494" },
  { name: "Bowling", price: "$10", img: "images/bowlingfun.jpg", waNumber: "96103562494" },
  { name: "Pretty Animals Small", price: "$8", img: "images/prettyanimalssmall.jpg", waNumber: "96103562494" },
  { name: "Connect 4", price: "Price TBD", img: "images/connect4.jpeg", waNumber: "96103562494" },
  { name: "Happy Gina", price: "$8", img: "images/happygina.jpg", waNumber: "96103562494" },
  { name: "Color n Style", price: "$8", img: "images/colornstyle.jpg", waNumber: "96103562494" },
  { name: "Educational Toy Set", price: "$8", img: "images/educationaltoy.jpg", waNumber: "96103562494" },
  { name: "Pom Pom Bag", price: "$9", img: "images/pompombag.jpg", waNumber: "96103562494" },
  { name: "Unicorn Bank", price: "$8", img: "images/unicornjar.jpg", waNumber: "96103562494" },
  { name: "Hair Beader", price: "$8", img: "images/hair-beader.jpg", waNumber: "96103562494" },
  { name: "Singer Star", price: "$8", img: "images/singstar.jpg", waNumber: "96103562494" },
  { name: "Melody Ball", price: "Price TBD", img: "images/ballon.jpg", waNumber: "96103562494" },
  { name: "Book", price: "$10", img: "images/musicbook.jpg", waNumber: "96103562494" },
  { name: "Fashion Creative", price: "$8", img: "images/fashioncreative.jpg", waNumber: "96103562494" },
  { name: "DIY Bracelets", price: "$9", img: "images/bracelets.jpg", waNumber: "96103562494" },
  { name: "J'apprends ABC", price: "$10", img: "images/abc.jpg", waNumber: "96103562494" },
  { name: "Electronic Organ", price: "$8", img: "images/electronicorgan.jpg", waNumber: "96103562494" },
  { name: "Fishing", price: "$10", img: "images/fishing.jpg", waNumber: "96103562494" },
  { name: "Snack", price: "$10", img: "images/snack.jpg", waNumber: "96103562494" }
];

// Helper: Generate WhatsApp link with proper message
function getWhatsLink(toyName, price, numberCode) {
  let phone = numberCode === "96181239091" ? "96181239091" : "96103562494";
  let message = `Hello! I'm interested in buying "${toyName}" (${price}) from MAMEhmej_Topia. Is it available? I'd love to order!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// ---------- LIGHTBOX FUNCTIONALITY (click to open photo) ----------
function createLightbox() {
  // Create lightbox elements if they don't exist
  if (!document.querySelector('.lightbox-overlay')) {
    const lightboxHTML = `
      <div class="lightbox-overlay" id="lightboxOverlay">
        <div class="lightbox-container">
          <button class="lightbox-close" id="lightboxClose">&times;</button>
          <button class="lightbox-prev" id="lightboxPrev">&#10094;</button>
          <button class="lightbox-next" id="lightboxNext">&#10095;</button>
          <img class="lightbox-image" id="lightboxImage" alt="Enlarged toy image">
          <div class="lightbox-caption" id="lightboxCaption"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  }
  
  const overlay = document.getElementById('lightboxOverlay');
  const lightboxImg = document.getElementById('lightboxImage');
  const caption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  
  let currentImageIndex = 0;
  let currentImagesArray = [];
  
  // Function to open lightbox with specific image
  window.openLightbox = function(imgSrc, toyName, allImages, index) {
    if (lightboxImg) {
      lightboxImg.src = imgSrc;
      caption.textContent = toyName || 'Toy Image';
      currentImagesArray = allImages || [];
      currentImageIndex = index || 0;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  };
  
  // Close lightbox
  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Navigate to previous image
  function prevImage() {
    if (currentImagesArray.length > 0) {
      currentImageIndex = (currentImageIndex - 1 + currentImagesArray.length) % currentImagesArray.length;
      const prevItem = currentImagesArray[currentImageIndex];
      lightboxImg.src = prevItem.src;
      caption.textContent = prevItem.name;
    }
  }
  
  // Navigate to next image
  function nextImage() {
    if (currentImagesArray.length > 0) {
      currentImageIndex = (currentImageIndex + 1) % currentImagesArray.length;
      const nextItem = currentImagesArray[currentImageIndex];
      lightboxImg.src = nextItem.src;
      caption.textContent = nextItem.name;
    }
  }
  
  // Event listeners
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  
  // Close on overlay click (background)
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeLightbox();
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (overlay && overlay.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    }
  });
}

// Function to setup image click handlers for lightbox
function setupImageClickHandlers() {
  const allCards = document.querySelectorAll('.toy-card');
  const imagesData = [];
  
  // Collect all image data from cards
  allCards.forEach((card, idx) => {
    const img = card.querySelector('.card-img img');
    const title = card.querySelector('.toy-title')?.innerText || 'Toy';
    if (img && img.src && !img.src.includes('blob') && img.style.display !== 'none') {
      imagesData.push({
        src: img.src,
        name: title,
        element: img
      });
    }
  });
  
  // Add click handler to each image container
  document.querySelectorAll('.card-img').forEach((imgContainer, idx) => {
    const img = imgContainer.querySelector('img');
    const titleElem = imgContainer.closest('.toy-card')?.querySelector('.toy-title');
    const toyName = titleElem ? titleElem.innerText : 'Toy Image';
    
    // Make the image container clickable
    imgContainer.style.cursor = 'pointer';
    imgContainer.addEventListener('click', function(e) {
      e.stopPropagation();
      let imgSrc = '';
      const actualImg = this.querySelector('img');
      
      if (actualImg && actualImg.src && actualImg.style.display !== 'none') {
        imgSrc = actualImg.src;
      } else {
        // If image failed to load, use fallback with data
        const fallbackDiv = this.querySelector('.fallback-emoji');
        if (fallbackDiv) {
          alert(`📸 "${toyName}" - Image coming soon! 🧸\nContact us on WhatsApp to see the product.`);
          return;
        }
        imgSrc = actualImg ? actualImg.src : '';
      }
      
      if (imgSrc) {
        // Build array of all valid images for navigation
        const allValidImages = [];
        document.querySelectorAll('.card-img').forEach(container => {
          const validImg = container.querySelector('img');
          const validTitle = container.closest('.toy-card')?.querySelector('.toy-title')?.innerText || 'Toy';
          if (validImg && validImg.src && validImg.style.display !== 'none') {
            allValidImages.push({
              src: validImg.src,
              name: validTitle
            });
          }
        });
        
        const currentIndex = allValidImages.findIndex(item => item.src === imgSrc);
        window.openLightbox(imgSrc, toyName, allValidImages, currentIndex >= 0 ? currentIndex : 0);
      }
    });
  });
}

// Function to preload and handle images with better error fallback (no emojis)
function setupImageWithFallback(imgElement, toy) {
  const originalSrc = toy.img;
  imgElement.src = originalSrc;
  imgElement.alt = toy.name;
  imgElement.loading = "lazy";
  
  imgElement.onerror = function() {
    const parentImgDiv = this.closest('.card-img');
    if (parentImgDiv) {
      parentImgDiv.style.background = `linear-gradient(135deg, #ffe0b5, #ffcc88)`;
      parentImgDiv.style.display = 'flex';
      parentImgDiv.style.alignItems = 'center';
      parentImgDiv.style.justifyContent = 'center';
      parentImgDiv.style.flexDirection = 'column';
      
      this.style.display = 'none';
      
      if (!parentImgDiv.querySelector('.fallback-emoji')) {
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'fallback-emoji';
        fallbackDiv.innerHTML = `
          <div style="font-size: 2.5rem; margin-bottom: 8px;">📸</div>
          <div style="font-size: 0.8rem; color: #a0522d; font-weight: bold;">${toy.name}</div>
          <div style="font-size: 0.65rem; color: #888; margin-top: 5px;">Image coming soon</div>
        `;
        fallbackDiv.style.textAlign = 'center';
        parentImgDiv.appendChild(fallbackDiv);
      }
    }
  };
  
  imgElement.onload = function() {
    const parentImgDiv = this.closest('.card-img');
    if (parentImgDiv) {
      const existingFallback = parentImgDiv.querySelector('.fallback-emoji');
      if (existingFallback) existingFallback.remove();
      this.style.display = 'block';
    }
  };
}

// Render all toys dynamically (no emojis in titles)
function renderToys() {
  const container = document.getElementById("toysGrid");
  if (!container) return;
  
  container.innerHTML = "";
  
  toysList.forEach(toy => {
    const card = document.createElement("div");
    card.className = "toy-card";
    
    const imgDiv = document.createElement("div");
    imgDiv.className = "card-img";
    
    const img = document.createElement("img");
    setupImageWithFallback(img, toy);
    imgDiv.appendChild(img);
    
    const infoDiv = document.createElement("div");
    infoDiv.className = "toy-info";
    
    const titleSpan = document.createElement("div");
    titleSpan.className = "toy-title";
    titleSpan.innerHTML = `${toy.name}`;  // No emoji here
    
    const priceSpan = document.createElement("div");
    priceSpan.className = "toy-price";
    priceSpan.innerText = toy.price;
    
    const buyBtn = document.createElement("a");
    buyBtn.className = "buy-wa-btn";
    buyBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Click & buy!';
    const whatsLink = getWhatsLink(toy.name, toy.price, toy.waNumber);
    buyBtn.href = whatsLink;
    buyBtn.target = "_blank";
    buyBtn.setAttribute("aria-label", `Buy ${toy.name} via WhatsApp`);
    
    infoDiv.appendChild(titleSpan);
    infoDiv.appendChild(priceSpan);
    infoDiv.appendChild(buyBtn);
    card.appendChild(imgDiv);
    card.appendChild(infoDiv);
    container.appendChild(card);
  });
}

// Add animation on scroll
function addScrollAnimations() {
  const cards = document.querySelectorAll('.toy-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '20px' });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
}

// Optimize for mobile
function optimizeForMobile() {
  if ('ontouchstart' in window) {
    document.body.style.touchAction = "manipulation";
  }
  
  const allButtons = document.querySelectorAll('.buy-wa-btn, .floating-buy, .contact-links-mini a');
  allButtons.forEach(btn => {
    btn.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.97)';
    });
    btn.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  renderToys();
  createLightbox(); // Create lightbox first
  setTimeout(() => {
    addScrollAnimations();
    setupImageClickHandlers(); // Setup click handlers after images are rendered
    optimizeForMobile();
  }, 150);
  console.log("MAMEhmej_Topia is ready! Click any photo to enlarge! WhatsApp: 81239091 / 03562494");
});

// Sale ribbon rotation
function updateSaleRibbon() {
  const ribbon = document.querySelector('.sale-ribbon span');
  if (ribbon) {
    const messages = [
      "TOY SALE! ",
      "Ask on WhatsApp!",
      "Contact us now!",
      "LIMITED STOCK!",
      "Click on any toy photo to see it bigger!"
    ];
    let index = 0;
    setInterval(() => {
      index = (index + 1) % messages.length;
      ribbon.textContent = messages[index];
    }, 5000);
  }
}
updateSaleRibbon();