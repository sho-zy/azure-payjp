<template>
  <div class="product-container">
    <section v-for="(category, i) of products" :key="i" class="product-section">
      <h2 class="title">
        <span class="text" v-text="category.title" />
      </h2>
      <productCardCarousel
        :items="category.items"
        :base-url="baseUrl"
        class="carousel"
      />
    </section>
  </div>
</template>
<script>
export default {
  components: {
    productCardCarousel: () =>
      import('~/components/molecules/productCardCarousel.vue')
  },
  props: {
    baseUrl: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
.product-container {
  .product-section {
    margin-top: 64px;

    .title {
      display: inline-flex;
      align-items: center;
      padding: 0 18px;

      .text {
        font-size: 30px;
        color: darkgray;
      }
    }

    &:first-child {
      margin-top: 0;

      .title {
        .text {
          color: white;
        }
      }
    }

    .carousel {
      margin-top: 32px;
    }
  }
}
</style>
