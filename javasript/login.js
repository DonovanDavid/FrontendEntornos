document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        const data = {
            'username': username,
            'password': password
        };
      
        // Realizar una solicitud POST al servidor
        fetch('http://localhost:8080/log/loginautentication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            
        }
        
        )

  
        .then(response => {
            if (response.ok) {
                // Credenciales válidas, redireccionar al usuario o mostrar un mensaje de éxito
                window.location.href = '../html/bienvenido.html'; // Cambia 'bienvenido.html' por tu página de bienvenida
            } else {
                // Credenciales incorrectas, mostrar un mensaje de error
                errorMessage.textContent = 'Credenciales incorrectas. Inténtalo de nuevo.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
