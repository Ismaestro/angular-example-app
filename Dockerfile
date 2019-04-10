FROM node:11-alpine AS builder
COPY . ./example-application
WORKDIR /example-application
RUN npm install
RUN npm run build:prod:en

FROM nginx:1-alpine
COPY --from=builder /example-application/dist/browser/ /usr/share/nginx/html
#EXPOSE 80