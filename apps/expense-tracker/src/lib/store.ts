import { ref, computed, watch } from 'vue'
import { format, subDays, isAfter, startOfMonth, parseISO } from 'date-fns'

export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  amount: number
  category: string
  type: TransactionType
  date: string // ISO format
  description: string
}

const STORAGE_KEY = 'expense_tracker_v2_data'
const BUDGET_KEY = 'expense_tracker_v2_budget'

// Default categories
export const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Shopping', 'Housing', 'Entertainment', 'Other']
export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other']

// Helper to generate some dummy data if empty
const generateDummyData = (): Transaction[] => {
  const data: Transaction[] = []
  const today = new Date()
  for (let i = 0; i < 20; i++) {
    const isExpense = Math.random() > 0.3
    data.push({
      id: crypto.randomUUID(),
      amount: isExpense ? Math.floor(Math.random() * 50000) + 5000 : Math.floor(Math.random() * 500000) + 100000,
      category: isExpense ? EXPENSE_CATEGORIES[Math.floor(Math.random() * EXPENSE_CATEGORIES.length)] : INCOME_CATEGORIES[Math.floor(Math.random() * INCOME_CATEGORIES.length)],
      type: isExpense ? 'expense' : 'income',
      date: subDays(today, Math.floor(Math.random() * 30)).toISOString(),
      description: isExpense ? 'Store purchase' : 'Income received'
    })
  }
  return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function useFinanceStore() {
  const transactions = ref<Transaction[]>([])
  const monthlyBudget = ref<number>(1000000) // Default 1M
  const isLoaded = ref(false)

  // Load from local storage
  const loadData = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      transactions.value = JSON.parse(saved)
    } else {
      transactions.value = generateDummyData()
      saveData()
    }

    const savedBudget = localStorage.getItem(BUDGET_KEY)
    if (savedBudget) {
      monthlyBudget.value = parseInt(savedBudget, 10)
    }
    isLoaded.value = true
  }

  // Save to local storage
  const saveData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions.value))
    localStorage.setItem(BUDGET_KEY, monthlyBudget.value.toString())
  }

  watch(transactions, saveData, { deep: true })
  watch(monthlyBudget, saveData)

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    transactions.value.unshift({ ...t, id: crypto.randomUUID() })
  }

  const deleteTransaction = (id: string) => {
    transactions.value = transactions.value.filter(t => t.id !== id)
  }

  // Computed Properties for Dashboard
  const currentMonthTransactions = computed(() => {
    const start = startOfMonth(new Date())
    return transactions.value.filter(t => isAfter(parseISO(t.date), start) || parseISO(t.date).getTime() === start.getTime())
  })

  const totalIncome = computed(() => {
    return currentMonthTransactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  })

  const totalExpense = computed(() => {
    return currentMonthTransactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  })

  const currentBalance = computed(() => totalIncome.value - totalExpense.value)

  const expensesByCategory = computed(() => {
    const map = new Map<string, number>()
    currentMonthTransactions.value
      .filter(t => t.type === 'expense')
      .forEach(t => {
        map.set(t.category, (map.get(t.category) || 0) + t.amount)
      })
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1])
  })

  // Group by day for the last 7 days
  const last7DaysTrend = computed(() => {
    const days: { date: string, income: number, expense: number }[] = []
    const today = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = subDays(today, i)
      const dateStr = format(d, 'MMM dd')
      const dailyTx = transactions.value.filter(t => format(parseISO(t.date), 'MMM dd') === dateStr)
      const inc = dailyTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
      const exp = dailyTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
      days.push({ date: dateStr, income: inc, expense: exp })
    }
    return days
  })

  if (!isLoaded.value) loadData()

  return {
    transactions,
    monthlyBudget,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    currentBalance,
    expensesByCategory,
    last7DaysTrend
  }
}
