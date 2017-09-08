FROM quay.io/yldio/alpine-node-containerpilot:latest

RUN apk add --update nginx

ENV CONTAINERPILOT /etc/containerpilot.json5

RUN npm install -g npm@^4
RUN npm config set loglevel info \
	&& yarn add lerna@^2.0.0

RUN ./node_modules/.bin/lerna clean --yes --scope my-joyent --include-filtered-dependencies \
	&& ./node_modules/.bin/lerna bootstrap --scope my-joyent --include-filtered-dependencies

COPY packages/my-joyent/etc/containerpilot.json5 ${CONTAINERPILOT}
COPY packages/my-joyent/etc/nginx.conf.tmpl /etc/nginx/nginx.conf.tmpl

WORKDIR /opt/app/packages/my-joyent

CMD ["/bin/containerpilot"]
