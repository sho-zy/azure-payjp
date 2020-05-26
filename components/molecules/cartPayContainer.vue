<template>
  <div class="pay-container">
    <div class="total">
      <p v-text="'Total'" />
      <p
        v-text="
          '$' +
            items
              .reduce((sum, item) => sum + item.subTotal, 0)
              .toFixed(2)
              .toLocaleString()
        "
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
.pay-container {
  display: flex;
  justify-content: flex-end;
  width: calc(100% - 64px);
  max-width: 1300px;
  margin: 0 auto 24px;
  padding: 0 32px;

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    @media screen and (min-width: 800px) {
      width: 100%;
      max-width: 400px;
    }
  }
}
</style>
