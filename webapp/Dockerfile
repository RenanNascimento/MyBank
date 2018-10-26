FROM node:7.7.2-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --quiet

COPY . .