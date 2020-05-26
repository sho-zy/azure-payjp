<template>
  <div class="pay-container">
    <div class="wrapper">
      <div class="total">
        <p v-text="'Total'" />
        <p v-text="'$' + totalPrice.toFixed(2).toLocaleString()" />
      </div>
      <div class="button-container">
        <client-only>
          <payjp-checkout
            :api-key="payjpPk"
            text="Checkout"
            class="payjp-button"
            submit-text="テストカードで支払い"
            @created="onTokenCreated"
            @failed="onTokenFailed"
          />
        </client-only>
        <button
          :disabled="totalPrice === 0"
          class="pay-button"
          :class="{ active: totalPrice !== 0 }"
          aria-label="Checkout"
          @click="clickPayButton"
        >
          <span class="text" v-text="'Checkout'" />
          <svg viewBox="0 0 24 24">
            <path :d="mdiArrowRight" />
          </svg>
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
import { mdiArrowRight, mdiLoading, mdiCheckCircleOutline } from '@mdi/js'
export default {
  components: {
    PayjpCheckout: () => import('vue-payjp-checkout')
  },
  props: {
    items: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      mdiArrowRight,
      mdiLoading,
      mdiCheckCircleOutline,
      payjpPk: process.env.PAYJP_PK,
      message: '',
      isLoading: false,
      isCompleted: false
    }
  },
  computed: {
    totalPrice() {
      return this.items.reduce((sum, item) => sum + item.subTotal, 0)
    }
  },
  methods: {
    clickPayButton() {
      const elements = document.getElementById('payjp_checkout_box').children
      if (elements && elements.length > 0) elements[0].click()
    },
    async onTokenCreated(res) {
      if (!res || !res.id || res.id === '') {
        this.message = '決済に失敗しました。'
        return
      }

      this.isLoading = true
      const axios = require('axios')
      try {
        const chargeResult = await axios.post(`${process.env.API_URL}/charge`, {
          amount: this.totalPrice * 110, // USD/JPY
          token: res.id
        })
        if (!chargeResult || chargeResult.data !== 'NORMAL') {
          throw new Error('決済エラー')
        } else {
          this.message = ''
          this.isCompleted = true
        }
      } catch (error) {
        this.message = '決済に失敗しました。'
      } finally {
        this.isLoading = false
      }
    },
    onTokenFailed() {
      this.message = '決済に失敗しました。'
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
  width: calc(100% - 64px);
  max-width: 1300px;
  margin: 0 auto 24px;
  padding: 0 32px;

  .wrapper {
    width: 100%;

    @media screen and (min-width: 800px) {
      width: 100%;
      max-width: 360px;
    }

    .total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
    }

    .button-container {
      padding: 0 12px;
      margin-top: 24px;
      text-align: right;
      position: relative;

      .payjp-button {
        display: none;
      }

      .pay-button {
        display: inline-flex;
        align-items: center;
        padding: 8px 48px;
        border-radius: 8px;
        background-color: darkgrey;
        border: solid 1px darkgrey;
        transition: background-color 0.3s ease-in-out;

        .text {
          color: white;
          font-size: 18px;
          transition: color 0.3s ease-in-out;
        }

        svg {
          margin-left: 4px;
          width: 20px;
          height: 20px;
          fill: white;
          transition: fill 0.3s ease-in-out;
        }

        &.active {
          cursor: pointer;
          background-color: #88dd9b;
          border: solid 1px #88dd9b;

          &:hover {
            background-color: white;

            .text {
              color: #88dd9b;
            }

            svg {
              fill: #88dd9b;
            }
          }
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
