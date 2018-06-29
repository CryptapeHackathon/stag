import NervosWeb3 from '@nervos/web3'
import Web3 from 'web3'
log(Web3)
import axios from 'axios'
log(NervosWeb3.default)
import log from './log'
// const NervosWeb3 = require('@nervos/web3')
const chain = 'http://47.97.108.229:1337/'
const web3 = NervosWeb3(chain)
const web2 = new Web3(chain)
log(web3)
const proxy = '0x10bdd1684100bbce6c17e97db9a3779a000b350b'
const token = '0xe78ed755aa47c1b0e5e6c9f8db67a187f64e3322'
// web3.eth.getBlockNumber().then(res => {
//   console.log(res)
// })

web3.eth.call(proxy).then(res => console.log('call', res))
web3.eth.call('0x0').then(res => console.log('0x0', res))

axios.post(chain, '{"jsonrpc":"2.0","method":"call","params":[{"from":"0xca35b7d915458ef540ade6068dfe2f44e8fa733c","to":"0xea4f6bc98b456ef085da5c424db710489848cab5","data":"0x6d4ce63c"}, "0x6"],"id":2}').then(res => log('axio', res))

export default ''