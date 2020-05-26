<template>
  <carousel
    :mouse-drag="true"
    :scroll-per-page="false"
    :pagination-enabled="false"
    class="carousel-list"
  >
    <slide v-for="(item, j) of items" :key="j" class="carousel-item">
      <productCard :item="item" :base-url="baseUrl" />
      <productCartButton :id="item.id" class="button" />
    </slide>
  </carousel>
</template>
<script>
export default {
  components: {
    Carousel: () => import('vue-carousel/src/Carousel.vue'),
    Slide: () => import('vue-carousel/src/Slide.vue'),
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

  .carousel-item {
    position: relative;
    max-width: 300px;
    margin: 0 8px;

    .button {
      position: absolute;
      top: 230px;
      right: 12px;
      width: 56px;
      height: 56px;
    }
  }
}
</style>
