<template>
  <nav class="menu-modal" :class="{ active: $store.state.isMenuOpen }">
    <div v-if="$store.state.isMenuOpen" class="bg">
      <picture>
        <source :srcset="baseUrl + '/bg-leaf.webp'" type="image/webp" />
        <img :src="baseUrl + '/bg-leaf.jpg'" class="image" alt="背景" />
      </picture>
    </div>
    <modalCloseButton class="close-button" />
    <p class="logo" v-text="appName" />
    <div class="cart">
      <svg viewBox="0 0 24 24" class="icon">
        <path :d="mdiCartOutline" />
      </svg>
      <span
        class="text"
        v-text="
          Object.keys($store.state.cartMap)
            .reduce((sum, key) => sum + $store.state.cartMap[key], 0)
            .toString(10) + ' products'
        "
      />
    </div>
    <p class="action">
      <button
        class="action-button"
        aria-label="カート"
        @click="$store.commit('modalOpen', 'cart')"
      >
        <span class="text" v-text="'Checkout'" />
        <svg viewBox="0 0 24 24" class="icon">
          <path :d="mdiArrowRight" />
        </svg>
      </button>
    </p>
    <ul class="menu-list">
      <li v-for="(item, i) of menuItems" :key="i" class="menu-item">
        <p class="menu-link" v-text="item.name" />
      </li>
    </ul>
  </nav>
</template>
<script>
import { mdiCartOutline, mdiArrowRight } from '@mdi/js'
export default {
  components: {
    modalCloseButton: () => import('~/components/atoms/modalCloseButton.vue')
  },
  props: {
    baseUrl: {
      type: String,
      default: ''
    },
    menuItems: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      appName: process.env.APP_NAME,
      mdiCartOutline,
      mdiArrowRight
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f0f5f6;
  background-size: cover;
  transform: translateX(-100vw);
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
    position: relative;
  }

  .cart {
    margin-top: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .icon {
      width: 36px;
      height: 36px;
      fill: black;
    }

    .text {
      margin-left: 8px;
      font-size: 24px;
      font-weight: bold;
    }
  }

  .action {
    margin-top: 16px;
    text-align: center;
    position: relative;

    .action-button {
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      border: solid 2px #88dd9b;
      background-color: white;
      padding: 6px 24px;

      .text {
        font-size: 20px;
        color: #88dd9b;
        font-weight: bolder;

        @media screen and (min-width: 600px) {
          font-size: 24px;
        }
      }

      .icon {
        width: 30px;
        height: 30px;
        fill: #88dd9b;
        margin-left: 8px;
      }
    }
  }

  .menu-list {
    margin: 64px 0 72px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;

    .menu-item {
      margin: 12px 0;

      .menu-link {
        text-align: center;
        color: black;
        font-size: 30px;
        line-height: 30px;
        font-weight: bold;
      }
    }
  }
}
</style>
