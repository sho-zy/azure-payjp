<template>
  <ul class="carousel-list">
    <li v-for="(item, j) of items" :key="j" class="carousel-item">
      <productCard :item="item" :base-url="baseUrl" />
      <productCartButton :id="item.id" class="button" />
    </li>
  </ul>
</template>
<script>
export default {
  components: {
    productCard: () => import('~/components/atoms/productCard.vue'),
    productCartButton: () => import('~/components/atoms/productCartButton.vue')
  },
  props: {
    baseUrl: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
.carousel-list {
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  .carousel-item {
    position: relative;
    max-width: 300px;
    padding: 0 8px;

    .button {
      position: absolute;
      top: 230px;
      right: 20px;
      width: 56px;
      height: 56px;
    }
  }
}
</style>
