document.addEventListener("DOMContentLoaded", function () {
    // Handle Size Selection
    const sizeButtons = document.querySelectorAll(".size-btn");

    sizeButtons.forEach(button => {
        button.addEventListener("click", function () {
            sizeButtons.forEach(btn => btn.classList.remove("selected")); 
            this.classList.add("selected"); 
        });
    });

    // Handle Color Selection
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach(color => {
        color.addEventListener("click", function () {
            colorBoxes.forEach(c => c.style.border = "1px solid #ddd"); 
            this.style.border = "2px solid red"; 
        });
    });

    // Quantity Increment/Decrement

    const qtyInput = document.querySelector("input[type='number']");
    const minusBtn = document.querySelector(".qty-btn:first-child");
    const plusBtn = document.querySelector(".qty-btn:last-child");

    minusBtn.addEventListener("click", function () {
        if (qtyInput.value > 1) qtyInput.value--;
    });

    plusBtn.addEventListener("click", function () {
        qtyInput.value++;
    });
});



// color box changes pics

const colorBoxes = document.querySelectorAll(".color-box");


colorBoxes.forEach(color => {
    color.addEventListener("click", function() {
       
        let newImage = this.getAttribute("data-image");

        document.getElementById("mainImage").src = newImage;

        colorBoxes.forEach(box => box.classList.remove("active"));
        this.classList.add("active");
    });
});


// pop-up size size chart

    const sizeChartLink = document.querySelector('.size-chart-link');
    const sizeChartPopup = document.getElementById('sizeChartPopup');
    
    function openSizeChart() {
        sizeChartPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeSizeChart() {
        sizeChartPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    sizeChartLink.addEventListener('click', function(e) {
        e.preventDefault();
        openSizeChart();
    });
    
    sizeChartPopup.addEventListener('click', function(e) {
        if (e.target === sizeChartPopup) {
            closeSizeChart();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sizeChartPopup.style.display === 'flex') {
            closeSizeChart();
        }
    });




// xml

function loadXMLReviews() {
    let productContainer = document.querySelector(".product-container");
    let productID = productContainer.getAttribute("data-product-id"); // Get product ID dynamically

    fetch('reviews.xml')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => displayReviews(data, productID))
        .catch(error => console.error("Error loading XML:", error));
}

function displayReviews(xml, productID) {
    let reviews = xml.getElementsByTagName("review");
    let reviewContainer = document.getElementById("review-section");
    reviewContainer.innerHTML = `<h3>Reviews for Product ${productID}</h3>`; 

    for (let i = 0; i < reviews.length; i++) {
        let currentProductID = reviews[i].getElementsByTagName("productID")[0].textContent;

        if (currentProductID === productID) {
            let name = reviews[i].getElementsByTagName("name")[0].textContent;
            let rating = reviews[i].getElementsByTagName("rating")[0].textContent;
            let comment = reviews[i].getElementsByTagName("comment")[0].textContent;

            let reviewHTML = `
                <div class="review">
                    <h4>${name} ⭐${rating}</h4>
                    <p>${comment}</p>
                </div>
            `;
            reviewContainer.innerHTML += reviewHTML;
        }
    }
}


// Delivery and Return link
    const deliveryLink = document.querySelector('.delivery-return-link');
    const deliveryPopup = document.getElementById('deliveryPopup');
    
    function openPopup() {
        deliveryPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }
    
    function closePopup() {
        deliveryPopup.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
    
    deliveryLink.addEventListener('click', function(e) {
        e.preventDefault();
        openPopup();
    });
    
    deliveryPopup.addEventListener('click', function(e) {
        if (e.target === deliveryPopup) {
            closePopup();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && deliveryPopup.style.display === 'flex') {
            closePopup();
        }
    });


// Add-to-cart 

     let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
     function updateCartCount() {
         const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
         document.getElementById('cartCount').textContent = totalItems;
     }
     
     document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
         const productId = this.getAttribute('data-id');
         const productName = this.getAttribute('data-name');
         const productPrice = parseInt(this.getAttribute('data-price'));
         const productImage = this.getAttribute('data-image');
         
         const existingItem = cart.find(item => item.id === productId);
         
         if (existingItem) {
             existingItem.quantity += 1;
         } else {
             cart.push({
                 id: productId,
                 name: productName,
                 price: productPrice,
                 image: productImage,
                 quantity: 1
             });
         }
         
         localStorage.setItem('cart', JSON.stringify(cart));
         updateCartCount();
         

         alert(`${productName} added to cart!`);
     });
     
     updateCartCount();





// Track the selected color globally
let selectedColor = '#dba08c'; 
let selectedColorImage = 'top1.jpeg'; 

function selectColor(element) {
    
    document.querySelectorAll('.color-box').forEach(box => {
        box.classList.remove('selected');
    });
    
    element.classList.add('selected');
    
    selectedColor = element.getAttribute('data-color');
    selectedColorImage = element.getAttribute('data-image');
    
    document.getElementById('mainImage').src = selectedColorImage;
}


// product filter

function sortProducts() {
    const sortValue = document.getElementById('price-sort').value;
    const dressesSection = document.querySelector('.Dresses');
    
    if (!dressesSection) {
        console.error("Could not find .Dresses section");
        return;
    }

    const products = Array.from(dressesSection.querySelectorAll('.Dress-card'));

    products.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));

        if (sortValue === 'price-asc') {
            return priceA - priceB;
        } else if (sortValue === 'price-desc') {
            return priceB - priceA;
        }
        return 0; 
    });

    const heading = dressesSection.querySelector('h2');
    while (dressesSection.firstChild) {
        dressesSection.removeChild(dressesSection.firstChild);
    }

    dressesSection.appendChild(heading);

    products.forEach(product => {
        dressesSection.appendChild(product);
    });
}


window.sortProducts = sortProducts;