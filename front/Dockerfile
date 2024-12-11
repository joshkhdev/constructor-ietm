FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --force

RUN npm install -g @angular/cli

ENV NODE_OPTIONS=--openssl-legacy-provider

CMD ["ng", "serve"]
