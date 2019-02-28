FROM node:8.15.0-alpine

EXPOSE 8000

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]
