ARG NODE_VERSION

FROM node:$NODE_VERSION

WORKDIR /install

COPY package*.json ./

RUN npm install

ENV NODE_PATH=/install/node_modules
ENV PATH=/install/node_modules/.bin:$PATH

WORKDIR /usr/src/app

COPY . .

RUN npm link

CMD [ "npm", "start" ]