resource "aws_s3_bucket" "app" {
  bucket = "app.neteoc.com"
  acl = "public-read"
  tags {
    Name = "NetEOC App"
    Project = "NetEOC"
    Envroment = "Prod"
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
  logging {
    target_bucket = "${aws_s3_bucket.app_log_bucket.id}"
    target_prefix = "log/"
  }
  versioning {
    enabled = true
  }

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT","POST"]
    allowed_origins = ["https://app.neteoc.com"]
    expose_headers = ["ETag"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket" "testapp" {
  bucket = "test.neteoc.com"
  acl = "public-read"
  tags {
    Name = "NetEOC Test App"
    Project = "NetEOC"
    Envroment = "Test"
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
  logging {
    target_bucket = "${aws_s3_bucket.app_log_bucket.id}"
    target_prefix = "log/"
  }
  versioning {
    enabled = true
  }

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT","POST"]
    allowed_origins = ["https://test.neteoc.com"]
    expose_headers = ["ETag"]
    max_age_seconds = 3000
  }
}

output "website" {
  value = "${aws_s3_bucket.app.website_endpoint}"
}

output "Test website" {
  value = "${aws_s3_bucket.testapp.website_endpoint}"
}

output "domain" {
  value = "${aws_s3_bucket.app.website_domain}"
}

output "bucketname" {
  value = "${aws_s3_bucket.app.id}"
}


resource "aws_s3_bucket" "app_log_bucket" {
  bucket = "neteoc_logs_bucket"
  acl = "log-delivery-write"
}
