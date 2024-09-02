function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
}

function showRegister() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'landing.html';
        } else {
            document.getElementById('login-error').textContent = data.error;
        }
    } catch (error) {
        document.getElementById('login-error').textContent = 'Erro ao fazer login';
    }
}

async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
        document.getElementById('register-error').textContent = 'As senhas não coincidem';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = response.ok ? await response.json() : null;
        if (response.ok) {
            document.getElementById('register-error').textContent = 'Usuário registrado com sucesso. Agora você pode fazer login.';
        } else {
            document.getElementById('register-error').textContent = data ? data.error : 'Erro ao registrar usuário';
        }
    } catch (error) {
        document.getElementById('register-error').textContent = 'Erro ao registrar usuário';
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        if (!document.getElementById('login-form').classList.contains('hidden')) {
            login();
        } else if (!document.getElementById('register-form').classList.contains('hidden')) {
            register();
        }
    }
});