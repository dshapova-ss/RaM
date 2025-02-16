FROM node:20-alpine

WORKDIR /app
COPY . /app/

RUN npm install
RUN npm run build

CMD [ "npm", "run", "start" ]

EXPOSE 3000