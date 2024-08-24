const authSection = document.getElementById('auth-section');
const stockDataSection = document.getElementById('stock-data-section');
const errorMessage = document.getElementById('error-message');

// Placeholder for login functionality
document.getElementById('login-btn').addEventListener('click', () => {
 // Implement actual login logic here (e.g., send request to backend)
 authSection.style.display = 'none';
 stockDataSection.style.display = 'block';
});

document.getElementById('fetch-data-btn').addEventListener('click', () => {
 const symbol = document.getElementById('stock-symbol').value.trim().toUpperCase();

 if (symbol === '') {
   errorMessage.textContent = 'Please enter a stock symbol.';
   errorMessage.style.display = 'block';
   return;
 }

 errorMessage.style.display = 'none'; // Clear any previous error

 fetch(`/api/stocks/realtime/${symbol}`)
   .then(response => {
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     return response.json();
   })
   .then(data => {
     document.getElementById('symbol').textContent = data.symbol;
     document.getElementById('price').textContent = data.price;
     document.getElementById('change').textContent = data.change;
     document.getElementById('change-percent').textContent = data.changePercent;
   })
   .catch(error => {
     console.error('Error fetching data:', error);
     errorMessage.textContent = 'An error occurred or symbol not found. Please try again.';
     errorMessage.style.display = 'block';
   });
});

// Placeholder for subscription functionality
document.getElementById('subscribe-btn').addEventListener('click', () => {
 // Implement subscription logic here (e.g., send request to backend)
 alert('Subscription feature coming soon!');
});