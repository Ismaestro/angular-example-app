#!/usr/bin/env bash
printenv
echo 2
export version=$(cat manifest-prod.json | sed 's/.*"version": "\(.*\)".*/\1/;t;d')
export filename="extension-v-${version}-prod.zip"
aws s3 cp ${filename} s3://${S3_BUCKET}
export url=$(aws s3 presign ${S3_BUCKET}/${filename} --expires-in 15552000)
curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"<@Alexander Ivanov> Extension *${version}* was builded successfully [<${url}|Download>]\"}" ${webhookURL}
