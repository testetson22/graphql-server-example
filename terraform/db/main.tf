resource "aws_docdb_cluster" "graphql-example-docdb" {
  cluster_identifier      = "graphql-example-docdb-cluster"
  engine                  = "docdb"
  master_username         = "${var.DocDbUser}"
  master_password         = "${var.DocDbPass}"
  backup_retention_period = 5
  preferred_backup_window = "07:00-09:00"
  skip_final_snapshot     = true
}

resource "aws_docdb_cluster_instance" "graphql-example-docdb-instance" {
  count              = 0
  identifier         = "graphql-example-docdb-${count.index + 1}"
  cluster_identifier = "${aws_docdb_cluster.graphql-example-docdb.id}"
  apply_immediately  = true
  instance_class     = "db.t3.medium"
  engine             = "docdb"
  ca_cert_identifier = null
}