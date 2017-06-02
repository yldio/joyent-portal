# todo change to 7
FROM quay.io/yldio/alpine-node-containerpilot:latest

RUN yarn add lerna@^2.0.0-rc.5 serve \
 && ./node_modules/.bin/lerna clean --yes --scope joyent-ui-toolkit --include-filtered-dependencies \
 && ./node_modules/.bin/lerna bootstrap --scope joyent-ui-toolkit --include-filtered-dependencies

WORKDIR /home/node/app/packages/ui-toolkit
COPY packages/ui-toolkit/etc/containerpilot.json /etc/

ARG CIRCLE_BRANCH

RUN yarn run styleguide:build

EXPOSE 5000
CMD ["/bin/containerpilot", "../../node_modules/.bin/serve", "-s", "styleguide"]
