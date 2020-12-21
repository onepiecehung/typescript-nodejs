FROM node:14.15.3-alpine3.10

WORKDIR /usr/src/app

COPY package*.json ./

# RUN apk add --no-cache make gcc g++ python

COPY . .

RUN npm install --no-cache

EXPOSE 8018

CMD [ "npm","run","dev" ]

# RUN rm -rf /node_modules

# RUN npm install

# RUN npm run dev