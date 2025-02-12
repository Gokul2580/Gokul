document.getElementById("openEMICalculator").addEventListener("mouseenter", () => {
    
    
});

// EMI Modal Open
document.getElementById("openEMICalculator").addEventListener("click", () => {
    const modal = document.getElementById("emiModal");
    modal.classList.remove("hidden");
    setTimeout(() => modal.classList.add("opacity-100", "scale-100"), 50);
});

document.getElementById("cal").addEventListener("click", () => {
    const modal = document.getElementById("emiModal");
    modal.classList.remove("hidden");
    setTimeout(() => modal.classList.add("opacity-100", "scale-100"), 50);
});

// EMI Modal Close
document.getElementById("closeEmiModal").addEventListener("click", () => {
    const modal = document.getElementById("emiModal");
    modal.classList.remove("opacity-100", "scale-100");
    setTimeout(() => modal.classList.add("hidden"), 300);
});

// EMI Calculation Logic
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calculateEMI1").addEventListener("click", () => {
        let P = parseFloat(document.getElementById("loanAmount1").value);
        let R = parseFloat(document.getElementById("interestRate1").value) / 100 / 12;
        let N = parseInt(document.getElementById("tenure1").value);

        if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
            document.getElementById("emiResult1").innerText = "⚠️ Please enter valid values.";
            return;
        }

        let EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        document.getElementById("emiResult1").innerText = `Estimated EMI: ₹${EMI.toFixed(2)}/month`;
    });
});

const city1='Dindigul';
    const lyrics = [
        ["Maruvarthai pesathe", "Nee than en vaazhviley"],
        ["Unnalae thaane", "Inbamum kasakkum"],
        ["Un azhagaana paarvaiyil", "Naan moozhgi ponaen"],
        ["Nee illamal vaazha mudiyuma?", "Kanneer mazhai peiyuma?"]
    ];

    let index = 0;
    function updateLyrics() {
        document.getElementById("line1").classList.remove("visible");
        document.getElementById("line2").classList.remove("visible");

        setTimeout(() => {
            document.getElementById("line1").innerText = lyrics[index][0];
            document.getElementById("line2").innerText = lyrics[index][1];

            document.getElementById("line1").classList.add("visible");
            document.getElementById("line2").classList.add("visible");
            
            index = (index + 1) % lyrics.length;
        }, 800);
    }

    updateLyrics();  
    setInterval(updateLyrics, 3000);  

  // ========================== DROPDOWN TOGGLE ==========================
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.icon');
            content.classList.toggle('hidden');
            icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });

    // ========================== SEARCH FUNCTIONALITY ==========================
    document.getElementById('s').addEventListener('input', function () {
        let searchQuery = this.value.toLowerCase();
        document.querySelectorAll('.category-card').forEach(card => {
            let categoryName = card.getAttribute('data-name').toLowerCase();
            card.style.display = categoryName.includes(searchQuery) ? "block" : "none";
        });
    });

    // ========================== CITY PICKER MODAL ==========================
    document.getElementById("openCityPicker").addEventListener("click", function () {
        document.getElementById("cityPickerDialog").classList.remove("hidden");
        history.pushState({ modal: "cityPicker" }, ""); // Add to backstack
    });

    document.getElementById("closeCityPicker").addEventListener("click", function () {
        document.getElementById("cityPickerDialog").classList.add("hidden");
        history.back(); // Go back in history
    });

    document.getElementById("openCart").addEventListener("click", function () {
        document.getElementById("cartPage").classList.remove("hidden");
        history.pushState({ modal: "cartPage" }, ""); // Add to backstack
    });

    document.getElementById("closeCart").addEventListener("click", function () {
        document.getElementById("cartPage").classList.add("hidden");
        history.back(); // Go back in history
    });

    function selectCity(city) {
        document.getElementById("selectedCity").innerText = city;
        localStorage.setItem("selectedCity", city);
        document.getElementById("cityPickerDialog").classList.add("hidden");
        history.back(); // Close modal on selection
    }

    function filterCities() {
        const searchValue = document.getElementById("citySearch").value.toLowerCase();
        const cities = document.querySelectorAll("#cityList .chip");
        cities.forEach(city => {
            city.style.display = city.innerText.toLowerCase().includes(searchValue) ? "inline-block" : "none";
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        const savedCity = localStorage.getItem("selectedCity");
        if (savedCity) {
            document.getElementById("selectedCity").innerText = savedCity;
        }
    });

    // ========================== SEARCH BAR STICKY ==========================

const searchBar = document.getElementById("searchBar");
const searchBarParent = searchBar.parentElement; // Get its parent for reference
const searchBarTop = searchBarParent.offsetTop; // Get original position

window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop >= searchBarTop) {
        // Keep sticky while scrolling down
        searchBar.classList.add("sticky", "fixed", "top-0", "border-b", "border-gray-300");
    } else {
        // Remove sticky when scrolling above it
        searchBar.classList.remove("sticky", "fixed", "top-0", "border-b", "border-gray-300");
    }
});
    // ========================== OVERLAY BOX ==========================
    function openOverlayBox(element) {
        let title = element.getAttribute("data-name");
        let id = element.id;
        let cityy = document.getElementById("selectedCity").textContent;

        document.getElementById("overlay-title-box").innerText = title + ' Near ' + cityy;
        document.getElementById("overlay-content-box").innerText = "You clicked on " + title + " (ID: " + id + ")";

        document.getElementById("overlay-box").classList.add("show-overlay");
        history.pushState({ modal: "overlayBox" }, ""); // Add to backstack
    }

    function closeOverlayBox() {
        document.getElementById("overlay-box").classList.remove("show-overlay");
        history.back(); // Go back in history
    }

    // ========================== SCROLL & BACKSTACK STATE MANAGEMENT ==========================
    document.addEventListener("DOMContentLoaded", function () {
        // Restore Scroll Position
        const scrollPos = sessionStorage.getItem("scrollPos");
        if (scrollPos) window.scrollTo(0, parseInt(scrollPos));

        // Save Scroll Position
        window.addEventListener("scroll", function () {
            sessionStorage.setItem("scrollPos", window.scrollY);
        });

        // Restore Backstack Navigation
        if (sessionStorage.getItem("pageState")) {
            history.replaceState(JSON.parse(sessionStorage.getItem("pageState")), "");
        }

        // Save Page State on Back Navigation
        window.addEventListener("popstate", function (event) {
            if (event.state) {
                sessionStorage.setItem("pageState", JSON.stringify(event.state));
            }
        });

        // Restore UI State (Tabs, Modals, etc.)
        const activeTab = sessionStorage.getItem("activeTab");
        if (activeTab) {
            document.getElementById(activeTab)?.classList.add("active");
        }

        // Restore Dynamic Content
        const savedContent = sessionStorage.getItem("dynamicContent");
        if (savedContent) document.getElementById("content").innerHTML = savedContent;
    });

    // Save UI State (Tabs, Modals, etc.)
    function saveUIState() {
        const activeTab = document.querySelector(".tab.active")?.id || "";
        sessionStorage.setItem("activeTab", activeTab);
    }

    // Save Dynamic Content
    document.getElementById("content")?.addEventListener("input", function () {
        sessionStorage.setItem("dynamicContent", this.innerHTML);
    });

    window.addEventListener("beforeunload", saveUIState);

    // ========================== BACK BUTTON LISTENER (CLOSE MODALS FIRST) ==========================
    window.onpopstate = function (event) {
        const cityPicker = document.getElementById("cityPickerDialog");
        const cartPage = document.getElementById("cartPage");
        const overlayBox = document.getElementById("overlay-box");

        if (!cityPicker.classList.contains("hidden")) {
            cityPicker.classList.add("hidden");
        } else if (!cartPage.classList.contains("hidden")) {
            cartPage.classList.add("hidden");
        } else if (overlayBox.classList.contains("show-overlay")) {
            overlayBox.classList.remove("show-overlay");
        } else {
            history.back(); // Normal back navigation
        }
    };
    
    

    
