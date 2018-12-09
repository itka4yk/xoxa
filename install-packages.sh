#!/usr/bin/env bash
cd src
for d in */; do
    yarn --cwd $d
done