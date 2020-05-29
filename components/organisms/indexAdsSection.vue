<template>
  <section class="ads-section">
    <div class="ads-image">
      <picture>
        <source :data-srcset="baseUrl + adsImage + '.webp'" type="image/webp" />
        <img :data-src="baseUrl + adsImage + '.jpg'" class="image" alt="広告" />
      </picture>
    </div>
    <div class="ads-content">
      <div class="bg">
        <picture>
          <source
            :data-srcset="baseUrl + adsBgImage + '.webp'"
            type="image/webp"
          />
          <img
            :data-src="baseUrl + adsBgImage + '.jpg'"
            class="image"
            alt="広告背景"
          />
        </picture>
      </div>
      <p class="headline" v-text="'Announcing new products for the summer.'" />
      <p class="amount" v-text="'from $78.99'" />
      <p class="ads-link">
        <span class="link">
          <span class="text" v-text="'Discover'" />
          <svg viewBox="0 0 24 24">
            <path :d="mdiArrowRight" />
          </svg>
        </span>
      </p>
    </div>
  </section>
</template>
<script>
import { mdiArrowRight } from '@mdi/js'
export default {
  props: {
    baseUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      adsImage: '/ads',
      adsBgImage: '/bg-leaf',
      mdiArrowRight
    }
  }
}
</script>
<style lang="scss" scoped>
.ads-section {
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
    position: relative;

    .bg {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;

      .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .headline,
    .amount,
    .ads-link {
      position: relative;
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
</style>
