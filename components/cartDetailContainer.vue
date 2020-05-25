<template>
  <div
    class="cart-detail"
    :class="{ active: $store.state.isCartOpen }"
    :style="'background-image: url(' + baseUrl + cartImage + ');'"
  >
    <p class="button-container">
      <button
        class="close-button"
        @click="$store.commit('setIsCartOpen', false)"
      >
        <svg viewBox="0 0 24 24">
          <path :d="mdiClose" />
        </svg>
      </button>
    </p>
  </div>
</template>
<script>
import { mdiClose } from '@mdi/js'
export default {
  props: {
    baseUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cartImage: '/cart-bg.webp',
      mdiClose
    }
  }
}
</script>
<style lang="scss" scoped>
.cart-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f0f5f6;
  background-size: cover;
  transform: translateX(100vw);
  transition: transform 0.3s ease-in-out;

  &.active {
    transform: translateX(0);
    z-index: 100;
  }

  .button-container {
    position: absolute;
    top: 16px;
    right: 16px;

    @media screen and (min-width: 600px) {
      top: 32px;
      right: 32px;
    }

    .close-button {
      cursor: pointer;

      svg {
        width: 40px;
        height: 40px;
        fill: black;
      }
    }
  }
}
</style>
