#!/bin/bash
set -e -o pipefail

# Check for correct configuration
check() {

    command -v docker >/dev/null 2>&1 || {
        echo
        tput rev  # reverse
        tput bold # bold
        echo 'Docker is required, but does not appear to be installed.'
        tput sgr0 # clear
        echo 'See https://docs.joyent.com/public-cloud/api-access/docker'
        exit 1
    }

    command -v triton >/dev/null 2>&1 || {
        echo
        tput rev  # reverse
        tput bold # bold
        echo 'Error! Joyent Triton CLI is required, but does not appear to be installed.'
        tput sgr0 # clear
        echo 'See https://www.joyent.com/blog/introducing-the-triton-command-line-tool'
        exit 1
    }

    TRITON_USER=$(triton profile get | awk -F": " '/account:/{print $2}')
    TRITON_DC=$(triton profile get | awk -F"/" '/url:/{print $3}' | awk -F'.' '{print $1}')

    echo '# docker-compose-client for Triton' > _env
    TRITON_CREDS_PATH=/root/.triton
    echo TRITON_CREDS_PATH=${TRITON_CREDS_PATH} >> _env
    echo DOCKER_CERT_PATH=${TRITON_CREDS_PATH} >> _env
    echo DOCKER_TLS_VERIFY=1 >> _env
    echo COMPOSE_HTTP_TIMEOUT=300 >> _env
    echo DOCKER_CLIENT_TIMEOUT=300 >> _env
    echo DOCKER_HOST=${DOCKER_HOST} >> _env
    echo SDC_URL=${SDC_URL} >> _env
    echo SDC_ACCOUNT=${SDC_ACCOUNT} >> _env
    echo SDC_KEY_ID=${SDC_KEY_ID} >> _env
    echo TRITON_USER=${TRITON_USER} >> _env
    echo TRITON_DC=${TRITON_DC} >> _env
    echo TRITON_CA=$(cat "${DOCKER_CERT_PATH}"/ca.pem | tr '\n' '#') >> _env
    echo TRITON_CA_PATH=${TRITON_CREDS_PATH}/ca.pem >> _env
    echo TRITON_KEY=$(cat "${DOCKER_CERT_PATH}"/key.pem | tr '\n' '#') >> _env
    echo TRITON_KEY_PATH=${TRITON_CREDS_PATH}/key.pem >> _env
    echo TRITON_CERT=$(cat "${DOCKER_CERT_PATH}"/cert.pem | tr '\n' '#') >> _env
    echo TRITON_CERT_PATH=${TRITON_CREDS_PATH}/cert.pem >> _env
    echo >> _env
}

# default behavior
check
