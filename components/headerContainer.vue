<template>
  <div
    class="header-container"
    :style="'background-image: url(' + baseUrl + bgImage + ');'"
  >
    <header class="header">
      <h1
        class="logo"
        :class="{ active: $store.state.isMenuOpen }"
        v-text="title"
      />
      <nav class="menu">
        <button
          class="menu-button"
          aria-label="メニュー"
          @click="$store.commit('setIsMenuOpen', !$store.state.isMenuOpen)"
        >
          <svg viewBox="0 0 24 24">
            <path :d="mdiMenu" />
          </svg>
        </button>
        <div
          class="menu-container"
          :class="{ active: $store.state.isMenuOpen }"
          :style="'background-image: url(' + baseUrl + menuImage + ');'"
        >
          <p class="button-container">
            <button
              class="close-button"
              @click="$store.commit('setIsMenuOpen', false)"
            >
              <svg viewBox="0 0 24 24">
                <path :d="mdiClose" />
              </svg>
            </button>
          </p>
          <ul class="menu-list">
            <li v-for="(item, i) of menuItems" :key="i" class="menu-item">
              <p class="menu-link" v-text="item.name" />
            </li>
          </ul>
        </div>
      </nav>
      <div
        class="cart"
        :class="{ active: $store.state.isMenuOpen || $store.state.isCartOpen }"
      >
        <button
          class="cart-button"
          aria-label="カート"
          @click="$store.commit('setIsCartOpen', !$store.state.isCartOpen)"
        >
          <svg viewBox="0 0 24 24">
            <path :d="mdiCartOutline" />
          </svg>
          <span
            class="cart-num"
            v-text="Object.keys($store.state.cartMap).length"
          />
        </button>
      </div>
      <cartDetailContainer />
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
import { mdiCartOutline, mdiArrowRight, mdiMenu, mdiClose } from '@mdi/js'
export default {
  components: {
    cartDetailContainer: () => import('~/components/cartDetailContainer.vue')
  },
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
      mdiCartOutline,
      mdiArrowRight,
      mdiMenu,
      mdiClose
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
    width: calc(100% -36px);
    max-width: 1300px;
    margin: 0 auto;
    padding: 24px 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
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

      &.active {
        color: black;
      }

      @media screen and (min-width: 600px) {
        flex-grow: initial;
      }
    }

    .menu {
      order: 2;

      @media screen and (min-width: 600px) {
        order: 1;
      }

      .menu-button {
        margin-left: 4px;

        svg {
          width: 30px;
          height: 30px;
          fill: white;
        }

        @media screen and (min-width: 600px) {
          display: none;
        }
      }

      .menu-container {
        position: relative;

        .button-container {
          display: none;
          position: absolute;
          top: 16px;
          right: 16px;

          .close-button {
            cursor: pointer;

            svg {
              width: 40px;
              height: 40px;
              fill: black;
            }
          }
        }

        .menu-list {
          display: flex;
          justify-content: center;
          align-items: center;

          .menu-item {
            margin: 0 18px;

            .menu-link {
              color: white;
              font-size: 20px;
              font-weight: bold;
            }
          }
        }

        @media screen and (max-width: 599px) {
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

          .button-container {
            display: block;
          }

          .menu-list {
            flex-direction: column;
            width: 100%;
            height: 100%;

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
    }

    .cart {
      order: 1;

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
