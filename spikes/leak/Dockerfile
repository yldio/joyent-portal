FROM mhart/alpine-node:7

WORKDIR /src
ADD . .

RUN npm install -g yarn
RUN yarn install --production --pure-lockfile --prefer-offline

EXPOSE 8000
CMD ["node", "start.js"]