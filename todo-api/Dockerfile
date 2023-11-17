FROM node:21-alpine  

WORKDIR /todo-api

COPY package*.json ./

RUN npm install

COPY src ./src

CMD [ "npm", "run", "start" ]
