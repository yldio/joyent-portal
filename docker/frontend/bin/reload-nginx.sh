#!/bin/bash

# Render Nginx configuration template using values from Consul,
# but do not reload because Nginx has't started yet.
# Install key files for TLS auth in nginx
preStart() {
    # Copy creds from env vars to files on disk
    if [ -n ${!NGINX_CA_CRT} ] \
        && [ -n ${!NGINX_SERVER_KEY} ] \
        && [ -n ${!NGINX_SERVER_CRT} ]
    then
        local nginx_path=/etc/nginx/certs
        mkdir -p $nginx_path
        mkdir -p $nginx_path/ca
        mkdir -p $nginx_path/server
        echo -e "${NGINX_CA_CRT}" | tr '#' '\n' > $nginx_path/ca/ca.crt
        echo -e "${NGINX_SERVER_KEY}" | tr '#' '\n' > $nginx_path/server/server.key
        echo -e "${NGINX_SERVER_CRT}" | tr '#' '\n' > $nginx_path/server/server.crt

        chmod 444 $nginx_path/ca/ca.crt
        chmod 444 $nginx_path/server/server.key
        chmod 444 $nginx_path/server/server.crt
    fi

    consul-template \
        -once \
        -consul-addr "localhost:8500" \
        -template "/etc/nginx/nginx.conf.tmpl:/etc/nginx/nginx.conf"
}

# Render Nginx configuration template using values from Consul,
# then gracefully reload Nginx
onChange() {
    consul-template \
        -once \
        -consul-addr "localhost:8500" \
        -template "/etc/nginx/nginx.conf.tmpl:/etc/nginx/nginx.conf:nginx -s reload"
}

until
    cmd=$1
    if [ -z "$cmd" ]; then
        onChange
    fi
    shift 1
    $cmd "$@"
    [ "$?" -ne 127 ]
do
    onChange
    exit
done
