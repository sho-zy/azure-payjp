<template>
  <div class="card-container">
    <p class="product-image">
      <img :src="baseUrl + item.image" :alt="item.name" class="image" />
    </p>
    <cartTrashButton :id="item.id" />
    <p class="name" v-text="item.name" />
    <p class="desc" v-text="item.description" />
    <div class="info">
      <div class="amount">
        <p class="text" v-text="'Quantity'" />
        <div class="adjust">
          <cartAdjustButton :id="item.id" :is-add="false" />
          <p class="num" v-text="item.num" />
          <cartAdjustButton :id="item.id" :is-add="true" />
        </div>
      </div>
      <div
        class="price"
        v-text="'$' + item.subTotal.toFixed(2).toLocaleString()"
      />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    cartTrashButton: () => import('~/components/atoms/cartTrashButton.vue'),
    cartAdjustButton: () => import('~/components/atoms/cartAdjustButton.vue')
  },
  props: {
    baseUrl: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
.card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  .product-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 8px;

    @media screen and (min-width: 600px) {
      width: 120px;
      height: 120px;
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .trash-button {
    position: absolute;
    top: 0;
    right: 0;
  }

  .name {
    width: calc(100% - 170px);
    padding: 0 54px 0 116px;
    font-size: 22px;

    @media screen and (min-width: 600px) {
      width: calc(100% - 156px);
      padding: 0 0 0 156px;
    }
  }

  .desc {
    margin-top: 8px;
    width: calc(100% - 116px);
    padding: 0 0 0 116px;
    font-size: 14px;
    font-weight: lighter;

    @media screen and (min-width: 600px) {
      width: calc(100% - 156px);
      padding: 0 0 0 156px;
    }
  }

  .info {
    margin-top: 16px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .amount {
      .text {
        font-size: 14px;
        font-weight: lighter;
      }

      .adjust {
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid 1px whitesmoke;

        .num {
          text-align: center;
          width: 44px;
        }
      }
    }

    .price {
      text-align: right;
      width: 120px;
      padding-bottom: 16px;
    }
  }
}
</style>
