<template>
  <button
    class="close-button"
    aria-label="閉じる"
    @click="$store.commit('modalClose')"
  >
    <svg viewBox="0 0 24 24" class="icon">
      <path :d="mdiClose" />
    </svg>
  </button>
</template>
<script>
import { mdiClose } from '@mdi/js'
export default {
  data() {
    return {
      mdiClose
    }
  }
}
</script>
<style lang="scss" scoped>
.close-button {
  position: absolute;
  top: 32px;
  right: 16px;

  @media screen and (min-width: 600px) {
    top: 32px;
    right: 32px;
  }
  cursor: pointer;

  .icon {
    width: 40px;
    height: 40px;
    fill: black;
  }
}
</style>
