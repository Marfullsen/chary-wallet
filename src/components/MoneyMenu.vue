<template>
  <div>
    <div class="centrado">
      <Icon icon="simple-line-icons:close" @click="cancel" color="#8c114e" width="70" />
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
      <Icon
        icon="simple-line-icons:check"
        @mousedown="onClick_or_LongPress"
        @mouseup="onClick_or_LongPress"
        color="#118c4f"
        width="70"
      />
    </div>
    <money-bar :value="20000" color="#D24C29" type="bill"></money-bar>
    <money-bar :value="10000" color="#2D639F" type="bill"></money-bar>
    <money-bar :value="5000" color="#E87A87" type="bill"></money-bar>
    <money-bar :value="2000" color="#655A7A" type="bill"></money-bar>
    <money-bar :value="1000" color="#beca9a" type="bill"></money-bar>
    <money-bar :value="500" color="orange" type="coin"></money-bar>
    <money-bar :value="100" color="orange" type="coin"></money-bar>
    <money-bar :value="50" color="orange" type="coin"></money-bar>
    <money-bar :value="10" color="orange" type="coin"></money-bar>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import MoneyBar from './MoneyBar.vue';

export default {
  components: {
    Icon,
    MoneyBar,
  },
  data() {
    return {
      amount: this.$amount,
      balance: this.$balanceGlobal,
      startClick: 0,
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
            this.DoTransaction();
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

      // Reset the accumulator.
      this.amount = 0;
    },
    cancel() {
      this.amount = 0;
    },
    appendMessage() {
      // eslint-disable-next-line no-alert
      const person = prompt('Transaction message (Optional)');
      let text = '';
      if (person == null || person === '') {
        text = '';
      } else {
        text = `${person}`;
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

<style>
.badge {
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
