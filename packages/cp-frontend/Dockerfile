FROM quay.io/yldio/alpine-node-containerpilot:latest

ENV CONTAINERPILOT /etc/containerpilot.json5

RUN yarn add lerna@^2.0.0-rc.5 serve \
 && ./node_modules/.bin/lerna clean --yes --scope joyent-cp-frontend --include-filtered-dependencies \
 && ./node_modules/.bin/lerna bootstrap --scope joyent-cp-frontend --include-filtered-dependencies

WORKDIR /opt/app/packages/cp-frontend
COPY packages/cp-frontend/etc/containerpilot.json5 ${CONTAINERPILOT}

RUN yarn run build

ARG CIRCLE_BRANCH
ENV REACT_APP_GQL_HOSTNAME gql-mock-server-$CIRCLE_BRANCH.svc.f4b20699-b323-4452-9091-977895896da6.eu-ams-1.triton.zone

EXPOSE 3069
CMD ["/bin/containerpilot"]
