FROM node:latest AS build-env
WORKDIR /app

COPY . ./
RUN npm install -g @angular/cli@8.3.6
RUN npm ci
RUN ng build --prod

FROM nginx:stable-alpine
LABEL version="1.0"

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=build-env /app/dist/leaflet-map/ .