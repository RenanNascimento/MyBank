ARG NODE_VERSION
ARG POSTGRES_VERSION

FROM node:$NODE_VERSION

WORKDIR /install

COPY package*.json ./

RUN npm install

ENV NODE_PATH=/install/node_modules
ENV PATH=/install/node_modules/.bin:$PATH

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# TODO: verificar por que não existe a versão 10.4 do postgres-client-10.4
RUN apt-get update && apt-get install -y --no-install-recommends \
  postgresql-client-common \
  postgresql-client-9.4 \
  && rm -rf /var/lib/apt/lists/*

# Bundle app source
COPY . .

CMD [ "npm", "start" ]

CMD ["chmod", "+x", "./db/wait-for-postgres.sh"]