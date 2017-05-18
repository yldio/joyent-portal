FROM mhart/alpine-node:7

RUN npm install -g yarn

WORKDIR /src
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production --pure-lockfile --prefer-offline

COPY . .

EXPOSE 8000
CMD ["node", "scripts/start.js"]