FROM quay.io/yldio/alpine-node-containerpilot:latest

ENV CONTAINERPILOT /etc/containerpilot.json5

RUN npm install -g npm@^4 \
 && npm config set loglevel info \
 && yarn add lerna@^2.0.0-rc.5 serve \
 && ./node_modules/.bin/lerna clean --yes --scope joyent-cp-gql-mock-server --include-filtered-dependencies \
 && ./node_modules/.bin/lerna bootstrap --scope joyent-cp-gql-mock-server --include-filtered-dependencies

COPY packages/cp-gql-mock-server/etc/containerpilot.json5 ${CONTAINERPILOT}
WORKDIR /opt/app/packages/cp-gql-mock-server

EXPOSE 3000
CMD ["/bin/containerpilot"]
