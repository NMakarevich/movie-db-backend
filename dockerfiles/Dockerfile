FROM node:alpine3.22

WORKDIR /usr/app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:docker"]