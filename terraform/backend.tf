terraform {
  backend "s3" {
    bucket  = "cursolambda-tfstate"
    region  = "us-east-1"
    encrypt = true
    key     = "deploy.tfstate"
  }
}
