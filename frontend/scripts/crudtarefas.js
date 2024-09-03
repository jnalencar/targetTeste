
document.getElementById('addTaskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const token = localStorage.getItem('token'); // Supondo que o token esteja armazenado no localStorage

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const tasks = await response.json();
        const maxId = tasks.reduce((max, task) => task.id > max ? task.id : max, 0);
        const newId = maxId + 1;

        const addResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Inclui o token JWT no cabeçalho Authorization
            },
            body: JSON.stringify({ id: newId, titulo, descricao, status: 'pendente' })
        });

        if (addResponse.ok) {
            alert('Tarefa adicionada com sucesso!');
            loadTasks();
        } else {
            alert('Erro ao adicionar tarefa.');
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        alert('Erro ao fazer a requisição.');
    }
});

document.getElementById('updateTaskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const index = document.getElementById('updateIndex').value;
    const titulo = document.getElementById('updateTitulo').value;
    const descricao = document.getElementById('updateDescricao').value;
    const token = localStorage.getItem('token'); // Supondo que o token esteja armazenado no localStorage

    if (!titulo || !descricao || !index) {
        alert('Título, descrição e o ID são obrigatórios.');
        return;
    }
    if (status === 'concluido') {
        alert('Tarefa concluída não pode ser atualizada.');
        return;
    }
    try {
        const response = await fetch(`${apiUrl}/${index}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Inclui o token JWT no cabeçalho Authorization
            },
            body: JSON.stringify({ id: index, titulo, descricao, status: 'pendente' })
        });

        if (response.ok) {
            alert('Tarefa atualizada com sucesso!');
            loadTasks();
        } else {
            alert('Erro ao atualizar tarefa.');
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        alert('Erro ao fazer a requisição.');
    }
});

document.getElementById('deleteTaskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const index = document.getElementById('deleteIndex').value;
    const token = localStorage.getItem('token'); // Supondo que o token esteja armazenado no localStorage

    try {
        const response = await fetch(`${apiUrl}/${index}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` // Inclui o token JWT no cabeçalho Authorization
            }
        });

        if (response.ok) {
            alert('Tarefa removida com sucesso!');
            loadTasks();
        } else {
            alert('Erro ao remover tarefa.');
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        alert('Erro ao fazer a requisição.');
    }
});

async function loadTasks() {
    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('error').textContent = 'Acesso negado. Faça login para ver suas tarefas.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/tarefa', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Erro ao carregar tarefas: ${response.statusText}`);
        }
        const tasks = await response.json();
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.forEach((task, cod) => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                        <strong>${task.cod}: ${task.titulo}</strong>
                        <p>${task.descricao}</p>
                        <p>Status: ${task.status}</p>
                        <p>Data de Criação: ${new Date(task.dataCriacao).toLocaleString()}</p>
                        <button onclick="toggleTaskStatus(${task.cod}, '${task.status}')">Alterar Status</button>
                    `;
            taskList.appendChild(taskItem);
        });
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        alert('Erro ao carregar tarefas.');
    }
}

async function toggleTaskStatus(cod, currentStatus) {
    const newStatus = currentStatus === 'pendente' ? 'concluido' : 'pendente';
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Acesso negado. Faça login para alterar o status das tarefas.');
        return;
    }
    try {
        const response = await fetch(`${apiUrl}/${cod}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
            const updatedTask = await response.json();
            console.log('Status atualizado com sucesso:', updatedTask);
            loadTasks();
        } else {
            console.error('Erro ao atualizar status:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
    }
}

loadTasks();