FROM node:20-alpine AS builder

COPY package-lock.json .
COPY package.json .

COPY tsconfig.build.json .
COPY tsconfig.json .

RUN npm install

COPY . .

CMD ["nest", "build"]

FROM node:20-alpine AS runner

COPY --from=builder ./dist ./dist
COPY --from=builder node_modules ./node_modules

COPY dist/build ./dist/build

CMD ["node", "dist/main.js"]