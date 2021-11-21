FROM node:16.3.0-alpine as build

COPY . /app
WORKDIR /app

RUN yarn
RUN yarn add serve
RUN yarn build
CMD yarn serve -s build -l tcp://0.0.0.0:5000