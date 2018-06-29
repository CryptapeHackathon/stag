import React, {Component, createRef} from 'react'
import chain from '../utils/chain'
import log from '../utils/log'
import '../style/home.scss'


const formatedNametable = (table) => {
  const t = JSON.stringify(table)
  return t
}

const typeName = (target) => {
  const name = Object.prototype.toString.call(target).slice(8, -1)
  return name
}

const parsedNametable = (table) => {
  log(table)
  try {
    const t = JSON.parse(table)
    const type = typeName(t)
    if (type === 'Object') {
      return t
    } else {
      return {}
    }
  } catch (err) {
    log.err(err)
    log.err('数据解析失败')
    return {}
  }

}

const loadedNametable = () => {
  const table = localStorage.getItem('nametable')
  return table
}

const saveNametable = (table) => {
  localStorage.setItem('nametable', table)
}

class Namecell extends Component {
  constructor(props) {
    super()
    this.state = {
      inputing: false,
    }
    this.input = React.createRef()
  }

  changeName = (event) => {
    const {name, address} = this.props
    this.props.changeFriendName(address, this.input.current.value)(event)
  }

  toinput = () => {
    this.setState({
      inputing: true,
    })
    setTimeout(() => {
      this.input.current.focus()
      this.input.current.value = this.props.name || ''
    })
  }

  outinput = () => {
    this.setState({
      inputing: false,
    })
    this.props.saveNametable()
  }

  render() {
    // log(this.props)
    const {name, address} = this.props
    if (this.state.inputing) {
      return (
        <input ref={this.input} onChange={this.changeName} onBlur={this.outinput}>

        </input>
      )
    } else if (name) {
      return (
        <div>
          <div onClick={this.toinput}>{name}</div>
        </div>
      )
    } else {
      return (
        <div onClick={this.toinput}>click to name</div>
      )
    }
  }
}

class Friendmenu extends Component {
  constructor(props) {
    super()
    this.state = {
      importing: false,
    }
    this.input = createRef()
    this.import = createRef()

  }

  importTable = () => {

  }

  toimport = () => {
    this.setState({
      importing: true,
    })
    setTimeout(() => {
      this.import.current.focus()
    })
  }

  outimport = () => {
    this.setState({
      importing: false,
    })
    this.props.saveNametable()
  }

  saveTable = () => {
    let table = this.import.current.value
    table = parsedNametable(table)
    // table = formatedNametable(table)
    this.props.changeNametable(table)
    this.outimport()
  }

  exportTable = () => {
    const input = this.input.current
    input.value = loadedNametable()
    input.focus()
    input.setSelectionRange(0, input.value.length)
    document.execCommand('copy', true)
  }

  clearTable = () => {
    const t = {}
    this.props.changeNametable(t)
  }

  importBoard = () => {
    if (this.state.importing) {
      return (
        <div className="alertback importBoard">
          <div className="alert">
            <textarea className="" type="text" ref={this.import}/>
            <div onClick={this.saveTable}>确认</div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div className="friendmenu" id="id-friendmenu">
        <div className="menucell" onClick={this.toimport}>导入</div>
        <div className="menucell" onClick={this.exportTable}>导出</div>
        <div className="menucell" onClick={this.clearTable}>清空</div>
        {this.importBoard()}
        <input className="hide" ref={this.input} type="text"/>
      </div>
    )
  }
}

class Friend extends Component {
  constructor(props) {
    super()
    let nametable = loadedNametable()
    nametable = parsedNametable(nametable)
    this.state = {
      friendlist: ['123', '24234', '0asdf'],
      nametable,
    }
  }

  fetchFriendlist = () => {
    return Promise.resolve([])
  }

  updateFriendlist = () => {
    this.fetchFriendlist.then(
      (list) => {
        this.setState({
          friendlist: list,
        })
      })
  }

  removeFriendName = (address) => () => {
    const {nametable} = this.state
    try {
      delete nametable[address]
      this.setState({
        nametable,
      })
    } catch (err) {
    }
  }

  changeFriendName = (address, name) => () => {
    const {nametable} = this.state
    nametable[address] = name
    this.setState({
      nametable,
    })
  }

  removeFriend = (address) => {
    this.removeFriendName(address)
  }

  friendcell = (props) => {
    const params = {
      ...props,
      removeFriendName: this.removeFriendName,
      changeFriendName: this.changeFriendName,
      saveNametable: this.saveNametable,
    }
    return (
      <div className="friendcell" key={props.address}>
        <div className="friendinfo">
          <Namecell {...params}/>
          <div className="">{props.address}</div>
        </div>
        <div className="friendremoveButton" onClick={this.removeFriend(props.address)}><div className="minus"/></div>
      </div>
    )
  }

  loadNametable = () => {
    let nametable =
      this.setState({
        nametable: loadedNametable(),
      })
  }

  saveNametable = () => {
    let table = formatedNametable(this.state.nametable)
    saveNametable(table)
  }

  changeNametable = (table) => {
    this.setState({
      nametable: table,
    })
    setTimeout(this.saveNametable)
  }

  friendlist = (props) => {
    const {nametable} = this.state
    return (
      <div className="friendlist" id="id-friendlist">
        {this.state.friendlist.map((address, i) => {
          const params = {
            address,
            name: nametable[address],
            key: address,
          }
          return this.friendcell(params)
        })}
      </div>
    )
  }

  friendmenu = (props) => {
    const {nametable} = this.state
    const params = {
      ...props,
      nametable: this.state.nametable,
      loadNametable: this.loadNametable,
      saveNametable: this.saveNametable,
      changeNametable: this.changeNametable,
    }
    return <Friendmenu {...params}/>
  }

  render() {
    return (
      <div className="container" id="id-home-friendlist">
        {this.friendmenu()}
        {this.friendlist()}
      </div>
    )
  }
}

const sendRecover = () => {
  const n = Math.random()
  if (n > 0.5) {
    return Promise.resolve()
  } else {
    return Promise.reject()
  }
}

// class Alert extends Component {
//   constructor(props) {
//     super()
//     this.state = {
//       address: '',
//     }
//     this.input = createRef
//   }
//
//   render() {
//     return (
//
//     )
//   }
// }

class Recover extends Component {
  constructor(props) {
    super()
    this.state = {
      address: '',
      alert: null,
    }
    this.input = createRef()
  }

  send = () => {
    const address = this.input.current.value
    sendRecover(address).then((res) => {
      this.alert('成功')
    }).catch((err) => {
      this.alert('失败')
    })
  }

  openAlert = () => {
    this.setState({
      alert: true,
    })
  }

  closeAlert = () => {
    this.setState({
      alert: false,
    })
  }

  alert = (message) => {
    const alert = (
      <div className="alert">
        <div>{message}</div>
      </div>
    )
    this.setState({
      alert,
    })
    setTimeout(() => {
      this.setState({
        alert: null,
      })
    }, 3000)
  }

  render() {
    return (
      <div className="container" id="id-home-recover">
        <div>recover:</div>
        <input ref={this.input}/>
        <div onClick={this.send}>确认</div>
        {this.state.alert}
      </div>
    )
  }
}

const main = () => {
  return (
    <div id="id-home">
      <Friend/>
      <Recover/>
    </div>
  )
}

export default main