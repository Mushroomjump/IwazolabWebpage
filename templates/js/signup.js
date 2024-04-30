document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password')
        }),
        headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())
      .then(data => alert('Signup successful!'))
      .catch(error => alert('Error during signup'));
});
