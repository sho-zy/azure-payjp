<template>
  <div
    class="header-container"
    :class="{ active: isMenuOpen || $store.state.isCartOpen }"
    :style="'background-image: url(' + baseUrl + bgImage + ');'"
  >
    <header class="header">
      <h1 class="logo" :class="{ active: isMenuOpen }" v-text="title" />
      <nav class="menu">
        <button
          class="menu-button"
          :class="{ active: isMenuOpen }"
          aria-label="メニュー"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg viewBox="0 0 24 24">
            <path :d="mdiMenu" />
          </svg>
        </button>
        <ul
          class="menu-list"
          :class="{ active: isMenuOpen }"
          :style="'background-image: url(' + baseUrl + menuImage + ');'"
        >
          <li v-for="(item, i) of menuItems" :key="i" class="menu-item">
            <p class="menu-link" v-text="item.name" />
          </li>
        </ul>
      </nav>
      <div
        class="cart"
        :class="{ active: isMenuOpen || $store.state.isCartOpen }"
      >
        <button
          class="cart-button"
          aria-label="カート"
          @click="$store.commit('setIsCartOpen', !$store.state.isCartOpen)"
        >
          <svg viewBox="0 0 24 24">
            <path :d="mdiCartOutline" />
          </svg>
          <span class="cart-num" v-text="$store.state.cartNum" />
        </button>
      </div>
      <div
        class="cart-detail"
        :class="{ active: $store.state.isCartOpen }"
        :style="'background-image: url(' + baseUrl + cartImage + ');'"
      ></div>
    </header>
    <h2 class="phrase">
      <span v-for="(text, i) of phrase" :key="i" v-text="text" />
    </h2>
    <p class="action">
      <span class="action-link">
        <span class="text" v-text="'See all plants'" />
        <svg viewBox="0 0 24 24">
          <path :d="mdiArrowRight" />
        </svg>
      </span>
    </p>
    <div class="wrapper" />
  </div>
</template>
<script>
import { mdiCartOutline, mdiArrowRight, mdiMenu } from '@mdi/js'
export default {
  props: {
    baseUrl: {
      type: String,
      default: ''
    },
    menuItems: {
      type: Array,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      phrase: ['Real, beautiful plants', 'right to your door'],
      bgImage: '/header.webp',
      menuImage: '/leaf-light-grey.svg',
      cartImage: '/cart-bg.webp',
      isMenuOpen: false,
      mdiCartOutline,
      mdiArrowRight,
      mdiMenu
    }
  }
}
</script>
<style lang="scss" scoped>
.header-container {
  height: 800px;
  width: 100%;
  background-size: cover;
  position: relative;
  z-index: 1;

  &.active {
    z-index: 100;
    height: 100vh;
  }

  @media screen and (min-width: 600px) {
    height: 896px;
  }

  .wrapper {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  .header {
    position: relative;
    width: calc(100% -36px);
    max-width: 1300px;
    margin: 0 auto;
    padding: 24px 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 3;

    @media screen and (min-width: 600px) {
      padding-top: 48px;
      justify-content: space-between;
    }

    .logo {
      order: 0;
      flex-grow: 2;
      font-size: 32px;
      color: white;
      z-index: 101;

      &.active {
        color: black;
      }

      @media screen and (min-width: 600px) {
        flex-grow: initial;
      }
    }

    .menu {
      order: 2;
      position: relative;

      @media screen and (min-width: 600px) {
        order: 1;
      }

      .menu-button {
        margin-left: 4px;
        position: relative;
        z-index: 101;

        svg {
          width: 30px;
          height: 30px;
          fill: white;
        }

        &.active {
          svg {
            fill: #88dd9b;
          }
        }

        @media screen and (min-width: 600px) {
          display: none;
        }
      }

      .menu-list {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 2;

        .menu-item {
          margin: 0 18px;
          .menu-link {
            color: white;
            font-size: 20px;
            font-weight: bold;
          }
        }

        @media screen and (max-width: 599px) {
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
          background-color: white;
          background-size: cover;
          background-position: center;
          transform: translateX(-100vw);
          transition: transform 0.3s ease-in-out;

          &.active {
            transform: translateX(0);
            z-index: 100;
          }

          .menu-item {
            margin: 12px 0;
            .menu-link {
              color: black;
              font-size: 30px;
              line-height: 30px;
              font-weight: bold;
            }
          }
        }
      }
    }

    .cart {
      order: 1;
      position: relative;
      z-index: 102;

      &.active {
        .cart-button {
          svg {
            fill: black;
          }
          .cart-num {
            color: black;
          }
        }
      }

      @media screen and (min-width: 600px) {
        order: 2;
      }

      .cart-button {
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        svg {
          width: 30px;
          height: 30px;
          fill: white;
        }

        .cart-num {
          display: none;
          font-size: 20px;
          color: white;
          margin-left: 4px;

          @media screen and (min-width: 600px) {
            display: block;
          }
        }
      }
    }

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
      transform: translateX(-100vw);
      transition: transform 0.3s ease-in-out;

      &.active {
        transform: translateX(0);
        z-index: 101;
      }
    }
  }

  .phrase {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 32px;
    line-height: 32px;
    margin-top: 176px;
    color: white;
    position: relative;
    z-index: 2;

    @media screen and (min-width: 600px) {
      font-size: calc(32px + (100vw - 600px) * 0.09);
      line-height: calc(32px + (100vw - 600px) * 0.09);
    }

    @media screen and (min-width: 1000px) {
      font-size: 68px;
      line-height: 68px;
    }
  }

  .action {
    margin-top: 64px;
    text-align: center;
    position: relative;
    z-index: 2;

    .action-link {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      border: solid 2px #88dd9b;
      padding: 4px 16px;

      .text {
        font-size: 20px;
        color: #88dd9b;
        font-weight: bolder;

        @media screen and (min-width: 600px) {
          font-size: 24px;
        }
      }
      svg {
        width: 30px;
        height: 30px;
        fill: #88dd9b;
        margin-left: 8px;
      }
    }
  }
}
</style>
