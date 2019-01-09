#!/usr/bin/env bash
export CI=true
export CODEBUILD=true

export CODEBUILD_GIT_BRANCH=`git symbolic-ref HEAD --short 2>/dev/null`
if [ "$CODEBUILD_GIT_BRANCH" == "" ] ; then
  CODEBUILD_GIT_BRANCH=`git branch -a --contains HEAD | sed -n 2p | awk '{ printf $1 }'`
  export CODEBUILD_GIT_BRANCH=${CODEBUILD_GIT_BRANCH#remotes/origin/}
fi

export CODEBUILD_GIT_MESSAGE=`git log -1 --pretty=%B`
export CODEBUILD_GIT_AUTHOR=`git log -1 --pretty=%an`
export CODEBUILD_GIT_AUTHOR_EMAIL=`git log -1 --pretty=%ae`
export CODEBUILD_GIT_COMMIT=`git log -1 --pretty=%H`
export CODEBUILD_GIT_TAG=`git describe --tags --abbrev=0`

export CODEBUILD_PULL_REQUEST=false
if [[ $CODEBUILD_GIT_BRANCH == pr-* ]] ; then
  export CODEBUILD_PULL_REQUEST=${CODEBUILD_GIT_BRANCH#pr-}
fi

export CODEBUILD_PROJECT=${CODEBUILD_BUILD_ID%:$CODEBUILD_LOG_PATH}
export CODEBUILD_BUILD_URL=https://$AWS_DEFAULT_REGION.console.aws.amazon.com/codebuild/home?region=$AWS_DEFAULT_REGION#/builds/$CODEBUILD_BUILD_ID/view/new

echo "==> AWS CodeBuild Extra Environment Variables:"
echo "==> CI = $CI"
echo "==> CODEBUILD = $CODEBUILD"
echo "==> CODEBUILD_GIT_AUTHOR = $CODEBUILD_GIT_AUTHOR"
echo "==> CODEBUILD_GIT_AUTHOR_EMAIL = $CODEBUILD_GIT_AUTHOR_EMAIL"
echo "==> CODEBUILD_GIT_BRANCH = $CODEBUILD_GIT_BRANCH "
echo "==> CODEBUILD_GIT_COMMIT = $CODEBUILD_GIT_COMMIT"
echo "==> CODEBUILD_GIT_MESSAGE = $CODEBUILD_GIT_MESSAGE"
echo "==> CODEBUILD_GIT_TAG = $CODEBUILD_GIT_TAG"
echo "==> CODEBUILD_PROJECT = $CODEBUILD_PROJECT"
echo "==> CODEBUILD_PULL_REQUEST = $CODEBUILD_PULL_REQUEST"


export version=$(cat manifest-prod.json | sed 's/.*"version": "\(.*\)".*/\1/;t;d')
export filename="extension-v-${version}-prod.zip"
aws s3 cp ${filename} s3://${S3_BUCKET}
export url=$(aws s3 presign ${S3_BUCKET}/${filename} --expires-in 15552000)
curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"<@Alexander Ivanov> Extension *${version}* was builded successfully [<${url}|Download>]\"}" ${webhookURL}
