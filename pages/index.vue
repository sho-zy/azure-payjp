<template>
  <div
    class="container"
    :class="{ active: $store.state.isMenuOpen || $store.state.isCartOpen }"
  >
    <headerContainer
      class="header-container"
      :base-url="baseUrl"
      :menu-items="menuItems"
      :title="title"
    />
    <menuModal :base-url="baseUrl" :menu-items="menuItems" />
    <cartModal :base-url="baseUrl" :product-items="productItems" />
    <main class="main-container">
      <section
        v-for="(category, i) of products"
        :key="i"
        class="product-section"
      >
        <h2 class="title">
          <svg v-if="category.icon" viewBox="0 0 24 24">
            <path :d="category.icon" />
          </svg>
          <span class="text" v-text="category.title" />
        </h2>
        <carousel
          :mouse-drag="true"
          :scroll-per-page="false"
          :pagination-enabled="false"
          class="product-list"
        >
          <slide
            v-for="(item, j) of category.items"
            :key="j"
            class="product-item"
          >
            <productCartButton :id="item.id" />
            <productCard :item="item" :base-url="baseUrl" />
          </slide>
        </carousel>
      </section>
      <section class="review-section">
        <h2 class="title" v-text="'Reviews'" />
        <ul class="review-list">
          <li v-for="(item, i) of reviewItems" :key="i" class="review-item">
            <p class="comment" v-text="item.comment" />
            <p class="name" v-text="item.name" />
          </li>
        </ul>
      </section>
    </main>
    <div class="ads-container">
      <div class="ads-image">
        <img :src="baseUrl + adsImage" class="image" alt="広告" />
      </div>
      <div
        class="ads-content"
        :style="'background-image: url(' + baseUrl + adsBgImage + ');'"
      >
        <p class="headline" v-text="'A new home interior for summer'" />
        <p class="amount" v-text="'from $149.99'" />

        <p class="ads-link">
          <span class="link">
            <span class="text" v-text="'Discover'" />
            <svg viewBox="0 0 24 24">
              <path :d="mdiArrowRight" />
            </svg>
          </span>
        </p>
      </div>
    </div>
    <footerContainer :menu-items="menuItems" :title="title" />
  </div>
</template>
<script>
import { mdiCardsHeart, mdiArrowRight } from '@mdi/js'
export default {
  components: {
    Carousel: () => import('vue-carousel/src/Carousel.vue'),
    Slide: () => import('vue-carousel/src/Slide.vue'),
    headerContainer: () => import('~/components/headerContainer.vue'),
    menuModal: () => import('~/components/menuModal.vue'),
    cartModal: () => import('~/components/cartModal.vue'),
    productCard: () => import('~/components/productCard.vue'),
    productCartButton: () => import('~/components/productCartButton.vue'),
    footerContainer: () => import('~/components/footerContainer.vue')
  },
  async asyncData({ params, error, payload }) {
    const productItems = await require(`~/assets/data/productList.json`)
    return {
      productItems,
      products: [
        {
          title: 'Best sellers',
          icon: mdiCardsHeart,
          items: productItems.filter((item) => item.hit)
        },
        {
          title: 'Big Plants',
          icon: null,
          items: productItems.filter((item) => item.type === 'Big Plants')
        },
        {
          title: 'Small Plants',
          icon: null,
          items: productItems.filter((item) => item.type === 'Small Plants')
        }
      ],
      reviewItems: await require(`~/assets/data/reviewList.json`)
    }
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      title: process.env.APP_NAME,
      menuItems: [
        {
          name: 'Store'
        },
        {
          name: 'About'
        },
        {
          name: 'FAQ'
        }
      ],
      adsImage: '/promo.webp',
      adsBgImage: '/leaf.svg',
      mdiArrowRight
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

  .header-container {
    position: relative;
    z-index: 1;
  }

  .main-container {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    transform: translateY(-200px);
    position: relative;
    z-index: 2;

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

      .product-list {
        margin-top: 32px;
        display: flex;
        align-items: center;

        .product-item {
          max-width: 300px;
          margin: 0 8px;
          position: relative;
          z-index: 1;
        }
      }
    }

    .review-section {
      margin-top: 64px;
      padding: 0 24px;
      width: calc(100% - 48px);

      .title {
        padding: 0 18px;
        font-size: 30px;
        color: darkgray;
      }

      .review-list {
        margin-top: 32px;
        background-color: whitesmoke;
        border-radius: 16px;
        width: calc(100% - 32px);
        padding: 16px;

        @media screen and (min-width: 600px) {
          display: flex;
          padding: 32px 16px;
        }

        .review-item {
          padding: 32px;
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;
          &:not(:first-child) {
            border-top: solid 1px lightgray;
          }

          @media screen and (min-width: 600px) {
            width: calc(50% - 64px);
            &:not(:first-child) {
              border-top: 0;
              border-left: solid 1px lightgray;
            }
          }

          .comment,
          .name {
            width: 100%;
          }

          .comment {
            margin-top: 48px;
            font-size: 20px;
            position: relative;

            &:before {
              content: '”';
              position: absolute;
              top: -80px;
              left: 0;
              font-size: 64px;
              color: #88dd9b;
            }
          }

          .name {
            font-size: 22px;
            font-weight: bold;
            text-align: right;
            margin-top: 32px;
          }
        }
      }
    }
  }

  .ads-container {
    margin-top: 56px;
    display: flex;
    position: relative;
    width: 100%;

    &:before {
      content: '';
      display: block;
      padding-top: 30%;
    }

    .ads-image {
      width: 50%;
      background-color: #384647;
      .image {
        width: 100%;
        height: calc(100% - 48px);
        object-fit: cover;
      }
    }

    .ads-content {
      width: calc(50% - 128px);
      padding: 64px;
      margin-top: 48px;
      background-color: #88dd9b;
      background-size: cover;
      display: flex;
      flex-wrap: wrap;
      align-content: center;

      .headline,
      .amount,
      .ads-link {
        width: 100%;
      }

      .headline {
        color: white;
        font-size: 48px;
        line-height: 48px;
        font-weight: bold;
      }

      .amount {
        color: white;
        font-size: 36px;
      }

      .ads-link {
        margin-top: 36px;

        .link {
          display: inline-flex;
          align-items: center;
          border-radius: 4px;
          border: solid 2px white;
          padding: 4px 16px;

          .text {
            color: white;
            font-size: 24px;
            font-weight: bold;
          }

          svg {
            width: 30px;
            height: 30px;
            fill: white;
            margin-left: 12px;
          }
        }
      }
    }

    @media screen and (max-width: 799px) {
      .ads-image {
        display: none;
      }

      .ads-content {
        width: calc(100% - 128px);

        .headline,
        .amount,
        .ads-link {
          text-align: center;
        }

        .headline {
          font-size: 32px;
        }

        .amount {
          font-size: 24px;
        }

        .ads-link {
          .link {
            .text {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
