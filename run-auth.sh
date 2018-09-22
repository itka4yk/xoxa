#!/bin/bash

set -e

yarn auth:build

cd ./docker

docker-compose -f docker-compose.auth.yml build

docker-compose -f docker-compose.auth.yml up -d