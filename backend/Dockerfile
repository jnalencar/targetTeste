FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install bcrypt
RUN npm install jsonwebtoken
RUN npm install dotenv
COPY . .
EXPOSE 3000
ENTRYPOINT [ "node", "src/index.js" ]