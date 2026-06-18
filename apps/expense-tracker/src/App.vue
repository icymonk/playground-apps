<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFinanceStore, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from './lib/store'
import type { TransactionType } from './lib/store'
import { Doughnut, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js'
import { Wallet, TrendingUp, TrendingDown, Plus, Trash2, Download } from 'lucide-vue-next'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement)
ChartJS.defaults.color = '#a3a3a3' // Tailwind neutral-400

const store = useFinanceStore()

// Modals
const isAddModalOpen = ref(false)
const newTx = ref({
  amount: '',
  category: EXPENSE_CATEGORIES[0],
  type: 'expense' as TransactionType,
  date: new Date().toISOString().split('T')[0],
  description: ''
})

const handleTypeChange = () => {
  newTx.value.category = newTx.value.type === 'expense' ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0]
}

const submitTx = () => {
  if (!newTx.value.amount || !newTx.value.description) return
  store.addTransaction({
    amount: parseFloat(newTx.value.amount),
    category: newTx.value.category,
    type: newTx.value.type,
    date: new Date(newTx.value.date).toISOString(),
    description: newTx.value.description
  })
  isAddModalOpen.value = false
  newTx.value.amount = ''
  newTx.value.description = ''
}

// Charts Data
const donutData = computed(() => {
  const data = store.expensesByCategory.value
  return {
    labels: data.map(d => d[0]),
    datasets: [{
      data: data.map(d => d[1]),
      backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  }
})

const barData = computed(() => {
  const trend = store.last7DaysTrend.value
  return {
    labels: trend.map(d => d.date),
    datasets: [
      {
        label: 'Income',
        backgroundColor: '#10b981', // emerald-500
        data: trend.map(d => d.income)
      },
      {
        label: 'Expense',
        backgroundColor: '#f43f5e', // rose-500
        data: trend.map(d => d.expense)
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' as const } }
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { beginAtZero: true, grid: { color: '#262626' } },
    x: { grid: { display: false } }
  }
}

const budgetPercent = computed(() => {
  const pct = (store.totalExpense.value / store.monthlyBudget.value) * 100
  return Math.min(pct, 100)
})

const exportCSV = () => {
  const headers = ['Date', 'Type', 'Category', 'Amount', 'Description']
  const rows = store.transactions.value.map(t => 
    [t.date.split('T')[0], t.type, t.category, t.amount, `"${t.description}"`].join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-100 p-6 font-sans">
    <div class="max-w-6xl mx-auto space-y-8">
      
      <!-- Header -->
      <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Finance Dashboard
          </h1>
          <p class="text-neutral-400 text-sm mt-1">Manage your wealth effectively</p>
        </div>
        <div class="flex gap-3">
          <button @click="exportCSV" class="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700 text-sm font-medium">
            <Download class="w-4 h-4" /> Export CSV
          </button>
          <button @click="isAddModalOpen = true" class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-500/20 text-sm font-medium text-white">
            <Plus class="w-4 h-4" /> Add Transaction
          </button>
        </div>
      </header>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
          <div class="flex items-center gap-4 mb-4 relative z-10">
            <div class="p-3 bg-blue-500/10 rounded-xl"><Wallet class="w-6 h-6 text-blue-400"/></div>
            <div>
              <p class="text-sm text-neutral-400 font-medium">Total Balance</p>
              <h2 class="text-2xl font-bold tracking-tight">₩{{ store.currentBalance.value.toLocaleString() }}</h2>
            </div>
          </div>
          <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
          <div class="flex items-center gap-4 mb-4 relative z-10">
            <div class="p-3 bg-emerald-500/10 rounded-xl"><TrendingUp class="w-6 h-6 text-emerald-400"/></div>
            <div>
              <p class="text-sm text-neutral-400 font-medium">Monthly Income</p>
              <h2 class="text-2xl font-bold tracking-tight text-emerald-400">₩{{ store.totalIncome.value.toLocaleString() }}</h2>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
          <div class="flex items-center gap-4 mb-4 relative z-10">
            <div class="p-3 bg-rose-500/10 rounded-xl"><TrendingDown class="w-6 h-6 text-rose-400"/></div>
            <div>
              <p class="text-sm text-neutral-400 font-medium">Monthly Expense</p>
              <h2 class="text-2xl font-bold tracking-tight text-rose-400">₩{{ store.totalExpense.value.toLocaleString() }}</h2>
            </div>
          </div>
        </div>
      </div>

      <!-- Budget Progress -->
      <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div class="flex justify-between items-end mb-2">
          <div>
            <h3 class="text-sm font-medium text-neutral-400">Monthly Budget (₩{{ store.monthlyBudget.value.toLocaleString() }})</h3>
            <p class="text-lg font-bold mt-1">₩{{ store.totalExpense.value.toLocaleString() }} <span class="text-neutral-500 text-sm font-normal">spent</span></p>
          </div>
          <span class="text-sm font-medium" :class="budgetPercent >= 90 ? 'text-rose-400' : 'text-emerald-400'">
            {{ budgetPercent.toFixed(1) }}%
          </span>
        </div>
        <div class="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
          <div class="h-3 rounded-full transition-all duration-1000 ease-out"
               :class="budgetPercent >= 90 ? 'bg-rose-500' : budgetPercent >= 70 ? 'bg-amber-500' : 'bg-emerald-500'"
               :style="{ width: `${budgetPercent}%` }"></div>
        </div>
      </div>

      <!-- Charts Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Expense by Category (Donut) -->
        <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:col-span-1 h-80">
          <h3 class="text-sm font-medium text-neutral-400 mb-4">Expenses by Category</h3>
          <div class="relative h-[220px]">
            <Doughnut v-if="store.expensesByCategory.value.length" :data="donutData" :options="chartOptions" />
            <div v-else class="absolute inset-0 flex items-center justify-center text-neutral-500 text-sm">No expenses this month</div>
          </div>
        </div>

        <!-- Trend Chart (Bar) -->
        <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:col-span-2 h-80">
          <h3 class="text-sm font-medium text-neutral-400 mb-4">Last 7 Days Trend</h3>
          <div class="relative h-[220px]">
            <Bar :data="barData" :options="barOptions as any" />
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        <div class="p-6 border-b border-neutral-800 flex justify-between items-center">
          <h3 class="text-lg font-bold">Recent Transactions</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-neutral-950/50 text-neutral-400 text-sm">
                <th class="py-4 px-6 font-medium">Date</th>
                <th class="py-4 px-6 font-medium">Description</th>
                <th class="py-4 px-6 font-medium">Category</th>
                <th class="py-4 px-6 font-medium">Amount</th>
                <th class="py-4 px-6 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-800">
              <tr v-for="tx in store.transactions.value.slice(0, 10)" :key="tx.id" class="hover:bg-neutral-800/50 transition-colors group">
                <td class="py-4 px-6 text-sm text-neutral-300">{{ tx.date.split('T')[0] }}</td>
                <td class="py-4 px-6 font-medium">{{ tx.description }}</td>
                <td class="py-4 px-6">
                  <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-800 border border-neutral-700 text-neutral-300">
                    {{ tx.category }}
                  </span>
                </td>
                <td class="py-4 px-6 font-bold" :class="tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'">
                  {{ tx.type === 'income' ? '+' : '-' }}₩{{ tx.amount.toLocaleString() }}
                </td>
                <td class="py-4 px-6 text-right">
                  <button @click="store.deleteTransaction(tx.id)" class="text-neutral-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </td>
              </tr>
              <tr v-if="store.transactions.value.length === 0">
                <td colspan="5" class="py-8 text-center text-neutral-500 text-sm">No transactions found. Add one above!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- Add Modal -->
    <div v-if="isAddModalOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <h2 class="text-xl font-bold mb-6">Add Transaction</h2>
        <form @submit.prevent="submitTx" class="space-y-4">
          
          <div class="grid grid-cols-2 gap-4">
            <button type="button" @click="newTx.type = 'expense'; handleTypeChange()"
                    class="py-2.5 rounded-lg border font-medium text-sm transition-all"
                    :class="newTx.type === 'expense' ? 'bg-rose-500/10 border-rose-500/50 text-rose-400' : 'border-neutral-700 text-neutral-400 hover:bg-neutral-800'">
              Expense
            </button>
            <button type="button" @click="newTx.type = 'income'; handleTypeChange()"
                    class="py-2.5 rounded-lg border font-medium text-sm transition-all"
                    :class="newTx.type === 'income' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'border-neutral-700 text-neutral-400 hover:bg-neutral-800'">
              Income
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1.5">Amount (₩)</label>
            <input type="number" v-model="newTx.amount" required min="0" placeholder="50000" class="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors">
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1.5">Description</label>
            <input type="text" v-model="newTx.description" required placeholder="Lunch at cafe" class="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors">
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-400 mb-1.5">Category</label>
              <select v-model="newTx.category" class="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors">
                <option v-for="cat in (newTx.type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES)" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-400 mb-1.5">Date</label>
              <input type="date" v-model="newTx.date" required class="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors">
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-8 pt-4 border-t border-neutral-800">
            <button type="button" @click="isAddModalOpen = false" class="px-5 py-2.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">Save</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<style>
/* Smooth font rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
