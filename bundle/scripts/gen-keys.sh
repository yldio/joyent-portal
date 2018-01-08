#!/bin/bash
set -e -o pipefail

TRITON_ACCOUNT=$(triton account get | awk -F": " '/id:/{print $2}')
TRITON_DC=$(triton profile get | awk -F"/" '/url:/{print $3}' | awk -F'.' '{print $1}')

DEFAULT_DOMAIN=${TRITON_ACCOUNT}.${TRITON_DC}.cns.triton.zone

read -p "Enter the domain name you plan to use for this key [$DEFAULT_DOMAIN]: " domain
domain="${domain:-$DEFAULT_DOMAIN}"
echo -n "Enter the password to use for the key: "
read -s password
echo
echo "Generating key for $domain"



keys_path=keys-$domain
mkdir -p $keys_path

openssl genrsa -aes256 -passout pass:$password -out $keys_path/ca.key 4096
chmod 400 $keys_path/ca.key
openssl req -new -x509 -sha256 -days 730 -key $keys_path/ca.key -out $keys_path/ca.crt -passin pass:$password -subj "/CN=copilot"
chmod 444 $keys_path/ca.crt


openssl genrsa -out $keys_path/server.key 2048
chmod 400 $keys_path/server.key
openssl req -new -key $keys_path/server.key -sha256 -out $keys_path/server.csr -passin pass:$password -subj "/CN=$domain"
openssl x509 -req -days 365 -sha256 -in $keys_path/server.csr -passin pass:$password -CA $keys_path/ca.crt -CAkey $keys_path/ca.key -set_serial 1 -out $keys_path/server.crt
chmod 444 $keys_path/server.crt

openssl genrsa -out $keys_path/client.key 2048
openssl req -new -key $keys_path/client.key -out $keys_path/client.csr -subj "/CN=$domain"
openssl x509 -req -days 365 -sha256 -in $keys_path/client.csr -CA $keys_path/ca.crt -CAkey $keys_path/ca.key -set_serial 2 -out $keys_path/client.crt -passin pass:$password
openssl pkcs12 -export -clcerts -in $keys_path/client.crt -inkey $keys_path/client.key -out $keys_path/client.p12 -passout pass:$password

# open $keys_path/client.p12 &
echo
echo "You can complete setup by running './setup.sh ~/path/to/TRITON_PRIVATE_KEY $keys_path/ca.crt $keys_path/server.key $keys_path/server.crt'"
