# neteoc-ui

[![CircleCI](https://circleci.com/gh/neteoc/neteoc-ui.svg?style=svg)](https://circleci.com/gh/neteoc/neteoc-ui)

V2-alpha

---
## To get started:

(if on M$ Windows) Install git for windows, you will need **git bash.**: https://git-scm.com/download/win

Install AWS CLI: http://docs.aws.amazon.com/cli/latest/userguide/installing.html

Setup an AWS creds profile with: `aws cli configure --profile neteoc`

Install Terraform: https://www.terraform.io/intro/getting-started/install.html

Install node.js and npm: https://nodejs.org/en/download/package-manager/

Clone this repo then:

`npm install`          -> installs dependencies

`npm run dev`          -> starts a devlopment server on port 8080 and watches for changes

`npm run deploy`       -> Deploy build artifacts to S3 (Requires some setup, more info to come)


---



NetEOC
Copyright (C) 2016  Kerry Hatcher <kwhatcher@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Frontend web app for NetEOC

Develped based on Hawtio model (http://hawt.io/overview/index.html)
