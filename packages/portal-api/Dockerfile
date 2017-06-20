FROM quay.io/yldio/alpine-node-containerpilot:latest

ENV CONTAINERPILOT /etc/containerpilot.json5

RUN set -x \
 && apk update \
 && apk add curl bash build-base python zeromq-dev \
 && rm -rf /var/cache/apk/*

RUN yarn add lerna@^2.0.0-rc.5 \
 && ./node_modules/.bin/lerna clean --yes --scope portal-api --include-filtered-dependencies \
 && ./node_modules/.bin/lerna bootstrap --scope portal-api --include-filtered-dependencies

COPY packages/portal-api/etc/containerpilot.json5 ${CONTAINERPILOT}
WORKDIR /opt/app/packages/portal-api

CMD ["/bin/containerpilot"]
