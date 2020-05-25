<template>
  <button
    class="add-icon"
    :aria-label="'カートに追加する'"
    @click.stop="clickCartAction(item)"
  >
    <svg viewBox="0 0 24 24">
      <path :d="mdiCartArrowDown" />
    </svg>
  </button>
</template>
<script>
import { mdiCartArrowDown, mdiCartArrowUp } from '@mdi/js'
export default {
  model: {
    prop: 'cartNum',
    event: 'setCartNum'
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    cartNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      mdiCartArrowDown,
      mdiCartArrowUp
    }
  },
  methods: {
    clickCartAction(item) {
      const getjson = localStorage.getItem('cart')
      const productMap = JSON.parse(getjson)
      let setjson = ''
      if (!productMap) {
        const newproductMap = {}
        newproductMap[item.id] = 1
        setjson = JSON.stringify(newproductMap)
        this.$emit('setCartNum', this.cartNum + 1)
      } else if (!productMap[item.id]) {
        productMap[item.id] = 1
        setjson = JSON.stringify(productMap)
        this.$emit('setCartNum', this.cartNum + 1)
      } else {
        productMap[item.id]++
        setjson = JSON.stringify(productMap)
      }
      localStorage.setItem('cart', setjson)
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
