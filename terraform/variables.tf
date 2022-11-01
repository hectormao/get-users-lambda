locals {
  function_name = "${var.app_name}-${var.env}"
}



variable "region" {
  description = "Región de despliegue"
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "Nombre de la función"
  type        = string
  default     = "get-users-lambda"
}

variable "env" {
  description = "Nombre del ambiente"
  type        = string
  default     = "dev"
}

variable "db_name" {
  description = "Nombre del base de datos"
  type        = string
  default     = "listado_usuarios"
}

variable "secret_name" {
  description = "Nombre del secreto con las credenciales de conexion a base de datos"
  type        = string
  default     = "cursolambda"
}

variable "lambda_package" {
  description = "Path del zip de la lambda"
  type        = string
  default     = "../get-users-lambda.zip"
}
