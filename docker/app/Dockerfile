# Stage 1 - Install depedencies
FROM node:8.15.0-alpine as build-deps

WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
ARG VERSION=unknow
RUN yarn build


# Stage 2 - Production environment
FROM nginx:1.15.8-alpine

COPY --from=build-deps /home/node/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
