#!/usr/bin/env bash

nohup /usr/local/bin/ganache-cli -l 1000000000 > /dev/null &

while [ $(ps -ef | grep -v grep | grep -c ganache-cli) -eq 0 ]; do
    sleep 1
done

cd token
truffle test
