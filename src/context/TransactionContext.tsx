import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface TransactionProviderProps {
  children: ReactNode
}

interface Transactions {
  id: number
  title: string
  category: string
  amount: number
  type: 'deposit' | 'withdraw'
  createdAt: string
}

type TransactionInput = Omit<Transactions, 'id' | 'createdAt'>

interface TransactionContextData {
  transactions: Transactions[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

export const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData /* forçando o typescript aceitar o valor */
)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  useEffect(() => {
    api.get('transactions').then((response) => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date(),
    })
    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}
