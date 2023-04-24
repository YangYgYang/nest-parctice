FROM node:16
WORKDIR /app

COPY package*.json ./

RUN yarn install  --frozen-lockfile && yarn cache clean

COPY . .

RUN yarn build

RUN rm -rf ./node_modules \
    && yarn install --production --frozen-lockfile \
    && yarn cache clean

CMD [ "node", "dist/main.js" ]