</script>


<script>
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    function addToCart(category, productName, imageUrl, description, productPrice, productUrl) {
        cart[category] = { 
            name: productName, 
            image: imageUrl, 
            description: description, 
            price: productPrice,
            url: productUrl 
        };

        saveCart();
        updateCartDisplay();
    }

    function removeFromCart(category) {
        if (cart[category]) {
            delete cart[category];
        }

        saveCart();
        updateCartDisplay();
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const totalPrice = document.getElementById('totalPrice');
        const emptyCartMessage = document.getElementById('emptyCartMessage');

        cartItems.innerHTML = '';
        let total = 0;
        let isCartEmpty = true;

        for (const category in cart) {
            isCartEmpty = false;
            const product = cart[category];

            const li = document.createElement('li');
            li.classList.add('p-4', 'border', 'border-gray-300', 'rounded-lg', 'bg-white', 'flex', 'flex-col', 'justify-between', 'cursor-pointer');
            li.onclick = () => window.location.href = product.url;

            li.innerHTML = `
                <span class="text-lg font-bold text-blue-700">${category}</span>
                <div class="flex items-center mt-2">
                    <img src="${product.image}" class="w-16 h-16 rounded-lg">
                    <div class="ml-4 flex-1">
                        <p class="text-gray-900 font-semibold">${product.name}</p>
                        <p class="text-gray-500">${product.description}</p>
                        <p class="text-blue-600 font-bold">$${product.price}</p>
                    </div>
                    <button onclick="event.stopPropagation(); removeFromCart('${category}')" class="ml-4 text-red-500 text-2xl">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            `;

            cartItems.appendChild(li);
            total += product.price;
        }

        totalPrice.textContent = `Total: $${total}`;
        emptyCartMessage.style.display = isCartEmpty ? "block" : "none";
    }

    updateCartDisplay();