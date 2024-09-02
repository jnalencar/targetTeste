document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('error').textContent = 'Acesso negado. Faça login como um usuário de nível 3.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Acesso negado');
        }
        const users = await response.json();
        const userTableBody = document.getElementById('user-table-body');
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>
                    <select class="dropdown" data-user-id="${user._id}">
                        <option value="1" ${user.level === 1 ? 'selected' : ''}>1</option>
                        <option value="2" ${user.level === 2 ? 'selected' : ''}>2</option>
                        <option value="3" ${user.level === 3 ? 'selected' : ''}>3</option>
                    </select>
                </td>
                <td>
                    <button onclick="updateUserLevel('${user._id}')">Atualizar Nível</button>
                </td>
                <td>
                    <button class="delete-button" onclick="deleteUser('${user._id}')">
                        <img src="../assets/bin.png" alt="Deletar">
                    </button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    } catch (error) {
        document.getElementById('error').textContent = error.message;
    }
});

async function updateUserLevel(userId) {
    const token = localStorage.getItem('token');
    const selectElement = document.querySelector(`select[data-user-id="${userId}"]`);
    const newLevel = selectElement.value;

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}/level`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ level: newLevel })
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar nível do usuário');
        }
        alert('Nível do usuário atualizado com sucesso');
    } catch (error) {
        alert(error.message);
    }
}

async function deleteUser(userId) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar usuário');
        }
        alert('Usuário deletado com sucesso');
        location.reload(); // Recarrega a página para atualizar a lista de usuários
    } catch (error) {
        document.getElementById('error').textContent = error.message;
    }
}