#!/usr/bin/env bash
export version=$(cat manifest-prod.json | sed 's/.*"version": "\(.*\)".*/\1/;t;d')
export filename="extension-v-${version}-prod.zip"
#aws s3 cp ${filename} s3://${S3_BUCKET}
#export url=$(aws s3 presign ${S3_BUCKET}/${filename} --expires-in 15552000)
#curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"<@Alexander Ivanov> Extension *${version}* was builded successfully [<${url}|Download>]\"}" ${webhookURL}
aws s3 cp ${BUCKET_FOR_INDEX}/${version}.txt ${version}.txt
if [[ -f ${version}.txt ]]; then
    #aws s3 cp ${BUCKET_FOR_INDEX}/${version}.txt ${version}.txt
    index=$(cat ${version}.txt)
    let "index = index + 1"
    echo "$index" > ${version}.txt
else
    echo "0" > ${version}.txt
fi

# Update index of file for current version
aws s3 cp ${version}.txt ${BUCKET_FOR_INDEX}/${version}.txt
#curl -F file=@extension-v-4.1.9-prod.zip --form-string "initial_comment=<@123> Extension *${version}* was" -F channels=C9ACYSAKG -H "Authorization: Bearer xoxb-314901961312-520071300757-VOE5m2OvoMalWsIilxtm8jM4" https://slack.com/api/files.upload

