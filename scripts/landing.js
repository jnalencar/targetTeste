const apiUrl = 'http://localhost:3000/tarefa';

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

document.addEventListener('DOMContentLoaded', loadTasks);