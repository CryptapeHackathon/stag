const Web3 = require('@nervos/web3')
const fs = require('fs')
const path = require('path')
const {chain, proxy, token} = require('../src/config/chaininfo')
const solc = require('solc')
const log = console.log.bind(console, '>>>')


log(chain)
const web3 = Web3.default(chain)
log(web3)

const readDir = (dir) => {
  const paths = fs.readdirSync(dir, {encoding: 'utf-8'})
  log(paths)
  dirOrFile(dir, paths)
}

const readFile = (name) => {
  const sorce = fs.readFileSync(name, {encoding: 'utf-8'})
  for (let name in calc) {
    // code and ABI that are needed by web3
    // console.log(contractName + ': ' + compiledContract.contracts[contractName].bytecode);
    // console.log(contractName + '; ' + JSON.parse(compiledContract.contracts[contractName].interface));
    const c = calc[name]
    const bytecode = c.bytecode;
    const abi = JSON.parse(calc[name].interface);
    log(abi)
    log(bytecode)
  }
  // const data = JSON.stringify(file, ' ', 4)
}

const dirOrFile = (root, paths) => {
  paths.forEach((name, i) => {
    const p = path.resolve(root, name)
    const stat = fs.statSync(p)
    if (stat.isDirectory()) {
      readDir(p)
    } else {
      readFile(p)
    }
  })
}

const main = () => {
  const dir = './abi'
  readDir(dir)
}

main()