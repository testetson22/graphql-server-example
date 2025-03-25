# resource "aws_instance" "ubuntu_graphql_server" {
#   ami                    = "ami-097a2df4ac947655f"
#   instance_type          = "t2.micro"
#   vpc_security_group_ids = [aws_security_group.security_group_graphql_server_example.id]
#   subnet_id              = aws_subnet.public_a.id
#   key_name = "aws-key"

#   user_data = file("../scripts/apache-mkdocs.yaml")

#   tags = {
#     Name = "terraform-aws-ubuntu"
#   }
# }

resource "aws_vpc" "vpc_graphql_server_example" {
    cidr_block = "10.0.0.0/16"
    enable_dns_hostnames = true
    enable_dns_support = true
}

resource "aws_subnet" "public_a" {
    vpc_id = "${aws_vpc.vpc_graphql_server_example.id}"
    cidr_block = "10.0.1.0/24"
    availability_zone = "${var.aws_region}a"
}

resource "aws_internet_gateway" "internet_gateway" {
    vpc_id = "${aws_vpc.vpc_graphql_server_example.id}"
}

resource "aws_route" "internet_access" {
    route_table_id = "${aws_vpc.vpc_graphql_server_example.main_route_table_id}"
    destination_cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.internet_gateway.id}"
}

resource "aws_security_group" "security_group_graphql_server_example" {
    name = "security_group_example_app"
    description = "Allow TLS inbound traffic on port 80 (http)"
    vpc_id = "${aws_vpc.vpc_graphql_server_example.id}"

    ingress {
        from_port = 80
        to_port = 8080
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
    Name = "terraform-aws-${var.ecr_app_name}-sg"
  }
}