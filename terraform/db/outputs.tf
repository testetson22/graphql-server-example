output "cluster_name" {
  value       = try(aws_docdb_cluster.graphql-example-docdb.cluster_identifier, null)
  description = "Cluster Identifier."
}

output "arn" {
  value       = try(aws_docdb_cluster.graphql-example-docdb.arn, null)
  description = "Amazon Resource Name (ARN) of the cluster."
}

output "writer_endpoint" {
  value       = try(aws_docdb_cluster.graphql-example-docdb.endpoint, null)
  description = "Endpoint of the DocumentDB cluster."
}

output "reader_endpoint" {
  value       = try(aws_docdb_cluster.graphql-example-docdb.reader_endpoint, null)
  description = "A read-only endpoint of the DocumentDB cluster"
}