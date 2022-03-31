import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { createServer, Model } from 'miragejs'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

/* criando uma api fake */
createServer({
  /* definindo o BD interno do mirageJS */
  models: {
    transaction: Model,
  },

  /* Deixando alguns dados pré-cadastrados */
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de aplicativo',
          type: 'deposit',
          category: 'development',
          amount: 6000,
          createdAt: new Date('2022-03-01 11:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel ',
          type: 'withdraw',
          category: 'Casa',
          amount: 1500,
          createdAt: new Date('2022-03-10 11:00:00'),
        },
      ],
    })
  },

  /* Configurando as rotas do mirageJS */
  routes() {
    this.namespace = 'api'

    this.get('transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, response) => {
      /* pegando dados do post */
      const data = JSON.parse(response.requestBody)

      /* salvando dados no banco */
      return schema.create('transaction', data)
    })
  },
})
