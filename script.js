let buyBtn = document.querySelectorAll(".buy-btn");

buyBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let productName = btn.closest(".content").querySelector("h1").innerText;
    window.location.href = `order.html?product=${encodeURIComponent(productName)}`;
  });
});

let liked = document.querySelectorAll(".heart");
let storedLikes = JSON.parse(localStorage.getItem("likedItems")) || [];

// 🔴 Make heart red if already liked (on refresh)
liked.forEach((btn) => {
  const productName = btn.closest(".content").querySelector("h1").innerText;
  const isLiked = storedLikes.some(item => item.name === productName);
  if (isLiked) {
    btn.classList.add("liked");
  }
});

liked.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productElement = btn.closest(".content");
    let productName = productElement.querySelector("h1").innerText;
    let productImage = btn.closest(".container").querySelector("img").src;

    let like = JSON.parse(localStorage.getItem("likedItems")) || [];
    const index = like.findIndex(item => item.name === productName);

    if (index === -1) {
      // Not yet liked – add it
      like.push({ name: productName, image: productImage });
      localStorage.setItem("likedItems", JSON.stringify(like));
      btn.classList.add("liked");
    } else {
      // Already liked – remove it
      like.splice(index, 1);
      localStorage.setItem("likedItems", JSON.stringify(like));
      btn.classList.remove("liked");
    }
  });
});

let likeIcon = document.querySelector("#liked");
let likedItems = document.querySelector(".liked-items");
likedItems.classList.add("hide");

likeIcon.addEventListener("click", () => {
  if (likedItems.classList.contains("hide")) {
    likedItems.classList.remove("hide");
    likedItems.innerHTML = "";

    const like = JSON.parse(localStorage.getItem("likedItems")) || [];

    like.forEach((item, index) => {
      const row = document.createElement("div");
      row.classList.add("style");

      const img = document.createElement("img");
      img.src = item.image;
      img.width = 50;

      const nameSpan = document.createElement("span");
      nameSpan.innerText = item.name;

      const delBtn = document.createElement("button");
      delBtn.innerText = "❌";
      delBtn.style.border = "none";
      delBtn.style.background = "rgb(235, 230, 235)";
      delBtn.style.cursor = "pointer";

      delBtn.addEventListener("click", () => {
        like.splice(index, 1);
        localStorage.setItem("likedItems", JSON.stringify(like));

        // Update heart icon color
        document.querySelectorAll(".heart").forEach((btn) => {
          const name = btn.closest(".content").querySelector("h1").innerText;
          if (!like.some(item => item.name === name)) {
            btn.classList.remove("liked");
          }
        });

        likeIcon.click(); // Refresh view
      });

      row.appendChild(img);
      row.appendChild(nameSpan);
      row.appendChild(delBtn);
      likedItems.appendChild(row);
    });
  } else {
    likedItems.classList.add("hide");
  }
});

// Handle "Add to Cart" button state on page load
const cartButtons = document.querySelectorAll(".cart");
let storedCart = JSON.parse(localStorage.getItem("cartproduct")) || [];

// Set button text correctly on page load
cartButtons.forEach((btn) => {
  const productName = btn.closest(".content").querySelector("h1").innerText;
  const isAdded = storedCart.some(item => item.name === productName);
  if (isAdded) {
    btn.innerText = "Added to Cart";
  }
});

// Add to Cart button logic
cartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productElement = btn.closest(".content");
    const productName = productElement.querySelector("h1").innerText;
    const productImage = btn.closest(".container").querySelector("img").src;

    let cart = JSON.parse(localStorage.getItem("cartproduct")) || [];
    const exists = cart.some(item => item.name === productName);

    if (!exists) {
      cart.push({ name: productName, image: productImage });
      localStorage.setItem("cartproduct", JSON.stringify(cart));
      btn.innerText = "Added to Cart";
    }
  });
});

// Cart icon and display logic
const cartIcon = document.querySelector("#cart");
const cartItems = document.querySelector(".cart-items");

cartItems.classList.add("hide");

cartIcon.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cartproduct")) || [];

  if (cartItems.classList.contains("hide")) {
    cartItems.classList.remove("hide");
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
      const row = document.createElement("div");
      row.classList.add("style");

      const img = document.createElement("img");
      img.src = item.image;
      img.width = 50;

      const nameSpan = document.createElement("span");
      nameSpan.innerText = item.name;

      const delBtn = document.createElement("button");
      delBtn.innerText = "❌";
      delBtn.style.border = "none";
      delBtn.style.background = "rgb(235, 230, 235)";
      delBtn.style.cursor = "pointer";
      delBtn.addEventListener("click", () => {
        cart.splice(index, 1);
        localStorage.setItem("cartproduct", JSON.stringify(cart));
        cartIcon.click(); // Refresh display

        // Restore button text back to "Add to Cart"
        document.querySelectorAll(".cart").forEach((btn) => {
          const name = btn.closest(".content").querySelector("h1").innerText;
          if (!cart.some(item => item.name === name)) {
            btn.innerText = "Add to Cart";
          }
        });
      });

      row.appendChild(img);
      row.appendChild(nameSpan);
      row.appendChild(delBtn);
      cartItems.appendChild(row);
    });
  } else {
    cartItems.classList.add("hide");
  }
});
