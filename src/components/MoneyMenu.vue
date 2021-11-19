<template>
  <div>
    <section class="sticky bg-color">
      <h1 style="margin: 0;">Balance</h1>
      <balance-label></balance-label>
      <div class="centrado">
        <Icon
          icon="gg:trash"
          @click="cancel"
          color="#8c114e"
          class="pointer"
          width="70"
        />
        <div class="col marginY">
          <label
            class="badge"
            :class="
              amount < 0
                ? 'negativeAmount'
                : amount > 0
                ? 'positiveAmount'
                : 'zeroAmount'
            "
            v-text="'$' + amount"
          ></label>
          <input
            @keyup.enter="DoTransaction(this.msg)"
            type="text"
            class="text-center"
            v-model="msg" :class="amount || 'hide'"
            placeholder="Optional message"
          >
        </div>
        <Icon
          icon="line-md:confirm-circle"
          @mousedown="onClick_or_LongPress"
          @mouseup="onClick_or_LongPress"
          color="#118c4f"
          class="pointer"
          width="70"
        />
      </div>
    </section>
    <money-item :value="20000" color="#D24C29"
      :img_src="require('@/assets/veinteLucas.jpg')"></money-item>

    <money-item :value="10000" color="#2D639F"
      :img_src="require('@/assets/diezLucas.jpg')"></money-item>

    <money-item :value="5000" color="#E87A87"
      :img_src="require('@/assets/cincoLucas.jpg')"></money-item>

    <money-item :value="2000" color="#655A7A"
      :img_src="require('@/assets/dosLucas.jpg')"></money-item>

    <money-item :value="1000" color="#beca9a"
      :img_src="require('@/assets/unaLuca.jpg')"></money-item>

    <money-item :value="500" color="orange"
      :img_src="require('@/assets/unaQuina.png')"></money-item>

    <money-item :value="100" color="orange"
      :img_src="require('@/assets/unaGamba.png')"></money-item>

    <money-item :value="50" color="orange"
      :img_src="require('@/assets/mediaGamba.png')"></money-item>

    <money-item :value="10" color="orange"
      :img_src="require('@/assets/unaChaucha.png')"></money-item>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import MoneyItem from './MoneyItem.vue';
import BalanceLabel from '@/components/BalanceLabel.vue';

export default {
  components: {
    Icon,
    MoneyItem,
    BalanceLabel,
  },
  data() {
    return {
      amount: this.$amount,
      balance: this.$balanceGlobal,
      startClick: 0,
      msg: '',
    };
  },
  methods: {
    onClick_or_LongPress(e) {
      if (this.amount) {
        if (e.type === 'mousedown') {
          this.startClick = e.timeStamp;
        } else if (e.type === 'mouseup' && this.startClick > 0) {
          if (e.timeStamp - this.startClick > 500) {
            const transactionMessage = this.appendMessage();
            this.DoTransaction(transactionMessage);
          } else {
            this.DoTransaction(this.msg);
          }
        }
      }
    },
    DoTransaction(transactionMessage = '') {
      // Update global value 'balance'.
      this.balance += this.amount;
      localStorage.setItem('balance', this.balance);

      // Update global movements data.
      let now = new Date(Date.now());
      now = now.toLocaleString();
      const transaction = [now, transactionMessage, this.amount];
      const movementsData = localStorage.getItem('movementsData');
      let movements = JSON.parse(movementsData);
      movements.push(transaction);
      movements = JSON.stringify(movements);
      localStorage.setItem('movementsData', movements);

      // Reset the accumulator & message.
      this.amount = 0;
      this.msg = '';
    },
    cancel() {
      this.amount = 0;
    },
    appendMessage() {
      // eslint-disable-next-line no-alert
      const mgs = prompt('Transaction message (Optional)');
      let text = '';
      if (mgs == null || mgs === '') {
        text = '';
      } else {
        text = `${mgs}`;
      }
      return text;
    },
    lookForPreviousData() {
      const movementsData = localStorage.getItem('movementsData');
      if (movementsData) {
        this.movements = JSON.parse(movementsData);
      } else {
        localStorage.setItem('movementsData', '[]');
      }
    },
  },
  mounted() {
    this.lookForPreviousData();
  },
};
</script>

<style scoped>
input[type=text] {
  font-family: var(--global-font-family-secondary);
  border: none;
  border-bottom: 2px solid #42b983;
  padding: 12px 20px;
}
::-webkit-input-placeholder, :-moz-placeholder,
::-moz-placeholder, :-ms-input-placeholder {
   text-align: center;
}

.hide {
  display: none;
}
.col {
  display: flex;
  flex-direction: column;
  margin: 20px 20px;
}
.badge {
  font-family: var(--global-font-family-secondary);
  padding: 8px;
  border-radius: 15px;
}

.negativeAmount {
  background: rgba(255, 99, 132, 0.2);
}
.positiveAmount {
  background: rgba(75, 192, 192, 0.2);
}
.zeroAmount {
  background: rgba(54, 162, 235, 0.2);
}
</style>
