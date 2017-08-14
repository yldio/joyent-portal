#!/bin/bash

# Copy creds from env vars to files on disk
if [ -n ${!TRITON_CREDS_PATH} ] \
    && [ -n ${!TRITON_CA} ] \
    && [ -n ${!TRITON_CERT} ] \
    && [ -n ${!TRITON_KEY} ]
then
    mkdir -p ${TRITON_CREDS_PATH}
    echo -e "${TRITON_CA}" | tr '#' '\n' > ${TRITON_CREDS_PATH}/ca.pem
    echo -e "${TRITON_CERT}" | tr '#' '\n' > ${TRITON_CREDS_PATH}/cert.pem
    echo -e "${TRITON_KEY}" | tr '#' '\n' > ${TRITON_CREDS_PATH}/key.pem
fi

eval `/usr/bin/ssh-agent -s`
mkdir -p ~/.ssh
echo -e "${SDC_KEY_PUB}" | tr '#' '\n' > ~/.ssh/id_rsa.pub
echo -e "${SDC_KEY}" | tr '#' '\n' > ~/.ssh/id_rsa
chmod 400 ~/.ssh/id_rsa.pub
chmod 400 ~/.ssh/id_rsa
ssh-add ~/.ssh/id_rsa

keyid=$(ssh-keygen -E md5 -lf ~/.ssh/id_rsa.pub | awk '{print $2}' | cut -d':' -f2-)

containerpilot -putenv "SSH_KEYID=$keyid"


IS_RETHINK_DOWN=1
until [ $IS_RETHINK_DOWN -eq 0 ]; do
    curl -o /dev/null --fail -s -m 10 http://rethinkdb:8080
    IS_RETHINK_DOWN=$(echo $?)
done