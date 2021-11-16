<template>
  <div>
    <h1 style="margin: 0">Recent</h1>
    <table id="wallet">
      <tr style="display: none">
        <th>Optional Label</th>
        <th>Date of transaction</th>
        <th>Amount</th>
      </tr>
      <tr>
        <td class="opt-label"></td>
        <td>
          <h1>
            Pan
          </h1>
          <h2>
            20-09-2021
          </h2>
        </td>
        <td>
          <span class="till">
            1.000
          </span>
          </td>
      </tr>
      <tr>
        <td class="opt-label"></td>
        <td>20-09-2021</td>
        <td>
          <span class="outgo">
            -19.000
          </span>
          </td>
      </tr>
      <tr>
        <td class="opt-label"></td>
        <td>20-09-2021</td>
        <td>
          <span class="income">
            +20.000
          </span>
          </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
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
