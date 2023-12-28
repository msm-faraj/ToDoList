FROM node:21-alpine3.19

WORKDIR /todo-server

COPY package*.json ./

RUN npm install

COPY ./src ./src

CMD [ "npm", "run", "start" ]
