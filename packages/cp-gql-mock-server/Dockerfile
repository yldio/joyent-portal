FROM quay.io/yldio/alpine-node-containerpilot:latest

ENV CONTAINERPILOT /etc/containerpilot.json5

RUN yarn add lerna@^2.0.0-rc.5 serve \
 && ./node_modules/.bin/lerna clean --yes --scope joyent-cp-gql-mock-server --include-filtered-dependencies \
 && ./node_modules/.bin/lerna bootstrap --scope joyent-cp-gql-mock-server --include-filtered-dependencies

WORKDIR /opt/app/packages/cp-gql-mock-server

COPY packages/cp-gql-mock-server/etc/containerpilot.json5 ${CONTAINERPILOT}
COPY packages/cp-gql-mock-server/bin /bin

ARG CIRCLE_BRANCH

EXPOSE 3000
CMD ["/bin/containerpilot"]
