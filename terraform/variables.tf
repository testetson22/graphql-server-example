variable "aws_region" {
  default = "us-east-2"
}

variable "ecr_repo_uri" {
  default = "440744247014.dkr.ecr.us-east-2.amazonaws.com/test/graphql-server-example"
}

variable "ecr_container_tag" {
  default = "latest"
}

variable "ecr_app_name" {
  default = "graphql-server-example"
}

variable "ecr_container_port" {
  default = 8080
}

variable "ecr_host_port" {
  default = 8080
}

variable "DocDbHost" {
  type    = string
  default = "mongodb://localhost:27017"
}

variable "DocDbUser" {
  type = string
}

variable "DocDbPass" {
  type = string
}