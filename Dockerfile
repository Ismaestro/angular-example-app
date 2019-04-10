FROM node:11-alpine AS builder
COPY . ./example-application
WORKDIR /example-application
#RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
#WORKDIR /home/node/app
#COPY package*.json ./
#USER node
RUN npm install
#COPY --chown=node:node . .
RUN npm run build:server:prod
#EXPOSE 80
#CMD ["npm", "run", "deploy"]