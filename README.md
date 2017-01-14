# neteoc-ui

[![CircleCI](https://circleci.com/gh/neteoc/neteoc-ui/tree/prod.svg?style=svg)](https://circleci.com/gh/neteoc/neteoc-ui/tree/prod)

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

`npm start`          -> starts a devlopment server on port 8080 and watches for changes


---

### Generating Components
Following a consistent directory structure between components offers us the certainty of predictability. We can take advantage of this certainty by creating a gulp task to automate the "instantiation" of our components. The component boilerplate task generates this:
```
⋅⋅⋅⋅⋅⋅componentName/
⋅⋅⋅⋅⋅⋅⋅⋅componentName.js // entry file where all its dependencies load
⋅⋅⋅⋅⋅⋅⋅⋅componentName.component.js
⋅⋅⋅⋅⋅⋅⋅⋅componentName.controller.js
⋅⋅⋅⋅⋅⋅⋅⋅componentName.html
⋅⋅⋅⋅⋅⋅⋅⋅componentName.scss // scoped to affect only its own template
⋅⋅⋅⋅⋅⋅⋅⋅componentName.spec.js // contains passing demonstration tests
```

You may, of course, create these files manually, every time a new module is needed, but that gets quickly tedious.
To generate a component, run `npm run component -- --name componentName`.

The parameter following the `--name` flag is the name of the component to be created. Ensure that it is unique or it will overwrite the preexisting identically-named component.

The component will be created, by default, inside `client/app/components`. To change this, apply the `--parent` flag, followed by a path relative to `client/app/components/`.

For example, running `npm run component -- --name signup --parent auth` will create a `signup` component at `client/app/components/auth/signup`.  

Running `npm run component -- --name footer --parent ../common` creates a `footer` component at `client/app/common/footer`.  

Because the argument to `--name` applies to the folder name **and** the actual component name, make sure to camelcase the component names.

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
