'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const productServiceUrl = process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || 'http://localhost:3001'
  const orderServiceUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL || 'http://localhost:3002'

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${productServiceUrl}/api/products`)
      setProducts(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load products. Please try again later.')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (productId: string) => {
    try {
      await axios.post(`${orderServiceUrl}/api/orders`, {
        productId,
        quantity: 1
      })
      alert('Product added to cart!')
    } catch (err) {
      alert('Failed to add product to cart')
      console.error('Error adding to cart:', err)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>Algonquin Pet Store</h1>
        </div>
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="header">
          <h1>Algonquin Pet Store</h1>
        </div>
        <p style={{ color: 'red' }}>{error}</p>
        <button className="btn" onClick={fetchProducts}>Retry</button>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Algonquin Pet Store</h1>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>Welcome to our pet store!</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">${product.price.toFixed(2)}</div>
            <p>Stock: {product.stock}</p>
            <button 
              className="btn" 
              onClick={() => handleAddToCart(product._id)}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>
          No products available at the moment.
        </p>
      )}
    </div>
  )
}

