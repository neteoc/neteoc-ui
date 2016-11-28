resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.app.id}.s3.amazonaws.com"
    origin_id   = "s3NetEOCappOrigin"

  }

  enabled             = true
  comment             = "Some comment"
  default_root_object = "index.html"

  custom_error_response {
    error_code = 404
    response_code = 200
    response_page_path = "/index.html"
  }

  logging_config {
    include_cookies = false
    bucket          = "${aws_s3_bucket.app_log_bucket.id}.s3.amazonaws.com"
    prefix          = "cloudfront-logs"
  }

  aliases = ["app.neteoc.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "s3NetEOCappOrigin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 240
    max_ttl                = 480
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US"]
    }
  }

  tags {
    Project = "NetEOC"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

output "cdn url" {
  value = "${aws_cloudfront_distribution.s3_distribution.domain_name}"
}
