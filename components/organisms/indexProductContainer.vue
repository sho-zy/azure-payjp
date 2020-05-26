<template>
  <div class="product-container">
    <section v-for="(category, i) of products" :key="i" class="product-section">
      <h2 class="title">
        <svg v-if="category.icon" viewBox="0 0 24 24">
          <path :d="category.icon" />
        </svg>
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

      svg {
        width: 36px;
        height: 36px;
        fill: darkgray;
        margin-right: 12px;
      }

      .text {
        font-size: 30px;
        color: darkgray;
      }
    }

    &:first-child {
      margin-top: 0;

      .title {
        svg {
          fill: white;
        }

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
