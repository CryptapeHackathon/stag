import NervosWeb3 from '@nervos/web3'
import Web3 from 'web3'
import axios from 'axios'
const {chain, proxy, token, me} = require('../config/chaininfo')
import proxyAbi from '../config/abi/proxy'
import tokenAbi from '../config/abi/token'
import log from './log'
const web3 = NervosWeb3(chain)
const web2 = new Web3(chain)
const proxyC = new web3.eth.Contract(proxyAbi, me)
const tokenC = new web3.eth.Contract(tokenAbi, me)

const addFriend = (address) => {
  return proxyC.methods.addFriend(web3.utils.keccak256(address)).call()
}

const removeFriend = (address) => {
  return proxyC.methods.removeFriend(web3.utils.keccak256(address)).call()
}

const fetchFriend = () => {
  return proxyC.methods.friendsList().call()
}

const fetchOwner = () => {
  return proxyC.methods.owner().call().then(res => {
    log('owner', res)
    return res
  })
}


export {
  addFriend,
  removeFriend,
  fetchFriend,
  fetchOwner,
}