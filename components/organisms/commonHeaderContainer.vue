<template>
  <div class="header-container">
    <div class="bg">
      <picture>
        <source :srcset="baseUrl + '/bg-header.webp'" type="image/webp" />
        <img :src="baseUrl + '/bg-header.jpg'" class="image" alt="インテリア" />
      </picture>
    </div>
    <div class="wrapper" />
    <header class="header">
      <h1 class="logo" v-text="appName" />
      <nav class="menu">
        <ul class="menu-list">
          <li v-for="(item, i) of menuItems" :key="i" class="menu-item">
            <p class="menu-link" v-text="item.name" />
          </li>
        </ul>
        <modalOpenButton
          :label="'カート'"
          :target="'cart'"
          :icon="mdiCartOutline"
          :text="
            Object.keys($store.state.cartMap)
              .reduce((sum, key) => sum + $store.state.cartMap[key], 0)
              .toString(10)
          "
        />
        <modalOpenButton
          :label="'メニュー'"
          :target="'menu'"
          :icon="mdiMenu"
          class="menu-button"
        />
      </nav>
    </header>
    <h2 class="phrase">
      <span v-for="(text, i) of phrase" :key="i" v-text="text" />
    </h2>
    <p class="action">
      <span class="action-link">
        <span class="text" v-text="'See All Products'" />
        <svg viewBox="0 0 24 24" class="icon">
          <path :d="mdiArrowRight" />
        </svg>
      </span>
    </p>
  </div>
</template>
<script>
import { mdiCartOutline, mdiArrowRight, mdiMenu } from '@mdi/js'
export default {
  components: {
    modalOpenButton: () => import('~/components/atoms/modalOpenButton.vue')
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
      phrase: ['One for All,', 'All for Japan.'],
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
  background-position: bottom left;
  position: relative;

  @media screen and (min-width: 600px) {
    height: 896px;
  }

  .bg,
  .wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

  .bg {
    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .wrapper {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .header {
    position: relative;
    width: calc(100% -36px);
    max-width: 1300px;
    margin: 0 auto;
    padding: 24px 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (min-width: 600px) {
      padding-top: 48px;
      justify-content: space-between;
    }

    .logo {
      font-size: 32px;
      color: white;
    }

    .menu {
      display: flex;
      align-items: center;

      .menu-list {
        display: none;
        justify-content: center;
        align-items: center;
        margin-right: 32px;

        @media screen and (min-width: 720px) {
          display: flex;
        }

        .menu-item {
          margin: 0 18px;

          .menu-link {
            color: white;
            font-size: 20px;
            font-weight: bold;
          }
        }
      }

      .menu-button {
        margin-left: 8px;
        @media screen and (min-width: 720px) {
          display: none;
        }
      }
    }
  }

  .phrase {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 32px;
    line-height: 32px;
    margin-top: 176px;
    color: white;

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
    position: relative;
    margin-top: 64px;
    text-align: center;

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

      .icon {
        width: 30px;
        height: 30px;
        fill: #88dd9b;
        margin-left: 8px;
      }
    }
  }
}
</style>
