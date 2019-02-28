# Stage 1 - Install depedencies
FROM node:8.15.0-alpine as build-deps

WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
ARG REACT_APP_FORECAST_API_BASE_URL
ARG REACT_APP_GOOGLE_MAPS_API_KEY
ENV REACT_APP_FORECAST_API_BASE_URL=$REACT_APP_FORECAST_API_BASE_URL
ENV REACT_APP_GOOGLE_MAPS_API_KEY=$REACT_APP_GOOGLE_MAPS_API_KEY
ARG VERSION=unknow

RUN yarn run build


# Stage 2 - Production environment
FROM nginx:1.15.8-alpine

COPY --from=build-deps /home/node/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
