FROM node:18-alpine3.18 as angular

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM httpd:alpine3.15

WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /app/dist/tasks-manager .