FROM quay.io/yldio/alpine-node-containerpilot:latest

ENV CONTAINERPILOT /etc/containerpilot.json5

RUN npm install -g npm@^4 \
 && npm config set loglevel info \
 && yarn add lerna@^2.0.0-rc.5 serve \
 && ./node_modules/.bin/lerna clean --yes --scope joyent-ui-toolkit --include-filtered-dependencies \
 && ./node_modules/.bin/lerna bootstrap --scope joyent-ui-toolkit --include-filtered-dependencies

COPY packages/ui-toolkit/etc/containerpilot.json5 ${CONTAINERPILOT}
WORKDIR /opt/app/packages/ui-toolkit

RUN yarn run styleguide:build

EXPOSE 6060
CMD ["/bin/containerpilot"]
