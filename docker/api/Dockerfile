FROM node:8-alpine

# Install dependencies
RUN set -x \
 && apk update \
 && apk add --update curl bash build-base python zeromq-dev openssh \
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
ENV CP_SHA1 e27c1b9cd1023e622f77bb19914606dee3c9b22c
ENV CONTAINERPILOT_VERSION 3.3.1
RUN curl -Lo /tmp/containerpilot.tar.gz "https://github.com/joyent/containerpilot/releases/download/${CONTAINERPILOT_VERSION}/containerpilot-${CONTAINERPILOT_VERSION}.tar.gz" \
 && echo "${CP_SHA1}  /tmp/containerpilot.tar.gz" | sha1sum -c \
 && tar zxf /tmp/containerpilot.tar.gz -C /bin \
 && rm /tmp/containerpilot.tar.gz

# Copy required files
RUN mkdir -p /opt/app/
COPY *.js /opt/app/
COPY package.json /opt/app/
COPY bin /bin
COPY etc /etc
ENV CONTAINERPILOT /etc/containerpilot.json5


# Install dependencies

WORKDIR /opt/app/

ENV BUILD=production
ENV NODE_ENV=production
RUN npm install

CMD ["/bin/containerpilot"]
