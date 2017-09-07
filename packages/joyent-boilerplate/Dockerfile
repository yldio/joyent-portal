FROM quay.io/yldio/alpine-node-containerpilot:latest

RUN apk add --update nginx

ENV CONTAINERPILOT /etc/containerpilot.json5

RUN npm install -g npm@^4
RUN npm config set loglevel info \
	&& yarn add lerna@^2.0.0

RUN ./node_modules/.bin/lerna clean --yes --scope joyent-boilerplate --include-filtered-dependencies \
	&& ./node_modules/.bin/lerna bootstrap --scope joyent-boilerplate --include-filtered-dependencies

COPY packages/boilerplate/etc/containerpilot.json5 ${CONTAINERPILOT}
COPY packages/boilerplate/etc/nginx.conf.tmpl /etc/nginx/nginx.conf.tmpl

WORKDIR /opt/app/packages/boilerplate

CMD ["/bin/containerpilot"]
