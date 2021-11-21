FROM node:16.3.0-slim

COPY . /app
WORKDIR /app

RUN yarn
CMD yarn migrate up && yarn prod