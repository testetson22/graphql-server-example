resource "aws_ecs_task_definition" "graphql_server_task" {
    family = "graphql_server_example_family"
    requires_compatibilities = ["FARGATE"]
    network_mode = "awsvpc"
    memory = "512"
    cpu = "256"
    execution_role_arn = "${aws_iam_role.ecs_role.arn}"

    container_definitions = <<EOT
[
    {
        "name": "${var.ecr_app_name}",
        "image": "${var.ecr_repo_uri}:${var.ecr_container_tag}",
        "memory": 512,
        "essential": true,
        "portMappings": [
            {
                "containerPort": ${var.ecr_container_port},
                "hostPort": ${var.ecr_host_port}
            }
        ]
    }
]
EOT
}

resource "aws_ecs_cluster" "graphql_server_cluster" {
    name = "graphql_server_example_app"
}

resource "aws_ecs_service" "graphql_server_service" {
    name = "graphql_server_service"

    cluster = "${aws_ecs_cluster.graphql_server_cluster.id}"
    task_definition = "${aws_ecs_task_definition.graphql_server_task.arn}"

    launch_type = "FARGATE"
    desired_count = 1

    network_configuration {
        subnets = ["${aws_subnet.public_a.id}"]
        security_groups = ["${aws_security_group.security_group_graphql_server_example.id}"]
        assign_public_ip = true
    }
    enable_ecs_managed_tags = true
    wait_for_steady_state   = true
}

data "aws_network_interface" "interface_tags" {
  filter {
    name   = "tag:aws:ecs:serviceName"
    values = [aws_ecs_service.graphql_server_service.name]
  }
}

output "public_ip" {
  value = data.aws_network_interface.interface_tags.association[0].public_ip
}