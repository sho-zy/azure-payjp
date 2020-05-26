<template>
  <div class="footer-container">
    <footer class="footer">
      <p class="logo" v-text="appName" />
      <ul class="menu-list">
        <li v-for="(item, i) of menuItems" :key="i" class="menu-item">
          <p class="menu-link" v-text="item.name" />
        </li>
      </ul>
      <small
        class="copyright"
        v-text="'Copyright 2020 ' + appName + ' Inc. All rights reserved.'"
      />
    </footer>
  </div>
</template>
<script>
export default {
  props: {
    menuItems: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      appName: process.env.APP_NAME
    }
  }
}
</script>
<style lang="scss" scoped>
.footer-container {
  background-color: #384647;
  padding: 96px 0 48px;

  @media screen and (max-width: 799px) {
    padding: 48px 0;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 48px);
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 24px;

    .logo {
      color: white;
      font-size: 32px;
      @media screen and (max-width: 799px) {
        width: 50%;
      }
    }

    .menu-list {
      margin-left: 60px;
      flex-grow: 2;
      display: flex;
      align-items: center;

      @media screen and (max-width: 799px) {
        display: none;
      }

      .menu-item {
        margin: 0 12px;

        .menu-link {
          color: #6b797a;
          font-size: 22px;
        }
      }
    }

    .copyright {
      color: #6b797a;
      font-size: 18px;
      line-height: 18px;

      @media screen and (max-width: 799px) {
        width: 50%;
      }
    }
  }
}
</style>
