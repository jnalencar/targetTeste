FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install express
RUN npm install path
COPY . .
EXPOSE 8080
ENTRYPOINT [ "node", "server.js" ]