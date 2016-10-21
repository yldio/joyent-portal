FROM node:slim

RUN set -x \
    && apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3 \
    && echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install -y git yarn --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -g 433 -r nodejs \
    && useradd -u 431 -r -g nodejs -d /home/nodejs -s /sbin/nologin -c "Docker image user" nodejs \
    && mkdir -p /home/nodejs/ \
    && chown -R nodejs:nodejs /home/nodejs/

# Get and configure containerpilot
ENV CONTAINERPILOT_VERSION 2.4.1
ENV CONTAINERPILOT file:///etc/containerpilot.json

RUN export CP_SHA1=198d96c8d7bfafb1ab6df96653c29701510b833c \
    && curl -Lso /tmp/containerpilot.tar.gz \
         "https://github.com/joyent/containerpilot/releases/download/${CONTAINERPILOT_VERSION}/containerpilot-${CONTAINERPILOT_VERSION}.tar.gz" \
    && echo "${CP_SHA1}  /tmp/containerpilot.tar.gz" | sha1sum -c \
    && tar zxf /tmp/containerpilot.tar.gz -C /bin \
    && rm /tmp/containerpilot.tar.gz

COPY ./etc/containerpilot.json /etc/

USER nodejs
WORKDIR /home/nodejs/
ADD package.json .
RUN npm install --quiet --no-spin
ADD . .

CMD [ "/bin/containerpilot", "node", "src/index.js" ]
