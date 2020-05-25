<template>
  <button
    class="add-icon"
    :aria-label="'カートに追加する'"
    @click.stop="clickCartAction(id)"
  >
    <svg viewBox="0 0 24 24">
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
      this.$store.commit('setIsCartOpen', true)
    }
  }
}
</script>
<style lang="scss" scoped>
.add-icon {
  position: absolute;
  top: 230px;
  right: 12px;
  width: 56px;
  height: 56px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;

  svg {
    width: 30px;
    height: 30px;
    fill: #88dd9b;
  }

  &:hover {
    background-color: #88dd9b;
    svg {
      fill: white;
    }
  }
}
</style>
