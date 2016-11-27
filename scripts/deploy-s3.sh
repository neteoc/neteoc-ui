#!/usr/bin/env bash



#set -e so that any step will cause the whole thing to stop.
set -e

#import env vars we need like aws profile (this runs from ../ so we need scripts in the path)
source ./scripts/setdevenvs.sh

#make sure we have all of the libs installed
npm install

#clean the dist folder out
rm -rf dist

#build using webpack command defined in the scripts section of package.json
npm run build

#sync the dist folder with s3. Need a better way to switch between test and prod.
aws s3 sync ./dist/ s3://app.neteoc.com --acl public-read
aws s3 sync ./dist/ s3://test.neteoc.com --acl public-read
aws s3 sync ./mockapi/ s3://mockapi.neteoc.com --acl public-read
