FROM node:16
WORKDIR /app

COPY package*.json ./

RUN yarn install --production --frozen-lockfile && yarn cache clean

COPY . .

RUN yarn build

CMD [ "node", "dist/main.js" ]

