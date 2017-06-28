FROM node:8-alpine

# Built in context of root folder in repo

# Install dependencies
RUN set -x \
 && apk update \
 && apk add --update curl bash build-base git nginx python \
 && apk upgrade \
 && rm -rf /var/cache/apk/*

# Install Consul agent
ENV CONSUL_VERSION 0.7.0
ENV CONSUL_CHECKSUM b350591af10d7d23514ebaa0565638539900cdb3aaa048f077217c4c46653dd8
RUN curl --retry 7 --fail -vo /tmp/consul.zip "https://releases.hashicorp.com/consul/${CONSUL_VERSION}/consul_${CONSUL_VERSION}_linux_amd64.zip" \
 && echo "${CONSUL_CHECKSUM}  /tmp/consul.zip" | sha256sum -c \
 && unzip /tmp/consul -d /usr/local/bin \
 && rm /tmp/consul.zip \
 && mkdir /config

# Install ContainerPilot
ENV CP_SHA1 1f159207c7dc2b622f693754f6dda77c82a88263
ENV CONTAINERPILOT_VERSION 3.1.1
RUN curl -Lo /tmp/containerpilot.tar.gz "https://github.com/joyent/containerpilot/releases/download/${CONTAINERPILOT_VERSION}/containerpilot-${CONTAINERPILOT_VERSION}.tar.gz" \
 && echo "${CP_SHA1}  /tmp/containerpilot.tar.gz" | sha1sum -c \
 && tar zxf /tmp/containerpilot.tar.gz -C /bin \
 && rm /tmp/containerpilot.tar.gz

# Copy required files
RUN mkdir -p /opt/app/
COPY ./ /opt/app/
COPY ./docker/frontend/bin /bin
COPY ./docker/frontend/etc/nginx.conf.tmpl /etc/nginx/nginx.conf.tmpl
COPY ./docker/frontend/etc/containerpilot.json5 /etc/containerpilot.json5
ENV CONTAINERPILOT /etc/containerpilot.json5

WORKDIR /opt/app/

ENV BUILD=production
ENV NODE_ENV=production

RUN npm install -g yarn
RUN yarn add lerna

RUN ./node_modules/.bin/lerna clean --yes --scope joyent-cp-frontend --include-filtered-dependencies \
  && ./node_modules/.bin/lerna bootstrap --scope joyent-cp-frontend --include-filtered-dependencies

WORKDIR /opt/app/packages/cp-frontend
RUN yarn build

CMD ["/bin/containerpilot"]
