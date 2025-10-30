FROM node:lts-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm ci --quiet --no-optional --no-fund --loglevel=error

RUN npm install --include=dev --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

ARG SERVICE=api

ENV SERVICE=${SERVICE}

EXPOSE 3000
EXPOSE 3001
CMD ["sh", "-c", "node dist/apps/${SERVICE}/main.js"]
