document.addEventListener('DOMContentLoaded', function() {
    // Get search term from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('q') || '';
    
    // Display the search term
    document.getElementById('search-term').textContent = searchTerm;
    
    // If no search term, redirect to products page
    if (!searchTerm) {
        window.location.href = 'products.html';
        return;
    }
    
    // Simulated product database - in a real app, this would come from a server
    const productsDatabase = [
        { name: "Ruffled Off-Shoulder Crop Top", category: "Tops", price: "LKR 2390.00", image: "top1.jpeg", link: "top1.html" },
        { name: "Draped Off-Shoulder Top", category: "Tops", price: "LKR 2890.00", image: "top6.jpeg", link: "top2.html" },
        { name: "Flowy Silk Long-Sleeve Crop", category: "Tops", price: "LKR 2990.00", image: "top8.jpeg", link: "top3.html" },
        { name: "Breezy Off-Shoulder Crop Top", category: "Tops", price: "LKR 1990.00", image: "top7.jpeg", link: "top4.html" },
        { name: "Pink Puff Sleeve Mini Dress", category: "Mini Dresses", price: "LKR 3690.00", image: "mini dress1.jpeg", link: "mini1.html" },
        { name: "Daisy Lace Mini Dress", category: "Mini Dresses", price: "LKR 3990.00", image: "mini5.jpeg", link: "mini2.html" },
        { name: "Puff Sleeve Babydoll Dress", category: "Mini Dresses", price: "LKR 3690.00", image: "mini2.jpeg", link: "mini3.html" },
        { name: "Ribbed Bodycon Dress", category: "Mini Dresses", price: "LKR 3990.00", image: "mini6.jpg", link: "mini4.html" },
        { name: "Violet Drape Midi Dress", category: "Midi Dresses", price: "LKR 5990.00", image: "midi1.jpeg", link: "midi1.html" },
        { name: "Ivory Elegance Midi Dress", category: "Midi Dresses", price: "LKR 4690.00", image: "midi2.jpeg", link: "midi2.html" },
        { name: "Azure Satin Slip Dress", category: "Midi Dresses", price: "LKR 4290.00", image: "midi5.jpeg", link: "midi3.html" },
        { name: "Smocked Puff Sleeve Midi Dress", category: "Midi Dresses", price: "LKR 3990.00", image: "midi3.jpeg", link: "midi4.html" },
        { name: "Rust Ruffle Sleeve Maxi Dress", category: "Maxi Dresses", price: "LKR 5990.00", image: "maxi8.jpg", link: "maxi1.html" },
        { name: "White Eyelet V-Neck Maxi Dress", category: "Maxi Dresses", price: "LKR 5990.00", image: "maxi6.jpg", link: "maxi2.html" },
        { name: "Mauve Meadow Maxi", category: "Maxi Dresses", price: "LKR 6290.00", image: "maxi4.jpg", link: "maxi3.html" },
        { name: "Olive Luxe Slit Gown", category: "Maxi Dresses", price: "LKR 6290.00", image: "maxi7.jpg", link: "maxi4.html" },
        { name: "Wide-Leg Pleated Trousers", category: "Pants", price: "LKR 5290.00", image: "pant1.jpg", link: "pant1.html" },
        { name: "High-Waisted Flared Pants", category: "Pants", price: "LKR 5890.00", image: "pant8.jpg", link: "pant2.html" },
        { name: "Bell Bottomed Pants", category: "Pants", price: "LKR 5490.00", image: "pant7.jpg", link: "pant3.html" },
        { name: "Ribbed Flared Pants", category: "Pants", price: "LKR 4290.00", image: "pant6.jpg", link: "pant4.html" },
        { name: "Blush Pearl Cardigan", category: "Cardigans", price: "LKR 4990.00", image: "cardi6.jpg", link: "cardi1.html" },
        { name: "Light Beige Collared Cardigan", category: "Cardigans", price: "LKR 5290.00", image: "cardi1.jpg", link: "cardi2.html" },
        { name: "Cherry Pop Cardi", category: "Cardigans", price: "LKR 6690.00", image: "cardi3.jpg", link: "cardi3.html" },
        { name: "Mocha Twist Cardigan", category: "Cardigans", price: "LKR 4890.00", image: "cardi2.jpg", link: "cardi4.html" },
        // Add all your other products here
    ];
    
    // Filter products
    const results = productsDatabase.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Display results
    const container = document.getElementById('search-results-container');
    const noResults = document.getElementById('no-results');
    
    if (results.length === 0) {
        noResults.style.display = 'block';
        container.style.display = 'none';
    } else {
        noResults.style.display = 'none';
        container.style.display = 'grid';
        
        results.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'featured-card';
            productElement.innerHTML = `
                <a href="${product.link}" target="_self">
                    <img src="${product.image}" alt="${product.name}" width="200">
                </a>
                <h3><a href="${product.link}">${product.name}</a></h3>
                <p class="price">${product.price}</p>
                 
            `;
            container.appendChild(productElement);
        });
    }
    
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.querySelector('.search-bar');
    
    searchBar.value = searchTerm;
    
    function performSearch() {
        const term = searchBar.value.trim();
        if (term) {
            window.location.href = `search.html?q=${encodeURIComponent(term)}`;
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });
});