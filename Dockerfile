FROM node:18

WORKDIR /www

COPY package*.json .
RUN npm ci --quiet --silent --no-progress

COPY main.js .
EXPOSE 8080

CMD [ "node", "main.js" ]