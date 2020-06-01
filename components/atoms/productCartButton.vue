<template>
  <button
    class="add-button"
    :aria-label="'カートに追加する'"
    @click.stop="clickCartAction(id)"
  >
    <svg viewBox="0 0 24 24" class="icon">
      <path :d="mdiCartArrowDown" />
    </svg>
  </button>
</template>
<script>
import { mdiCartArrowDown } from '@mdi/js'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mdiCartArrowDown
    }
  },
  methods: {
    clickCartAction(id) {
      this.$store.commit('addCartMap', id)
      this.$store.commit('modalOpen', 'cart')
    }
  }
}
</script>
<style lang="scss" scoped>
.add-button {
  background-color: white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  .icon {
    width: 30px;
    height: 30px;
    fill: #88dd9b;
    transition: fill 0.3s ease-in-out;
  }

  &:hover {
    background-color: #88dd9b;

    .icon {
      fill: white;
    }
  }
}
</style>
