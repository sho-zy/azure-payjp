<template>
  <div
    class="container"
    :class="{ active: $store.state.isMenuOpen || $store.state.isCartOpen }"
  >
    <commonHeaderContainer
      class="header-container"
      :base-url="baseUrl"
      :menu-items="menuItems"
    />
    <commonMenuModal :base-url="baseUrl" :menu-items="menuItems" />
    <commonCartModal :base-url="baseUrl" :product-items="productItems" />
    <main class="main-container">
      <indexProductContainer :products="products" :base-url="baseUrl" />
      <indexReviewSection class="review-section" :reviews="reviews" />
    </main>
    <indexAdsSection class="ads-section" :base-url="baseUrl" />
    <commonFooterContainer :menu-items="menuItems" />
  </div>
</template>
<script>
import { mdiCardsHeart } from '@mdi/js'
export default {
  components: {
    commonHeaderContainer: () =>
      import('~/components/organisms/commonHeaderContainer.vue'),
    commonMenuModal: () => import('~/components/organisms/commonMenuModal.vue'),
    commonCartModal: () => import('~/components/organisms/commonCartModal.vue'),
    indexProductContainer: () =>
      import('~/components/organisms/indexProductContainer.vue'),
    indexReviewSection: () =>
      import('~/components/organisms/indexReviewSection.vue'),
    indexAdsSection: () => import('~/components/organisms/indexAdsSection.vue'),
    commonFooterContainer: () =>
      import('~/components/organisms/commonFooterContainer.vue')
  },
  async asyncData({ payload, env }) {
    const getData = async () => {
      if (payload) return payload
      const module = require('../modules/getCosmosData')
      return await module.getCosmosData(
        env.COSMOS_EP,
        env.COSMOS_KEY,
        env.COSMOS_DB,
        env.COSMOS_CONTAINER
      )
    }
    const data = await getData()
    return {
      productItems: data.products,
      products: [
        {
          title: 'Best sellers',
          icon: mdiCardsHeart,
          items: data.products.filter((item) => item.hit)
        },
        {
          title: 'Big Product',
          icon: null,
          items: data.products.filter((item) => item.type === 'Big Product')
        },
        {
          title: 'Small Product',
          icon: null,
          items: data.products.filter((item) => item.type === 'Small Product')
        }
      ],
      reviews: data.reviews
    }
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      menuItems: [
        {
          name: 'Products'
        },
        {
          name: 'About'
        },
        {
          name: 'FAQ'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  &.active {
    max-height: 100vh;
    overflow: hidden;
  }

  .main-container {
    max-width: 1300px;
    margin: 0 auto;
    transform: translateY(-200px);

    .review-section {
      margin-top: 64px;
    }
  }

  .ads-section {
    margin-top: 64px;
  }
}
</style>
