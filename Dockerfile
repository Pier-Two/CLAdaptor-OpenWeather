FROM node:alpine

WORKDIR /WeatherAdaptor
ADD . .

ENV PORT=80

RUN npm install
ENTRYPOINT ["node", "app.js"]