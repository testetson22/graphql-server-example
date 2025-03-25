#!/bin/bash
# This script assumes aws-cli and AWS credentials are configured, and REPO_URL is set in the environment
# REPO_URL is the ECR repository URL (e.g., 123456789012.dkr.ecr.us-east-2.amazonaws.com/test)

aws_account_id=$(aws sts get-caller-identity | jq -r ".Account")
aws_region=${AWS_REGION:-'us-east-2'}
service_name=$(jq -r .name package.json)
service_version=$(jq -r .version package.json)
image_name="${service_name}-${service_version}"

aws ecr get-login-password --region $aws_region | docker login --username AWS --password-stdin "$aws_account_id.dkr.ecr.$aws_region.amazonaws.com"
docker tag $image_name $aws_account_id.dkr.ecr.$aws_region.amazonaws.com/test/$image_name:latest
docker push $REPO_URL:latest