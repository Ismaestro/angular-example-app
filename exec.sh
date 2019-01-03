#!/usr/bin/env bash
export filename="extension-v-$(cat manifest-prod.json | sed 's/.*"version": "\(.*\)".*/\1/;t;d')-prod.zip"
aws s3 cp ${filename} s3://${S3_BUCKET}
curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"<@Alexander Ivanov> https://${S3_BUCKET}.s3.amazonaws.com/${filename}\"}" ${webhookURL}
