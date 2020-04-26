/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

interface CreateTransactionDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (aggregate: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            aggregate.income += transaction.value
            break
          case 'outcome':
            aggregate.outcome += transaction.value
            break
          default:
            break
        }

        aggregate.total = aggregate.income - aggregate.outcome

        return aggregate
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )

    return balance
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository
