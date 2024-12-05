const hamburgerIcon = document.getElementById("hamburger");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");
const mobileMenu = document.getElementById("mobile-menu");
let homeProducts = document.querySelector(".home-products");

let allproductsHTML = "";
// let cartAddButtonEl;
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

async function loadAllProducts() {
  try {
    const response = await fetch("script/allproducts.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();

    products.forEach((product, index) => {
      allproductsHTML += `
        <div class="product-item">
          <div class="product-image">
            <div class="product-overlay">
              <a href="" class="product-thumb"><i class="fa-icon fa-regular fa-heart"></i></a>
              <a href="singleproduct.html?id=${
                product.id
              }" class="product-thumb"><i class="fa-icon fa-regular fa-eye"></i></a>
              <button class="product-thumb btnAddItem" data-product-index="${index}"><i class="fa-icon fa-solid fa-cart-plus"></i></button>
            </div>
            <a href="singleproduct.html?id=${product.id}">
            <img src="${product.image}" alt=""></a>
          </div>
          <div class="product-info">
            <div class="product-details">
              <a href="singleproduct.html?id=${
                product.id
              }" class="product-name">${product.name}</a>
              <a href="" class="product-category">${product.category}</a>
            </div>
            <div class="price">
              <span>₦ ${product.price.toFixed(2)}</span>
              <p class="addedToCart">Added to Cart!</p>
            </div>
          </div>
        </div>
      `;
    });

    homeProducts.innerHTML = allproductsHTML;

    addToCart(products);

    console.log(products);
  } catch (error) {
    console.error("Error loading JSON file:", error);
  }
}

loadAllProducts();

function addToCart(product) {
  const addedToCartEl = document.querySelectorAll(".addedToCart");
  const btnAddToCartEl = document.querySelectorAll(".btnAddItem");

  btnAddToCartEl.forEach((button, index) => {
    button.addEventListener("click", () => {
      addedToCartEl[index].classList.add("cartAnimation");
      setTimeout(() => {
        addedToCartEl[index].classList.remove("cartAnimation");
      }, 2000);

      let productIndex = button.dataset.productIndex;
      let matchingItem;

      cartItems.forEach((item) => {
        if (productIndex === item.productIndex) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cartItems.push({
          productIndex,
          name: `${product[productIndex].name}`,
          thumbnail: `${product[productIndex].image}`,
          price: product[productIndex].price,
          quantity: 1,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      console.log(cartItems);
      calculateTotal();
    });
  });
}
let orderTotal = 0;

function calculateTotal() {
  cartItems.forEach((cartItem) => {
    let totalItems = cartItems.length;
    let thumbnail = cartItem.thumbnail;
    let itemName = cartItem.name;
    let numberOfItem = cartItem.quantity;
    let costPerItem = cartItem.price;
    let totalPerItem = cartItem.quantity * cartItem.price;
    orderTotal += cartItem.quantity * cartItem.price;

    console.log(
      totalItems,
      itemName,
      numberOfItem,
      costPerItem,
      totalPerItem,
      orderTotal
    );
  });
}

calculateTotal();

// SINGLE PRODUCT PAGE - PRODUCT TABS
let productTabBtn = document.querySelectorAll(".product-tab");
const tabContents = document.querySelectorAll(".tab-content");

productTabBtn.forEach((button) => {
  button.addEventListener("click", () => {
    productTabBtn.forEach((btn) => {
      btn.classList.remove("active");
    });

    tabContents.forEach((tabcontent) => {
      tabcontent.classList.remove("active");
    });

    button.classList.add("active");

    const tabId = button.getAttribute("data-tab");
    const activeTabContent = document.getElementById(tabId);

    activeTabContent.classList.add("active");
  });
});

//

function closeMobileMenu() {
  mobileMenu.style.width = "0";
  overlay.style.display = "none";
}

function openMobileMenu() {
  mobileMenu.style.width = "25rem";
  overlay.style.display = "block";
  mobileMenu.style.display = "block";
}

overlay.addEventListener("click", closeMobileMenu);
closeMenu.addEventListener("click", closeMobileMenu);
hamburgerIcon.addEventListener("click", openMobileMenu);

const tabSignupBtn = document.getElementById("tab-signup");
const tabLoginBtn = document.getElementById("tab-login");
const userRegisterForm = document.querySelector(".user-register-form");
const userLoginForm = document.querySelector(".user-login-form");
const userInputField = document.querySelectorAll(".input-field");

function clearInputValue() {
  userInputField.forEach((input) => {
    input.value = "";
  });
}

tabSignupBtn.addEventListener("click", () => {
  userRegisterForm.classList.remove("hidden");
  userLoginForm.classList.add("hidden");
  tabSignupBtn.style.borderBottom = "2px solid black";
  tabLoginBtn.style.borderBottom = "none";
  clearInputValue();
});

tabLoginBtn.addEventListener("click", () => {
  userRegisterForm.classList.add("hidden");
  userLoginForm.classList.remove("hidden");
  tabLoginBtn.style.borderBottom = "2px solid black";
  tabSignupBtn.style.borderBottom = "none";
  userInputField.value = "";
  clearInputValue();
});
