#!/bin/bash
set -e -o pipefail

help() {
    echo
    echo 'Usage ./setup.sh ~/path/to/TRITON_PRIVATE_KEY ~/path/to/CA_CRT ~/path/to/SERVER_KEY ~/path/to/SERVER_CRT'
    echo
    echo 'Checks that your Triton and Docker environment is sane and configures'
    echo 'an environment file to use.'
    echo
    echo 'TRITON_PRIVATE_KEY is the filesystem path to an SSH private key'
    echo 'used to connect to Triton.'
    echo
}

# Check for correct configuration
check() {

    if [ -z "$1" ]; then
        tput rev  # reverse
        tput bold # bold
        echo 'Please provide a path to a SSH private key to access Triton.'
        tput sgr0 # clear

        help
        exit 1
    fi

    if [ ! -f "$1" ]; then
        tput rev  # reverse
        tput bold # bold
        echo 'SSH private key for Triton is unreadable.'
        tput sgr0 # clear

        help
        exit 1
    fi

    # Assign args to named vars
    TRITON_PRIVATE_KEY_PATH=$1


    if [ -z "$2" ]; then
        tput rev  # reverse
        tput bold # bold
        echo 'Please provide a path to the NGINX CA crt file.'
        tput sgr0 # clear

        help
        exit 1
    fi

    if [ ! -f "$2" ]; then
        tput rev  # reverse
        tput bold # bold
        echo 'CA certificate for NGINX is unreadable.'
        tput sgr0 # clear

        help
        exit 1
    fi

    NGINX_CA_CRT_PATH=$2


    if [ -z "$3" ]; then
        tput rev  # reverse
        tput bold # bold
        echo 'Please provide a path to the server key file.'
        tput sgr0 # clear

        help
        exit 1
    fi

    if [ ! -f "$3" ]; then
        tput rev  # reverse
        tput bold # bold
        echo 'Server key file for NGINX is unreadable.'
        tput sgr0 # clear

        help
        exit 1
    fi

    NGINX_SERVER_KEY_PATH=$3


    if [ -z "$4" ]; then
        tput rev  # reverse
        tput bold # bold
        echo 'Please provide a path to the server crt file.'
        tput sgr0 # clear

        help
        exit 1
    fi

    if [ ! -f "$4" ]; then
        tput rev  # reverse
        tput bold # bold
        echo 'Server crt file for NGINX is unreadable.'
        tput sgr0 # clear

        help
        exit 1
    fi

    NGINX_SERVER_CRT_PATH=$4

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
    TRITON_ACCOUNT=$(triton account get | awk -F": " '/id:/{print $2}')

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
    echo TRITON_ACCOUNT=${TRITON_USER} >> _env
    echo TRITON_USER=${TRITON_USER} >> _env
    echo TRITON_DC=${TRITON_DC} >> _env
    echo CONSUL=copilot-consul.svc.${TRITON_ACCOUNT}.${TRITON_DC}.cns.joyent.com >> _env
    echo TRITON_CA=$(cat "${DOCKER_CERT_PATH}"/ca.pem | tr '\n' '#') >> _env
    echo TRITON_CA_PATH=${TRITON_CREDS_PATH}/ca.pem >> _env
    echo TRITON_KEY=$(cat "${DOCKER_CERT_PATH}"/key.pem | tr '\n' '#') >> _env
    echo TRITON_KEY_PATH=${TRITON_CREDS_PATH}/key.pem >> _env
    echo TRITON_CERT=$(cat "${DOCKER_CERT_PATH}"/cert.pem | tr '\n' '#') >> _env
    echo TRITON_CERT_PATH=${TRITON_CREDS_PATH}/cert.pem >> _env

    echo SDC_KEY=$(cat "${TRITON_PRIVATE_KEY_PATH}" | tr '\n' '#') >> _env
    echo SDC_KEY_PUB=$(cat "${TRITON_PRIVATE_KEY_PATH}.pub" | tr '\n' '#') >> _env

    echo NGINX_CA_CRT=$(cat "${NGINX_CA_CRT_PATH}" | tr '\n' '#') >> _env
    echo NGINX_SERVER_KEY=$(cat "${NGINX_SERVER_KEY_PATH}" | tr '\n' '#') >> _env
    echo NGINX_SERVER_CRT=$(cat "${NGINX_SERVER_CRT_PATH}" | tr '\n' '#') >> _env

    echo >> _env
}

# ---------------------------------------------------
# parse arguments

# Get function list
funcs=($(declare -F -p | cut -d " " -f 3))

until
    if [ ! -z "$1" ]; then
        # check if the first arg is a function in this file, or use a default
        if [[ " ${funcs[@]} " =~ " $1 " ]]; then
            cmd=$1
            shift 1
        else
            cmd="check"
        fi

        $cmd "$@"
        if [ $? == 127 ]; then
            help
        fi

        exit
    else
        help
    fi
do
    echo
done
