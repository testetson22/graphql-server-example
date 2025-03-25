#!/bin/bash
service_name=$(jq -r .name package.json)
service_version=$(jq -r .version package.json)
image_name="${service_name}-${service_version}"
echo $image_name
docker build -t $image_name .