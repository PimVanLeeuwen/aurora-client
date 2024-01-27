# Build in a different image to keep the target image clean
FROM node:20-alpine as build
WORKDIR /usr/src/app
COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY ./ ./
RUN npm run build

# The target image that will be run
FROM nginx:alpine as target
WORKDIR /usr/src/app
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./public /usr/src/app/public
COPY --from=build --chown=nginx /usr/src/app/dist/ /usr/src/app
