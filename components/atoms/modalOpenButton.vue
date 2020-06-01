<template>
  <button
    class="modal-button"
    :aria-label="label"
    @click="$store.commit('modalOpen', target)"
  >
    <svg v-if="icon" viewBox="0 0 24 24" class="icon">
      <path :d="icon" />
    </svg>
    <span v-if="text" class="text" v-text="text" />
  </button>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },
    target: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-button {
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  .icon {
    width: 30px;
    height: 30px;
    fill: white;
  }

  .text {
    display: none;
    font-size: 20px;
    color: white;
    margin-left: 4px;

    @media screen and (min-width: 600px) {
      display: block;
    }
  }
}
</style>
