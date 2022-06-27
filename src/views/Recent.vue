<template>
  <div>
    <h1 style="margin: 0">Recent</h1>
    <table id="wallet">
      <tr>
        <th>
         <b>Cash</b>
        </th>
        <th>
          <span class="till">
            {{ clp(this.balance, '$') }}
          </span>
          </th>
      </tr>
      <tr v-for="transaction, i in transactions.slice().reverse()" :key="i">
        <td class="centrado">
          <label class="centrado">
            <input type="checkbox"  />
            <div class="card">
              <!-- Transaction
                sub 0 is the date
                sub 1 is the optional name
                sub 2 is the amount
              -->
              <div v-if="transaction[1]" class="front">{{transaction[1]}}</div>
              <div v-else class="front muted-text">{{transaction[0]}}</div>
              <div v-if="transaction[1]" class="back">{{transaction[0]}}</div>
              <div v-else class="back">No message</div>
            </div>
          </label>
        </td>
        <td class="second-col">
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
      <tr v-if="isEmpty">
        <td>
          <label>It seems so empty here.</label>
        </td>
        <td>
          <input type="file"
            name="fields[assetsFieldHandle][]" id="assetsFieldHandle" @change="readHistory"
            ref="file" accept=".json">
          <label for="assetsFieldHandle">
            <span for="assetsFieldHandle" class="migrate">Try importing data!</span>
          </label>
        </td>
      </tr>
      <tr v-else>
        <td>
          <label>Click the button to export all.</label>
        </td>
        <td>
          <button class="migrate" @click="saveHistory()">export all data</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const FileSaver = require('file-saver');

export default {
  data() {
    return {
      balance: this.$balanceGlobal,
      transactions: [],
      filelist: [],
      isEmpty: true,
    };
  },
  methods: {
    lookForPreviousData() {
      const movementsData = localStorage.getItem('movementsData');
      if (movementsData) {
        this.transactions = JSON.parse(movementsData);
        this.isEmpty = !this.transactions.length || false;
      } else {
        localStorage.setItem('movementsData', '[]');
      }
    },
    saveHistory() {
      const movementsData = localStorage.getItem('movementsData');
      const fecha = new Date().toLocaleString('en-ZA').replace(/[^0-9\\.]+/g, '_');
      const filename = `tidy_wallet_history_${fecha}.json`;
      if (movementsData) {
        const blob = new Blob([movementsData], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, filename);
      }
    },
    readHistory() {
      this.filelist = [...this.$refs.file.files];
      const file = this.filelist[0];
      const reader = new FileReader();
      const self = this;
      reader.onload = function cargado(e) {
        self.transactions = JSON.parse(e.target.result);
        localStorage.setItem('movementsData', e.target.result);
        self.isEmpty = !self.transactions.length || false;
      };
      reader.readAsText(file);
    },
    clp(amount, sign = '') {
      const pointSeparator = (Number(amount)).toLocaleString('es-cl');
      return `${sign}${pointSeparator}`;
    },
  },
  created() {
    document.title = 'Recent - Tidy Wallet';
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

.second-col {
  width: 35%;
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
  font-family: var(--global-font-family-secondary);
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
}

/* Card flip effect with no JavaScript */
label {
  -webkit-perspective: 1000px;
  perspective: 1000px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  display: block;
  width: 100%;
  height: 50px;
  cursor: pointer;
}

.card {
  position: relative;
  height: 100%;
  width: 100%;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: all 600ms;
  transition: all 600ms;
  z-index: 20;
}

.card div {
  position: absolute;
  height: 100%;
  width: 100%;
  /* background: #fff; */
  text-align: center;
  line-height: 25px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 2px;
}

.card .back {
  /* background: #fff; */
  color: #779fa1;
  -webkit-transform: rotateX(180deg);
  transform: rotateX(180deg);
}

label:hover .card {
  -webkit-transform: rotateX(20deg);
  transform: rotateX(20deg);
}

input {
  display: none;
}

:checked + .card {
  transform: rotateX(180deg);
  -webkit-transform: rotateX(180deg);
}

label:hover :checked + .card {
  transform: rotateX(160deg);
  -webkit-transform: rotateX(160deg);
}

.front, .back {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 1024px) {
  label {
    height: 25px;
  }
}

</style>
