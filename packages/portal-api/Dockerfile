# todo change to 7
FROM quay.io/yldio/alpine-node-containerpilot:latest

RUN yarn add lerna@^2.0.0-rc.5 \
 && ./node_modules/.bin/lerna clean --yes --scope portal-api --include-filtered-dependencies \
 && ./node_modules/.bin/lerna bootstrap --scope portal-api --include-filtered-dependencies

WORKDIR /home/node/app/packages/portal-api
COPY packages/portal-api/etc/containerpilot.json /etc/

ARG CIRCLE_BRANCH

EXPOSE 3000
CMD ["/bin/containerpilot", "yarn", "start"]
