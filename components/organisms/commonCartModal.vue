<template>
  <div class="cart-modal" :class="{ active: $store.state.isCartOpen }">
    <div v-if="$store.state.isCartOpen" class="bg">
      <picture>
        <source :srcset="baseUrl + '/bg-leaf.webp'" type="image/webp" />
        <img :src="baseUrl + '/bg-leaf.jpg'" class="image" alt="背景" />
      </picture>
    </div>
    <modalCloseButton class="close-button" />
    <p class="logo" v-text="appName" />
    <ul class="cart-list">
      <li v-for="(item, i) of cartItems" :key="i" class="cart-item">
        <cartItemCard :item="item" :base-url="baseUrl" />
      </li>
    </ul>
    <cartPayContainer :items="cartItems" />
  </div>
</template>
<script>
import { mdiTrashCanOutline, mdiPlus, mdiMinus } from '@mdi/js'
export default {
  components: {
    modalCloseButton: () => import('~/components/atoms/modalCloseButton.vue'),
    cartItemCard: () => import('~/components/molecules/cartItemCard.vue'),
    cartPayContainer: () =>
      import('~/components/molecules/cartPayContainer.vue')
  },
  props: {
    baseUrl: {
      type: String,
      default: ''
    },
    productItems: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      appName: process.env.APP_NAME,
      cartItems: this.createCartItems(this.$store.state.cartMap),
      mdiTrashCanOutline,
      mdiPlus,
      mdiMinus
    }
  },
  computed: {
    cartMap() {
      return this.$store.state.cartMap
    }
  },
  watch: {
    cartMap(newMap, oldMap) {
      this.cartItems = this.createCartItems(newMap)
    }
  },
  methods: {
    createCartItems(cartMap) {
      this.productItems.forEach((product) => {
        if (cartMap[product.id] && cartMap[product.id] > 0) {
          product.num = cartMap[product.id]
          product.subTotal = product.num * product.amount
        } else {
          product.num = 0
          product.subTotal = 0
        }
      })
      return this.productItems.filter((item) => item.num && item.num > 0)
    }
  }
}
</script>
<style lang="scss" scoped>
.cart-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  min-height: 100vh;
  overflow-y: auto;
  background-color: #f0f5f6;
  background-size: cover;
  transform: translateX(100vw);
  transition: transform 0.3s ease-in-out;
  z-index: 100;

  &.active {
    transform: translateX(0);
  }

  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 0;

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .close-button {
    z-index: 2;
  }

  .logo {
    padding: 24px 24px 0;
    font-size: 32px;
    font-weight: bold;
    width: calc(100% - 48px);
    max-width: 1300px;
    margin: 0 auto;
    position: relative;
  }

  .cart-list {
    width: calc(100% - 48px);
    max-width: 1300px;
    margin: 32px auto 0;
    position: relative;

    .cart-item {
      min-height: 120px;
      width: calc(100% - 72px);
      background-color: white;
      padding: 36px;
      margin-bottom: 24px;
    }
  }
}
</style>
