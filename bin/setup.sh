#! /usr/bin/env bash

# setup.sh - Checks that all the required tools are present and that they are
#            appropriately configured for deploying to Triton.
#
# Adapted from https://github.com/autopilotpattern/mysql/blob/master/setup.sh
#

#
# Prelude
#
set -euo pipefail
IFS=$'\n\t'

#
# Utilities
#
die() {
  local msg="$@"
  [[ -z "${msg}" ]] || {
    echo
    tput setaf 1  # red
    tput bold
    echo "${msg}"
    tput sgr0     # reset
  }
  exit 1
}

#
# Check functions
#
ensure_command() {
  local cmd="$1"

  command -v "${cmd}" > /dev/null 2>&1 || {
    die "Couldn't find required command: ${cmd}"
  }
}

ensure_docker_config_matches_triton_config_and_capture_triton_details() {
  local docker_user=$(docker info 2>&1 | awk -F": " '/SDCAccount:/{print $2}')
  local docker_dc=$(echo $DOCKER_HOST | awk -F"/" '{print $3}' | awk -F'.' '{print $1}')
  TRITON_USER=$(triton profile get | awk -F": " '/account:/{print $2}')
  TRITON_DC=$(triton profile get | awk -F"/" '/url:/{print $3}' | awk -F'.' '{print $1}')
  TRITON_ACCOUNT=$(triton account get | awk -F": " '/id:/{print $2}')
  if [[ ! "$docker_user" = "$TRITON_USER" ]] || [[ ! "$docker_dc" = "$TRITON_DC" ]]; then
    echo "Docker user: ${docker_user}"
    echo "Triton user: ${TRITON_USER}"
    echo "Docker data center: ${docker_dc}"
    echo "Triton data center: ${TRITON_DC}"
    die "Your Triton configuration does not match your Docker configuration."
  fi
}

ensure_triton_cns_is_enabled() {
  local triton_cns_enabled=$(triton account get | awk -F": " '/cns/{print $2}')
  [[ "$triton_cns_enabled" == "true" ]] || {
    die "Triton CNS is required and not enabled."
  }
}

write_env_file() {
  [[ -f .env ]] || {
    echo '# Consul discovery via Triton CNS' >> .env
    echo CONSUL=consul.svc.${TRITON_ACCOUNT}.${TRITON_DC}.cns.joyent.com >> .env
    echo MONGO_URL=mongodb://mongo.svc.${TRITON_ACCOUNT}.${TRITON_DC}.cns.joyent.com:27017/rocketchat >> .env
    echo ROOT_URL=http://rocketchat.svc.${TRITON_ACCOUNT}.${TRITON_DC}.cns.joyent.com:3000/ >> .env
    echo >> .env
  }
}

ensure_prerequisites() {
  ensure_command docker
  ensure_command docker-compose
  ensure_command triton
}

#
# Main
#
ensure_prerequisites
ensure_docker_config_matches_triton_config_and_capture_triton_details
ensure_triton_cns_is_enabled
write_env_file
