#!/bin/bash

set -e

yarn build

docker-compose build

docker-compose up -d