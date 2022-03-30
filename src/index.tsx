import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { createServer } from 'miragejs'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

createServer({
  routes() {
    this.namespace = 'api'

    this.get('transactions', () => {
      return {
        id: 1,
        title: 'transaction 1',
        category: 'development',
        amout: 400,
        type: 'deposit',
        createdAt: new Date().getTime(),
      }
    })
  },
})
