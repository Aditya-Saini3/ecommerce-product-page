const mainSection = document.querySelector(".product-section");
const headerSection = document.querySelector(".header-section");
const footerSection = document.querySelector(".attribution");
const productQuantity = document.querySelector(".product-quantity");
const plusButton = document.querySelector(".plus");
const minusButton = document.querySelector(".minus");
const addToCartButton = document.querySelector(".add-btn");
const cartQuantity = document.querySelector(".cart__product-quantity");
const checkoutPrice = document.querySelector(".cart__total-price");
const cartDescriptionContainer = document.querySelector(".cart-modal_container");

const cartModal = document.getElementById("cart-modal");
const cartBtn = document.getElementById("cart-btn");

//Mobile Carousel Code
const track = document.querySelector(".slider-track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const thumbnailsNav = document.querySelector(".thumbnail-images");
const thumbnails = Array.from(thumbnailsNav.children)
const thumbnailImages = document.querySelectorAll(".small-pics")
const slideWidth = slides[0].getBoundingClientRect().width;

//Desktop Carousel Code
const carousel = document.querySelector(".carousel-container");
const carouselTrack = document.querySelector(".carousel__track");
const carouselSlides = Array.from(carouselTrack.children);
const forwButton = document.querySelector(".forw");
const backButton = document.querySelector(".back");
const carouselThumbnailsNav = document.querySelector(".carousel__thumbnail-images");
const carouselThumbnails = Array.from(carouselThumbnailsNav.children);
const carouselThumbnailImages = document.querySelectorAll(".carousel__small-images")
const carouselSlideWidth = carouselSlides[0].getBoundingClientRect().width; 


//Arranging the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = "350" * index + "px";
}

function openImagesModal() {
    carouselSlides.forEach(setSlidePosition)
    carousel.style.display = "block";

    mainSection.style.transition = "filter 1.5s";
    headerSection.style.transition = "filter 1.5s";
    footerSection.style.transition = "filter 1.5s";

    mainSection.style.filter = "blur(8px)";
    headerSection.style.filter = "blur(8px)";
    footerSection.style.filter = "blur(8px)";
}

function closeImagesModal() {
    carousel.style.display = "none";

    mainSection.style.transition = "filter 0.5s";
    headerSection.style.transition = "filter 0.5s";
    footerSection.style.transition = "filter 0.5s";

    mainSection.style.filter = "blur(0px)";
    headerSection.style.filter = "blur(0px)";
    footerSection.style.filter = "blur(0px)";
}

const moveToSlide = (carouselTrack, currentSlide, targetSlide) => {
    carouselTrack.style.transform = "translateX(-" + targetSlide.style.left + ")";
    console.log(currentSlide)
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
    console.log(targetSlide)
}

const updateThumbImages = (currentThumbImage, targetThumbImage) => {
    currentThumbImage.classList.remove('current-slide');
    targetThumbImage.classList.add('current-slide');
}

const hideShowArrows = (carouselSlides, backButton, forwButton, targetIndex) => {
    if(targetIndex === 0) {
        backButton.classList.add('is-hidden')
        forwButton.classList.remove('is-hidden')
    } else if (targetIndex === carouselSlides.length - 1) {
        forwButton.classList.add('is-hidden')
        backButton.classList.remove('is-hidden')
    } else {
        forwButton.classList.remove('is-hidden')
        backButton.classList.remove('is-hidden')
    }
}

const hideShowCart = () => {
    if(cartModal.style.display === "none") {
        cartModal.style.display = "inline"
    } else {
        cartModal.style.display = "none"
    }
}

//When I click left, move slides to left
backButton.addEventListener('click', e => {
    const currentSlide = carouselTrack.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentThumbImage = carouselThumbnailsNav.querySelector('.current-slide');
    const prevThumbImage = currentThumbImage.previousElementSibling;
    const prevIndex = carouselSlides.findIndex(slide => slide === prevSlide);

    moveToSlide(carouselTrack, currentSlide, prevSlide);
    updateThumbImages(currentThumbImage, prevThumbImage);
    hideShowArrows(carouselSlides, backButton, forwButton, prevIndex)
})

//When I click right, move slides to right
forwButton.addEventListener('click', e => {
    const currentSlide = carouselTrack.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentThumbImage = carouselThumbnailsNav.querySelector('.current-slide');
    const nextThumbImage = currentThumbImage.nextElementSibling;
    const nextIndex = carouselSlides.findIndex(slide => slide === nextSlide)

    //Move to next slide
    moveToSlide(carouselTrack, currentSlide, nextSlide);
    updateThumbImages(currentThumbImage, nextThumbImage);
    hideShowArrows(carouselSlides, backButton, forwButton, nextIndex)
})

//When I click the nav thumbnail image, move to that slide
carouselThumbnailsNav.addEventListener('click', e => {
    //What thumnail image was clicked
    const targetThumbImage = e.target.closest('img')
    
    if(!targetThumbImage) return;

    const currentSlide = carouselTrack.querySelector('.current-slide');
    const currentThumbImage = carouselThumbnailsNav.querySelector('.current-slide');
    const targetIndex = carouselThumbnails.findIndex(thumb => thumb === targetThumbImage);
    const targetSlide = carouselSlides[targetIndex];

    moveToSlide(carouselTrack, currentSlide, targetSlide);
    updateThumbImages(currentThumbImage, targetThumbImage);
    hideShowArrows(carouselSlides, backButton, forwButton, targetIndex);
})

let count = 0;
let itemAmount = 0;
//When I click plus button add 1 to the count and open cart and display amount there also
plusButton.addEventListener("click", () => {
    count++
    productQuantity.innerText = count;
})


//When I click minus button minus 1 to the count and open cart and display amount there also
minusButton.addEventListener("click", () => {
    if(count > 0) {
    count--
    productQuantity.innerText = count;
    } else {
        return;
    }
})

cartBtn.addEventListener('click', () => {
    hideShowCart()
})

//When add to cart button is clicked add items into cart showing their total price and quantity.
addToCartButton.addEventListener("click", () => {
    cartModal.style.display = "block";
    setTimeout(() => {
        cartModal.style.display = "none";
    }, 4000)
    itemAmount = itemAmount + count;
    let totalPrice = 125 * itemAmount;
    cartDescriptionContainer.innerHTML = `
        <div class="cart-modal_description">
            <img src="./images/image-product-1-thumbnail.jpg" alt="Product Image" class="product-thumbnail-img"/>
            <div class="c-m-d_text">
              <p>Fall Limited Edition Sneakers</p>
              <p><span>$125</span> X <span class="cart__product-quantity">${itemAmount}</span> = <span class="cart__total-price"> $${totalPrice}</span></p>
            </div>
            <img src="./images/icon-delete.svg" alt="delete" class="delete-btn" onclick="deleteBtn()"/>
        </div>
        <button class="checkout-btn">Checkout</button>
    `
})

//When Cart's delete button is clicked, set itemAmount to 0
const deleteBtn = () => {
    itemAmount = 0;
    console.log(cartDescriptionContainer)
    cartDescriptionContainer.innerHTML = `
        <h2 class="empty-cart">Your cart is empty.</h2>
    `
}
