#!/usr/bin/env bash

nohup /usr/local/bin/ganache-cli -l 1000000000 > /dev/null &

while [ $(ps -ef | grep -v grep | grep -c ganache-cli) -eq 0 ]; do
    sleep 1
    date
    ps -ef | grep -v grep | grep ganache-cli
done

cd token
truffle test
