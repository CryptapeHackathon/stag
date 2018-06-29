import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import routeTable from './config/routeTable'
import './style/base.scss'

const routers = (routes) => {
  return routes.map((params, i) => {
    return <Route {...params} key={'main route' + params.key}/>
  })
}

class View extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Router>
        <Switch>{routers(routeTable)}</Switch>
      </Router>
    )
  }
}

const addMainView = () => {
  const root = document.getElementById('root')
  ReactDOM.render(<View />, root)
}

const main = () => {
  addMainView()
}

main()

