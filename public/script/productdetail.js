// Parse product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
let singleProductContent = document.querySelector(".single-product-content");

// Find the product data

async function getProduct() {
  try {
    const response = await fetch("script/allproducts.json");

    if (!response.ok) {
      throw new Error("HTTP Request not successful", response.status);
    }

    const products = await response.json();

    const product = products.find((item) => item.id === productId);

    if (product) {
      singleProductContent.innerHTML = `
      <section class="page-banner">
        <div class="container page-banner-container">
          <h2>#Shop</h2>
          <span class="breadcrumb"><a href="index.html">Home </a> >> <a href="shop.html">Shop</a> >> ${
            product.category
          }  >> ${product.name}</span>
        </div>
      </section>

      <!-- PRODUCT -->
      <section class="section">
        <div class="container product-container">
          <!-- Left Image Section -->
          <div class="image-gallery">
            <div class="thumbnails">
              <img src="${product.image}" alt="Thumbnail 1">
              <img src="${product.image}" alt="Thumbnail 2">
              <img src="${product.image}" alt="Thumbnail 3">
              <img src="${product.image}" alt="Thumbnail 4">
            </div>
            <div class="main-image">
              <img src="${product.image}" alt="Main Product Image">
            </div>
          </div>

          <div class="product-details">
            <h1>${product.name}</h1>
            <p class="price">₦ ${product.price.toFixed(2)}</p>
            <div class="rating">
              <span>★★★★★</span> <a href="#">(1 customer review)</a>
            </div>
            <p class="description">${product.shortDescription}</p>
            <div class="cart-options">
              <input type="number" value="1" min="1">
              <button class="button btn-large btn-black add-to-cart">Add To Cart</button>
            </div>
            <p class="addedToCart">Added to Cart!</p>
            <!-- <a href="#" class="add-to-wishlist">Add to wishlist</a> -->
            <div class="product-meta">
              <!-- <p>SKU: 071</p> -->
              <p>Category: <a href="#">${product.category}</a></p>
              <p>Tag: <a href="#">${product.category}</a></p>
            </div>
          </div>
        </div>

        <!-- Tabs Section -->
          <div class="container product-tab-container">
            <div class="product-tabs">
              <button class="product-tab active" data-tab="description">Description</button>
              <button class="product-tab" data-tab="additional-info">Additional Information</button>
              <button class="product-tab" data-tab="reviews">Reviews (1)</button>
            </div>

            <div class="tab-content active" id="description">${
              product.longDescription
            }</p>
            </div>
            <div class="tab-content" id="additional-info">
              <p>Additional product information...</p>
            </div>
            <div class="tab-content" id="reviews">
              <p>Customer reviews go here...</p>
            </div>
          </div>
       </section>
    `;
    }
  } catch (error) {
    throw new Error("Product not found.", error.message);
  }
}

getProduct();
