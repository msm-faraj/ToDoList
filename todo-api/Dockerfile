FROM node:21-alpine  

WORKDIR /todo-api

COPY package*.json ./

COPY src ./src

RUN npm install

EXPOSE 3131

CMD [ "npm", "run", "start" ]
