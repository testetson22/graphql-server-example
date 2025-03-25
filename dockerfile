FROM node:22.14-alpine3.20
WORKDIR /usr/src/app
COPY package.json ./
RUN npm i --force
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]