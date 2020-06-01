<template>
  <button
    class="adjust-button"
    :aria-label="isAdd ? '数量追加' : '数量減少'"
    @click="
      isAdd
        ? $store.commit('addCartMap', id)
        : $store.commit('reduceCartMap', id)
    "
  >
    <svg viewBox="0 0 24 24" class="icon">
      <path :d="isAdd ? mdiPlus : mdiMinus" />
    </svg>
  </button>
</template>
<script>
import { mdiPlus, mdiMinus } from '@mdi/js'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mdiPlus,
      mdiMinus
    }
  }
}
</script>
<style lang="scss" scoped>
.adjust-button {
  cursor: pointer;
  width: 44px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;

  .icon {
    width: 16px;
    height: 16px;
    fill: darkgray;
  }

  &:hover {
    background-color: whitesmoke;
  }
}
</style>
