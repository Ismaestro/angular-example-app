#!/usr/bin/env bash
export version=$(cat manifest-prod.json | sed 's/.*"version": "\(.*\)".*/\1/;t;d')
export filename="extension-v-${version}-prod.zip"
#aws s3 cp ${filename} s3://${S3_BUCKET}
#export url=$(aws s3 presign ${S3_BUCKET}/${filename} --expires-in 15552000)
#curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"<@Alexander Ivanov> Extension *${version}* was builded successfully [<${url}|Download>]\"}" ${webhookURL}

curl -F file=@filename -F "<@Alexander Ivanov>" -F channels=C9ACYSAKG -H "Authorization: Bearer xoxp-314901961312-315674461461-519738642707-5f0f10bfe34575a42db3e204caea7ce0" https://slack.com/api/files.upload
