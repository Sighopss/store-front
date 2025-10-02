<template>
  <div class="store-container">
    <header class="store-header">
      <h1>Algonquin Pet Store</h1>
      <p class="tagline">Meals for Pets, Lessons for Students!</p>
    </header>
    <div class="animal-images">
      <img src="pictures/dog.jpg" alt="Dog" />
      <img src="pictures/cat.jpg" alt="Cat" />
      <img src="pictures/bird.jpg" alt="Bird" />
    </div>
    <div v-if="error" style="color: red;">{{ error }}</div>
    <div v-else-if="products.length">
      <h2>Select a Product</h2>
      <div v-for="product in products" :key="product.id" class="product-item">
        <input
          type="radio"
          :id="`product-${product.id}`"
          v-model="selectedProduct"
          :value="product"
        />
        <label :for="`product-${product.id}`">
          <strong>{{ product.name }}</strong> - ${{ product.price ? product.price.toFixed(2) : 'N/A' }}
        </label>
      </div>
      <div v-if="selectedProduct" class="quantity-container">
        <label for="quantity">Quantity:</label>
        <input type="number" v-model="quantity" min="1" placeholder="Enter quantity" />
      </div>
      <div v-if="selectedProduct" class="total-price">
        <h3>Total Price: ${{ totalPrice.toFixed(2) }}</h3>
      </div>
      <button @click="submitOrder" :disabled="!selectedProduct || quantity <= 0" class="order-button">Place Order</button>
    </div>
    <div v-else>
      <p>Loading products...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      selectedProduct: null,
      quantity: 1,
      error: null
    };
  },
  async created() {
    await this.fetchProducts();
  },
  computed: {
    totalPrice() {
      return this.selectedProduct ? this.selectedProduct.price * this.quantity : 0;
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch(`${process.env.VUE_APP_PRODUCT_SERVICE_URL}/products`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }
        this.products = await response.json();
        this.error = null;
      } catch (error) {
        console.error('Error fetching products:', error);
        this.error = `Failed to fetch products: ${error.message}`;
      }
    },
    async submitOrder() {
      if (!this.selectedProduct || this.quantity <= 0) {
        this.error = 'Please select a product and enter a valid quantity.';
        return;
      }
      try {
        const response = await fetch(`${process.env.VUE_APP_ORDER_SERVICE_URL}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product_id: this.selectedProduct.id, // Match order-service expected format
            quantity: this.quantity
          })
        });
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }
        this.error = null;
        alert(`Order for ${this.quantity} x ${this.selectedProduct.name} placed successfully! Total: $${this.totalPrice.toFixed(2)}`);
      } catch (error) {
        console.error('Error placing order:', error);
        this.error = `Failed to place order: ${error.message}`;
      }
    }
  }
};
</script>

<style scoped>
/* Same as provided */
</style>
