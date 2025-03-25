#!/bin/bash
# Start the MongoDB container
mongodb_container_name="mongodb"
if [ "$(docker container inspect -f '{{.State.Status}}' $mongodb_container_name)" == "running" ]; then
    echo "The $mongodb_container_name container is running."
else
    echo "The $mongodb_container_name container is not running."
    inspect_mongo_init="$(docker container inspect -f '{{.State.Status}}' $mongodb_container_name)"
    case $inspect_mongo_init in
    "exited"|"created")
        echo "Container is in the exited or created state. Starting the container."
        docker container start $mongodb_container_name
        ;;
    *)
        echo "Container does not exist in the exited or created state. Creating a new container."
        docker run --name $mongodb_container_name -p 27017:27017 -d mongodb/mongodb-community-server:latest
        ;;
    esac
fi

# Wait for the MongoDB container to start
counter=1
until "$(docker container inspect -f {{.State.Running}} $mongodb_container_name)" == "true"; do
    if [ $counter -gt 10 ]; then
        echo "MongoDB took took too long to start or failed to start"
        break
    fi
    echo "Waiting for MongoDB container to start..."
    counter=$((counter + 1))
    sleep 3
done

# Get the mongodb container IP for graphql server connections
mongodb_ip=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $mongodb_container_name)

# Start the GraphQL server container
gql_service_name=$(jq -r .name package.json)
gql_service_version=$(jq -r .version package.json)
gql_image_name="${gql_service_name}-${gql_service_version}"
gql_container_name="graphql-server-example"
if [ -z "$(docker images -q $gql_image_name 2> /dev/null)" ]; then
  bash ./docker-build.sh
  docker run --network=bridge -p 8080:8080 -e MONGODB_HOST=mongodb://$mongodb_ip --name $gql_container_name -d $gql_image_name
else
    if [ "$(docker container inspect -f '{{.State.Status}}' $gql_container_name)" == "running" ]; then
        echo "The $gql_container_name container is running."
    else
        docker run --network=bridge -p 8080:8080 -e MONGODB_HOST=$mongodb_ip --name graphql-server-example -d $gql_image_name
  fi
fi

docker ps