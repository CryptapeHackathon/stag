# Stag

[![License](https://img.shields.io/github/license/CryptapeHackathon/stag.svg)](https://github.com/CryptapeHackathon/stag/blob/master/LICENSE)
[![CircleCI](https://circleci.com/gh/CryptapeHackathon/stag.svg?style=shield)](https://circleci.com/gh/CryptapeHackathon/stag)

![STAG](https://github.com/CryptapeHackathon/stag/blob/master/images/stag.jpg)

If you forget your debit card pin code, I guess you will not worry about it. Because the bank will find it for you. But in blockchain world, if you lose your private key, oh no… Nobody can save you…

This project is for providing account safety mechanism for cryptocurrency, in three different scenarios - private key lost, private key stolen and account sunk in sleep. When private key is lost, by confirmation of a group of your friends, you can retrieve your digital asset. When private key is stolen, by setting a transfer ceiling, you can minimum your lost. The last case, if you haven't operated your accounts for a long time, for any reason, then the account can be inherited by a designated beneficiary.

## Services

* Retrieve your digital asset by your friends
* Daily transfer ceiling
* Account can be inherited by a designated beneficiary

## Features

* Sha3 + Salt to hide friend address
* Operation time lock
* Transfer more by other accounts approvals

## Prerequisites

* solc@v0.4.24
* npm
* truffle@v4.1.13
* ganache-cli@6.1.4

```shell
npm install -g truffle@v4.1.13
npm install -g ganache-cli@6.1.4
```

## Running the tests

```shell
ganache-cli -l 10000000
cd token && truffle test
```

## Design

![Design](https://github.com/CryptapeHackathon/stag/blob/master/images/design.png)

## Contributing

We will be very appreciated for any feedback or contributions.