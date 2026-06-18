import { ref, computed, watch } from 'vue'

export interface Product {
  id: string
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CartItem extends Product {
  quantity: number
}

// Premium Mock Data
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Minimalist Mechanical Keyboard',
    price: 149.99,
    description: 'A premium 75% mechanical keyboard with silent switches, RGB underglow, and PBT keycaps. Perfect for deep focus sessions.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    rating: { rate: 4.8, count: 320 }
  },
  {
    id: 'p2',
    title: 'Ergonomic Office Chair',
    price: 399.00,
    description: 'Designed for comfort. Features adjustable lumbar support, 4D armrests, and a breathable mesh back.',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800',
    rating: { rate: 4.5, count: 154 }
  },
  {
    id: 'p3',
    title: 'Noise Cancelling Headphones',
    price: 249.99,
    description: 'Industry-leading noise cancellation. Up to 30 hours of battery life and crystal clear voice calls.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    rating: { rate: 4.9, count: 890 }
  },
  {
    id: 'p4',
    title: 'Ceramic Coffee Mug',
    price: 24.50,
    description: 'Handcrafted ceramic mug with a matte finish. Keeps your coffee warm longer and looks great on your desk.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800',
    rating: { rate: 4.7, count: 210 }
  },
  {
    id: 'p5',
    title: 'Smart LED Desk Lamp',
    price: 89.99,
    description: 'Adjustable color temperature and brightness. Syncs with your smart home setup.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e9d15?auto=format&fit=crop&q=80&w=800',
    rating: { rate: 4.4, count: 95 }
  },
  {
    id: 'p6',
    title: 'Canvas Tote Bag',
    price: 19.99,
    description: 'Durable and eco-friendly tote bag for everyday use. Heavyweight canvas material.',
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640df1?auto=format&fit=crop&q=80&w=800',
    rating: { rate: 4.6, count: 420 }
  }
]

const CART_STORAGE_KEY = 'ecommerce_cart_v1'

export function useCartStore() {
  const cart = ref<CartItem[]>([])
  const isLoaded = ref(false)
  const isCartOpen = ref(false) // UI state for drawer

  const loadCart = () => {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    if (saved) {
      cart.value = JSON.parse(saved)
    }
    isLoaded.value = true
  }

  const saveCart = () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.value))
  }

  watch(cart, saveCart, { deep: true })

  const addToCart = (product: Product) => {
    const existing = cart.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
    isCartOpen.value = true // Open drawer on add
  }

  const removeFromCart = (id: string) => {
    cart.value = cart.value.filter(item => item.id !== id)
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    const item = cart.value.find(i => i.id === id)
    if (item) {
      item.quantity = quantity
    }
  }

  const clearCart = () => {
    cart.value = []
  }

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  const totalItems = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  const tax = computed(() => subtotal.value * 0.1) // 10% tax
  
  const shipping = computed(() => {
    if (cart.value.length === 0) return 0
    return subtotal.value > 150 ? 0 : 15 // Free shipping over $150
  })

  const total = computed(() => subtotal.value + tax.value + shipping.value)

  if (!isLoaded.value) loadCart()

  return {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    totalItems,
    subtotal,
    tax,
    shipping,
    total
  }
}
