FROM quay.io/yldio/docker-compose-api


RUN apk add --update bash


# Install Consul
# Releases at https://releases.hashicorp.com/consul
RUN set -ex \
    && export CONSUL_VERSION=0.7.5 \
    && export CONSUL_CHECKSUM=40ce7175535551882ecdff21fdd276cef6eaab96be8a8260e0599fadb6f1f5b8 \
    && curl --retry 7 --fail -vo /tmp/consul.zip "https://releases.hashicorp.com/consul/${CONSUL_VERSION}/consul_${CONSUL_VERSION}_linux_amd64.zip" \
    && echo "${CONSUL_CHECKSUM}  /tmp/consul.zip" | sha256sum -c \
    && unzip /tmp/consul -d /usr/local/bin \
    && rm /tmp/consul.zip \
    # Create empty directories for Consul config and data \
    && mkdir -p /etc/consul \
    && mkdir -p /var/lib/consul \
    && mkdir /config



# Add Containerpilot and set its configuration
ENV CONTAINERPILOT_VERSION 3.0.0
ENV CONTAINERPILOT /etc/containerpilot.json

RUN export CONTAINERPILOT_CHECKSUM=6da4a4ab3dd92d8fd009cdb81a4d4002a90c8b7c \
    && export archive=containerpilot-${CONTAINERPILOT_VERSION}.tar.gz \
    && curl -Lso /tmp/${archive} \
         "https://github.com/joyent/containerpilot/releases/download/${CONTAINERPILOT_VERSION}/${archive}" \
    && echo "${CONTAINERPILOT_CHECKSUM}  /tmp/${archive}" | sha1sum -c \
    && tar zxf /tmp/${archive} -C /usr/local/bin \
    && rm /tmp/${archive}

# Add Containerpilot configuration
COPY etc/containerpilot.json /etc
ENV CONTAINERPILOT /etc/containerpilot.json
COPY bin /bin

ENTRYPOINT []
CMD ["/usr/local/bin/containerpilot"]
