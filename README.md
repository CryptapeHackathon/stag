# Stag

如果你忘记了你的银行卡密码，相信你一定不会紧张，因为银行可以帮你找回！但是区块链系统中，如果你丢失了私钥，可能哭死也没人能救你了。

本项目旨在保护账户安全，针对三种不同的账户安全事件：密钥丢失、密钥泄露、账户沉睡，分别提供补救机制。在密钥丢失情况下，通过一组朋友确认实现资金找回；在密钥泄露情况下，通过转账限额来降低资金被盗的损失; 最后，在你遗忘了某一账户或者你不幸去世，那么你沉睡的账户可以作为遗产，被指定用户继承。

If you forget your debit card pin code, I guess you will not worry about it. Because the bank will find it for you. But in blockchain world, if you lose your private key, oh no… Nobody can save you… 

This project is for providing account safety mechanism for cryptocurrency, in three different scenarios——private key lost, private key stolen and account sunk in sleep. When private key is lost, by confirmation of a group of your friends, you can retrieve your digital asset. When private key is stolen, by setting a transfer ceiling, you can minimum your lost. And in another case, if you forgot an account, or passed away unfortunately, your account, which is sunk in sleep, can be inherited by a designated beneficiary.

## Requirements

- solc@v0.4.19
- npm
- truffle@v4.0.6

```shell
npm install -g truffle@v4.0.6
```
