document.getElementById('changePasswordForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const token = localStorage.getItem('token');
    const messageDiv = document.getElementById('message');

    if (newPassword !== confirmPassword) {
        messageDiv.textContent = 'As senhas não coincidem';
        messageDiv.className = 'error';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ newPassword })
        });

        if (!response.ok) {
            throw new Error('Erro ao alterar senha');
        }

        messageDiv.textContent = 'Senha alterada com sucesso';
        messageDiv.className = 'success';
    } catch (error) {
        messageDiv.textContent = error.message;
        messageDiv.className = 'error';
    }
});