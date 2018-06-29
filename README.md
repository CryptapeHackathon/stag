# Stag
[![License](https://img.shields.io/github/license/CryptapeHackathon/stag.svg)](https://github.com/CryptapeHackathon/stag/blob/master/LICENSE)
[![CircleCI](https://circleci.com/gh/CryptapeHackathon/stag.svg?style=shield)](https://circleci.com/gh/CryptapeHackathon/stag)

![STAG](https://github.com/CryptapeHackathon/stag/blob/master/images/stag.jpg)

如果你忘记了你的银行卡密码，相信你一定不会紧张，因为银行可以帮你找回！但是区块链系统中，如果你丢失了私钥，可能哭死也没人能救你了。

本项目旨在保护账户安全，针对三种不同的账户安全事件：密钥丢失、密钥泄露、账户沉睡，分别提供补救机制。在密钥丢失情况下，通过一组朋友确认实现资金找回；在密钥泄露情况下，通过转账限额来降低资金被盗的损失; 最后，如果由于各种原因，朋友或亲人的账户长时间没有操作而变成“沉睡账户”，那么如果之前有指定的话，账户里的钱会转入自己的账户。

If you forget your debit card pin code, I guess you will not worry about it. Because the bank will find it for you. But in blockchain world, if you lose your private key, oh no… Nobody can save you…

This project is for providing account safety mechanism for cryptocurrency, in three different scenarios——private key lost, private key stolen and account sunk in sleep. When private key is lost, by confirmation of a group of your friends, you can retrieve your digital asset. When private key is stolen, by setting a transfer ceiling, you can minimum your lost. The last case, if your friends or relatives haven't operated their accounts for a long time, for any reason, then the account balance may transfer to your account if delegated beforehand.

## Requirements

- solc@v0.4.19
- npm
- truffle@v4.0.6

```shell
npm install -g truffle@v4.0.6
```
