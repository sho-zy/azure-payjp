<template>
  <button
    class="add-icon"
    :class="{ active: item.isAdded }"
    :aria-label="'カート' + (item.isAdded ? 'から削除' : 'に追加') + 'する'"
    @click.stop="clickCartAction(item)"
  >
    <svg viewBox="0 0 24 24">
      <path :d="item.isAdded ? mdiCartArrowUp : mdiCartArrowDown" />
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
      const productList = JSON.parse(getjson)
      let setjson = ''
      if (!productList) {
        const newProductList = [item.id]
        setjson = JSON.stringify(newProductList)
        this.$emit('setCartNum', this.cartNum + 1)
      } else if (!productList.includes(item.id)) {
        productList.push(item.id)
        setjson = JSON.stringify(productList)
        this.$emit('setCartNum', this.cartNum + 1)
      } else {
        const newProductList = productList.filter((id) => id !== item.id)
        setjson = JSON.stringify(newProductList)
        this.$emit('setCartNum', this.cartNum - 1)
      }
      localStorage.setItem('cart', setjson)
      item.isAdded = !item.isAdded
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

  &.active {
    background-color: #88dd9b;
    svg {
      fill: white;
    }
  }
}
</style>
