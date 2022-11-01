data "aws_secretsmanager_secret" "db_secret" {
  name = var.secret_name
}

resource "aws_iam_role" "lambda_role" {
  name = "${local.function_name}_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "lambda_policy" {
  name   = "${local.function_name}_policy"
  role   = aws_iam_role.lambda_role.id
  policy = <<EOF
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
               "logs:CreateLogGroup",
               "logs:CreateLogStream",
               "logs:PutLogEvents"
           ],
           "Resource": "arn:aws:logs:*:*:*"
       },
       {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "ec2:CreateNetworkInterface",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DeleteNetworkInterface",
                "ec2:AssignPrivateIpAddresses",
                "ec2:UnassignPrivateIpAddresses"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": "secretsmanager:GetSecretValue",
            "Resource": "${data.aws_secretsmanager_secret.db_secret.arn}"
        }
   ]
}
EOF
}


resource "aws_lambda_function" "get_users" {
  function_name    = local.function_name
  role             = aws_iam_role.lambda_role.arn
  handler          = "./dist/src/handler.handler"
  runtime          = "nodejs16.x"
  filename         = var.lambda_package
  timeout          = 10
  publish          = true
  source_code_hash = filesha256(var.lambda_package)
  environment {
    variables = {
      DB_NAME   = var.db_name
      SECRET_ID = data.aws_secretsmanager_secret.db_secret.name
    }
  }
}
