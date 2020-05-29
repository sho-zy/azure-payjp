<template>
  <button
    class="trash-button"
    aria-label="商品削除"
    @click="$store.commit('removeCartMap', id)"
  >
    <svg viewBox="0 0 24 24">
      <path :d="mdiTrashCanOutline" />
    </svg>
  </button>
</template>
<script>
import { mdiTrashCanOutline } from '@mdi/js'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mdiTrashCanOutline
    }
  }
}
</script>
<style lang="scss" scoped>
.trash-button {
  cursor: pointer;
  border: solid 1px whitesmoke;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;

  svg {
    width: 20px;
    height: 20px;
    fill: darkred;
  }

  &:hover {
    background-color: whitesmoke;
  }
}
</style>
