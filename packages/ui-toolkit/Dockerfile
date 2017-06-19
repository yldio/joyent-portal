FROM quay.io/yldio/alpine-node-containerpilot:latest

RUN yarn add lerna@^2.0.0-rc.5 serve \
 && ./node_modules/.bin/lerna clean --yes --scope joyent-ui-toolkit --include-filtered-dependencies \
 && ./node_modules/.bin/lerna bootstrap --scope joyent-ui-toolkit --include-filtered-dependencies

WORKDIR /opt/app/packages/ui-toolkit

ARG CIRCLE_BRANCH

RUN yarn run styleguide:build
COPY packages/ui-toolkit/etc/containerpilot.json /etc/

EXPOSE 6060
CMD ["/bin/containerpilot"]
