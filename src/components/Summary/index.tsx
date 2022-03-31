import { income, outcome, total } from '../../assets'
import { useTransactions } from '../../hooks/useTransactions'
import { Container } from './styles'

export function Summary() {
  const { transactions } = useTransactions()

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposit += transaction.amount
        acc.total += transaction.amount
      } else {
        acc.withdraw -= transaction.amount
        acc.total -= transaction.amount
      }

      return acc
    },
    {
      deposit: 0,
      withdraw: 0,
      total: 0,
    }
  )

  const formatCurrency = (value: number | bigint) => {
    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={income} alt="entradas" />
        </header>
        <strong>{formatCurrency(summary.deposit)}</strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcome} alt="Saida" />
        </header>
        <strong>{formatCurrency(summary.withdraw)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={total} alt="total" />
        </header>
        <strong>{formatCurrency(summary.total)}</strong>
      </div>
    </Container>
  )
}
