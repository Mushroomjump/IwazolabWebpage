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
    const essentialItems = ['Sukuma Wiki', 'Tomatoes', 'Maize Flour'];
    let minCost = essentialItems.reduce((acc, item) => acc + items[item].price, 0);
    budgetAmount = minCost + Math.round(Math.random() * 500); // Add up to 500 extra
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
    updateCart();
}

// Update the shopping cart display and budget information
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const totalCostSpan = document.getElementById('total-cost');
    cartItemsList.innerHTML = '';

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.item} - KES ${item.price}`;
        cartItemsList.appendChild(li);
    });

    totalCostSpan.textContent = totalCost;
    document.getElementById('budget-amount').textContent = 'KES ' + (budgetAmount - totalCost);
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

// Initialize the game, set up the market, and add challenges
function startGame() {
    randomizePrices();
    setDynamicBudget();
    updateMarketDisplay();
    addChallenges();
    updateCart();
    document.getElementById('budget-amount').textContent = 'KES ' + budgetAmount;
}

window.onload = startGame;

