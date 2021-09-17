const listOfProductsContainer = document.getElementsByClassName("product-list")[0];
const shoppingCartContainer = document.getElementsByClassName("cart")[0];
const calculatedTotalContainer = document.getElementsByClassName("calculated-total")[0];

// List of products in "database"...
const storeProducts = [
    {
        productImage: "images/product-image-placeholder.png", 
        productName: "Product 1", 
        productPrice: "100.00",
        productQuantity: "1"
    },
    {
        productImage: "images/product-image-placeholder.png", 
        productName: "Product 2", 
        productPrice: "8.99",
        productQuantity: "1"
    },
    {
        productImage: "images/product-image-placeholder.png", 
        productName: "Product 3", 
        productPrice: "1.00",
        productQuantity: "1"
    },
    {
        productImage: "images/product-image-placeholder.png", 
        productName: "Product 4", 
        productPrice: "1.55",
        productQuantity: "1"
    },
    {
        productImage: "images/product-image-placeholder.png", 
        productName: "Product 5", 
        productPrice: "3.00",
        productQuantity: "1"
    },
    {
        productImage: "images/product-image-placeholder.png", 
        productName: "Product 6", 
        productPrice: "4.00",
        productQuantity: "1"
    }
];

let shoppingCart = [];

// Display products on page...
const displayProducts = (productImage, productName, productPrice, productQuantity) => {
    return `<div class='product'>
                <img class='product-image' width='80' src='${productImage}' alt='${productName}'> 
                <div class='product-name'><p>${productName}</p></div>
                <div class='price'>$<span>${productPrice}</span></div>
                <div class='add-to-cart-wrapper'>
                    <button class='add-to-cart-btn'>Add to Cart</button>
                </div>
                <input 
                    class='quantity-field' 
                    type='text' 
                    name='quantity' 
                    placeholder='quantity' 
                    value=${productQuantity}
                >
                <div class='remove-from-cart-wrapper'>
                    <button class='remove-item-btn'>Remove</button>
                </div>
            </div>`
};

storeProducts.forEach((product) => {
    listOfProductsContainer.innerHTML += 
    displayProducts(product.productImage, product.productName, product.productPrice, product.productQuantity);
});

// Function to add to cart...
const addToCartButtonList = [...document.querySelectorAll(".product-list .add-to-cart-btn")];

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
        for (let i = 0; i < addToCartButtonList.length; i++) {
            if (addToCartButtonList[i] === event.target) {
                if (!shoppingCart.includes(storeProducts[i])) {
                    shoppingCart.push(storeProducts[i]);
                }
            }
        }
        updateCart();
    }
});

// Function to remove from shopping cart...
document.addEventListener("click", (event) => {
    let removeFromCartButtonList = [...document.querySelectorAll(".cart .remove-item-btn")];

    if (event.target.classList.contains("remove-item-btn")) {
        for (let i = 0; i < removeFromCartButtonList.length; i++) {
            if (removeFromCartButtonList[i] === event.target) {
                let thisCartItem = [...document.querySelectorAll(".cart .product")];
                
                thisCartItem[i].classList.add("fade-out");
                shoppingCart.splice(i, 1);
            }
        }
        setTimeout(() => updateCart(), 500);
    }
});

// Update shopping cart...
const updateCart = () => {
    shoppingCartContainer.innerHTML = "";
    
    shoppingCart.forEach((product) => {
        shoppingCartContainer.innerHTML +=
        displayProducts(product.productImage, product.productName, product.productPrice, product.productQuantity);
    });
    calculateTotal();
};

// Changing the quantity...
document.addEventListener("input", (event) => {
    let quantityFieldList = [...document.querySelectorAll(".cart input.quantity-field")];
    
    for (let i = 0; i < quantityFieldList.length; i++) {
        if (quantityFieldList[i] === event.target) {
            shoppingCart[i].productQuantity = event.target.value;
            calculateTotal();
        }
    }
});

// Function for rounding numbers...
let roundTwoDec = (num) => { 
    return Math.round(num * 100) / 100;
}

// Calculate and display total...
const calculateTotal = () => {
    let calculatedTotal = 0;
    calculatedTotalContainer.innerHTML = "";

    shoppingCart.forEach((product) => {
        productPriceWithQuantity = product.productPrice * product.productQuantity;
        productPriceConvertedToNumber = parseFloat(productPriceWithQuantity);
        calculatedTotal += productPriceConvertedToNumber;
        roundedTotal = roundTwoDec(calculatedTotal);
        calculatedTotalContainer.innerHTML = `$${roundedTotal}`;
    });
};