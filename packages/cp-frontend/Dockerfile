FROM quay.io/yldio/alpine-node-containerpilot:latest

ENV CONTAINERPILOT /etc/containerpilot.json5

RUN yarn add lerna@^2.0.0-rc.5 serve \
 && ./node_modules/.bin/lerna clean --yes --scope joyent-cp-frontend --include-filtered-dependencies \
 && ./node_modules/.bin/lerna bootstrap --scope joyent-cp-frontend --include-filtered-dependencies

COPY packages/cp-frontend/etc/containerpilot.json5 ${CONTAINERPILOT}
WORKDIR /opt/app/packages/cp-frontend

EXPOSE 3069
CMD ["/bin/containerpilot"]
