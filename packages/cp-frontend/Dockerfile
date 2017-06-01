# todo change to 7
FROM quay.io/yldio/alpine-node-containerpilot:latest

RUN npm install lerna@^2.0.0-rc.5 \
 && ./node_modules/.bin/lerna clean --yes --scope joyent-cp-frontend --include-filtered-dependencies \
 && ./node_modules/.bin/lerna bootstrap --scope joyent-cp-frontend --include-filtered-dependencies

WORKDIR /home/node/app/packages/cp-frontend
COPY packages/cp-frontend/etc/containerpilot.json /etc/

ARG CIRCLE_BRANCH

ENV REACT_APP_GQL_HOSTNAME gql-mock-server-$CIRCLE_BRANCH.svc.f4b20699-b323-4452-9091-977895896da6.eu-ams-1.triton.zone

EXPOSE 3069
CMD ["/bin/containerpilot", "yarn", "run", "start"]
