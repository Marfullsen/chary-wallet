<template>
  <div>
    <h1 style="margin: 0">Recent</h1>
    <table id="wallet">
      <tr class="hide">
        <th>Optional Label</th>
        <th>Date of transaction</th>
        <th>Amount</th>
      </tr>
      <tr>
        <td class="opt-label"></td>
        <td>
         <b>Cash</b>
        </td>
        <td>
          <span class="till">
            {{ clp(this.balance, '$') }}
          </span>
          </td>
      </tr>
      <tr v-for="transaction, i in transactions.slice().reverse()" :key="i">
        <td class="opt-label">{{transaction[1]}}</td>
        <td>{{transaction[0]}}</td>
        <td>
          <span
            :class="
            transaction[2] < 0
              ? 'outgo'
              : transaction[2] > 0
              ? 'income'
              : 'till'
            ">
            {{ clp(transaction[2]) }}
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balance: this.$balanceGlobal,
      transactions: [],
    };
  },
  methods: {
    toDate(dateString) {
      // dateString example could be '2021-11-16 01:02:03'
      const reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
      const [, year, month, day, hours, minutes, seconds] = reggie.exec(dateString);
      const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);
      return dateObject;
    },
    lookForPreviousData() {
      const movementsData = localStorage.getItem('movementsData');
      if (movementsData) {
        this.transactions = JSON.parse(movementsData);
      } else {
        localStorage.setItem('movementsData', '[]');
      }
    },
    clp(amount, sign = '') {
      const pointSeparator = (Number(amount)).toLocaleString('es-cl');
      return `${sign}${pointSeparator}`;
    },
  },
  mounted() {
    this.lookForPreviousData();
  },
};
</script>

<style scoped>

.hide {
  display: none;
}

.income {
  padding: 8px;
  border-radius: 15px;
  background: rgba(75, 192, 192, 0.2);
}

.outgo {
  padding: 8px;
  border-radius: 15px;
  background: rgba(255, 99, 132, 0.2);
}

.till {
  padding: 8px;
  border-radius: 15px;
  background: rgba(54, 162, 235, 0.2);
}

.opt-label {
  display: none;
}

#wallet {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border-radius: 1em;
  overflow: hidden;
}

#wallet td,
#wallet th {
  border: 1px solid #ddd;
  padding: 8px;
}

#wallet tr:nth-child(even) {
  background-color: #f2f2f2;
}

#wallet tr:hover {
  background-color: #ddd;
}

#wallet th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
