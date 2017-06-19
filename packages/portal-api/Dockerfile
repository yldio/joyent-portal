FROM node:8-alpine

RUN set -x \
    && apk update \
    && apk add curl bash build-base python zeromq-dev \
    && rm -rf /var/cache/apk/*

RUN export CONSUL_VERSION=0.7.0 \
    && export CONSUL_CHECKSUM=b350591af10d7d23514ebaa0565638539900cdb3aaa048f077217c4c46653dd8 \
    && curl --retry 7 --fail -vo /tmp/consul.zip "https://releases.hashicorp.com/consul/${CONSUL_VERSION}/consul_${CONSUL_VERSION}_linux_amd64.zip" \
    && echo "${CONSUL_CHECKSUM}  /tmp/consul.zip" | sha256sum -c \
    && unzip /tmp/consul -d /usr/local/bin \
    && rm /tmp/consul.zip \
    && mkdir /config

# Install ContainerPilot
ENV CONTAINERPILOT_VERSION 3.0.0
RUN export CP_SHA1=6da4a4ab3dd92d8fd009cdb81a4d4002a90c8b7c \
    && curl -Lso /tmp/containerpilot.tar.gz \
         "https://github.com/joyent/containerpilot/releases/download/${CONTAINERPILOT_VERSION}/containerpilot-${CONTAINERPILOT_VERSION}.tar.gz" \
    && echo "${CP_SHA1}  /tmp/containerpilot.tar.gz" | sha1sum -c \
    && tar zxf /tmp/containerpilot.tar.gz -C /bin \
    && rm /tmp/containerpilot.tar.gz

ENV BUILD=production
ENV NODE_ENV=production

COPY . /home/node/app/
WORKDIR /home/node/app

RUN yarn add lerna@^2.0.0-rc.5 \
  && ./node_modules/.bin/lerna clean --yes --scope portal-api --include-filtered-dependencies \
  && ./node_modules/.bin/lerna bootstrap --scope portal-api --include-filtered-dependencies

# COPY ContainerPilot configuration
ENV CONTAINERPILOT=/etc/containerpilot.json5
COPY packages/portal-api/etc/containerpilot.json5 ${CONTAINERPILOT}

CMD ["/bin/containerpilot"]
