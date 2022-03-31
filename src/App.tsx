import React, { useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { GlobalStyle } from './styles/global'
import { NewTransactionModal } from './components/NewTransactionModal'
import { TransactionProvider } from './context/TransactionContext'

export function App() {
  const [newTransactionModal, setNewTransactionModal] = useState(false)

  function openNewTransactionModal() {
    setNewTransactionModal(true)
  }

  function closeNewTransactionModal() {
    setNewTransactionModal(false)
  }

  return (
    <TransactionProvider>
      <Header onOpenNewTransactionModal={openNewTransactionModal} />
      <NewTransactionModal isOpen={newTransactionModal} onRequestClose={closeNewTransactionModal} />
      <Dashboard />
      <GlobalStyle />
    </TransactionProvider>
  )
}
