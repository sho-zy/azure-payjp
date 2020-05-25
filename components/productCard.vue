<template>
  <div class="product-link">
    <p class="product-image">
      <img :src="baseUrl + item.image" :alt="item.name" class="image" />
    </p>
    <p class="title" v-text="item.name" />
    <p class="type" v-text="item.type" />
    <p
      class="amount"
      v-text="'¥' + item.amount.toFixed(2).toLocaleString() + '-'"
    />
  </div>
</template>
<script>
export default {
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
.product-link {
  color: black;

  .product-image {
    border-radius: 16px;
    overflow: hidden;
    width: 300px;
    height: 300px;

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .title,
  .type,
  .amount {
    padding-left: 8px;
  }

  .title {
    margin-top: 16px;
    font-size: 24px;
    line-height: 24px;
  }

  .type {
    font-size: 14px;
  }

  .amount {
    margin-top: 8px;
    font-size: 24px;
    line-height: 24px;
  }
}
</style>
