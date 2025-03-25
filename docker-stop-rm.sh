#!/bin/bash
gql_container_name="graphql-server-example"
mongodb_container_name="mongodb"

# Stop and remove the GraphQL server container
if [ "$(docker container inspect -f '{{.State.Status}}' $gql_container_name)" == "running" ]; then
    echo "Stopping the $gql_container_name container."
    docker container stop $gql_container_name
fi
if [ "$(docker container inspect -f '{{.State.Status}}' $gql_container_name)" != "running" ]; then
    echo "Removing the $gql_container_name container."
    docker container rm $gql_container_name
fi

# Stop and remove the MongoDB container
if [ "$(docker container inspect -f '{{.State.Status}}' $mongodb_container_name)" == "running" ]; then
    echo "Stopping the $mongodb_container_name container."
    docker container stop $mongodb_container_name
fi
if [ "$(docker container inspect -f '{{.State.Status}}' $mongodb_container_name)" != "running" ]; then
    echo "Removing the $mongodb_container_name container."
    docker container rm $mongodb_container_name
fi