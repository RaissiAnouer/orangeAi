FROM php:8.4.11-apache
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD [ "npm","start"]
EXPOSE 5000