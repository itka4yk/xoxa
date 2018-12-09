#!/usr/bin/env bash
docker run -p 27017:27017 --name=mongo --restart=always -d mongo
docker run -p 6379:6379 --name=redis --restart=always -d redis
docker run -e 'POSTGRES_PASSWORD=password' -p 5432:5432 --name=postgres --restart=always -d postgres