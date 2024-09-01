# Usar uma imagem base oficial do Node.js
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta que a aplicação vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
ENTRYPOINT [ "node", "src/index.js" ]