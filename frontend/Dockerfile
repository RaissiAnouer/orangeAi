FROM node:22.14
WORKDIR /app
COPY frontend/package*.json .
RUN npm install
COPY frontend/. .
CMD ["npm","start"]
EXPOSE 3000