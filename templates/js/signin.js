document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    // Extract data from the form
    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');

    // Create an object to send in the POST request
    const data = {
        username: username,
        password: password
    };

    // Send a POST request to the server-side signin endpoint
    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())  // Parse the JSON response from the server
    .then(data => {
        console.log(data); // Log or process the data received from the server
        if (data.loggedIn) {
            alert('Login successful!');
            window.location.href = '/welcome'; // Redirect to a new page upon successful login
        } else {
            alert('Login failed: ' + data.message); // Show an error message if login fails
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login');
    });
});
