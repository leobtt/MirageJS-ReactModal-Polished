import React, { useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { GlobalStyle } from './styles/global'
import Modal from 'react-modal'
import { NewTransactionModal } from './components/NewTransactionModal'

export function App() {
  const [newTransactionModal, setNewTransactionModal] = useState(false)

  function openNewTransactionModal() {
    setNewTransactionModal(true)
  }

  function closeNewTransactionModal() {
    setNewTransactionModal(false)
  }

  return (
    <React.Fragment>
      <Header onOpenNewTransactionModal={openNewTransactionModal} />
      <NewTransactionModal isOpen={newTransactionModal} onRequestClose={closeNewTransactionModal} />
      <Dashboard />
      <GlobalStyle />
    </React.Fragment>
  )
}
