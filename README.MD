Requisitos
=============
Docker (caso opte) - https://www.docker.com/products/docker-desktop/<br><br>

Node (caso opte precisará utilizar npm install para as seguintes bibliotecas) - https://nodejs.org/en/download/<br>
Express<br>
dotenv<br>
bcrypt<br>
jsonwebtoken<br>
mongoose<br>

MongoDB, versao mais recente - https://www.mongodb.com/try/download/community


Para executar
=============
`docker-compose up --build`

Para iniciar interação com o frontend
`curl http://localhost:8080`

Para interação direta com a API é utilizada a porta 3000
`curl http://localhost:3000`

Decisões tomadas
================

- É criado um user com as credenciais admin:admin com permissões de admin
- Optei por um sistema de hierarquia entre os usuários, o usuário level 1, tem permissão apenas a acessar as tarefas, o usuário level 2 tem permissão para criar/editar/remover tarefas, e o usuario level 3, além das permissoes anteriores, ele pode deletar os usuários, e alterar o level de acesso de cada usuário