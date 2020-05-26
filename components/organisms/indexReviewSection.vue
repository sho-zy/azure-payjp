<template>
  <section class="review-section">
    <h2 class="title" v-text="'Reviews'" />
    <ul class="review-list">
      <li v-for="(item, i) of reviews" :key="i" class="review-item">
        <p class="comment" v-text="item.comment" />
        <p class="name" v-text="item.name" />
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  props: {
    reviews: {
      type: Array,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
.review-section {
  padding: 0 18px;

  .title {
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
</style>
