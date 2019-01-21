# ACID Challenge

Display Google Map, and obtain current forecast for capital on clicked country on map.

The app consists of two services:

- api `(/api)`: provide forecast data from DarkSky API and cache request on redis server
- app `(/app)`: frontend make on ReactJS, consume api service and Google Maps services.

The app was developed in a single repository however both services are independent and could eventually be separated.

## Running

### Development

```
cp .env.dist .env
# Complete .env with required data
cp app/.env.dist app/.env
# Complete app/.env with required data

yarn install

# TODO: Fix multi-state for run in development
docker-compose up -d api
cd ./app
yarn install
yarn start
# Open: http://localhost:3000
```

### Production

```sh
cp .env.dist .env
# Complete .env with required data
cp app/.env.dist app/.env
# Complete app/.env with required data
docker-compose -f docker-compose.build.yml build
docker-compose -f docker-compose.yml up -d
```

## Requirements

### Services

- [https://darksky.net/dev](https://darksky.net/dev): Forecast API
- [https://developers.google.com/maps/documentation/geocoding/start](https://developers.google.com/maps/documentation/geocoding/start): Google Map Geocode API
- [https://developers.google.com/maps/documentation/javascript/tutorial](https://developers.google.com/maps/documentation/javascript/tutorial): Google Map Javascript API

### Tools

- NodeJS
- ReactJS
- Redis
- ES6
- Docker
- Traefik

## Notes

- Git commit make follow: [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/).
