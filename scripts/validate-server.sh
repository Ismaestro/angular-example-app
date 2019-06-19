#!/usr/bin/env bash

serverPID=$(lsof -t -i:4000)
if ! test -z "$serverPID"; then
  kill ${serverPID}
fi

counter=0
npm run serve:ssr > /dev/null &
until $(curl --output /dev/null --silent --head --fail localhost:4000); do
    if [[ ${counter} = 5 ]]; then
      echo "Server is not working properly"
      exit 1;
    fi
    ((counter++))
    sleep 1
done

kill $(lsof -t -i:4000)
exit 0
