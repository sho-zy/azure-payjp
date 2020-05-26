<template>
  <div
    class="cart-modal"
    :class="{ active: $store.state.isCartOpen }"
    :style="'background-image: url(' + baseUrl + cartImage + ');'"
  >
    <modalCloseButton />
    <ul class="cart-list">
      <li v-for="(item, i) of cartItems" :key="i" class="cart-item">
        <div class="wrapper">
          <p class="product-image">
            <img :src="baseUrl + item.image" :alt="item.name" class="image" />
          </p>
          <button class="trash-button" @click="clickTrashButton(item.id)">
            <svg viewBox="0 0 24 24">
              <path :d="mdiTrashCanOutline" />
            </svg>
          </button>
          <p class="name" v-text="item.name" />
          <p class="desc" v-text="item.desc" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mdiTrashCanOutline } from '@mdi/js'
export default {
  components: {
    modalCloseButton: () => import('~/components/atoms/modalCloseButton.vue')
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
      cartItems: this.createCartItems(this.$store.state.cartMap),
      cartImage: '/cart-bg.webp',
      mdiTrashCanOutline
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
    },
    clickTrashButton(id) {
      this.$store.commit('removeCartMap', id)
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

  .cart-list {
    padding-top: 120px;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;

    .cart-item {
      min-height: 120px;
      width: calc(100% - 72px);
      background-color: white;
      padding: 36px;
      margin-bottom: 24px;

      .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        .product-image,
        .trash-button {
          position: absolute;
          top: 0;
        }

        .product-image {
          left: 0;
          width: 120px;
          height: 120px;
          overflow: hidden;
          border-radius: 8px;

          .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .trash-button {
          cursor: pointer;
          right: 0;
          border: solid 1px whitesmoke;
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            width: 20px;
            height: 20px;
            fill: red;
          }
        }

        .name {
          width: 100%;
          padding-left: 156px;
          font-size: 22px;
        }

        .desc {
          width: 100%;
          padding-left: 156px;
          font-size: 14px;
          font-weight: lighter;
        }
      }
    }
  }
}
</style>
