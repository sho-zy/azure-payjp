<template>
  <nav
    class="menu-modal"
    :class="{ active: $store.state.isMenuOpen }"
    :style="'background-image: url(' + baseUrl + menuImage + ');'"
  >
    <modalCloseButton />
    <ul class="menu-list">
      <li v-for="(item, i) of menuItems" :key="i" class="menu-item">
        <p class="menu-link" v-text="item.name" />
      </li>
    </ul>
  </nav>
</template>
<script>
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
      menuImage: '/leaf-light-grey.svg'
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

  .menu-list {
    display: flex;
    justify-content: center;
    align-items: center;
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
</style>
