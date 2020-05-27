<template>
  <div class="pay-container">
    <div class="wrapper">
      <div class="total">
        <p v-text="'Total'" />
        <p v-text="'$' + totalPrice.toFixed(2).toLocaleString()" />
      </div>
      <div class="form-container">
        <h2 class="header" v-text="'Invoice'" />
        <div id="payjp-form" />
        <button
          :disabled="totalPrice === 0 || !token || token === ''"
          class="pay-button"
          :class="{ active: totalPrice !== 0 && token && token !== '' }"
          aria-label="Checkout"
          @click="clickCheckoutButton"
        >
          <span class="text" v-text="'Checkout'" />
        </button>
        <div
          v-if="message && message !== ''"
          class="message"
          v-text="message"
        />
        <div v-if="isLoading || isCompleted" class="modal">
          <div class="message-box" :class="{ active: isCompleted }">
            <svg viewBox="0 0 24 24">
              <path :d="isCompleted ? mdiCheckCircleOutline : mdiLoading" />
            </svg>
            <span
              class="text"
              v-text="
                isCompleted ? 'Payment completed！' : 'Payment processing...'
              "
            />
            <button
              class="complete-button"
              aria-label="OK"
              @click="clickCompleteButton"
              v-text="'OK'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mdiLoading, mdiCheckCircleOutline } from '@mdi/js'
export default {
  props: {
    items: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      mdiLoading,
      mdiCheckCircleOutline,
      message: '',
      token: '',
      isLoading: false,
      isCompleted: false
    }
  },
  computed: {
    totalPrice() {
      return this.items.reduce((sum, item) => sum + item.subTotal, 0)
    }
  },
  mounted() {
    const payjp = window.Payjp('pk_test_cdabcdda7155614fe7f68cf6')
    const elements = payjp.elements()
    const cardElement = elements.create('card')
    cardElement.mount('#payjp-form')
    cardElement.on('change', async (event) => {
      if (event.error) {
        this.message = event.error.message
        return
      }

      if (event.complete) {
        try {
          const res = await payjp.createToken(cardElement)
          if (res.error) {
            this.message = res.error.message
            this.token = ''
          } else {
            this.message = ''
            this.token = res.id
          }
        } catch (error) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.log(error)
          }
          this.message = '入力が不正です。'
          this.token = ''
        }
      }
    })
  },
  methods: {
    async clickCheckoutButton() {
      if (!this.token || this.token === '') {
        this.message = '決済に失敗しました。'
        return
      }

      this.isLoading = true
      const axios = require('axios')
      try {
        const chargeResult = await axios.post(`${process.env.API_URL}/charge`, {
          amount: this.totalPrice * 110, // USD/JPY
          token: this.token
        })
        if (!chargeResult || chargeResult.data !== 'NORMAL') {
          throw new Error('決済エラー')
        } else {
          this.message = ''
          this.token = ''
          this.isCompleted = true
        }
      } catch (error) {
        this.message = '決済に失敗しました。'
      } finally {
        this.isLoading = false
      }
    },
    clickCompleteButton() {
      this.isCompleted = false
      this.$store.commit('initCartMap')
      this.$store.commit('modalClose')
    }
  }
}
</script>
<style lang="scss" scoped>
.pay-container {
  display: flex;
  justify-content: flex-end;
  width: calc(100% - 32px);
  max-width: 1300px;
  margin: 0 auto 72px;
  padding: 0 16px;

  .wrapper {
    width: 100%;

    @media screen and (min-width: 800px) {
      width: 100%;
      max-width: 400px;
    }

    .total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
    }

    .form-container {
      margin-top: 24px;
      text-align: right;
      position: relative;
      padding: 12px 12px 18px;
      background-color: white;

      .header {
        font-size: 20px;
        padding-left: 8px;
        text-align: left;
        margin-bottom: 12px;
      }

      .pay-button {
        display: inline-flex;
        align-items: center;
        padding: 8px 48px;
        margin-top: 12px;
        border-radius: 8px;
        background-color: darkgrey;
        border: solid 1px darkgrey;

        .text {
          color: white;
          font-size: 18px;
        }

        &.active {
          cursor: pointer;
          background-color: #88dd9b;
          border: solid 1px #88dd9b;
        }
      }

      .message {
        margin-top: 4px;
        font-size: 12px;
        color: red;
      }

      .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(black, 0.75);
        display: flex;
        justify-content: center;
        align-items: center;

        .message-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: white;
          border-radius: 8px;
          padding: 36px;

          svg {
            width: 48px;
            height: 48px;
            fill: darkgray;
            animation: rotate 0.75s linear;
            animation-iteration-count: infinite;
            @keyframes rotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          }

          .text {
            margin-top: 16px;
            font-weight: bold;
          }

          .complete-button {
            cursor: pointer;
            margin-top: 24px;
            display: none;
            background-color: #88dd9b;
            color: white;
            border-radius: 8px;
            width: 100%;
            font-size: 18px;
            padding: 8px 0;
          }

          &.active {
            svg {
              width: 64px;
              height: 64px;
              fill: #88dd9b;
              animation: none;
            }

            .complete-button {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
