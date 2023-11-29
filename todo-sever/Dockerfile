FROM node:17-alpine  

WORKDIR /todo-api

COPY package*.json ./

RUN npm install

COPY src ./src

CMD [ "npm", "run", "start" ]
