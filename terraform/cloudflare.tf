# set your creds via bash env vars:
# export CLOUDFLARE_TOKEN=XXXXXXXXXXX
# export CLOUDFLARE_EMAIL=XXXXXXXXXXX

# Add a record to the domain
resource "cloudflare_record" "app" {
  domain = "neteoc.com"
  name = "app"
  value = "${aws_s3_bucket.app.website_endpoint}"
  type = "CNAME"
  ttl = 3600
  proxied = true
}

resource "cloudflare_record" "testapp" {
  domain = "neteoc.com"
  name = "test"
  value = "${aws_s3_bucket.testapp.website_endpoint}"
  type = "CNAME"
  ttl = 3600
  proxied = true
}

resource "cloudflare_record" "api" {
  domain = "neteoc.com"
  name = "api"
  value = "127.0.0.1"
  type = "A"
  ttl = 3600
  proxied = false
}

resource "cloudflare_record" "testapi" {
  domain = "neteoc.com"
  name = "testapi"
  value = "127.0.0.1"
  type = "A"
  ttl = 3600
  proxied = false
}