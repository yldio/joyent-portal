# todo change to 7
FROM quay.io/yldio/alpine-node-containerpilot:latest

RUN yarn global add lerna@^2.0.0-rc.5 \
 && ./node_modules/.bin/lerna clean --yes --scope joyent-cp-gql-mock-server --include-filtered-dependencies \
 && ./node_modules/.bin/lerna bootstrap --scope joyent-cp-gql-mock-server --include-filtered-dependencies

WORKDIR /home/node/app/packages/cp-gql-mock-server
COPY packages/cp-gql-mock-server/etc/containerpilot.json /etc/

ARG CIRCLE_BRANCH

EXPOSE 3000
CMD ["/bin/containerpilot", "yarn", "run", "start"]
