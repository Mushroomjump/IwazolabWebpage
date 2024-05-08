 // ===== JS index.html ========

// == Dropdown Menu Script ==
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const barEl = document.querySelector('#sidebar');

    if (toggleBtn && barEl) {
        toggleBtn.addEventListener('click', function() {
            const isVisible = barEl.getAttribute("data-visible") === "true";
            toggleBtn.setAttribute("aria-expanded", !isVisible);
            barEl.setAttribute("data-visible", !isVisible);
        });
    } else {
        console.log("Elements not found, check your HTML IDs and class names.");
    }
});


    let currentDropdown;
    if (isDropdownButton) {
        // Toggle the active state of the current dropdown
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');
    }

    // Close other dropdowns except the current one
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown !== currentDropdown) {
            dropdown.classList.remove('active');
        }
    });
});


// ======  navigations ==========//

const barEl=document.querySelector('#sidebar')
const toggleBtn=document.querySelector('.mobile-nav-toggle')

toggleBtn.addEventListener('click',function(){
    const barVisible=barEl.getAttribute("data-visible")
    const toggleEpanded=toggleBtn.getAttribute("aria-expanded")
    if(barVisible==="true"){
        toggleBtn.setAttribute("aria-expanded",false)
        barEl.setAttribute("data-visible",false)
    } else{
        toggleBtn.setAttribute("aria-expanded",true)
        barEl.setAttribute("data-visible",true)
    }

})


// Define all available items and their base prices
const items = {
    'Sukuma Wiki': { basePrice: 30, price: 30 },
    'Tomatoes': { basePrice: 50, price: 50 },
    'Spinach': { basePrice: 40, price: 40 },
    'Maize Flour': { basePrice: 80, price: 80 },
    'Rice': { basePrice: 120, price: 120 },
    'Beans': { basePrice: 100, price: 100 },
    'Bananas': { basePrice: 10, price: 10 },
    'Milk': { basePrice: 50, price: 50 },
    'Sugar': { basePrice: 85, price: 85 },
    'Fish': { basePrice: 200, price: 200 },
    'Beef': { basePrice: 300, price: 300 }
};

let budgetAmount = 1000;  // Initialize budget amount
let totalCost = 0;
let cartItems = [];

// Randomize item prices based on a fluctuation factor
function randomizePrices() {
    let scaleFactor = Math.random() + 0.5; // Scale factor between 0.5 and 1.5
    for (let key in items) {
        items[key].price = Math.round(items[key].basePrice * scaleFactor);
    }
}

// Set a dynamic budget based on potential minimum purchase requirements
function setDynamicBudget() {
    const essentialItems = ['Sukuma Wiki', 'Tomatoes', 'Maize Flour'];  // Essentials list
    let minCost = essentialItems.reduce((acc, item) => acc + items[item].price, 0);

    // Calculate a dynamic additional amount but ensure total is not below KES 600
    let randomAddition = Math.round(Math.random() * 1000);  // Up to KES 500 additional
    budgetAmount = Math.max(minCost + randomAddition, 500);  // Ensure minimum budget is KES 600

    console.log("Minimum Cost: " + minCost + ", Budget set to: " + budgetAmount);
}


function updateBudgetDisplay() {
    const budgetDisplay = document.getElementById('budget-amount');
    budgetDisplay.textContent = 'KES ' + (budgetAmount - totalCost); // Display the remaining budget
    console.log("Budget updated to: KES " + (budgetAmount - totalCost));
}

// Update market display with current prices
function updateMarketDisplay() {
    const marketStalls = document.getElementById('market-stalls');
    marketStalls.innerHTML = '';

    for (let key in items) {
        const stallItem = document.createElement('li');
        const buyButton = document.createElement('button');
        buyButton.textContent = `${key} - KES ${items[key].price}`;
        buyButton.onclick = () => addItemToCart(key, items[key].price);
        stallItem.appendChild(buyButton);
        marketStalls.appendChild(stallItem);
    }
}

// Handle adding items to the cart and updating budget
function addItemToCart(item, price) {
    if (totalCost + price > budgetAmount) {
        alert('Not enough budget!');
        return;
    }
    cartItems.push({ item, price });
    totalCost += price;
    updateCart(); // Updates cart and budget display
}

// Update the shopping cart display and budget information
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; // Clear previous entries

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.item} - KES ${item.price}`;
        cartItemsList.appendChild(li);
    });

    const totalCostDisplay = document.getElementById('total-cost');
    totalCostDisplay.textContent = totalCost; // Update the displayed total cost
    updateBudgetDisplay(); // Ensure the budget display is updated anytime the cart updates
}

function checkOut() {
    if (totalCost <= budgetAmount) {
        alert('Congratulations! You managed your budget well and have KES ' + (budgetAmount - totalCost) + ' left.');
    } else {
        alert('Oops! You overspent by KES ' + (totalCost - budgetAmount) + '.');
    }
    // Add any additional logic for game reset or navigation here
    // Example: Reset game or navigate away
    resetGame();
}

function resetGame() {
    // Reset game logic or redirect
    window.location.reload();  // Simplest form of reset, reloads the page
}

// Introduce random challenges such as surprise expenses and temptations
function addChallenges() {
    if (Math.random() < 0.3) { // 30% chance for a surprise expense
        const surpriseExpenses = [
            { item: 'Cooking Gas', price: 300 },
            { item: 'Charcoal', price: 150 }
        ];
        const expense = surpriseExpenses[Math.floor(Math.random() * surpriseExpenses.length)];
        alert(`Surprise expense: You need to buy ${expense.item} for KES ${expense.price}.`);
        budgetAmount -= expense.price;
    }

    if (Math.random() < 0.5) { // 50% chance for a temptation
        const temptations = [
            { item: 'Chocolate Cake', price: 250, discountedPrice: 200 },
            { item: 'Ice Cream', price: 100, discountedPrice: 80 }
        ];
        const temptation = temptations[Math.floor(Math.random() * temptations.length)];
        if (confirm(`Temptation offer: Buy ${temptation.item} for just KES ${temptation.discountedPrice} instead of KES ${temptation.price}. Do you want to buy it?`)) {
            if (totalCost + temptation.discountedPrice <= budgetAmount) {
                addItemToCart(temptation.item, temptation.discountedPrice);
            } else {
                alert('Not enough budget to indulge!');
            }
        }
    }
}

// Initialize game settings
function startGame() {
    randomizePrices();
    setDynamicBudget();  // Set the initial budget based on randomized item prices
    updateMarketDisplay(); // Update the market display with item prices
    updateBudgetDisplay(); // Update the budget display immediately after setting the budget

    // Delay challenges to give the user a chance to see the initial setup
    setTimeout(() => {
        addChallenges(); // Introduce any challenges like expenses and temptations
    }, 1000); // Delay of 1000 milliseconds (1 second)

    updateCart(); // Initial cart update, should be empty initially but set up for future updates
}

window.onload = startGame;
